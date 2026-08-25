import {
  serviceAreaDescriptions,
  type ServiceArea,
} from "@/lib/playbooks/service-area"

import type { OpportunityAtlasItem } from "./atlas-model"

export type PlaybookGroup = {
  area: ServiceArea
  description: string
  playbooks: OpportunityAtlasItem[]
}

/**
 * Group the catalogue by service area. Areas and titles use the same literal
 * alphabetical order so neither position implies quality or readiness.
 *
 * Empty areas are omitted rather than rendered as an empty heading — a group
 * with nothing under it tells a reader nothing.
 */
export function groupPlaybooksByArea(
  playbooks: readonly OpportunityAtlasItem[],
): PlaybookGroup[] {
  const byArea = new Map<ServiceArea, OpportunityAtlasItem[]>()

  for (const playbook of playbooks) {
    const area = playbook.serviceArea
    const existing = byArea.get(area)
    if (existing) existing.push(playbook)
    else byArea.set(area, [playbook])
  }

  return [...byArea]
    .map(([area, group]) => ({
      area,
      description: serviceAreaDescriptions[area],
      playbooks: group.sort(compareWithinArea),
    }))
    .sort((left, right) => left.area.localeCompare(right.area, "en-GB"))
}

function compareWithinArea(
  left: OpportunityAtlasItem,
  right: OpportunityAtlasItem,
) {
  return left.title.localeCompare(right.title, "en-GB")
}
