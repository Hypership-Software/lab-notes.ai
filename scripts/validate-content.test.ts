import { describe, expect, it } from "vitest"

import { validateContent } from "./validate-content.mts"

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
})
