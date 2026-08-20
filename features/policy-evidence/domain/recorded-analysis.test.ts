import { describe, expect, it } from "vitest"

import { parseRecordedAnalysis } from "./recorded-analysis"
import type { CorpusDocument } from "./types"

const text = "Staff need training before go-live. Nothing else changes here."
const inputSha256 = "a".repeat(64)
const otherSha256 = "b".repeat(64)

const corpus: CorpusDocument[] = [
  {
    id: "SYN-0001",
    synthetic: true,
    disclosure: "Synthetic working data",
    theme: "workforce-capability",
    stance: "critical",
    text,
  },
]

const manifest = {
  label: "Recorded AI-assisted output",
  procedureVersion: "policy-evidence-v1",
  liveService: false,
  recordedAt: "2026-08-20",
  modelIdentifier: "example-open-model",
  modelVersion: "1.0",
  inputSha256,
  procedureSha256: otherSha256,
  outputSha256: "c".repeat(64),
  limitations: [
    "Not operationally validated.",
    "One recording on twenty synthetic responses says nothing about a real consultation.",
  ],
}

const analysis = {
  kind: "recorded-ai-assisted",
  inputSha256,
  findings: [
    {
      id: "F-workforce-capability",
      label: "Workforce capability",
      summary: "Responses raise staff readiness before the service goes live.",
      evidence: [
        {
          documentId: "SYN-0001",
          start: 0,
          end: 35,
          quote: text.slice(0, 35),
        },
      ],
      limitations: ["The summary does not weigh how many responses raised this."],
    },
  ],
}

function parse(
  manifestOverrides: Record<string, unknown> = {},
  analysisOverrides: Record<string, unknown> = {},
) {
  return parseRecordedAnalysis(
    { ...manifest, ...manifestOverrides },
    { ...analysis, ...analysisOverrides },
    corpus,
  )
}

describe("parseRecordedAnalysis", () => {
  it("accepts a complete recording whose citations resolve", () => {
    const result = parse()

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.manifest.modelIdentifier).toBe("example-open-model")
      expect(result.value.analysis.findings).toHaveLength(1)
    }
  })

  it("refuses output that is not labelled as recorded AI-assisted output", () => {
    const result = parse({ label: "AI analysis" })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/label/i)
    }
  })

  it("refuses a recording that claims to have come from a live service", () => {
    expect(parse({ liveService: true }).ok).toBe(false)
  })

  it("refuses a manifest with no model identifier, so hand-authored text cannot pass as a recording", () => {
    const incomplete: Record<string, unknown> = { ...manifest }
    delete incomplete.modelIdentifier

    const result = parseRecordedAnalysis(incomplete, analysis, corpus)

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/modelIdentifier/)
    }
  })

  it("refuses a manifest whose input hash disagrees with the recorded output", () => {
    const result = parse({ inputSha256: otherSha256 })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/input/i)
    }
  })

  it("refuses limitations that omit the operational-validation statement", () => {
    const result = parse({ limitations: ["Only twenty synthetic responses were used."] })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/not operationally validated/i)
    }
  })

  it("refuses a citation that does not resolve to the committed corpus", () => {
    const result = parse(
      {},
      {
        findings: [
          {
            ...analysis.findings[0],
            evidence: [
              {
                documentId: "SYN-0001",
                start: 0,
                end: 35,
                quote: "Staff need training before go-live!",
              },
            ],
          },
        ],
      },
    )

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/SYN-0001/)
    }
  })

  it("refuses a citation naming a document the corpus does not contain", () => {
    const result = parse(
      {},
      {
        findings: [
          {
            ...analysis.findings[0],
            evidence: [
              { documentId: "SYN-0404", start: 0, end: 10, quote: "Staff need" },
            ],
          },
        ],
      },
    )

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/SYN-0404/)
    }
  })

  it("refuses a recording with no findings at all", () => {
    expect(parse({}, { findings: [] }).ok).toBe(false)
  })

  it("reports every problem it found rather than only the first", () => {
    const result = parse({ label: "AI analysis", liveService: true })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(1)
    }
  })
})
