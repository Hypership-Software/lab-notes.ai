import { z } from "zod"

import { findPersonalDataShape } from "@/lib/privacy-patterns"
import { kebabSlugPattern, sha256Schema } from "@/lib/schema-primitives"

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

/**
 * An exact span of one corpus document. `quote` is stored alongside the offsets
 * rather than derived from them so that a citation can be checked rather than
 * trusted: `document.text.slice(start, end) === quote` is the integrity test,
 * and a citation that fails it is reported as a broken reference instead of
 * being silently re-derived into agreement with itself.
 */
export const citationSchema = z
  .strictObject({
    documentId: corpusDocumentSchema.shape.id,
    start: z.number().int().nonnegative(),
    end: z.number().int().positive(),
    quote: z.string().min(1),
  })
  .refine((citation) => citation.end > citation.start, {
    message: "A citation must end after it starts",
    path: ["end"],
  })

/**
 * `F-` followed by a kebab-case slug. A template literal rather than a plain
 * string so the prefix survives into the type, and so the baseline and any
 * recorded analysis are forced to agree on identifiers: the evaluation joins a
 * labelled expectation to a finding by this value, which is what makes two
 * analyses of the same corpus comparable at all.
 */
export const findingIdSchema = z.templateLiteral([
  "F-",
  z.string().regex(kebabSlugPattern, "Use a kebab-case finding slug"),
])

export const findingSchema = z.strictObject({
  id: findingIdSchema,
  label: z.string().trim().min(3),
  summary: z.string().trim().min(10),
  evidence: z.array(citationSchema),
  limitations: z.array(z.string().trim().min(3)),
})

/**
 * Both analyses carry findings and nothing else in common, so they are one
 * discriminated union rather than a shared shape with optional fields.
 *
 * Only the recorded branch records `inputSha256`. The baseline is computed from
 * the corpus in the same process that reads it, so a hash over its input would
 * attest to nothing; a recorded output was produced elsewhere, at another time,
 * and the hash is the only thing tying it to this exact corpus.
 */
export const baselineAnalysisSchema = z.strictObject({
  kind: z.literal("baseline"),
  vocabularyVersion: z.string().trim().min(1),
  findings: z.array(findingSchema),
})

export const recordedAnalysisSchema = z.strictObject({
  kind: z.literal("recorded-ai-assisted"),
  inputSha256: sha256Schema,
  findings: z.array(findingSchema),
})

export const analysisResultSchema = z.discriminatedUnion("kind", [
  baselineAnalysisSchema,
  recordedAnalysisSchema,
])

/**
 * One labelled expectation: for a given finding, the documents a human reader
 * says genuinely belong to it, and why. `rationale` is required because a label
 * without a reason cannot be argued with, and a small hand-labelled set is only
 * as trustworthy as its stated reasoning.
 *
 * `findingId` is the join key. A finding the gold set never labelled cannot be
 * scored for precision, so `evaluateAnalysis` reports it rather than crediting
 * or penalising it.
 */
export const evaluationCaseSchema = z.strictObject({
  id: z.string().regex(/^EC-\d{2}$/, "Use a zero-padded EC identifier"),
  findingId: findingIdSchema,
  label: z.string().trim().min(3),
  expectedDocumentIds: z.array(corpusDocumentSchema.shape.id),
  rationale: z.string().trim().min(10),
})

export const evaluationGoldSchema = z
  .array(evaluationCaseSchema)
  .min(1)
  .superRefine((cases, context) => {
    const seenIds = new Set<string>()
    const seenFindings = new Set<string>()

    cases.forEach((entry, index) => {
      if (seenIds.has(entry.id)) {
        context.addIssue({
          code: "custom",
          message: "Evaluation case identifiers must be unique",
          path: [index, "id"],
        })
      }

      // One case per finding: two expectations for the same finding would make
      // both precision and coverage depend on which one happened to be read
      // first.
      if (seenFindings.has(entry.findingId)) {
        context.addIssue({
          code: "custom",
          message: "Each finding may have at most one evaluation case",
          path: [index, "findingId"],
        })
      }

      const seenDocuments = new Set<string>()
      entry.expectedDocumentIds.forEach((documentId, documentIndex) => {
        if (seenDocuments.has(documentId)) {
          context.addIssue({
            code: "custom",
            message: "Expected document identifiers must be unique",
            path: [index, "expectedDocumentIds", documentIndex],
          })
        }
        seenDocuments.add(documentId)
      })

      seenIds.add(entry.id)
      seenFindings.add(entry.findingId)
    })
  })

export type Citation = z.infer<typeof citationSchema>
export type FindingId = z.infer<typeof findingIdSchema>
export type Finding = z.infer<typeof findingSchema>
export type EvaluationCase = z.infer<typeof evaluationCaseSchema>
export type BaselineAnalysis = z.infer<typeof baselineAnalysisSchema>
export type RecordedAnalysis = z.infer<typeof recordedAnalysisSchema>
export type AnalysisResult = z.infer<typeof analysisResultSchema>
