import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const healthOperations = definePlaybook({
  schemaVersion: 2,
  slug: "health-operations",
  title: "Health Service Demand and Operations",
  summary:
    "Work out which published figures would tell a hospital planning team anything useful about demand, beds, and discharge, and what a stand-in version of those figures looks like.",
  sector: "Health",
  strategyExample: {
    proposal:
      "The draft strategy names AI support for health operational processes as a potential public-service application: help with discharge coordination, bed demand, and how limited capacity is shared out, without saying what the system would be aiming at or what it must never do.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "doh-hospital-waiting-times",
      publisher: "Department of Health",
      title: "Hospital waiting times statistics",
      url: "https://www.health-ni.gov.uk/topics/hospital-waiting-times-statistics",
      covers:
        "Quarterly outpatient, inpatient and day case, diagnostic, and cancer waiting figures for Northern Ireland, broken down by health and social care trust and by how long people have waited.",
      access: "open",
      relevance:
        "It is the published shape this playbook's synthetic records imitate: a specialty, a period, a length-of-wait band, and a count of people, and nothing about any one person.",
    },
    {
      id: "nisra-health-and-social-care",
      publisher: "Northern Ireland Statistics and Research Agency",
      title: "Health and social care statistics",
      url: "https://www.nisra.gov.uk/statistics/health-and-social-care",
      covers:
        "The wider collection of Northern Ireland health statistics, including hospital activity and waiting lists, primary care, social care, workforce, and health inequalities.",
      access: "open",
      relevance:
        "It shows how much of the picture a planning team would need sits in separate publications, which is most of the real work in this example.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/health-operations/health-operations.data.json",
    method:
      "Twenty invented waiting records written by hand in the shape the published quarterly statistics use, with specialty names, quarters, length-of-wait bands, and banded counts of people, so the planning task can be discussed without holding trust data.",
    limitations: [
      "The numbers are invented bands, not rounded real figures, so nothing here should be quoted as how long anyone in Northern Ireland is waiting.",
      "Real planning needs arrivals, beds, staffing, and discharge delays together, and this file has only one of those.",
      "A tidy quarterly table hides the day-to-day movement and the individual circumstances that actually decide when someone leaves hospital.",
    ],
  },
  demo: {
    status: "not-yet",
    note: "A demo could take these banded records and show a plain forecast of next quarter's waiting alongside the assumptions behind it, but nobody has built that here yet.",
  },
  caveats: [
    "Operational records describe people who are ill, so the real version of this work involves sensitive information even when the output looks like a chart.",
    "Aiming at one number, such as average flow, can quietly make things worse for people whose needs are complicated or unusual.",
    "Knowing how many people are likely to arrive does not tell anyone whether a particular person is ready to go home, and that decision has to stay with clinicians.",
  ],
  lastReviewed: "2026-08-21",
})
