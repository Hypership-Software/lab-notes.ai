import type { CorpusDocumentId, FindingId } from "../domain/types"

/**
 * Anchor IDs shared by the server-rendered corpus list and the client-rendered
 * evidence threads, so a citation can link to the response it quotes.
 *
 * These live in their own module with no `"use client"` directive: exporting
 * them from the client component would turn them into client references, and
 * the server could no longer call them while rendering the corpus.
 */
export type ThreadElementId = (findingId: FindingId) => string
export type DocumentElementId = (documentId: CorpusDocumentId) => string

export const threadElementId: ThreadElementId = (findingId) =>
  `thread-${findingId}`

export const documentElementId: DocumentElementId = (documentId) =>
  `document-${documentId}`
