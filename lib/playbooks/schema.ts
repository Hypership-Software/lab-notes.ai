import { z } from "zod"

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase kebab-case slug")

const sha256Schema = z
  .string()
  .regex(/^[a-f0-9]{64}$/, "Use a lowercase SHA-256 digest")

const relativePathSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      !/^[A-Za-z]:[\\/]/.test(value) &&
      !/^[\\/]/.test(value) &&
      !/(?:^|[\\/])\.\.(?:[\\/]|$)/.test(value),
    "Use a repository-relative path without parent-directory segments",
  )

const sentenceSchema = z.string().trim().min(10)
const nonEmptyList = <T extends z.ZodType>(item: T) => z.array(item).min(1)

export const isoDateSchema = z.iso.date()

export const maturityValues = [
  "assessed",
  "recorded-demo",
  "partner-ready",
  "operational-pilot",
  "evaluated-service",
] as const

export const dataAccessibilityValues = [
  "open",
  "public-readonly",
  "partial",
  "restricted",
  "unknown",
] as const

export const riskValues = ["low", "moderate", "high", "very-high"] as const

export const sourceTypeValues = [
  "strategy",
  "consultation-report",
  "dataset",
  "guidance",
  "research",
] as const

export const demoAvailabilityValues = [
  "none",
  "recorded",
  "live-local",
  "partner",
] as const

export const sourceSchema = z
  .strictObject({
    id: slugSchema,
    publisher: z.string().trim().min(2),
    jurisdiction: z.string().trim().min(2),
    title: z.string().trim().min(4),
    canonicalUrl: z.url(),
    sourceType: z.enum(sourceTypeValues),
    coveredPeriod: z.string().trim().min(1),
    accessedAt: isoDateSchema,
    reuseStatus: z.string().trim().min(4),
    localSamplePath: relativePathSchema.optional(),
    sha256: sha256Schema.optional(),
    purpose: sentenceSchema,
    transformations: z.array(z.string().trim().min(4)),
    caveats: z.array(z.string().trim().min(4)),
  })
  .superRefine((source, context) => {
    if (Boolean(source.localSamplePath) !== Boolean(source.sha256)) {
      context.addIssue({
        code: "custom",
        message: "A local sample path and SHA-256 must be supplied together",
      })
    }
  })

export const classificationSchema = z.strictObject({
  sector: z.string().trim().min(2),
  tags: nonEmptyList(slugSchema),
  technicalPatterns: nonEmptyList(slugSchema),
})

export const riskSchema = z.strictObject({
  level: z.enum(riskValues),
  reasons: nonEmptyList(sentenceSchema),
  mitigations: nonEmptyList(sentenceSchema),
})

const syntheticDataSharedShape = {
  label: z.literal("Synthetic working data"),
  method: sentenceSchema,
  sourceCharacteristics: z.array(z.string().trim().min(3)),
  approximations: z.array(z.string().trim().min(3)),
  alterations: z.array(z.string().trim().min(3)),
  exclusions: z.array(z.string().trim().min(3)),
  limitations: nonEmptyList(sentenceSchema),
}

export const syntheticDataSchema = z.discriminatedUnion("status", [
  z.strictObject({
    status: z.literal("planned"),
    ...syntheticDataSharedShape,
  }),
  z.strictObject({
    status: z.literal("available"),
    ...syntheticDataSharedShape,
    seed: z.number().int().nonnegative(),
    generatorVersion: z.string().trim().min(1),
    fixturePath: relativePathSchema,
  }),
])

export const nonAiBaselineSchema = z.strictObject({
  name: z.string().trim().min(3),
  description: sentenceSchema,
  method: sentenceSchema,
  limitations: nonEmptyList(sentenceSchema),
})

const evaluationSharedShape = {
  questions: nonEmptyList(sentenceSchema),
  metrics: z.array(
    z.strictObject({
      id: slugSchema,
      name: z.string().trim().min(3),
      definition: sentenceSchema,
    }),
  ),
  limitations: nonEmptyList(sentenceSchema),
}

export const evaluationSchema = z.discriminatedUnion("status", [
  z.strictObject({
    status: z.literal("not-run"),
    ...evaluationSharedShape,
    reason: sentenceSchema,
  }),
  z.strictObject({
    status: z.literal("fixture-evaluated"),
    ...evaluationSharedShape,
    metrics: nonEmptyList(evaluationSharedShape.metrics.element),
    labelledFixtureId: slugSchema,
  }),
  z.strictObject({
    status: z.literal("partner-evaluated"),
    ...evaluationSharedShape,
    metrics: nonEmptyList(evaluationSharedShape.metrics.element),
    evidenceUrl: z.url(),
  }),
])

