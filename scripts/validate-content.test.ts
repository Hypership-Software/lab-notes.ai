import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { validateContent } from "./validate-content-core"

const dataRelativePath = "content/playbooks/policy-evidence/policy-evidence.data.json"
const structureNoteRelativePath =
  "content/playbooks/policy-evidence/consultation-analysis-structure.md"

/**
 * Build a temporary repository root holding the two files an available
 * synthetic dataset must have, with the dataset's own contents supplied by the
 * caller. Lets a test exercise the dataset branch against deliberately broken
 * content without touching the committed files.
 */
async function withTempRoot(
  dataContents: string,
  run: (root: string) => Promise<void>,
) {
  const tempRoot = await mkdtemp(path.join(tmpdir(), "validate-content-"))

  try {
    for (const [relativePath, contents] of [
      [dataRelativePath, dataContents],
      [structureNoteRelativePath, await readFile(path.resolve(structureNoteRelativePath), "utf8")],
    ] as const) {
      const destination = path.join(tempRoot, relativePath)
      await mkdir(path.dirname(destination), { recursive: true })
      await writeFile(destination, contents, "utf8")
    }

    await run(tempRoot)
  } finally {
    await rm(tempRoot, { recursive: true, force: true })
  }
}

describe("validateContent", () => {
  it("reports no errors for the committed content", async () => {
    expect(await validateContent()).toEqual([])
  })

  it("reports a missing dataset when resolved against the wrong root", async () => {
    const errors = await validateContent("scripts")

    expect(errors.length).toBeGreaterThan(0)
    expect(errors.some((error) => error.includes("policy-evidence"))).toBe(true)
    expect(errors.some((error) => error.includes("policy-evidence.data.json"))).toBe(
      true,
    )
  })

  it("reports a dataset that is not valid JSON", async () => {
    await withTempRoot("[{ not json", async (root) => {
      const errors = await validateContent(root)

      expect(
        errors.some(
          (error) => error.includes("policy-evidence/dataset") && error.includes("cannot parse"),
        ),
      ).toBe(true)
    })
  })

  it("reports a dataset document that breaks the corpus contract", async () => {
    // The dataset is hand-authored, so this schema parse is the guarantee the
    // branch rests on: it is what stands between an author's edit and a
    // published fixture. An unlabelled document must be named as an error
    // rather than silently accepted.
    const unlabelled = [
      {
        id: "SYN-0001",
        synthetic: true,
        disclosure: "Real consultation responses",
        theme: "accountability",
        stance: "critical",
        text: "A document whose disclosure label no longer says that it is synthetic working data.",
      },
    ]

    await withTempRoot(JSON.stringify(unlabelled, null, 2), async (root) => {
      const errors = await validateContent(root)

      expect(errors.some((error) => error.includes("policy-evidence/dataset"))).toBe(
        true,
      )
    })
  })

  it("reports a dataset document carrying a person-shaped value", async () => {
    const withContactDetails = [
      {
        id: "SYN-0001",
        synthetic: true,
        disclosure: "Synthetic working data",
        theme: "accountability",
        stance: "critical",
        text: "Respondents asked that queries be sent to consultation@example.gov before the closing date.",
      },
    ]

    await withTempRoot(JSON.stringify(withContactDetails, null, 2), async (root) => {
      const errors = await validateContent(root)

      expect(
        errors.some((error) => /email address/i.test(error)),
      ).toBe(true)
    })
  })
})
