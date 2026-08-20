import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import path from "node:path"

import { corpusSchema } from "../features/policy-evidence/domain/types"
import { sensitiveKeyPattern } from "../lib/privacy-patterns"
import { getAllPlaybooks } from "../lib/playbooks/registry"
import { playbookSchema } from "../lib/playbooks/schema"

async function sha256(filePath: string) {
  const contents = await readFile(filePath)
  return createHash("sha256").update(contents).digest("hex")
}

type HashCheck = {
  label: string
  relativePath: string
  expectedSha256: string
}

/**
 * Resolve a repository-relative path, refuse anything escaping the root, and
 * compare a SHA-256 over raw bytes. Shared so source samples and synthetic
 * fixtures cannot drift apart in how strictly they are checked.
 */
async function checkFileHash(
  rootDirectory: string,
  { label, relativePath, expectedSha256 }: HashCheck,
): Promise<string | undefined> {
  const resolved = path.resolve(rootDirectory, relativePath)
  const relative = path.relative(rootDirectory, resolved)

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return `${label}: path escapes the repository root`
  }

  try {
    const actual = await sha256(resolved)
    return actual === expectedSha256
      ? undefined
      : `${label}: SHA-256 mismatch for ${relativePath}`
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown read error"
    return `${label}: cannot read ${relativePath} (${message})`
  }
}

function collectKeys(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectKeys)
  if (!value || typeof value !== "object") return []
  return Object.entries(value).flatMap(([key, child]) => [key, ...collectKeys(child)])
}

export async function validateContent(
  rootDirectory = process.cwd(),
): Promise<string[]> {
  const errors: string[] = []
  const slugs = new Set<string>()

  for (const candidate of getAllPlaybooks()) {
    const result = playbookSchema.safeParse(candidate)

    if (!result.success) {
      errors.push(
        `${candidate.slug}: ${result.error.issues
          .map((issue) => `${issue.path.join(".") || "playbook"}: ${issue.message}`)
          .join("; ")}`,
      )
      continue
    }

    const playbook = result.data

    if (slugs.has(playbook.slug)) {
      errors.push(`${playbook.slug}: duplicate playbook slug`)
      continue
    }

    slugs.add(playbook.slug)

    for (const source of playbook.officialSources) {
      if (!source.localSamplePath || !source.sha256) continue

      const error = await checkFileHash(rootDirectory, {
        label: `${playbook.slug}/${source.id}`,
        relativePath: source.localSamplePath,
        expectedSha256: source.sha256,
      })

      if (error) errors.push(error)
    }

    if (playbook.syntheticData.status === "available") {
      const { fixturePath, fixtureSha256, structureNotePath, structureNoteSha256 } =
        playbook.syntheticData

      for (const check of [
        {
          label: `${playbook.slug}/corpus`,
          relativePath: fixturePath,
          expectedSha256: fixtureSha256,
        },
        {
          label: `${playbook.slug}/structure-note`,
          relativePath: structureNotePath,
          expectedSha256: structureNoteSha256,
        },
      ]) {
        const error = await checkFileHash(rootDirectory, check)
        if (error) errors.push(error)
      }

      const fixtureFile = path.resolve(rootDirectory, fixturePath)

      try {
        const parsed = corpusSchema.safeParse(
          JSON.parse(await readFile(fixtureFile, "utf8")),
        )

        if (!parsed.success) {
          errors.push(
            `${playbook.slug}/corpus: ${parsed.error.issues
              .map((issue) => `${issue.path.join(".") || "corpus"}: ${issue.message}`)
              .join("; ")}`,
          )
        } else {
          // Unreachable while corpusDocumentSchema stays a z.strictObject with
          // a fixed field set: a successful parse cannot carry an unexpected
          // key. Kept as defence-in-depth so a future loosening of that
          // schema is still caught here rather than silently shipping.
          const offendingKeys = collectKeys(parsed.data).filter((key) =>
            sensitiveKeyPattern.test(key),
          )

          if (offendingKeys.length > 0) {
            errors.push(
              `${playbook.slug}/corpus: person-shaped keys present (${offendingKeys.join(", ")})`,
            )
          }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown read error"
        errors.push(`${playbook.slug}/corpus: cannot parse ${fixturePath} (${message})`)
      }
    }
  }

  return errors
}
