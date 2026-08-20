import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { validateContent } from "./validate-content-core"

const fixtureRelativePath =
  "content/playbooks/policy-evidence/fixtures/synthetic/corpus.json"

describe("validateContent", () => {
  it("reports no errors for the committed content", async () => {
    expect(await validateContent()).toEqual([])
  })

  it("reports a missing fixture when resolved against the wrong root", async () => {
    const errors = await validateContent("scripts")

    expect(errors.length).toBeGreaterThan(0)
    expect(errors.some((error) => error.includes("policy-evidence"))).toBe(true)
    expect(errors.some((error) => error.includes("corpus.json"))).toBe(true)
  })

  it("reports a SHA-256 mismatch when the fixture bytes do not match the recorded hash", async () => {
    // The two tests above only prove absence-of-error (clean content) and the
    // `catch` branch (an unreadable path). Neither exercises the hash
    // comparison itself, which is the single guarantee this branch is built
    // on. This test builds a temporary tree containing an altered copy of the
    // real fixture at the same relative path and proves the mismatch is
    // reported by name, without touching the real fixture.
    const tempRoot = await mkdtemp(path.join(tmpdir(), "validate-content-"))

    try {
      const sourcePath = path.resolve(fixtureRelativePath)
      const destPath = path.join(tempRoot, fixtureRelativePath)

      await mkdir(path.dirname(destPath), { recursive: true })

      const original = await readFile(sourcePath, "utf8")
      await writeFile(destPath, `${original}\n`, "utf8")

      const errors = await validateContent(tempRoot)

      expect(errors.some((error) => /SHA-256 mismatch/.test(error))).toBe(true)
      expect(
        errors.some(
          (error) => error.includes("policy-evidence") && /SHA-256 mismatch/.test(error),
        ),
      ).toBe(true)
    } finally {
      await rm(tempRoot, { recursive: true, force: true })
    }
  })
})
