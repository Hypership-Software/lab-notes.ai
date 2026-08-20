import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { evaluateAnalysis } from "./evaluate-analysis"
import { runBaseline } from "./run-baseline"
import { corpusSchema, evaluationGoldSchema } from "./types"

/**
 * The other domain tests use purpose-built inputs so they stay readable and
 * independent of the content layer. This one deliberately runs the real
 * baseline over the real committed dataset and the real expectation set,
 * because the numbers it produces are the numbers the site will publish.
 *
 * The exact metric values are asserted rather than bounded. Editing the
 * vocabulary, the dataset, or the labels is allowed; changing the published
 * result without noticing is not.
 */
const corpus = corpusSchema.parse(
  JSON.parse(
    readFileSync("content/playbooks/policy-evidence/policy-evidence.data.json", "utf8"),
  ),
)

const gold = evaluationGoldSchema.parse(
  JSON.parse(
    readFileSync("content/playbooks/policy-evidence/policy-evidence.gold.json", "utf8"),
  ),
)

describe("the committed expectation set", () => {
  it("labels every document in the dataset exactly once", () => {
    const labelled = gold.flatMap((entry) => entry.expectedDocumentIds)

    expect(new Set(labelled).size).toBe(labelled.length)
    expect([...labelled].sort()).toEqual(corpus.map((document) => document.id))
  })

  it("agrees with the theme recorded on each document", () => {
    for (const entry of gold) {
      const theme = entry.findingId.replace(/^F-/, "")

      for (const documentId of entry.expectedDocumentIds) {
        const document = corpus.find((candidate) => candidate.id === documentId)
        expect(document?.theme).toBe(theme)
      }
    }
  })
})

describe("the baseline measured against the expectation set", () => {
  const result = evaluateAnalysis(runBaseline(corpus), gold, corpus)

  it("produces one finding per labelled theme", () => {
    expect(result.cases).toHaveLength(gold.length)
    expect(result.cases.every((entry) => entry.findingPresent)).toBe(true)
    expect(result.findingsWithoutGoldCase).toEqual([])
  })

  it("resolves every citation it produces", () => {
    expect(result.brokenReferenceCount).toBe(0)
    expect(result.unsupportedFindingCount).toBe(0)
  })

  it("scores the citation precision the site publishes", () => {
    expect(result.citationPrecision.numerator).toBe(19)
    expect(result.citationPrecision.denominator).toBe(22)
  })

  it("scores the evidence coverage the site publishes", () => {
    expect(result.evidenceCoverage.numerator).toBe(19)
    expect(result.evidenceCoverage.denominator).toBe(20)
  })

  it("misses the one response that raises its theme in different words", () => {
    // SYN-0002 is an access-to-services response that never uses an
    // access-to-services term. It is the baseline's honest failure, and the
    // reason the playbook can claim a phrase list has a real blind spot.
    const access = result.cases.find((entry) => entry.caseId === "EC-01")

    expect(access?.missedDocumentIds).toEqual(["SYN-0002"])
  })

  it("attributes three responses to a theme their author did not intend", () => {
    const unexpected = result.cases.flatMap((entry) =>
      entry.unexpectedDocumentIds.map((documentId) => `${entry.caseId}:${documentId}`),
    )

    expect(unexpected).toEqual([
      "EC-02:SYN-0002",
      "EC-04:SYN-0003",
      "EC-05:SYN-0015",
    ])
  })
})
