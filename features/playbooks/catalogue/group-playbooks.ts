import type { PlaybookSummary } from "@/lib/playbooks/schema"
import {
  getServiceArea,
  serviceAreaDescriptions,
  type ServiceArea,
} from "@/lib/playbooks/service-area"

export type PlaybookGroup = {
  area: ServiceArea
  description: string
  playbooks: PlaybookSummary[]
}

/**
 * Group the catalogue by service area. Areas and titles use the same literal
 * alphabetical order so neither position implies quality or readiness.
 *
 * Empty areas are omitted rather than rendered as an empty heading — a group
 * with nothing under it tells a reader nothing.
 */
export function groupPlaybooksByArea(
  playbooks: readonly PlaybookSummary[],
): PlaybookGroup[] {
  const byArea = new Map<ServiceArea, PlaybookSummary[]>()

  for (const playbook of playbooks) {
    const area = getServiceArea(playbook.sector)
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

function compareWithinArea(left: PlaybookSummary, right: PlaybookSummary) {
  return left.title.localeCompare(right.title, "en-GB")
}
