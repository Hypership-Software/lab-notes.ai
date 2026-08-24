import type { CorpusDocumentId } from "../domain/types"

/**
 * The anchor a citation links back to, built in one place so the record list
 * and the findings that quote it cannot disagree about the ID.
 */
export type DocumentElementId = (documentId: CorpusDocumentId) => string

export const documentElementId: DocumentElementId = (documentId) =>
  `document-${documentId}`
