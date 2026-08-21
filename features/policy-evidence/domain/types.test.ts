import { describe, expect, it } from "vitest"

import {
  corpusDocumentSchema,
  corpusSchema,
  corpusStanceValues,
  corpusThemeValues,
} from "./types"

const validDocument = {
  id: "SYN-0001",
  theme: "access-to-services",
  stance: "supportive",
  text: "Respondents welcomed a single point of contact but asked how it would work outside office hours.",
}

describe("corpusDocumentSchema", () => {
  it("parses a valid synthetic document", () => {
    expect(corpusDocumentSchema.parse(validDocument).id).toBe("SYN-0001")
  })

  it("rejects a document carrying a synthetic flag", () => {
    expect(
      corpusDocumentSchema.safeParse({ ...validDocument, synthetic: true }).success,
    ).toBe(false)
  })

  it("rejects a document carrying a disclosure field", () => {
    expect(
      corpusDocumentSchema.safeParse({
        ...validDocument,
        disclosure: "Synthetic working data",
      }).success,
    ).toBe(false)
  })

  it("requires a zero-padded four-digit identifier", () => {
    for (const id of ["SYN-1", "SYN-00001", "syn-0001", "0001", "SYN-001A"]) {
      expect(corpusDocumentSchema.safeParse({ ...validDocument, id }).success).toBe(
        false,
      )
    }
  })

  it("rejects an unknown field", () => {
    expect(
      corpusDocumentSchema.safeParse({ ...validDocument, tags: ["policy"] }).success,
    ).toBe(false)
  })

  it("rejects text carrying a person-shaped value", () => {
    for (const text of [
      "Respondents were asked to write to consultation@example.gov with views on the timetable.",
      "The published notice listed 028 9012 3456 as the contact for queries about the draft.",
      "Further detail was said to be available at https://example.gov/consultation/detail.",
    ]) {
      expect(corpusDocumentSchema.safeParse({ ...validDocument, text }).success).toBe(
        false,
      )
    }
  })

  it("names every theme and stance exactly once", () => {
    expect(new Set(corpusThemeValues).size).toBe(corpusThemeValues.length)
    expect(new Set(corpusStanceValues).size).toBe(corpusStanceValues.length)
    expect(corpusThemeValues).toHaveLength(6)
    expect(corpusStanceValues).toHaveLength(4)
  })
})

describe("corpusSchema", () => {
  it("rejects duplicate identifiers", () => {
    const result = corpusSchema.safeParse([validDocument, { ...validDocument }])
    expect(result.success).toBe(false)
    if (!result.success) {
      const duplicateIssue = result.error.issues.find(
        (issue) => issue.message === "Corpus identifiers must be unique",
      )
      expect(duplicateIssue?.path).toEqual([1])
    }
  })

  it("rejects documents that are not sorted by identifier", () => {
    const result = corpusSchema.safeParse([
      { ...validDocument, id: "SYN-0002" },
      { ...validDocument, id: "SYN-0001" },
    ])
    expect(result.success).toBe(false)
    if (!result.success) {
      const sortIssue = result.error.issues.find(
        (issue) => issue.message === "Corpus documents must be sorted by identifier",
      )
      expect(sortIssue?.path).toEqual([0])
    }
  })

  it("accepts a sorted, unique corpus", () => {
    const result = corpusSchema.safeParse([
      { ...validDocument, id: "SYN-0001" },
      { ...validDocument, id: "SYN-0002" },
    ])
    expect(result.success).toBe(true)
  })

  it("rejects an empty corpus", () => {
    expect(corpusSchema.safeParse([]).success).toBe(false)
  })
})
