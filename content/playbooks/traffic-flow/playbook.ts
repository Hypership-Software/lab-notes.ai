import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const trafficFlow = definePlaybook({
  schemaVersion: 2,
  slug: "traffic-flow",
  title: "Traffic Flow Management",
  summary:
    "Set what a junction-level signal decision would need to know against what traffic counts and travel surveys actually publish, and keep the stand-in figures counting vehicles rather than travellers.",
  sector: "Transport",
  strategyExample: {
    proposal:
      "The draft strategy names AI for traffic management as a potential public-service application, mentioning congestion prediction, signal optimisation, and spotting safety breaches, without naming a network or saying what the system would be trying to achieve.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "dfi-annual-traffic-census",
      publisher: "Department for Infrastructure",
      title: "Traffic and travel information, incorporating the annual traffic census",
      url: "https://www.infrastructure-ni.gov.uk/publications/traffic-and-travel-information-incorporating-annual-traffic-census-and-variations-traffic-flow",
      covers:
        "The yearly traffic report for Northern Ireland, combining the annual census — around 350 automatic counters and about 500 manual counts of traffic by vehicle type — with figures on how flows vary through the day and the year.",
      access: "open",
      relevance:
        "It is the published count series this playbook's synthetic records imitate: vehicles by place and time band, with nothing recorded about any driver or any vehicle.",
    },
    {
      id: "dfi-travel-survey-ni",
      publisher: "Department for Infrastructure",
      title: "Travel Survey for Northern Ireland",
      url: "https://www.infrastructure-ni.gov.uk/articles/travel-survey-northern-ireland-latest-publications",
      covers:
        "A household survey of how and why people travel in Northern Ireland, reporting journeys by car, bus, walking, and cycling, and normally combining three years of responses to reach a large enough sample.",
      access: "open",
      relevance:
        "It is where the bus and cycling shares in this example would have to come from, at a three-year regional grain rather than the junction and the hour a signal change actually happens at.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/traffic-flow/traffic-flow.data.json",
    method:
      "Twenty invented hourly counts written by hand, four numbered junctions across five time bands, each with a vehicle count and bus and cycle shares as percentages of the vehicles counted, so a signal-timing discussion can happen without a real network.",
    limitations: [
      "The junctions are numbers and the counts are invented, so nothing here describes traffic anywhere in Northern Ireland.",
      "Four junctions are not a network: queues, incidents, and the effect of one junction on the next are exactly what a small table cannot hold.",
      "Counting vehicles counts the people who are not in one badly, and the pedestrians who cross here do not appear in this file at all.",
    ],
  },
  demo: {
    status: "not-yet",
    note: "A demo could compare a fixed time-of-day signal plan against these counts and report which time bands it fits worst, but nobody has built that here yet.",
  },
  caveats: [
    "A change to a signal plan reaches road safety, the people crossing on foot, emissions, and which streets end up carrying the traffic.",
    "Counts under-represent whatever is least counted, so a route with no counter looks quiet and a mode with no survey looks absent.",
    "Average delay can fall while the burden moves onto pedestrians, buses, or one neighbourhood, and the headline figure will not show it.",
  ],
  lastReviewed: "2026-08-21",
})
