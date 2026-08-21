import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const housingInsight = definePlaybook({
  schemaVersion: 2,
  slug: "housing-insight",
  title: "Housing Need and Service Insight",
  summary:
    "Work out what can honestly be said about housing need and stock condition from figures that count households by area and quarter, and keep the stand-in data well away from any tenancy.",
  sector: "Housing",
  strategyExample: {
    proposal:
      "The draft strategy names AI in housing for property management and tenant services as a potential public-service application, stating a broad opportunity without naming the service problem, the data it would use, or the decisions it must never make.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "dfc-ni-housing-statistics",
      publisher: "Department for Communities",
      title: "Northern Ireland Housing Statistics",
      url: "https://www.communities-ni.gov.uk/articles/northern-ireland-housing-statistics",
      covers:
        "The annual compendium of Northern Ireland housing statistics, in sections on supply, energy, social renting demand, private renting demand, owner occupier demand, and household characteristics.",
      access: "open",
      relevance:
        "Its social renting demand and energy sections are the published shape this playbook's synthetic records imitate: households and dwellings counted in groups by area, with nobody described.",
    },
    {
      id: "dfc-ni-housing-bulletin",
      publisher: "Department for Communities",
      title: "Northern Ireland Housing Bulletin",
      url: "https://www.communities-ni.gov.uk/articles/northern-ireland-housing-bulletin",
      covers:
        "The quarterly bulletin covering social housing development activity, social housing demand, homelessness, and house sales and prices.",
      access: "open",
      relevance:
        "It sets the quarter as the published period, which is the grain the synthetic records use, and shows that what reaches the public is counts of households and properties rather than anything about a tenancy.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/housing-insight/housing-insight.data.json",
    method:
      "Twenty invented quarterly rows written by hand, five lettered area bands each carrying a banded count of households waiting and a banded description of the condition of the stock around them, so service patterns can be discussed with no property, household, or tenancy in the file.",
    limitations: [
      "The areas are letters and the bands are invented, so nothing here describes housing need or housing condition anywhere in Northern Ireland.",
      "A banded count by area and quarter cannot show an urgent circumstance, and urgency is usually the thing that matters.",
      "Condition and need are held here as two coarse bands, which is the safe choice and also removes almost everything a housing team would actually work from.",
    ],
  },
  demo: {
    status: "not-yet",
    note: "A demo could show which area bands moved between quarters and state plainly what a band change does and does not imply, but nobody has built that here yet.",
  },
  caveats: [
    "Housing records can reveal finances, disability, household circumstances, address, and vulnerability, which is why this file counts households in bands and never describes one.",
    "Recorded demand partly measures who managed to get recorded, so a low count can mean a barrier to reporting rather than less need.",
    "Service and maintenance patterns must not be turned round to judge a tenant or a household, and nothing here belongs anywhere near an allocation, eligibility, or enforcement decision.",
  ],
  lastReviewed: "2026-08-21",
})
