import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const farmAdvisory = definePlaybook({
  schemaVersion: 3,
  slug: "farm-advisory",
  title: "Farm Advisory Support",
  summary:
    "Explore which farm measurements would be needed before a general recommendation could become field-specific advice.",
  sector: "Agriculture",
  strategyExample: {
    proposal:
      "The draft strategy names AI for farming and precision agriculture as a potential public-service application, mentioning yield, livestock, water, and fertiliser use, without naming a decision a farmer would actually take with it or the evidence it would rest on.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "daera-nutrient-management-plan",
      publisher: "Department of Agriculture, Environment and Rural Affairs",
      title: "Nutrient Management Plan",
      url: "https://www.daera-ni.gov.uk/articles/nutrient-management-plan",
      covers:
        "What a nutrient management plan has to record field by field, including a valid soil nutrient analysis with phosphorus and pH, and the soil nitrogen supply index that fertiliser and manure decisions are set against.",
      access: "open",
      relevance:
        "It defines the field-level measurements this example would depend on, which is why the synthetic records hold a soil pH and a nitrogen index and nothing about a holding or a person.",
    },
    {
      id: "daera-agricultural-census",
      publisher: "Department of Agriculture, Environment and Rural Affairs",
      title: "Agricultural Census in Northern Ireland",
      url: "https://www.daera-ni.gov.uk/articles/agricultural-census-northern-ireland",
      covers:
        "The June census of Northern Ireland farms, published each year with crop areas, livestock numbers, and farm labour, alongside data tables and an interactive report; the 2025 results counted about 25,800 farms working roughly a million hectares.",
      access: "open",
      relevance:
        "It is the published picture of what is grown and kept here, and it sits at farm counts and hectares — several steps above the single field any recommendation would actually be about.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/farm-advisory/farm-advisory.data.json",
    purpose:
      "Use 18 synthetic rows across six field groups to explore an advisory question without using a real holding's records.",
    preparation:
      "AI authored fictional field groups with crops, soil pH, soil nitrogen supply indexes, and banded yields.",
    limitations: [
      "The groups are letters and the figures are invented, so nothing here is a measurement of any soil, crop, or yield.",
      "Six lettered field groups cannot stand in for the range of farm types, soils, and weather here, and there is no authoritative guidance table sitting behind the rows.",
      "A pH and an index leave out the weather, the livestock, the costs, and the local knowledge that decide whether a suggestion is any use on the day.",
    ],
  },
  caveats: [
    {
      title: "Farms carry the cost of wrong advice",
      detail:
        "Getting this wrong reaches livelihoods, animal welfare, water quality, and soil, and the farm carries that cost rather than whoever built the tool.",
    },
    {
      title: "Digital records create representation gaps",
      detail:
        "Farms with fuller digital records are better represented in the data behind any tool like this, so its advice tends to fit those farms best.",
    },
    {
      title: "Improvement can move harm elsewhere",
      detail:
        "Improving one input can quietly move the harm somewhere else — to water, emissions, biodiversity, or welfare — and no general model replaces walking the field or a qualified adviser.",
    },
  ],
  lastReviewed: "2026-08-21",
})