export const humanOversightSchema = z.strictObject({
  responsibleRole: z.string().trim().min(3),
  reviewPoint: sentenceSchema,
  escalation: sentenceSchema,
  redress: sentenceSchema,
})

export const implementationSchema = z.strictObject({
  summary: sentenceSchema,
  architecture: sentenceSchema,
  inputs: nonEmptyList(z.string().trim().min(3)),
  outputs: nonEmptyList(z.string().trim().min(3)),
  reusableParts: nonEmptyList(z.string().trim().min(3)),
  partnerRequirements: z.array(z.string().trim().min(3)),
})

export const referenceSchema = z.strictObject({
  title: z.string().trim().min(3),
  url: z.url(),
  kind: z.enum(["official", "research", "project", "repository"]),
})

const demoNoneSchema = z.strictObject({
  availability: z.literal("none"),
  reason: sentenceSchema,
})

const demoRecordedSchema = z.strictObject({
  availability: z.literal("recorded"),
  route: z.string().regex(/^\/playbooks\/[a-z0-9]+(?:-[a-z0-9]+)*\/demo$/),
  recordedOutputId: slugSchema,
  label: z.literal("Recorded demonstration"),
  recordedAt: isoDateSchema,
  modelLabel: z.string().trim().min(3),
  modelVersion: z.string().trim().min(1),
  promptSha256: sha256Schema,
  inputSha256: sha256Schema,
  limitations: nonEmptyList(sentenceSchema),
})

const demoLiveLocalSchema = z.strictObject({
  availability: z.literal("live-local"),
  route: z.string().regex(/^\/playbooks\/[a-z0-9]+(?:-[a-z0-9]+)*\/demo$/),
  setupPath: relativePathSchema,
  warning: sentenceSchema,
})

const demoPartnerSchema = z.strictObject({
  availability: z.literal("partner"),
  reason: sentenceSchema,
})

export const demoSchema = z.discriminatedUnion("availability", [
  demoNoneSchema,
  demoRecordedSchema,
  demoLiveLocalSchema,
  demoPartnerSchema,
])

export const playbookSchema = z
  .strictObject({
    schemaVersion: z.literal(1),
    slug: slugSchema,
    title: z.string().trim().min(4),
    summary: sentenceSchema,
    ...classificationSchema.shape,
    problem: sentenceSchema,
    intendedUsers: nonEmptyList(z.string().trim().min(3)),
    affectedGroups: nonEmptyList(z.string().trim().min(3)),
    supportedDecision: sentenceSchema,
    publicBenefit: sentenceSchema,
    maturity: z.enum(maturityValues),
    dataAccessibility: z.enum(dataAccessibilityValues),
    risk: riskSchema,
    officialSources: nonEmptyList(sourceSchema),
    syntheticData: syntheticDataSchema,
    nonAiBaseline: nonAiBaselineSchema,
    evaluation: evaluationSchema,
    humanOversight: humanOversightSchema,
    limitations: nonEmptyList(sentenceSchema),
    failureModes: nonEmptyList(sentenceSchema),
    nextValidationSteps: nonEmptyList(sentenceSchema),
    implementation: implementationSchema,
    references: z.array(referenceSchema),
    demo: demoSchema,
    lastReviewed: isoDateSchema,
  })
  .superRefine((playbook, context) => {
    const sourceIds = playbook.officialSources.map((source) => source.id)
    if (new Set(sourceIds).size !== sourceIds.length) {
      context.addIssue({
        code: "custom",
        path: ["officialSources"],
        message: "Official source IDs must be unique within a playbook",
      })
    }

    if (
      playbook.demo.availability === "recorded" &&
      playbook.maturity === "assessed"
    ) {
      context.addIssue({
        code: "custom",
        path: ["maturity"],
        message: "A recorded demonstration requires recorded-demo maturity or higher",
      })
    }

    if (
      playbook.maturity === "recorded-demo" &&
      playbook.demo.availability !== "recorded"
    ) {
      context.addIssue({
        code: "custom",
        path: ["demo"],
        message: "Recorded-demo maturity requires recorded demonstration metadata",
      })
    }

    if (
      "route" in playbook.demo &&
      playbook.demo.route !== `/playbooks/${playbook.slug}/demo`
    ) {
      context.addIssue({
        code: "custom",
        path: ["demo", "route"],
        message: "The demo route must match the playbook slug",
      })
    }
  })

export type PlaybookInput = z.input<typeof playbookSchema>
export type Playbook = z.output<typeof playbookSchema>

export type PlaybookSummary = Pick<
  Playbook,
  | "slug"
  | "title"
  | "summary"
  | "problem"
  | "sector"
  | "tags"
  | "technicalPatterns"
  | "maturity"
  | "dataAccessibility"
  | "risk"
  | "demo"
  | "lastReviewed"
>
