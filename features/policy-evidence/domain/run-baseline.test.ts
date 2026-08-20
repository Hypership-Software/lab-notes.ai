import { describe, expect, it } from "vitest"

import { baselineVocabularyVersion, runBaseline, themeVocabulary } from "./run-baseline"
import { corpusThemeValues, type CorpusDocument } from "./types"

function document(
  id: string,
  text: string,
  overrides: Partial<CorpusDocument> = {},
): CorpusDocument {
  return {
    id,
    synthetic: true,
    disclosure: "Synthetic working data",
    theme: "accountability",
    stance: "critical",
    text,
    ...overrides,
  } as CorpusDocument
}

describe("themeVocabulary", () => {
  it("covers every theme with at least one multi-word phrase", () => {
    for (const theme of corpusThemeValues) {
      const terms = themeVocabulary[theme]
      expect(terms.length).toBeGreaterThan(0)
      expect(terms.some((term) => term.includes(" "))).toBe(true)
    }
  })

  it("uses lowercase terms only, so matching never depends on the source casing", () => {
    for (const theme of corpusThemeValues) {
      for (const term of themeVocabulary[theme]) {
        expect(term).toBe(term.toLowerCase())
      }
    }
  })

  it("shares no term between two themes", () => {
    const seen = new Map<string, string>()

    for (const theme of corpusThemeValues) {
      for (const term of themeVocabulary[theme]) {
        expect(seen.get(term)).toBeUndefined()
        seen.set(term, theme)
      }
    }
  })
})

describe("runBaseline", () => {
  it("returns no findings for an empty corpus", () => {
    const result = runBaseline([])

    expect(result).toEqual({
      kind: "baseline",
      vocabularyVersion: baselineVocabularyVersion,
      findings: [],
    })
  })

  it("groups a document under the theme whose vocabulary it matches", () => {
    const result = runBaseline([
      document("SYN-0001", "Staff need training before any change is switched on."),
    ])

    expect(result.findings).toHaveLength(1)
    expect(result.findings[0]?.id).toBe("F-workforce-capability")
    expect(result.findings[0]?.evidence[0]?.documentId).toBe("SYN-0001")
  })

  it("matches a phrase across differing case and punctuation", () => {
    const result = runBaseline([
      document("SYN-0001", "There is a Lawful   basis, they said, for all of it."),
    ])

    expect(result.findings.map((finding) => finding.id)).toEqual(["F-data-governance"])
  })

  it("does not match a vocabulary term inside a longer word", () => {
    const result = runBaseline([
      document("SYN-0001", "Retraining programmes were mentioned in passing only."),
    ])

    expect(result.findings).toHaveLength(0)
  })

  it("cites the sentence containing the match, at exact offsets", () => {
    const text =
      "The proposal is short. Staff need training before go-live. Nothing else changes."
    const result = runBaseline([document("SYN-0001", text)])
    const citation = result.findings[0]?.evidence[0]

    expect(citation).toBeDefined()
    expect(text.slice(citation!.start, citation!.end)).toBe(citation!.quote)
    expect(citation!.quote).toBe("Staff need training before go-live.")
  })

  it("cites a document at most once per finding", () => {
    const result = runBaseline([
      document(
        "SYN-0001",
        "Training is mentioned. Training is promised again. Training is never funded.",
      ),
    ])

    const documentIds = result.findings[0]?.evidence.map(
      (citation) => citation.documentId,
    )

    expect(documentIds).toEqual(["SYN-0001"])
  })

  it("orders findings by theme declaration order, not by how many documents matched", () => {
    const result = runBaseline([
      document("SYN-0001", "Training for staff was raised by several responses."),
      document("SYN-0002", "More training for staff is needed before go-live."),
      document("SYN-0003", "No internet access at home makes this route unusable."),
    ])

    const order = result.findings.map((finding) => finding.id)

    expect(order).toEqual(["F-access-to-services", "F-workforce-capability"])
    expect(order.indexOf("F-access-to-services")).toBeLessThan(
      order.indexOf("F-workforce-capability"),
    )
  })

  it("orders evidence by score, breaking ties by document identifier", () => {
    const result = runBaseline([
      document("SYN-0009", "Training was mentioned."),
      document("SYN-0002", "Training was mentioned."),
      document(
        "SYN-0007",
        "Training, staff duties, and a go-live date were all raised together.",
      ),
    ])

    const documentIds = result.findings[0]?.evidence.map(
      (citation) => citation.documentId,
    )

    expect(documentIds?.[0]).toBe("SYN-0007")
    expect(documentIds?.slice(1)).toEqual(["SYN-0002", "SYN-0009"])
  })

  it("records the same result for the same input", () => {
    const corpus = [
      document("SYN-0001", "Training for staff must come before go-live."),
      document("SYN-0002", "There is a lawful basis but no retention period."),
    ]

    expect(JSON.stringify(runBaseline(corpus))).toBe(JSON.stringify(runBaseline(corpus)))
  })

  it("states a limitation on every finding it produces", () => {
    const result = runBaseline([
      document("SYN-0001", "Training for staff must come before go-live."),
    ])

    expect(result.findings[0]?.limitations.length).toBeGreaterThan(0)
  })

  it("produces no finding for a theme whose vocabulary never matches", () => {
    const result = runBaseline([
      document("SYN-0001", "Training for staff must come before go-live."),
    ])

    expect(result.findings.map((finding) => finding.id)).not.toContain(
      "F-environmental-cost",
    )
  })
})
