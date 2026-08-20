import { z } from "zod"

import {
  recordedAnalysisSchema,
  type CorpusDocument,
  type RecordedAnalysis,
} from "./types"

const sha256Schema = z
  .string()
  .regex(/^[a-f0-9]{64}$/, "Use a lowercase SHA-256 digest")

/**
 * The statement the interface must carry beside any recorded model output. It is
 * checked here, at the contract boundary, rather than left to whichever
 * component happens to render the result.
 */
const requiredLimitation = "not operationally validated"

/**
 * What a recording has to declare about itself before this project will show it.
 *
 * Every field is required and none has a default. A recorded output is the one
 * place where this repository makes a claim about a model rather than about its
 * own code, so an incomplete manifest is a refusal rather than a warning:
 * hand-authored prose must not be able to reach the page wearing the
 * `Recorded AI-assisted output` label.
 *
 * The hashes are load-bearing here in a way the synthetic dataset's never were.
 * The recording happens outside this repository, at another time, on another
 * machine; `inputSha256` is the only thing tying the output to this exact
 * corpus, and `procedureSha256` the only thing tying it to the prompt and
 * settings that produced it.
 */
export const recordedAnalysisManifestSchema = z.strictObject({
  label: z.literal("Recorded AI-assisted output"),
  procedureVersion: z.string().trim().min(1),
  liveService: z.literal(false),
  /** UTC calendar date of the recording. */
  recordedAt: z.iso.date(),
  modelIdentifier: z.string().trim().min(3),
  modelVersion: z.string().trim().min(1),
  inputSha256: sha256Schema,
  procedureSha256: sha256Schema,
  outputSha256: sha256Schema,
  limitations: z.array(z.string().trim().min(3)).min(1),
})

export type RecordedAnalysisManifest = z.infer<typeof recordedAnalysisManifestSchema>

export type RecordedAnalysisBundle = {
  manifest: RecordedAnalysisManifest
  analysis: RecordedAnalysis
}

export type ParseResult =
  | { ok: true; value: RecordedAnalysisBundle }
  | { ok: false; errors: string[] }

function issueMessages(prefix: string, error: z.ZodError): string[] {
  return error.issues.map(
    (issue) => `${prefix}.${issue.path.join(".") || "(root)"}: ${issue.message}`,
  )
}

/**
 * Validate a recorded AI-assisted analysis against its manifest and the corpus
 * it claims to describe.
 *
 * Returns every problem it finds rather than throwing on the first. A reviewer
 * checking in a recording wants the whole list, and an error value keeps this
 * module free of control flow the caller cannot inspect.
 *
 * There is deliberately no `loadRecordedAnalysis()` reading a committed file:
 * no recording exists yet. Producing one means running an openly licensed model
 * outside this repository against the committed dataset, which is the remaining
 * step of this task. This parser is what that recording will have to satisfy.
 */
export function parseRecordedAnalysis(
  rawManifest: unknown,
  rawAnalysis: unknown,
  corpus: readonly CorpusDocument[],
): ParseResult {
  const errors: string[] = []

  const manifestResult = recordedAnalysisManifestSchema.safeParse(rawManifest)
  const analysisResult = recordedAnalysisSchema.safeParse(rawAnalysis)

  if (!manifestResult.success) {
    errors.push(...issueMessages("manifest", manifestResult.error))
  }

  if (!analysisResult.success) {
    errors.push(...issueMessages("analysis", analysisResult.error))
  }

  if (manifestResult.success) {
    const stated = manifestResult.data.limitations.some((limitation) =>
      limitation.toLowerCase().includes(requiredLimitation),
    )

    if (!stated) {
      errors.push(
        `manifest.limitations: one limitation must state that the recording is ${requiredLimitation}`,
      )
    }
  }

  if (analysisResult.success && analysisResult.data.findings.length === 0) {
    errors.push("analysis.findings: a recording must contain at least one finding")
  }

  if (manifestResult.success && analysisResult.success) {
    if (manifestResult.data.inputSha256 !== analysisResult.data.inputSha256) {
      errors.push(
        "manifest.inputSha256: the manifest and the recorded output disagree about which corpus was analysed",
      )
    }
  }

  if (analysisResult.success) {
    const documents = new Map(corpus.map((document) => [document.id, document]))

    for (const finding of analysisResult.data.findings) {
      for (const citation of finding.evidence) {
        const document = documents.get(citation.documentId)

        if (!document) {
          errors.push(
            `analysis.${finding.id}: citation names ${citation.documentId}, which is not in the corpus`,
          )
          continue
        }

        if (
          citation.end > document.text.length ||
          document.text.slice(citation.start, citation.end) !== citation.quote
        ) {
          errors.push(
            `analysis.${finding.id}: citation into ${citation.documentId} does not match the text at those offsets`,
          )
        }
      }
    }
  }

  if (errors.length > 0) return { ok: false, errors }

  // Both parses succeeded, which the error list above would otherwise have
  // recorded, so the non-null assertions here cannot fire.
  return {
    ok: true,
    value: { manifest: manifestResult.data!, analysis: analysisResult.data! },
  }
}
