import { describe, expect, it } from "vitest"

import { evaluateAnalysis } from "./evaluate-analysis"
import type {
  BaselineAnalysis,
  CorpusDocument,
  EvaluationCase,
  Finding,
} from "./types"

const firstText = "Staff need training before go-live. Nothing else changes here."
const secondText = "There is a lawful basis but no retention period is published."

const corpus: CorpusDocument[] = [
  {
    id: "SYN-0001",
    synthetic: true,
    disclosure: "Synthetic working data",
    theme: "workforce-capability",
    stance: "critical",
    text: firstText,
  },
  {
    id: "SYN-0002",
    synthetic: true,
    disclosure: "Synthetic working data",
    theme: "data-governance",
    stance: "mixed",
    text: secondText,
  },
]

/** A citation that passes integrity: the quote is sliced from the document. */
function citation(documentId: "SYN-0001" | "SYN-0002", start: number, end: number) {
  const text = documentId === "SYN-0001" ? firstText : secondText
  return { documentId, start, end, quote: text.slice(start, end) }
}

const firstSentence = citation("SYN-0001", 0, 35)
const secondSentence = citation("SYN-0002", 0, 47)

function finding(overrides: Partial<Finding> = {}): Finding {
  return {
    id: "F-workforce-capability",
    label: "Workforce capability",
    summary: "Matched one response on reviewed workforce capability terms.",
    evidence: [firstSentence],
    limitations: ["A matched term is not a judgement about the response."],
    ...overrides,
  }
}

function analysis(findings: Finding[]): BaselineAnalysis {
  return { kind: "baseline", vocabularyVersion: "1.0.0", findings }
}

const workforceCase: EvaluationCase = {
  id: "EC-01",
  findingId: "F-workforce-capability",
  label: "Workforce capability",
  expectedDocumentIds: ["SYN-0001"],
  rationale: "Only the first response raises staff training and readiness.",
}

