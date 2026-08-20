import { definePlaybook } from "@/lib/playbooks/define-playbook"
import type { PlaybookInput } from "@/lib/playbooks/schema"

type DataAccessibility = PlaybookInput["dataAccessibility"]
type RiskLevel = PlaybookInput["risk"]["level"]
type OfficialSource = PlaybookInput["officialSources"][number]

export type AssessedPlaybookSpec = {
  slug: string
  title: string
  summary: string
  sector: string
  tags: string[]
  technicalPatterns: string[]
  problem: string
  intendedUsers: string[]
  affectedGroups: string[]
  supportedDecision: string
  publicBenefit: string
  dataAccessibility: DataAccessibility
  riskLevel: RiskLevel
  riskReasons: string[]
  mitigations: string[]
  sourceApplication: string
  sourceRationale: string
  syntheticMethod: string
  baseline: {
    name: string
    description: string
    method: string
    limitations: string[]
  }
  limitations: string[]
  failureModes: string[]
  nextValidationSteps: string[]
  demoBarrier: string
  /**
   * Replaces the shared sentence explaining why `evaluation.status` is
   * `not-run`. A playbook that has measured something real, such as its non-AI
   * baseline, needs to say so here rather than leave the reader with the
   * default "nothing has been measured" reading.
   */
  evaluationReason?: string
  /**
   * Replaces the shared evaluation limitations. Required alongside
   * `evaluationReason` once a labelled fixture exists: the default sentence
   * says there is no labelled fixture to evaluate, which stops being true the
   * moment one is committed.
   */
  evaluationLimitations?: string[]
  responsibleRole: string
  partnerRequirements: string[]
  additionalSources?: OfficialSource[]
  /**
   * Supplied only by a playbook whose synthetic dataset actually exists. It
   * emits `syntheticData.status: "available"` and replaces the planned-state
   * prose, including `implementation.summary`, which sits outside
   * `syntheticData` but makes the same future-tense claim.
   *
   * `sourceCharacteristics` is required here rather than reused from the
   * planned branch: the planned sentence claims a structure "verified in
   * permissible official sources," which is false for a dataset whose themes
   * and positions this project authored itself.
   *
   * Maturity, demo availability, and evaluation state are deliberately not
   * overridable here: the schema forbids a recorded demonstration until the
   * recorded output exists, which is Task 9's work.
   */
  syntheticDataset?: {
    dataPath: string
    structureNotePath: string
    sourceCharacteristics: string[]
    approximations: string[]
    alterations: string[]
    limitations: string[]
    implementationSummary: string
  }
}

const strategyUrl =
  "https://consultations.nidirect.gov.uk/teo/artificial-intelligence-public-consultation"

