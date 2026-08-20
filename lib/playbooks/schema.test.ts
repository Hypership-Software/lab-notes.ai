import { describe, expect, it } from "vitest"

import { playbookSchema } from "./schema"

const sha256 = "a".repeat(64)

const validInput = {
  schemaVersion: 1,
  slug: "policy-evidence",
  title: "Policy Evidence Workbench",
  summary: "Inspect a bounded example of evidence synthesis with traceable sources.",
  sector: "Cross-government",
  tags: ["policy", "evidence"],
  technicalPatterns: ["retrieval", "structured-analysis"],
  problem:
    "Policy teams need to compare recurring themes without losing the evidence behind them.",
  intendedUsers: ["Policy teams", "Researchers"],
  affectedGroups: ["People represented in public consultations"],
  supportedDecision:
    "Which themes deserve further investigation by the responsible policy team.",
  publicBenefit:
    "Make evidence review more transparent while preserving accountable human judgement.",
  maturity: "recorded-demo",
  dataAccessibility: "public-readonly",
  risk: {
    level: "moderate",
    reasons: ["A summary can flatten minority or conflicting views."],
    mitigations: ["Every finding links to inspectable evidence and human review."],
  },
  officialSources: [
    {
      id: "draft-ai-strategy",
      publisher: "Public authority",
      jurisdiction: "Northern Ireland",
      title: "Draft artificial intelligence strategy",
      canonicalUrl: "https://example.gov/publication",
      sourceType: "strategy",
      coveredPeriod: "2025",
      accessedAt: "2026-08-18",
      reuseStatus: "Reuse status must be confirmed before redistribution.",
      localSamplePath: "content/playbooks/policy-evidence/sources/sample.txt",
      sha256,
      purpose: "Establish realistic public-sector terminology and document structure.",
      transformations: ["Selected a short excerpt for structural reference."],
      caveats: ["The example does not represent an operational dataset."],
    },
  ],
  syntheticData: {
    status: "available",
    label: "Synthetic working data",
    method: "Generate invented responses from a fixed set of themes and sentence patterns.",
    seed: 20260818,
    generatorVersion: "1.0.0",
    fixturePath: "content/playbooks/policy-evidence/synthetic/corpus.json",
    fixtureSha256: sha256,
    structureNotePath:
      "content/playbooks/policy-evidence/synthetic/consultation-analysis-structure.md",
    structureNoteSha256: sha256,
    sourceCharacteristics: ["Document structure", "Public-service vocabulary"],
    approximations: ["Theme frequency is illustrative rather than measured."],
    alterations: ["All entities and response text are invented."],
    exclusions: ["Names", "Contact details", "Exact addresses"],
    limitations: ["Synthetic data cannot establish production performance or fairness."],
  },
  nonAiBaseline: {
    name: "Keyword grouping",
    description: "A deterministic phrase-matching comparison on the same corpus.",
    method: "Match a reviewed list of phrases and group documents by theme.",
    limitations: ["It misses paraphrases that are absent from the phrase list."],
  },
  evaluation: {
    status: "fixture-evaluated",
    questions: ["Does each finding cite text that supports its summary?"],
    metrics: [
      {
        id: "citation-support",
        name: "Citation support",
        definition: "The share of reviewed findings with a supporting exact excerpt.",
      },
    ],
    labelledFixtureId: "policy-evidence-evaluation-v1",
    limitations: ["A small labelled fixture is not an operational evaluation."],
  },
  humanOversight: {
    responsibleRole: "Responsible policy lead",
    reviewPoint: "Before any finding informs policy advice.",
    escalation: "Refer disputed or sensitive findings to a subject-matter specialist.",
    redress: "Correct or remove unsupported findings and retain the evidence trail.",
  },
  limitations: ["The example uses synthetic responses and recorded output."],
  failureModes: ["A common phrase may be mistaken for a substantively important theme."],
  nextValidationSteps: ["Review the method with policy and public-engagement specialists."],
  implementation: {
    summary: "A static-first evidence review pattern with deterministic fixtures.",
    architecture: "Server-rendered content with a narrow local review-state boundary.",
    inputs: ["Versioned source sample", "Deterministic synthetic corpus"],
    outputs: ["Recorded findings", "Citation links", "Evaluation summary"],
    reusableParts: ["Source register", "Evidence thread", "Evaluation contract"],
    partnerRequirements: ["Domain review", "Data protection review"],
  },
  references: [
    {
      title: "Project method",
      url: "https://example.org/method",
      kind: "project",
    },
  ],
  demo: {
    availability: "recorded",
    route: "/playbooks/policy-evidence/demo",
    recordedOutputId: "policy-evidence-output-v1",
    label: "Recorded demonstration",
    recordedAt: "2026-08-18",
    modelLabel: "Provider-neutral language model",
    modelVersion: "recorded-model-version",
    promptSha256: sha256,
    inputSha256: sha256,
    limitations: ["The hosted page does not call a model."],
  },
  lastReviewed: "2026-08-18",
} as const

