import adaptiveTutoring from "@/content/playbooks/adaptive-tutoring/adaptive-tutoring.data.json"
import communityParticipation from "@/content/playbooks/community-participation/community-participation.data.json"
import earthObservation from "@/content/playbooks/earth-observation/earth-observation.data.json"
import farmAdvisory from "@/content/playbooks/farm-advisory/farm-advisory.data.json"
import healthOperations from "@/content/playbooks/health-operations/health-operations.data.json"
import housingInsight from "@/content/playbooks/housing-insight/housing-insight.data.json"
import justiceResearch from "@/content/playbooks/justice-research/justice-research.data.json"
import lessonPlanningFeedback from "@/content/playbooks/lesson-planning-feedback/lesson-planning-feedback.data.json"
import lifeEventServices from "@/content/playbooks/life-event-services/life-event-services.data.json"
import offenderLearning from "@/content/playbooks/offender-learning/offender-learning.data.json"
import policyEvidence from "@/content/playbooks/policy-evidence/policy-evidence.data.json"
import roadMaintenance from "@/content/playbooks/road-maintenance/road-maintenance.data.json"
import trafficFlow from "@/content/playbooks/traffic-flow/traffic-flow.data.json"
import wastewaterMonitoring from "@/content/playbooks/wastewater-monitoring/wastewater-monitoring.data.json"
import waterManagement from "@/content/playbooks/water-management/water-management.data.json"

import { syntheticDatasetSchema, type SyntheticDataset } from "./dataset"

/**
 * Every committed synthetic dataset, keyed by the slug of the playbook that
 * declares it, parsed through the shared envelope at module load.
 *
 * The imports are written out rather than globbed so that a dataset file
 * committed without being registered here — or a slug typed wrongly — fails
 * the build instead of producing a dataset page that quietly says the file is
 * missing. A test asserts this map and the registry agree.
 */
const rawDatasets: Record<string, unknown> = {
  "adaptive-tutoring": adaptiveTutoring,
  "community-participation": communityParticipation,
  "earth-observation": earthObservation,
  "farm-advisory": farmAdvisory,
  "health-operations": healthOperations,
  "housing-insight": housingInsight,
  "justice-research": justiceResearch,
  "lesson-planning-feedback": lessonPlanningFeedback,
  "life-event-services": lifeEventServices,
  "offender-learning": offenderLearning,
  "policy-evidence": policyEvidence,
  "road-maintenance": roadMaintenance,
  "traffic-flow": trafficFlow,
  "wastewater-monitoring": wastewaterMonitoring,
  "water-management": waterManagement,
}

const datasets: ReadonlyMap<string, SyntheticDataset> = new Map(
  Object.entries(rawDatasets).map(([slug, value]) => [
    slug,
    syntheticDatasetSchema.parse(value),
  ]),
)

export type DatasetFieldSummary = {
  name: string
  types: readonly ("string" | "number" | "boolean" | "null")[]
  populatedCount: number
  sampleValues: readonly (string | number | boolean)[]
}

export type DatasetSummary = {
  recordCount: number
  defaultView: "records" | "table"
  fields: readonly DatasetFieldSummary[]
}

export function getSyntheticDataset(slug: string): SyntheticDataset | undefined {
  return datasets.get(slug)
}

export function getDatasetSlugs(): readonly string[] {
  return [...datasets.keys()]
}

/**
 * The field names a dataset's records use, in the order the first record
 * declares them, with any field only later records introduce appended. A
 * dataset viewer needs a stable column order that does not depend on which
 * record it happened to read first.
 */
export function getDatasetFields(dataset: SyntheticDataset): string[] {
  const fields: string[] = []

  for (const record of dataset.records) {
    for (const field of Object.keys(record)) {
      if (!fields.includes(field)) fields.push(field)
    }
  }

  return fields
}

/**
 * Whether any value in the dataset is long enough that a table cell would
 * become a column of paragraphs. Two of the committed datasets hold whole
 * written responses, and those read as stacked records instead — DESIGN.md §13
 * forbids clipping a wide table into a miniature one.
 */
export function hasLongFormFields(dataset: SyntheticDataset): boolean {
  return dataset.records.some((record) =>
    Object.values(record).some(
      (value) => typeof value === "string" && value.length > 120,
    ),
  )
}

export function summarizeDataset(dataset: SyntheticDataset): DatasetSummary {
  return {
    recordCount: dataset.records.length,
    defaultView: hasLongFormFields(dataset) ? "records" : "table",
    fields: getDatasetFields(dataset).map((name) => {
      const types = new Set<DatasetFieldSummary["types"][number]>()
      const sampleValues = new Set<DatasetFieldSummary["sampleValues"][number]>()
      let populatedCount = 0

      for (const record of dataset.records) {
        if (!Object.hasOwn(record, name)) continue

        populatedCount += 1
        const value = record[name]

        if (value === null) {
          types.add("null")
        } else if (typeof value === "string") {
          types.add("string")
          if (sampleValues.size < 3) sampleValues.add(value)
        } else if (typeof value === "number") {
          types.add("number")
          if (sampleValues.size < 3) sampleValues.add(value)
        } else if (typeof value === "boolean") {
          types.add("boolean")
          if (sampleValues.size < 3) sampleValues.add(value)
        }
      }

      return {
        name,
        types: [...types],
        populatedCount,
        sampleValues: [...sampleValues],
      }
    }),
  }
}

export function getDatasetSummary(slug: string): DatasetSummary | undefined {
  const dataset = getSyntheticDataset(slug)
  return dataset ? summarizeDataset(dataset) : undefined
}
