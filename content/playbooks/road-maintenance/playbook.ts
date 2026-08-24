import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const roadMaintenance = definePlaybook({
  schemaVersion: 3,
  slug: "road-maintenance",
  title: "Road Maintenance Planning",
  summary:
    "Explore how road defects move through inspection, prioritisation, and repair, and what published records cannot settle.",
  sector: "Transport",
  strategyExample: {
    proposal:
      "The draft strategy names AI for road management as a potential public-service application, describing early detection of defects and prioritising repairs, without saying what imagery it means, which inspection standard applies, or how money would follow the ranking.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "dfi-road-network-and-condition-statistics",
      publisher: "Department for Infrastructure",
      title: "Northern Ireland road network and condition statistics: technical report",
      url: "https://www.infrastructure-ni.gov.uk/articles/northern-ireland-road-network-and-condition-statistics-technical-report",
      covers:
        "How the department measures its network and its condition: road length by class — motorway, A, B, C, and unclassified — machine condition surveys that produce a road condition index, and surface defects recorded during routine safety inspections in the Road Maintenance Client System, which also ranks the repairs.",
      access: "open",
      relevance:
        "It is the source of this playbook's road classes and defect vocabulary, and it states the limit that matters most: a defect only exists in the figures once an inspection has recorded it.",
    },
    {
      id: "dfi-recorded-potholes-release",
      publisher: "Department for Infrastructure",
      title: "Potholes recorded by DfI Roads on the public road network each year since 2020",
      url: "https://www.infrastructure-ni.gov.uk/publications/dfi2025-0038-details-potholes-recorded-dfi-roads-northern-ireland-public-road-network-each-year-2020",
      covers:
        "A published release of pothole counts on the Northern Ireland public road network by year, separating those reported by the public from those found by inspection, and those repaired from those still waiting.",
      access: "open",
      relevance:
        "It is the published shape of the queue this playbook's synthetic records imitate, which is why each record carries a status rather than a score.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/road-maintenance/road-maintenance.data.json",
    purpose:
      "Use 20 synthetic defect records to explore triage without using a road authority's operational records.",
    preparation:
      "AI authored fictional defect types, report weeks, and queue statuses using published road classes and R1 to R3 severity codes.",
    limitations: [
      "The records are invented, so nothing here describes a defect, a road, or a repair backlog anywhere in Northern Ireland.",
      "There is no imagery behind any of these rows, so this file cannot say anything about whether a classifier would recognise a defect on a real surface, in real weather, from a real camera.",
      "A severity code and a status leave out cost, repair method, and what else on the network is competing for the same crew.",
    ],
  },
  caveats: [
    {
      title: "Both missed and false defects carry costs",
      detail:
        "A missed defect is a safety problem, and a false one spends inspection time that was already short.",
    },
    {
      title: "Recorded defects reflect inspection coverage",
      detail:
        "Defects only enter the figures once someone has inspected or reported them, so places that are surveyed and reported less can look as though they need less.",
    },
    {
      title: "Image classifications do not choose repairs",
      detail:
        "Shadows, standing water, road markings, and old repairs all look like damage in an image, and a classification decides nothing about repair method, cost, or what the network needs most.",
    },
  ],
  lastReviewed: "2026-08-21",
})