describe("evaluateAnalysis", () => {
  it("scores a fully correct analysis at one on both metrics", () => {
    const result = evaluateAnalysis(analysis([finding()]), [workforceCase], corpus)

    expect(result.citationPrecision).toEqual({
      numerator: 1,
      denominator: 1,
      value: 1,
    })
    expect(result.evidenceCoverage).toEqual({ numerator: 1, denominator: 1, value: 1 })
    expect(result.brokenReferenceCount).toBe(0)
    expect(result.unsupportedFindingCount).toBe(0)
    expect(result.findingsWithoutGoldCase).toEqual([])
  })

  it("counts a citation the gold set does not expect against precision", () => {
    const result = evaluateAnalysis(
      analysis([finding({ evidence: [firstSentence, secondSentence] })]),
      [workforceCase],
      corpus,
    )

    expect(result.citationPrecision).toEqual({
      numerator: 1,
      denominator: 2,
      value: 0.5,
    })
    expect(result.cases[0]?.unexpectedDocumentIds).toEqual(["SYN-0002"])
  })

  it("reports an expected document that was never cited", () => {
    const goldWithTwo: EvaluationCase = {
      ...workforceCase,
      expectedDocumentIds: ["SYN-0001", "SYN-0002"],
    }

    const result = evaluateAnalysis(analysis([finding()]), [goldWithTwo], corpus)

    expect(result.evidenceCoverage).toEqual({ numerator: 1, denominator: 2, value: 0.5 })
    expect(result.cases[0]?.missedDocumentIds).toEqual(["SYN-0002"])
  })

  it("counts a finding with no valid citation as unsupported", () => {
    const result = evaluateAnalysis(
      analysis([finding({ evidence: [] })]),
      [workforceCase],
      corpus,
    )

    expect(result.unsupportedFindingCount).toBe(1)
    expect(result.cases[0]?.findingPresent).toBe(true)
    expect(result.cases[0]?.citedDocumentIds).toEqual([])
  })

  it("reports a citation pointing at a document that does not exist", () => {
    const broken = { documentId: "SYN-9999" as const, start: 0, end: 12, quote: "Staff need t" }

    const result = evaluateAnalysis(
      analysis([finding({ evidence: [broken] })]),
      [workforceCase],
      corpus,
    )

    expect(result.brokenReferenceCount).toBe(1)
    expect(result.citationPrecision.denominator).toBe(0)
    expect(result.citationPrecision.value).toBeNull()
    expect(result.unsupportedFindingCount).toBe(1)
  })

  it("reports a citation whose quote does not match its offsets", () => {
    const mismatched = {
      documentId: "SYN-0001" as const,
      start: 0,
      end: 35,
      quote: "Staff need training before go-live!",
    }

    const result = evaluateAnalysis(
      analysis([finding({ evidence: [mismatched] })]),
      [workforceCase],
      corpus,
    )

    expect(result.brokenReferenceCount).toBe(1)
    expect(result.citationPrecision.value).toBeNull()
  })

  it("treats offsets beyond the end of the document as a broken reference", () => {
    const overrun = {
      documentId: "SYN-0001" as const,
      start: 0,
      end: firstText.length + 20,
      quote: firstText,
    }

    const result = evaluateAnalysis(
      analysis([finding({ evidence: [overrun] })]),
      [workforceCase],
      corpus,
    )

    expect(result.brokenReferenceCount).toBe(1)
  })

  it("names a finding the gold set never labelled and excludes it from precision", () => {
    const unlabelled = finding({
      id: "F-data-governance",
      label: "Data governance",
      evidence: [secondSentence],
    })

    const result = evaluateAnalysis(
      analysis([finding(), unlabelled]),
      [workforceCase],
      corpus,
    )

    expect(result.findingsWithoutGoldCase).toEqual(["F-data-governance"])
    expect(result.citationPrecision).toEqual({
      numerator: 1,
      denominator: 1,
      value: 1,
    })
    expect(
      result.limitations.some((limitation) => limitation.includes("F-data-governance")),
    ).toBe(true)
  })

  it("records a gold case whose finding is absent from the analysis", () => {
    const result = evaluateAnalysis(analysis([]), [workforceCase], corpus)

    expect(result.cases[0]?.findingPresent).toBe(false)
    expect(result.cases[0]?.missedDocumentIds).toEqual(["SYN-0001"])
    expect(result.evidenceCoverage).toEqual({ numerator: 0, denominator: 1, value: 0 })
    expect(result.citationPrecision.value).toBeNull()
  })

  it("returns null rather than zero when a gold case expects nothing", () => {
    const emptyExpectation: EvaluationCase = {
      ...workforceCase,
      expectedDocumentIds: [],
      rationale: "No response in this corpus genuinely raises this theme.",
    }

    const result = evaluateAnalysis(
      analysis([finding({ evidence: [] })]),
      [emptyExpectation],
      corpus,
    )

    expect(result.evidenceCoverage).toEqual({
      numerator: 0,
      denominator: 0,
      value: null,
    })
  })

  it("returns null metrics for an analysis with no findings and no expectations", () => {
    const result = evaluateAnalysis(analysis([]), [], corpus)

    expect(result.citationPrecision.value).toBeNull()
    expect(result.evidenceCoverage.value).toBeNull()
    expect(result.cases).toEqual([])
  })

  it("counts each citation once even when a finding cites a document twice", () => {
    const result = evaluateAnalysis(
      analysis([finding({ evidence: [firstSentence, firstSentence] })]),
      [workforceCase],
      corpus,
    )

    expect(result.citationPrecision).toEqual({
      numerator: 2,
      denominator: 2,
      value: 1,
    })
    expect(result.cases[0]?.citedDocumentIds).toEqual(["SYN-0001"])
  })

  it("reports cases in gold-set order and always states its scope limitation", () => {
    const dataCase: EvaluationCase = {
      id: "EC-02",
      findingId: "F-data-governance",
      label: "Data governance",
      expectedDocumentIds: ["SYN-0002"],
      rationale: "The second response is the only one about a lawful basis.",
    }

    const result = evaluateAnalysis(
      analysis([finding()]),
      [dataCase, workforceCase],
      corpus,
    )

    expect(result.cases.map((entry) => entry.caseId)).toEqual(["EC-02", "EC-01"])
    expect(result.limitations.length).toBeGreaterThan(0)
    expect(
      result.limitations.some((limitation) => /synthetic/i.test(limitation)),
    ).toBe(true)
  })
})
