import type { EvaluationCaseResult, EvaluationResult } from "./evaluate-analysis"
import type {
  AnalysisResult,
  Citation,
  CorpusDocument,
  EvaluationCase,
  Finding,
} from "./types"

export type ThreadCitation = {
  citation: Citation
  /** Absent when the citation names a document the corpus does not contain. */
  document: CorpusDocument | undefined
  /** False when the recorded quote is not what those offsets select. */
  intact: boolean
}

/**
 * One finding with everything needed to follow it back to its evidence, in the
 * order the interface presents it: finding, citation, the synthetic response the
 * citation lands in, the labelled expectation for that finding, and how the
 * analysis scored against it.
 */
export type EvidenceThreadModel = {
  finding: Finding
  citations: ThreadCitation[]
  /** Absent when the expectation set never labelled this finding. */
  evaluationCase: EvaluationCase | undefined
  caseResult: EvaluationCaseResult | undefined
}

/**
 * Join an analysis to the corpus it cites and the expectations it was scored
 * against, so a component can render an evidence thread without re-deriving any
 * of it.
 *
 * A broken citation is carried through with `intact: false` rather than dropped.
 * Hiding it would leave the interface showing a finding that looks fully
 * evidenced while the evaluation counts a broken reference, which is precisely
 * the discrepancy a reader needs to see.
 */
export function buildEvidenceThreads(
  analysis: AnalysisResult,
  gold: readonly EvaluationCase[],
  evaluation: EvaluationResult,
  corpus: readonly CorpusDocument[],
): EvidenceThreadModel[] {
  const documents = new Map(corpus.map((document) => [document.id, document]))
  const casesByFinding = new Map(gold.map((entry) => [entry.findingId, entry]))
  const resultsByCase = new Map(
    evaluation.cases.map((entry) => [entry.caseId, entry]),
  )

  return analysis.findings.map((finding: Finding): EvidenceThreadModel => {
    const evaluationCase = casesByFinding.get(finding.id)

    return {
      finding,
      citations: finding.evidence.map((citation) => {
        const document = documents.get(citation.documentId)

        return {
          citation,
          document,
          intact:
            document !== undefined &&
            citation.end <= document.text.length &&
            document.text.slice(citation.start, citation.end) === citation.quote,
        }
      }),
      evaluationCase,
      caseResult: evaluationCase
        ? resultsByCase.get(evaluationCase.id)
        : undefined,
    }
  })
}
