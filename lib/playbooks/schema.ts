import { z } from "zod"

import {
  isoDateSchema,
  kebabSlugSchema as slugSchema,
} from "@/lib/schema-primitives"

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
const conciseSentenceSchema = z.string().trim().min(10).max(240)
const nonEmptyList = <T extends z.ZodType>(item: T) => z.array(item).min(1)

// The sector strings already used in content/playbooks, verbatim and
// alphabetical (Task 2 Step 1 verifies). Do not invent a sector no playbook uses.
export const sectorValues = [
  "Agriculture",
  "Citizen services",
  "Communities",
  "Community safety",
  "Cross-government",
  "Education",
  "Environment",
  "Health",
  "Housing",
  "Infrastructure",
  "Justice",
  "Justice and education",
  "Transport",
] as const

export const accessValues = ["open", "registration-or-key", "restricted"] as const

/** The opportunity as the strategy draft gave it: our words, their link. */
export const strategyExampleSchema = z.strictObject({
  proposal: sentenceSchema,
  draftReference: z.string().trim().min(3),
  url: z.url(),
})

/** One investigated source: what it covers, how open it is, and why it fits. */
export const dataSourceSchema = z.strictObject({
  id: slugSchema,
  publisher: z.string().trim().min(2),
  title: z.string().trim().min(4),
  url: z.url(),
  covers: sentenceSchema,
  access: z.enum(accessValues),
  relevance: sentenceSchema,
})

export const caveatSchema = z.strictObject({
  title: z.string().trim().min(4).max(80),
  detail: z.string().trim().min(10).max(360),
})

/**
 * Either a committed synthetic dataset, or a plain statement of why a
 * synthetic stand-in is not responsible in this domain and what a contributor
 * would need instead. There is no third synthetic-data state.
 */
export const syntheticDataSchema = z.discriminatedUnion("status", [
  z.strictObject({
    status: z.literal("available"),
    dataPath: relativePathSchema,
    purpose: conciseSentenceSchema,
    preparation: conciseSentenceSchema,
    limitations: nonEmptyList(sentenceSchema),
  }),
  z.strictObject({
    status: z.literal("not-responsible"),
    reason: sentenceSchema,
    whatContributorsNeed: sentenceSchema,
  }),
])

export const playbookSchema = z
  .strictObject({
    schemaVersion: z.literal(3),
    slug: slugSchema,
    title: z.string().trim().min(4),
    summary: sentenceSchema,
    sector: z.enum(sectorValues),
    strategyExample: strategyExampleSchema,
    dataSources: nonEmptyList(dataSourceSchema),
    syntheticData: syntheticDataSchema,
    caveats: nonEmptyList(caveatSchema),
    lastReviewed: isoDateSchema,
  })
  .superRefine((playbook, context) => {
    const sourceIds = playbook.dataSources.map((source) => source.id)
    if (new Set(sourceIds).size !== sourceIds.length) {
      context.addIssue({
        code: "custom",
        path: ["dataSources"],
        message: "Data source IDs must be unique within a playbook",
      })
    }

  })

export type PlaybookInput = z.input<typeof playbookSchema>
export type Playbook = z.output<typeof playbookSchema>

export type PlaybookSummary = Pick<
  Playbook,
  "slug" | "title" | "summary" | "sector" | "syntheticData" | "lastReviewed"
> & { dataSourceCount: number }

export type Sector = Playbook["sector"]
export type DataAccess = (typeof accessValues)[number]
export type DataSource = Playbook["dataSources"][number]
export type Caveat = Playbook["caveats"][number]
export type SyntheticData = Playbook["syntheticData"]
