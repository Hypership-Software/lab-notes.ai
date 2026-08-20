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
 * the contract boundary, so the same rule applies to freshly generated
 * documents and to the committed fixture a later hand-edit might touch.
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
  synthetic: z.literal(true),
  disclosure: z.literal("Synthetic working data"),
  theme: z.enum(corpusThemeValues),
  stance: z.enum(corpusStanceValues),
  text: corpusTextSchema,
})

export const corpusSchema = z
  .array(corpusDocumentSchema)
  .min(1)
  .superRefine((documents, context) => {
    const ids = documents.map((document) => document.id)

    if (new Set(ids).size !== ids.length) {
      // Find the index of the first duplicate
      const seen = new Set<string>()
      let duplicateIndex = 0
      for (let i = 0; i < ids.length; i++) {
        if (seen.has(ids[i])) {
          duplicateIndex = i
          break
        }
        seen.add(ids[i])
      }

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

export type SyntheticCorpusConfig = {
  seed: number
  size: number
  themeWeights: Record<CorpusTheme, number>
}
