import { adaptiveTutoring } from "@/content/playbooks/adaptive-tutoring/playbook"
import { communityParticipation } from "@/content/playbooks/community-participation/playbook"
import { diagnosticImagingSupport } from "@/content/playbooks/diagnostic-imaging-support/playbook"
import { earthObservation } from "@/content/playbooks/earth-observation/playbook"
import { farmAdvisory } from "@/content/playbooks/farm-advisory/playbook"
import { healthOperations } from "@/content/playbooks/health-operations/playbook"
import { housingInsight } from "@/content/playbooks/housing-insight/playbook"
import { justiceResearch } from "@/content/playbooks/justice-research/playbook"
import { lessonPlanningFeedback } from "@/content/playbooks/lesson-planning-feedback/playbook"
import { lifeEventServices } from "@/content/playbooks/life-event-services/playbook"
import { offenderLearning } from "@/content/playbooks/offender-learning/playbook"
import { policyEvidence } from "@/content/playbooks/policy-evidence/playbook"
import { roadMaintenance } from "@/content/playbooks/road-maintenance/playbook"
import { trafficFlow } from "@/content/playbooks/traffic-flow/playbook"
import { violenceRiskResearch } from "@/content/playbooks/violence-risk-research/playbook"
import { wastewaterMonitoring } from "@/content/playbooks/wastewater-monitoring/playbook"
import { waterManagement } from "@/content/playbooks/water-management/playbook"

import type { Playbook, PlaybookSummary } from "./schema"

function comparePlaybooks(left: Playbook, right: Playbook) {
  return left.slug.localeCompare(right.slug, "en-GB")
}

function toSummary(playbook: Playbook): PlaybookSummary {
  return Object.freeze({
    slug: playbook.slug,
    title: playbook.title,
    summary: playbook.summary,
    sector: playbook.sector,
    syntheticData: playbook.syntheticData,
    lastReviewed: playbook.lastReviewed,
    dataSourceCount: playbook.dataSources.length,
  })
}

export function createPlaybookRegistry(input: readonly Playbook[]) {
  const duplicateCheck = new Set<string>()

  for (const playbook of input) {
    if (duplicateCheck.has(playbook.slug)) {
      throw new Error(`Duplicate playbook slug "${playbook.slug}"`)
    }

    duplicateCheck.add(playbook.slug)
  }

  const playbooks = Object.freeze([...input].sort(comparePlaybooks))
  const bySlug = new Map(playbooks.map((playbook) => [playbook.slug, playbook]))
  const summaries = Object.freeze(playbooks.map(toSummary))
  const slugs = Object.freeze(playbooks.map((playbook) => playbook.slug))

  return Object.freeze({
    getAllPlaybooks: () => playbooks,
    getPlaybook: (slug: string) => bySlug.get(slug),
    getPlaybookSummaries: () => summaries,
    getPlaybookSlugs: () => slugs,
  })
}

const registeredPlaybooks: readonly Playbook[] = Object.freeze([
  policyEvidence,
  diagnosticImagingSupport,
  healthOperations,
  lessonPlanningFeedback,
  adaptiveTutoring,
  wastewaterMonitoring,
  trafficFlow,
  roadMaintenance,
  justiceResearch,
  offenderLearning,
  violenceRiskResearch,
  earthObservation,
  farmAdvisory,
  waterManagement,
  communityParticipation,
  housingInsight,
  lifeEventServices,
])
const registry = createPlaybookRegistry(registeredPlaybooks)

export const getAllPlaybooks = registry.getAllPlaybooks
export const getPlaybook = registry.getPlaybook
export const getPlaybookSummaries = registry.getPlaybookSummaries
export const getPlaybookSlugs = registry.getPlaybookSlugs
