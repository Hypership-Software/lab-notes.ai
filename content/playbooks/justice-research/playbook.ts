import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const justiceResearch = definePlaybook({
  schemaVersion: 2,
  slug: "justice-research",
  title: "Justice Research and Analysis",
  summary:
    "Work out what a researcher could honestly ask of the court figures that are published, and keep the stand-in data at counts by offence group and quarter.",
  sector: "Justice",
  strategyExample: {
    proposal:
      "The draft strategy names justice data analysis and research as a potential public-service application, processing large volumes of material more quickly, without saying what access it assumes, what the research would be for, or which outputs would be acceptable.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "doj-court-prosecutions-and-disposals",
      publisher: "Department of Justice",
      title:
        "Court Prosecutions, Convictions and Out of Court Disposals Statistics for Northern Ireland",
      url: "https://www.justice-ni.gov.uk/publications/court-prosecutions-convictions-and-out-court-disposals-statistics-northern-ireland-2025",
      covers:
        "The yearly bulletin on prosecutions and convictions in Northern Ireland, broken down by court type, offence category, and disposal, with out of court disposals reported the same way.",
      access: "open",
      relevance:
        "It is the published shape this playbook's synthetic records imitate: offences grouped into categories and counted, with nothing that identifies a case or a person.",
    },
    {
      id: "doj-statistics-and-research",
      publisher: "Department of Justice",
      title: "Statistics and Research",
      url: "https://www.justice-ni.gov.uk/topics/statistics-and-research-justice",
      covers:
        "The department's collection of justice statistics and research: court and tribunal statistics, prosecutions and case processing times, prison service statistics, reoffending bulletins, the Safe Community Survey, youth justice workload, and research with victims and witnesses.",
      access: "open",
      relevance:
        "It shows how much of the picture sits in separate publications on different cycles, which is most of the actual work in a question like this.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/justice-research/justice-research.data.json",
    method:
      "Twenty invented quarterly rows written by hand, five offence groups each with a banded count of disposals and a median number of days to disposal, so a research question can be framed without going near a case or a person.",
    limitations: [
      "The counts and the day figures are invented, so no row here describes what happens in any Northern Ireland court.",
      "Five offence groups over one year cannot show the linkage error, missing records, and changes of process that a real analysis spends most of its time on.",
      "A count of disposals says nothing about what happened to anyone, and a pattern found in a table like this cannot be turned into a statement about a person.",
    ],
  },
  demo: {
    status: "not-yet",
    note: "A demo could chart how the median days move by offence group and print the caveats beside every line, but nobody has built that here yet.",
  },
  caveats: [
    "Justice records can be sensitive, stigmatising, incomplete, and consequential all at once, which is why nothing person-level appears here.",
    "Patterns in these records reflect who gets reported, stopped, and prosecuted as much as anything about behaviour, and anything trained on them learns that too.",
    "A model asked about law can invent a rule that sounds right, or leave out the exception that decides the case.",
    "An exploratory pattern is not a cause, and it must never become a reason to do something to an individual.",
  ],
  lastReviewed: "2026-08-21",
})
