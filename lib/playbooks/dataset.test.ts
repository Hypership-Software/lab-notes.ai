import { describe, expect, it } from "vitest"

import { syntheticDatasetSchema } from "./dataset"

const valid = {
  disclosure: "Synthetic working data",
  description: "Synthetic sample readings standing in for a published monitoring series.",
  records: [{ id: "SYN-XX-01", value: 3 }],
}

describe("syntheticDatasetSchema", () => {
  it("parses a labelled envelope", () => {
    expect(syntheticDatasetSchema.parse(valid).records).toHaveLength(1)
  })

  it("rejects a missing or altered disclosure literal", () => {
    expect(syntheticDatasetSchema.safeParse({ ...valid, disclosure: "Synthetic data" }).success).toBe(false)
  })

  it("rejects an empty records array", () => {
    expect(syntheticDatasetSchema.safeParse({ ...valid, records: [] }).success).toBe(false)
  })

  it("rejects unknown envelope fields", () => {
    expect(syntheticDatasetSchema.safeParse({ ...valid, seed: 7 }).success).toBe(false)
  })
})
