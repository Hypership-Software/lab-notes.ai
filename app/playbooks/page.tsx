import { getOpportunityAtlasItems } from "@/features/playbooks/catalogue/atlas-model"
import { OpportunityAtlas } from "@/features/playbooks/catalogue/opportunity-atlas"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  path: "/playbooks",
  title: "Playbooks",
  description:
    "Explore 17 public-service opportunities with investigated sources, safe starter data, honest constraints, and a domain build partner.",
})

export default function PlaybooksPage() {
  return <OpportunityAtlas items={getOpportunityAtlasItems()} />
}
