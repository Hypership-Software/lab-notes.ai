import { z } from "zod"

import {
  isoDateSchema,
  kebabSlugSchema as slugSchema,
  kebabSlugSource,
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
const nonEmptyList = <T extends z.ZodType>(item: T) => z.array(item).min(1)

const demoRouteSchema = z
  .string()
  .regex(
    new RegExp(`^/playbooks/${kebabSlugSource}/demo$`),
    "Use the playbook's own demo route",
  )

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

/** A — the example as the strategy draft gave it. Our words, their link. */
export const strategyExampleSchema = z.strictObject({
  proposal: sentenceSchema,
  draftReference: z.string().trim().min(3),
  url: z.url(),
})

/** B — one investigated source: what it covers, how open it is, why it fits. */
export const dataSourceSchema = z.strictObject({
  id: slugSchema,
  publisher: z.string().trim().min(2),
  title: z.string().trim().min(4),
  url: z.url(),
  covers: sentenceSchema,
  access: z.enum(accessValues),
  relevance: sentenceSchema,
})

/**
 * C — either a committed synthetic dataset, or a plain statement of why a
 * synthetic stand-in is not responsible in this domain and what a contributor
 * would need instead. There is no third state: every playbook answers C.
 */
export const syntheticDataSchema = z.discriminatedUnion("status", [
  z.strictObject({
    status: z.literal("available"),
    dataPath: relativePathSchema,
    method: sentenceSchema,
    limitations: nonEmptyList(sentenceSchema),
  }),
  z.strictObject({
    status: z.literal("not-responsible"),
    reason: sentenceSchema,
    whatContributorsNeed: sentenceSchema,
  }),
])

/** D — a hosted demo or a one-sentence honest note that none exists yet. */
export const demoSchema = z.discriminatedUnion("status", [
  z.strictObject({
    status: z.literal("available"),
    route: demoRouteSchema,
    howItWorks: sentenceSchema,
  }),
  z.strictObject({
    status: z.literal("not-yet"),
    note: sentenceSchema,
  }),
])

export const playbookSchema = z
  .strictObject({
    schemaVersion: z.literal(2),
    slug: slugSchema,
    title: z.string().trim().min(4),
    summary: sentenceSchema,
    sector: z.enum(sectorValues),
    strategyExample: strategyExampleSchema,
    dataSources: nonEmptyList(dataSourceSchema),
    syntheticData: syntheticDataSchema,
    demo: demoSchema,
    caveats: nonEmptyList(sentenceSchema),
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

    // The demo reads the playbook's dataset on every render, so it cannot be
    // offered without one.
    if (playbook.demo.status === "available" && playbook.syntheticData.status !== "available") {
      context.addIssue({
        code: "custom",
        path: ["demo"],
        message: "An available demo requires an available synthetic dataset",
      })
    }

    if (
      playbook.demo.status === "available" &&
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
  "slug" | "title" | "summary" | "sector" | "syntheticData" | "demo" | "lastReviewed"
>

export type Sector = Playbook["sector"]
export type DataAccess = (typeof accessValues)[number]
export type DataSource = Playbook["dataSources"][number]
export type SyntheticData = Playbook["syntheticData"]
export type PlaybookDemo = Playbook["demo"]
