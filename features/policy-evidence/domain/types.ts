import { z } from "zod"

import { findPersonalDataShape } from "@/lib/privacy-patterns"

export const corpusThemeValues = [
  "access-to-services",
  "workforce-capability",
  "data-governance",
  "accountability",
  "procurement-and-reuse",
  "environmental-cost",
] as const

export const corpusStanceValues = [
  "supportive",
  "critical",
  "mixed",
  "uncertain",
] as const

/**
 * Document text is checked against the shared person-shaped patterns here, at
 * the contract boundary. Every document in this project is hand-authored, so
 * this is the check that stands between an author's edit and a public
 * repository: content validation parses the committed dataset through it.
 */
const corpusTextSchema = z
  .string()
  .trim()
  .min(40)
  .superRefine((text, context) => {
    const shape = findPersonalDataShape(text)

    if (shape) {
      context.addIssue({
        code: "custom",
        message: `Synthetic text must not contain a ${shape}`,
      })
    }
  })

export const corpusDocumentSchema = z.strictObject({
  id: z.string().regex(/^SYN-\d{4}$/, "Use a zero-padded SYN identifier"),
  theme: z.enum(corpusThemeValues),
  stance: z.enum(corpusStanceValues),
  text: corpusTextSchema,
})

export const corpusSchema = z
  .array(corpusDocumentSchema)
  .min(1)
  .superRefine((documents, context) => {
    const ids = documents.map((document) => document.id)

    const seen = new Set<string>()
    const duplicateIndex = ids.findIndex((id) => {
      if (seen.has(id)) return true
      seen.add(id)
      return false
    })

    if (duplicateIndex !== -1) {
      context.addIssue({
        code: "custom",
        message: "Corpus identifiers must be unique",
        path: [duplicateIndex],
      })
    }

    const sorted = [...ids].sort()

    const mismatchIndex = ids.findIndex((id, index) => id !== sorted[index])
    if (mismatchIndex !== -1) {
      context.addIssue({
        code: "custom",
        message: "Corpus documents must be sorted by identifier",
        path: [mismatchIndex],
      })
    }
  })

export type CorpusTheme = (typeof corpusThemeValues)[number]
export type CorpusStance = (typeof corpusStanceValues)[number]
export type CorpusDocument = z.infer<typeof corpusDocumentSchema>
export type CorpusDocumentId = CorpusDocument["id"]

export type Citation = {
  documentId: CorpusDocumentId
  start: number
  end: number
  quote: string
}

export type Finding = {
  id: `F-${string}`
  label: string
  summary: string
  evidence: Citation[]
  limitations: string[]
}

export type Analysis = { findings: Finding[] }
