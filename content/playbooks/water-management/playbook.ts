import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const waterManagement = definePlaybook({
  schemaVersion: 3,
  slug: "water-management",
  title: "Water Resource Management",
  summary:
    "Explore how published rainfall, river-level, and abstraction figures could be compared, and where their different scales limit a water-management question.",
  sector: "Infrastructure",
  strategyExample: {
    proposal:
      "The draft strategy names AI for water management as a potential public-service application, covering flooding, pollution control, and how water is shared between users, without saying which of those decisions it means or how far ahead it is meant to look.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "dfi-rivers-water-level-network",
      publisher: "Department for Infrastructure",
      title: "DfI Rivers water level network",
      url: "https://www.infrastructure-ni.gov.uk/articles/dfi-rivers-water-level-network",
      covers:
        "A network of around 130 hydrometric stations recording water levels in Northern Ireland's rivers and loughs, shown on a map viewer that also lets the station records be downloaded.",
      access: "open",
      relevance:
        "It is the published level series this playbook's synthetic records stand in for, and it shows what is missing as clearly as what is there: levels are recorded here, rainfall is published by somebody else.",
    },
    {
      id: "met-office-uk-regional-series",
      publisher: "Met Office",
      title: "UK and regional climate series",
      url: "https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-and-regional-series",
      covers:
        "Monthly, seasonal, and annual rainfall, temperature, and sunshine series for the UK and its regions, with the Northern Ireland rainfall series running from 1931 and downloadable as plain tables.",
      access: "open",
      relevance:
        "It is where the rainfall side of this example would come from, at a regional monthly grain far coarser than any catchment decision needs, which is the gap the synthetic file makes visible.",
    },
    {
      id: "daera-water-abstraction-licensing",
      publisher: "Department of Agriculture, Environment and Rural Affairs",
      title: "Abstraction and impoundment licensing requirements",
      url: "https://www.daera-ni.gov.uk/articles/abstraction-and-impoundment-licensing-requirements",
      covers:
        "When taking water from a river, lough, or borehole has to be notified or licensed in Northern Ireland, the daily volume thresholds that trigger each step, and the sectors that abstract the most.",
      access: "open",
      relevance:
        "Its daily volume thresholds are the bands the synthetic records use, so the competing-demand part of this example can be discussed in the units the rules already work in.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/water-management/water-management.data.json",
    purpose:
      "Use 20 synthetic monthly rows across four catchments to explore rainfall, river-level, and abstraction questions together.",
    preparation:
      "AI authored fictional rainfall totals, river-level bands, and abstraction bands based on published licensing thresholds.",
    limitations: [
      "The catchments are letters and the figures are invented, so nothing here describes rainfall, a river, or an abstraction anywhere in Northern Ireland.",
      "Monthly rows cannot show a flood, which happens in hours, and a level band against normal is not a flow.",
      "Flooding, pollution, and sharing water out are three different decisions, and one small table appearing to serve all three is part of what this example is meant to expose.",
    ],
  },
  caveats: [
    {
      title: "Signal errors distribute costs unevenly",
      detail:
        "A missed or false signal here reaches emergency response, pollution control, and whether there is water to go round, and those costs do not fall on the same people.",
    },
    {
      title: "Asset details can be sensitive",
      detail:
        "Detail about assets and networks can be sensitive in itself, which is why the catchments in this file are letters.",
    },
    {
      title: "Ordinary months can hide sensor failure",
      detail:
        "A sensor that has failed or drifted can hide the event that matters most, and anything judged on average performance is being judged mostly on ordinary months.",
    },
  ],
  lastReviewed: "2026-08-21",
})
