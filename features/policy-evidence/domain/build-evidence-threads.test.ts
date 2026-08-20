import { describe, expect, it } from "vitest"

import { buildEvidenceThreads } from "./build-evidence-threads"
import { evaluateAnalysis } from "./evaluate-analysis"
import type { BaselineAnalysis, CorpusDocument, EvaluationCase, Finding } from "./types"

const text = "Staff need training before go-live. Nothing else changes here."

const corpus: CorpusDocument[] = [
  {
    id: "SYN-0001",
    synthetic: true,
    disclosure: "Synthetic working data",
    theme: "workforce-capability",
    stance: "critical",
    text,
  },
]

const finding: Finding = {
  id: "F-workforce-capability",
  label: "Workforce capability",
  summary: "Responses raise staff readiness before the service goes live.",
  evidence: [{ documentId: "SYN-0001", start: 0, end: 35, quote: text.slice(0, 35) }],
  limitations: ["A matched term is not a judgement about the response."],
}

const goldCase: EvaluationCase = {
  id: "EC-01",
  findingId: "F-workforce-capability",
  label: "Workforce capability",
  expectedDocumentIds: ["SYN-0001"],
  rationale: "The only response about staff readiness before go-live.",
}

function analysis(findings: Finding[]): BaselineAnalysis {
  return { kind: "baseline", vocabularyVersion: "1.0.0", findings }
}

function build(findings: Finding[], gold: EvaluationCase[] = [goldCase]) {
  const result = analysis(findings)
  return buildEvidenceThreads(result, gold, evaluateAnalysis(result, gold, corpus), corpus)
}

describe("buildEvidenceThreads", () => {
  it("joins a finding to its document, expectation, and case result", () => {
    const [thread] = build([finding])

    expect(thread?.finding.id).toBe("F-workforce-capability")
    expect(thread?.citations[0]?.document?.id).toBe("SYN-0001")
    expect(thread?.citations[0]?.intact).toBe(true)
    expect(thread?.evaluationCase?.id).toBe("EC-01")
    expect(thread?.caseResult?.matchedDocumentIds).toEqual(["SYN-0001"])
  })

  it("keeps a broken citation visible rather than dropping it", () => {
    const [thread] = build([
      {
        ...finding,
        evidence: [
          { documentId: "SYN-0001", start: 0, end: 35, quote: "Something else entirely." },
        ],
      },
    ])

    expect(thread?.citations).toHaveLength(1)
    expect(thread?.citations[0]?.intact).toBe(false)
    expect(thread?.citations[0]?.document?.id).toBe("SYN-0001")
  })

  it("marks a citation naming an absent document as not intact and without a document", () => {
    const [thread] = build([
      {
        ...finding,
        evidence: [{ documentId: "SYN-0404", start: 0, end: 10, quote: "Staff need" }],
      },
    ])

    expect(thread?.citations[0]?.document).toBeUndefined()
    expect(thread?.citations[0]?.intact).toBe(false)
  })

  it("leaves the expectation absent for a finding the gold set never labelled", () => {
    const [thread] = build([finding], [])

    expect(thread?.evaluationCase).toBeUndefined()
    expect(thread?.caseResult).toBeUndefined()
  })

  it("returns one thread per finding, in analysis order", () => {
    const other: Finding = { ...finding, id: "F-data-governance", label: "Data governance" }

    expect(build([other, finding]).map((thread) => thread.finding.id)).toEqual([
      "F-data-governance",
      "F-workforce-capability",
    ])
  })
})
