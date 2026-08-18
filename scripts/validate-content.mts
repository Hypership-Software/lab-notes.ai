import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { getAllPlaybooks } from "../lib/playbooks/registry"
import { playbookSchema } from "../lib/playbooks/schema"

async function sha256(filePath: string) {
  const contents = await readFile(filePath)
  return createHash("sha256").update(contents).digest("hex")
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

      const samplePath = path.resolve(rootDirectory, source.localSamplePath)
      const relativeSamplePath = path.relative(rootDirectory, samplePath)

      if (
        relativeSamplePath.startsWith("..") ||
        path.isAbsolute(relativeSamplePath)
      ) {
        errors.push(
          `${playbook.slug}/${source.id}: local sample path escapes the repository root`,
        )
        continue
      }

      try {
        const actualHash = await sha256(samplePath)
        if (actualHash !== source.sha256) {
          errors.push(
            `${playbook.slug}/${source.id}: SHA-256 mismatch for ${source.localSamplePath}`,
          )
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown read error"
        errors.push(
          `${playbook.slug}/${source.id}: cannot read ${source.localSamplePath} (${message})`,
        )
      }
    }
  }

  return errors
}

async function run() {
  const errors = await validateContent()

  if (errors.length === 0) {
    console.log(`Validated ${getAllPlaybooks().length} playbooks.`)
    return
  }

  for (const error of errors) console.error(error)
  process.exitCode = 1
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : undefined
const currentPath = fileURLToPath(import.meta.url)

if (invokedPath === currentPath) {
  await run()
}