function cloneValidInput(): Record<string, unknown> {
  return structuredClone(validInput)
}

describe("playbookSchema", () => {
  it("parses a complete recorded playbook", () => {
    const playbook = playbookSchema.parse(validInput)

    expect(playbook.schemaVersion).toBe(1)
    expect(playbook.officialSources).toHaveLength(1)
    expect(playbook.syntheticData.label).toBe("Synthetic working data")
    expect(playbook.demo.availability).toBe("recorded")
  })

  it("rejects a malformed slug", () => {
    const input = cloneValidInput()
    input.slug = "Policy Evidence"

    expect(playbookSchema.safeParse(input).success).toBe(false)
  })

  it("requires at least one official source", () => {
    const input = cloneValidInput()
    input.officialSources = []

    expect(playbookSchema.safeParse(input).success).toBe(false)
  })

  it("requires a non-AI baseline", () => {
    const input = cloneValidInput()
    delete input.nonAiBaseline

    expect(playbookSchema.safeParse(input).success).toBe(false)
  })

  it("requires a plain-English risk reason", () => {
    const input = cloneValidInput()
    input.risk = {
      level: "moderate",
      reasons: [],
      mitigations: ["Keep a person responsible for review."],
    }

    expect(playbookSchema.safeParse(input).success).toBe(false)
  })

  it("rejects a demo route when no demo is available", () => {
    const input = cloneValidInput()
    input.maturity = "assessed"
    input.demo = {
      availability: "none",
      reason: "The necessary data is restricted.",
      route: "/playbooks/policy-evidence/demo",
    }

    expect(playbookSchema.safeParse(input).success).toBe(false)
  })

  it("requires recorded-output metadata for a recorded demo", () => {
    const input = cloneValidInput()
    const demo = input.demo as Record<string, unknown>
    delete demo.recordedOutputId

    expect(playbookSchema.safeParse(input).success).toBe(false)
  })

  it("requires a local sample path and hash together", () => {
    const input = cloneValidInput()
    const [source] = input.officialSources as Array<Record<string, unknown>>
    delete source.sha256

    expect(playbookSchema.safeParse(input).success).toBe(false)
  })

  it("requires fixture and structure-note hashes for an available corpus", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fixtureSha256, structureNotePath, structureNoteSha256, ...incomplete } =
      validInput.syntheticData as Record<string, unknown>

    const result = playbookSchema.safeParse({
      ...validInput,
      syntheticData: incomplete,
    })

    expect(result.success).toBe(false)
  })

  it("rejects a structure-note path that escapes the repository", () => {
    const result = playbookSchema.safeParse({
      ...validInput,
      syntheticData: {
        ...validInput.syntheticData,
        structureNotePath: "../outside/note.md",
      },
    })

    expect(result.success).toBe(false)
  })

  it("still accepts a planned corpus with no hashes", () => {
    const result = playbookSchema.safeParse({
      ...validInput,
      maturity: "assessed",
      demo: { availability: "none", reason: "The necessary data is restricted." },
      syntheticData: {
        status: "planned",
        label: "Synthetic working data",
        method: "Derive invented responses once a permissible structural basis exists.",
        sourceCharacteristics: ["Document structure"],
        approximations: ["Theme frequency would be illustrative."],
        alterations: ["All response text would be invented."],
        exclusions: ["Names", "Contact details"],
        limitations: ["No fixture exists yet, so nothing can be measured."],
      },
    })

    expect(result.success).toBe(true)
  })
})
