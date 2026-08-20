import { indexCorpus, isCitationIntact } from "./citation-integrity"
import type {
  AnalysisResult,
  Citation,
  CorpusDocument,
  CorpusDocumentId,
  EvaluationCase,
  Finding,
  FindingId,
} from "./types"

/**
 * A metric that always shows its working. `value` is `null`, never `0`, when the
 * denominator is empty: "we could not measure this" and "we measured this and it
 * scored nothing" are different statements, and collapsing them is how an
 * evaluation starts overstating what it knows.
 */
export type Metric = {
  numerator: number
  denominator: number
  value: number | null
}

export type EvaluationCaseResult = {
  caseId: EvaluationCase["id"]
  findingId: FindingId
  label: string
  /** False when the analysis produced no finding for this expectation at all. */
  findingPresent: boolean
  expectedDocumentIds: CorpusDocumentId[]
  /** Documents cited by valid citations, deduplicated and sorted. */
  citedDocumentIds: CorpusDocumentId[]
  matchedDocumentIds: CorpusDocumentId[]
  missedDocumentIds: CorpusDocumentId[]
  unexpectedDocumentIds: CorpusDocumentId[]
}

export type EvaluationResult = {
  citationPrecision: Metric
  evidenceCoverage: Metric
  unsupportedFindingCount: number
  brokenReferenceCount: number
  /**
   * Findings the gold set never labelled. Their citations are excluded from
   * precision: an unlabelled finding cannot be judged right or wrong, and
   * guessing either way would make the metric a claim about work nobody
   * reviewed.
   */
  findingsWithoutGoldCase: FindingId[]
  cases: EvaluationCaseResult[]
  limitations: string[]
}

const scopeLimitation =
  "This evaluation runs against a small synthetic dataset and a hand-labelled expectation set. It checks whether findings point at the evidence a reader agreed with, not whether the analysis is useful, fair, or safe for real consultation responses."

function metric(numerator: number, denominator: number): Metric {
  return {
    numerator,
    denominator,
    value: denominator === 0 ? null : numerator / denominator,
  }
}

/**
 * Check every finding's citations against the corpus, then score the analysis
 * against a hand-labelled expectation set.
 *
 * Integrity comes first and is not a metric: a citation that does not resolve is
 * excluded from precision and coverage entirely and counted as a broken
 * reference. Scoring a citation nobody can follow would reward a fluent guess.
 */
export function evaluateAnalysis(
  analysis: AnalysisResult,
  gold: readonly EvaluationCase[],
  corpus: readonly CorpusDocument[],
): EvaluationResult {
  const documents = indexCorpus(corpus)
  const goldByFinding = new Map(gold.map((entry) => [entry.findingId, entry]))
  const findingsById = new Map<FindingId, Finding>(
    analysis.findings.map((finding) => [finding.id, finding]),
  )

  let brokenReferenceCount = 0
  let unsupportedFindingCount = 0
  let precisionNumerator = 0
  let precisionDenominator = 0

  const validCitationsByFinding = new Map<FindingId, Citation[]>()

  for (const finding of analysis.findings) {
    const valid: Citation[] = []

    for (const citation of finding.evidence) {
      if (isCitationIntact(citation, documents)) {
        valid.push(citation)
      } else {
        brokenReferenceCount += 1
      }
    }

    validCitationsByFinding.set(finding.id, valid)

    if (valid.length === 0) unsupportedFindingCount += 1

    const expectation = goldByFinding.get(finding.id)

    if (!expectation) continue

    const expected = new Set(expectation.expectedDocumentIds)

    for (const citation of valid) {
      precisionDenominator += 1
      if (expected.has(citation.documentId)) precisionNumerator += 1
    }
  }

  let coverageNumerator = 0
  let coverageDenominator = 0

  const cases = gold.map((entry): EvaluationCaseResult => {
    const finding = findingsById.get(entry.findingId)
    const valid = validCitationsByFinding.get(entry.findingId) ?? []
    const cited = [...new Set(valid.map((citation) => citation.documentId))].sort()
    const expected = new Set(entry.expectedDocumentIds)

    const matched = entry.expectedDocumentIds.filter((id) => cited.includes(id))
    const missed = entry.expectedDocumentIds.filter((id) => !cited.includes(id))
    const unexpected = cited.filter((id) => !expected.has(id))

    coverageNumerator += matched.length
    coverageDenominator += entry.expectedDocumentIds.length

    return {
      caseId: entry.id,
      findingId: entry.findingId,
      label: entry.label,
      findingPresent: finding !== undefined,
      expectedDocumentIds: [...entry.expectedDocumentIds],
      citedDocumentIds: cited,
      matchedDocumentIds: matched,
      missedDocumentIds: missed,
      unexpectedDocumentIds: unexpected,
    }
  })

  const findingsWithoutGoldCase = analysis.findings
    .filter((finding) => !goldByFinding.has(finding.id))
    .map((finding) => finding.id)

  const limitations = [scopeLimitation]

  if (findingsWithoutGoldCase.length > 0) {
    limitations.push(
      `Precision excludes ${findingsWithoutGoldCase.length} finding(s) the expectation set does not cover: ${findingsWithoutGoldCase.join(", ")}. An unlabelled finding is neither credited nor penalised.`,
    )
  }

  if (brokenReferenceCount > 0) {
    limitations.push(
      `${brokenReferenceCount} citation(s) did not resolve to the text they claim and were excluded from both metrics.`,
    )
  }

  return {
    citationPrecision: metric(precisionNumerator, precisionDenominator),
    evidenceCoverage: metric(coverageNumerator, coverageDenominator),
    unsupportedFindingCount,
    brokenReferenceCount,
    findingsWithoutGoldCase,
    cases,
    limitations,
  }
}