export function defineAssessedPlaybook(spec: AssessedPlaybookSpec) {
  const strategySource: OfficialSource = {
    id: "ni-ai-strategy-consultation-report",
    publisher: "The Executive Office",
    jurisdiction: "Northern Ireland",
    title: "Northern Ireland's Artificial Intelligence Strategy - Consultation Report",
    canonicalUrl: strategyUrl,
    sourceType: "strategy",
    coveredPeriod: "Consultation report dated August 2026",
    accessedAt: "2026-08-18",
    reuseStatus:
      "The supplied draft is publicly oriented, but formal redistribution terms were not confirmed; no report extract is committed here.",
    purpose: `Table 2 identifies ${spec.sourceApplication} as a potential public-service application. ${spec.sourceRationale}`,
    transformations: [
      "Translated the short table entry into a problem-first assessed playbook.",
      "Separated the stated opportunity from assumptions that require validation.",
    ],
    caveats: [
      "The strategy entry is a proposed use case, not evidence of feasibility or impact.",
      "The source does not specify an implementation, dataset, model, or evaluation design.",
    ],
  }

  type SyntheticData = PlaybookInput["syntheticData"]
  type PlannedSyntheticData = Extract<SyntheticData, { status: "planned" }>

  // Not `as const`: the schema's input type expects mutable `string[]`
  // arrays, and a whole-object `as const` would freeze them into readonly
  // tuples that no longer satisfy it.
  const plannedSyntheticData: PlannedSyntheticData = {
    status: "planned",
    label: "Synthetic working data",
    method: spec.syntheticMethod,
    sourceCharacteristics: [
      "Only the structure, units, categories, and ranges verified in permissible official sources.",
    ],
    approximations: [
      "Frequencies and relationships would be illustrative unless supported by a cited aggregate statistic.",
    ],
    alterations: [
      "Entity identifiers, events, measurements, and text would be deliberately invented.",
    ],
    exclusions: [
      "Names, contact details, exact addresses, rare personal combinations, and source records about individuals.",
    ],
    limitations: [
      "No synthetic dataset exists at assessed maturity, and future synthetic data could not establish operational effectiveness or fairness.",
    ],
  }

  const syntheticData: SyntheticData = spec.syntheticDataset
    ? {
        status: "available",
        label: "Synthetic working data",
        // Read from the same per-playbook field as the planned branch: the
        // sentence is corrected in place rather than duplicated here.
        method: spec.syntheticMethod,
        // The planned-state sentence claims a structure "verified in
        // permissible official sources." That is false once a dataset exists
        // whose themes and positions this project authored, so an available
        // dataset supplies its own sentence naming that basis instead of
        // reusing the planned one.
        sourceCharacteristics: spec.syntheticDataset.sourceCharacteristics,
        approximations: spec.syntheticDataset.approximations,
        alterations: spec.syntheticDataset.alterations,
        exclusions: plannedSyntheticData.exclusions,
        limitations: spec.syntheticDataset.limitations,
        dataPath: spec.syntheticDataset.dataPath,
        structureNotePath: spec.syntheticDataset.structureNotePath,
      }
    : plannedSyntheticData

  return definePlaybook({
    schemaVersion: 1,
    slug: spec.slug,
    title: spec.title,
    summary: spec.summary,
    sector: spec.sector,
    tags: spec.tags,
    technicalPatterns: spec.technicalPatterns,
    problem: spec.problem,
    intendedUsers: spec.intendedUsers,
    affectedGroups: spec.affectedGroups,
    supportedDecision: spec.supportedDecision,
    publicBenefit: spec.publicBenefit,
    maturity: "assessed",
    dataAccessibility: spec.dataAccessibility,
    risk: {
      level: spec.riskLevel,
      reasons: spec.riskReasons,
      mitigations: spec.mitigations,
    },
    officialSources: [strategySource, ...(spec.additionalSources ?? [])],
    syntheticData,
    nonAiBaseline: spec.baseline,
    evaluation: {
      status: "not-run",
      questions: [
        `Does the ${spec.title} pattern support the stated task without obscuring its evidence?`,
        "Does it perform meaningfully better than the documented non-AI baseline?",
        "Can affected people understand, question, and seek correction of consequential outputs?",
      ],
      metrics: [],
      limitations: spec.evaluationLimitations ?? [
        "There is no implementation or labelled fixture to evaluate at assessed maturity.",
      ],
      reason:
        spec.evaluationReason ??
        "The playbook records a problem, evidence boundary, and validation path rather than a tested result.",
    },
    humanOversight: {
      responsibleRole: spec.responsibleRole,
      reviewPoint:
        "Before any output informs advice, prioritisation, allocation, contact, or another public-service action.",
      escalation:
        "Refer disputed, sensitive, safety-critical, or out-of-scope cases to the appropriate domain, legal, equality, safeguarding, or data-protection specialist.",
      redress:
        "Keep the source and rationale inspectable, provide a route to challenge the output, and correct both the record and the method when an error is confirmed.",
    },
    limitations: spec.limitations,
    failureModes: spec.failureModes,
    nextValidationSteps: spec.nextValidationSteps,
    implementation: {
      summary:
        spec.syntheticDataset?.implementationSummary ??
        "A future proof of concept would read a small synthetic dataset mirroring the published structure of a real source, so the pattern could be tried without access to that source, and compare it with an inspectable non-AI baseline.",
      architecture:
        "Typed static content and datasets inside the shared Next.js application, with framework-agnostic domain functions and no required live service.",
      inputs: ["Versioned official source register", "Synthetic stand-in dataset"],
      outputs: ["Inspectable task-support result", "Evidence links", "Evaluation summary"],
      reusableParts: [
        "Source register",
        "Synthetic-data method note",
        "Non-AI comparison baseline",
        "Human-review and evaluation pattern",
      ],
      partnerRequirements: spec.partnerRequirements,
    },
    references: [
      {
        title: "Northern Ireland Artificial Intelligence Strategy consultation",
        url: strategyUrl,
        kind: "official",
      },
    ],
    demo: {
      availability: "none",
      reason: spec.demoBarrier,
    },
    lastReviewed: "2026-08-18",
  })
}
