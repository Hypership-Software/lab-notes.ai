import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const communityParticipation = definePlaybook({
  schemaVersion: 2,
  slug: "community-participation",
  title: "Community Participation Analysis",
  summary:
    "Group public comments on local issues into themes people could argue with, and be clear about what a count of comments does not tell anyone.",
  sector: "Communities",
  strategyExample: {
    proposal:
      "The draft strategy names AI for community-led social change as a potential public-service application, encouraging people to use data to change things where they live, without saying who is taking part, who is missing, or who ends up deciding.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "ni-consultations-portal",
      publisher: "nidirect",
      title: "Northern Ireland consultations portal",
      url: "https://consultations.nidirect.gov.uk/",
      covers:
        "The consultation platform used by several Northern Ireland departments and public bodies, listing what is open, forthcoming, and closed, with a separate portal carrying the remaining departments.",
      access: "open",
      relevance:
        "It is where public comment on local and policy questions is actually gathered here, and the split across two portals is part of why participation is uneven in the first place.",
    },
    {
      id: "circular-economy-consultation-report",
      publisher: "Department for the Economy",
      title: "Draft Circular Economy Strategy — public consultation response report",
      url: "https://www.economy-ni.gov.uk/publications/draft-circular-economy-strategy-northern-ireland-public-consultation-response-report",
      covers:
        "How one Northern Ireland department grouped, counted, and reported back on the responses to a public consultation.",
      access: "open",
      relevance:
        "It shows what happens to comments after they are submitted, which is the step this example would be automating, and its vocabulary shaped how the synthetic comments are grouped.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/community-participation/community-participation.data.json",
    method:
      "Eighteen synthetic public comments authored for this project across five local topics, each with a stance, written to read like real submissions and to keep the disagreements and minority views a real set contains, so grouping can be tried without holding anybody's words.",
    limitations: [
      "Eighteen comments are far fewer, tidier, and more evenly spread across topics than any real set of responses.",
      "The five topics and four stances are this project's own choices, checked against no official framework.",
      "A synthetic set cannot contain the thing that matters most about participation: who did not write in, and why.",
    ],
  },
  demo: {
    status: "not-yet",
    note: "A demo could group these comments by topic and quote the passage behind every group, which is what the policy-evidence demo already does with its own corpus, so this one has not been built.",
  },
  caveats: [
    "A count of comments measures who had the time, the connection, and the confidence to write, not what a community thinks.",
    "Automatic grouping tends to lose the single sharp objection, and the single sharp objection is often the one worth reading.",
    "People whose words are being grouped should be able to see the categories and argue with them, which is a design commitment rather than a technical one.",
  ],
  lastReviewed: "2026-08-21",
})
