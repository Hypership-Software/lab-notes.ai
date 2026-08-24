import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const wastewaterMonitoring = definePlaybook({
  schemaVersion: 3,
  slug: "wastewater-monitoring",
  title: "Wastewater Monitoring",
  summary:
    "Explore what a wastewater monitoring feed would need to tell an operator before an unusual reading warrants investigation.",
  sector: "Infrastructure",
  strategyExample: {
    proposal:
      "The draft strategy names AI for wastewater management as a potential public-service application, pointing at abnormal flow, contamination, and spillovers, without saying which readings it means or what would count as an incident.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "daera-regulating-sewage-discharges",
      publisher: "Department of Agriculture, Environment and Rural Affairs",
      title: "Regulating sewage discharges",
      url: "https://www.daera-ni.gov.uk/articles/regulating-sewage-discharges",
      covers:
        "How discharges from Northern Ireland's wastewater treatment works are permitted and checked, including the measures a consent sets — oxygen demand, suspended solids, ammonia, and nutrients such as phosphorus — and how samples count towards annual compliance.",
      access: "open",
      relevance:
        "It names the measures and the sampling arithmetic this playbook's synthetic records imitate, which is why the file holds ammonia and phosphorus by site and week rather than a raw sensor trace.",
    },
    {
      id: "ni-water-annual-report",
      publisher: "Northern Ireland Water",
      title: "Integrated annual report and accounts",
      url: "https://www.niwater.com/about-us/annual-report",
      covers:
        "The yearly account of running water and sewerage services in Northern Ireland, including performance against environmental and customer measures, the scale of the network maintained, and where the money went.",
      access: "open",
      relevance:
        "It is the fullest public description of how the wastewater network behaves, and it shows that performance reaches the public as yearly summaries rather than the reading-by-reading feed this example would work from.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/wastewater-monitoring/wastewater-monitoring.data.json",
    purpose:
      "Use 18 synthetic weekly readings across six works to explore unusual-reading detection without operational network data.",
    preparation:
      "AI authored fictional flow, ammonia, and phosphorus readings, including two weeks that differ from their site's pattern.",
    limitations: [
      "The readings are invented and the works are letters, so nothing here describes any real site, network, or discharge.",
      "Weekly figures per works hide the rainfall, hydraulics, and sensor faults that decide what an unusual reading actually means.",
      "Two measures cannot identify what is in the water, and a real feed also carries the gaps, drift, and maintenance events this tidy file does not.",
    ],
  },
  caveats: [
    {
      title: "Alert errors waste time or delay response",
      detail:
        "A missed or noisy alert either delays a response to something happening in the environment or sends a limited crew to the wrong place.",
    },
    {
      title: "Network details carry their own risk",
      detail:
        "Published detail about where a network runs and how it behaves carries its own risk, which is why the works in this file are letters rather than places.",
    },
    {
      title: "An unusual reading is not a diagnosis",
      detail:
        "An unusual reading is not a diagnosis: it cannot say what is in the water or what should be done, and a drifting sensor looks much the same as a real event.",
    },
  ],
  lastReviewed: "2026-08-21",
})
