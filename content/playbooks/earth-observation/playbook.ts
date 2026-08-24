import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const earthObservation = definePlaybook({
  schemaVersion: 3,
  slug: "earth-observation",
  title: "Earth Observation for Public Services",
  summary:
    "Explore what a mapped land-cover change would need to show before an analyst could act, using survey squares and broad habitat classes.",
  sector: "Environment",
  strategyExample: {
    proposal:
      "The draft strategy names AI analysis of satellite data as a potential public-service application, mentioning deforestation, land use, and coastal erosion, without choosing the imagery, the scale, or what anyone would do once a change was mapped.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "daera-ni-countryside-survey",
      publisher: "Department of Agriculture, Environment and Rural Affairs",
      title: "Northern Ireland Countryside Survey",
      url: "https://www.daera-ni.gov.uk/articles/northern-ireland-countryside-survey",
      covers:
        "A repeated field survey of a random sample of 500 by 500 metre squares — 288 of them, about half a percent of Northern Ireland — mapping land cover and habitat by type and comparing each round with the last, from the baseline in the late 1980s to the 2023/24 cycle.",
      access: "open",
      relevance:
        "It is the published measure of how land cover changes here, and it is fieldwork rather than imagery, which is the comparison any satellite-based claim in this example would have to face.",
    },
    {
      id: "copernicus-corine-land-cover",
      publisher: "Copernicus Land Monitoring Service",
      title: "CORINE Land Cover",
      url: "https://land.copernicus.eu/en/products/corine-land-cover",
      covers:
        "Europe-wide land cover and land cover change inventories built from satellite imagery against a fixed list of classes, free to download and free to use for any purpose.",
      access: "open",
      relevance:
        "It is the openly licensed imagery-derived layer this example could genuinely start from, and its class list and smallest mapped area decide which changes it can pick up at all.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/earth-observation/earth-observation.data.json",
    purpose:
      "Use 20 synthetic change rows across ten survey-sized tiles to explore land-cover change without imagery or licensing questions.",
    preparation:
      "AI authored fictional lettered tiles with one broad habitat class and hectares-changed figures for two periods.",
    limitations: [
      "The tiles are numbers and the hectares are invented, so no row here says anything about land anywhere in Northern Ireland.",
      "A hectares-changed figure has already thrown the picture away: cloud, shadow, tide, season, and alignment error are what a real pipeline argues about, and none of them survive into a table.",
      "One class per tile is a fiction — a real square holds a mosaic — and where one class ends and the next begins is itself a judgement.",
    ],
  },
  caveats: [
    {
      title: "Wrong classes misdirect action",
      detail:
        "A wrong class sends inspection, planning, or an intervention to the wrong field, and the map goes on looking authoritative either way.",
    },
    {
      title: "Detailed imagery can expose sensitive sites",
      detail:
        "Fine-grained imagery can expose sensitive habitats and sites, so what gets published needs deciding separately from whether the analysis works.",
    },
    {
      title: "Surface change does not explain cause",
      detail:
        "Surface change does not explain cause, ownership, or legality, and a coarse image can miss a small change that matters more than a large one.",
    },
  ],
  lastReviewed: "2026-08-21",
})
