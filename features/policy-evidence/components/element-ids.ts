/**
 * Anchor IDs shared by the server-rendered corpus list and the client-rendered
 * evidence threads, so a citation can link to the response it quotes.
 *
 * These live in their own module with no `"use client"` directive: exporting
 * them from the client component would turn them into client references, and
 * the server could no longer call them while rendering the corpus.
 */
export const threadElementId = (findingId: string) => `thread-${findingId}`

export const documentElementId = (documentId: string) => `document-${documentId}`
