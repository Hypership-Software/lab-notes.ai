import { getBuildPartnerDescriptor, type BuildPartnerDescriptor } from "@/lib/playbooks/build-partner"
import { getDatasetSummary } from "@/lib/playbooks/dataset-registry"
import { getPlaybookSummaries } from "@/lib/playbooks/registry"
import { getServiceArea, type ServiceArea } from "@/lib/playbooks/service-area"

export type OpportunityAtlasItem = {
  slug: string
  title: string
  summary: string
  sector: string
  serviceArea: ServiceArea
  dataSourceCount: number
  dataset:
    | { status: "available"; recordCount: number }
    | { status: "not-responsible" }
  buildPartner: BuildPartnerDescriptor
}

export function getOpportunityAtlasItems(): readonly OpportunityAtlasItem[] {
  return getPlaybookSummaries().map((playbook) => {
    const datasetSummary = getDatasetSummary(playbook.slug)

    if (playbook.syntheticData.status === "available" && !datasetSummary) {
      throw new Error(
        `Playbook "${playbook.slug}" declares starter data but has no registered dataset`,
      )
    }

    return {
      slug: playbook.slug,
      title: playbook.title,
      summary: playbook.summary,
      sector: playbook.sector,
      serviceArea: getServiceArea(playbook.sector),
      dataSourceCount: playbook.dataSourceCount,
      dataset: datasetSummary
        ? { status: "available" as const, recordCount: datasetSummary.recordCount }
        : { status: "not-responsible" as const },
      buildPartner: getBuildPartnerDescriptor(playbook.slug),
    }
  })
}
