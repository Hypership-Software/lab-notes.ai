import { assertNever } from "@/lib/assert-never"

import type { Citation, CorpusDocument, CorpusDocumentId } from "./types"

export type CorpusIndex = ReadonlyMap<CorpusDocumentId, CorpusDocument>

export function indexCorpus(corpus: readonly CorpusDocument[]): CorpusIndex {
  return new Map(corpus.map((document) => [document.id, document]))
}

/**
 * Why a citation does or does not resolve.
 *
 * The two failures are kept apart because they are different accusations: a
 * citation naming a document nobody has is not the same mistake as one whose
 * offsets no longer select the text it quotes, and a reviewer checking in a
 * recorded analysis needs to be told which happened.
 */
export type CitationCheck =
  | { status: "intact" }
  | { status: "unknown-document" }
  | { status: "quote-mismatch" }

/**
 * The project's single citation-integrity rule.
 *
 * The quote is never re-derived from the offsets. Re-deriving it would make
 * every citation agree with itself and the check meaningless, so the recorded
 * quote is compared against what the offsets actually select and a mismatch is
 * reported rather than repaired.
 *
 * The evaluation, the evidence threads, and the recorded-analysis parser all
 * read this one function. A second copy would let the page show a citation as
 * sound while the evaluation counts it broken.
 */
export function checkCitation(
  citation: Citation,
  documents: CorpusIndex,
): CitationCheck {
  const document = documents.get(citation.documentId)

  if (!document) return { status: "unknown-document" }
  if (citation.end > document.text.length) return { status: "quote-mismatch" }
  if (document.text.slice(citation.start, citation.end) !== citation.quote) {
    return { status: "quote-mismatch" }
  }

  return { status: "intact" }
}

export function isCitationIntact(
  citation: Citation,
  documents: CorpusIndex,
): boolean {
  const check = checkCitation(citation, documents)

  switch (check.status) {
    case "intact":
      return true
    case "unknown-document":
    case "quote-mismatch":
      return false
    default:
      return assertNever(check)
  }
}
