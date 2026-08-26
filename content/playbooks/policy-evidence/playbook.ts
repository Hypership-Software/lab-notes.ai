import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const policyEvidence = definePlaybook({
  schemaVersion: 3,
  slug: "policy-evidence",
  title: "Policy Evidence and Consultation Analysis",
  summary:
    "Explore how consultation responses might be grouped into themes for further investigation while keeping the supporting passages visible.",
  sector: "Cross-government", // the sector string this playbook already uses
  strategyExample: {
    proposal:
      "The draft strategy names AI-assisted analysis of public consultation responses as a potential public-service application: helping policy teams see the themes in large volumes of free-text replies.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "ni-ai-strategy-consultation",
      publisher: "The Executive Office",
      title: "Northern Ireland Artificial Intelligence Strategy consultation",
      url: strategyDraftUrl,
      covers: "The draft strategy text and the consultation it is open for.",
      access: "open",
      relevance: "It is the document whose example projects these playbooks explore.",
    },
    {
      id: "circular-economy-consultation-report",
      publisher: "Department for the Economy",
      title: "Draft Circular Economy Strategy — public consultation response report",
      url: "https://www.economy-ni.gov.uk/publications/draft-circular-economy-strategy-northern-ireland-public-consultation-response-report",
      covers: "How an NI department actually analysed and reported a consultation's responses.",
      access: "open",
      relevance:
        "Its headings, stages, and vocabulary shaped the synthetic dataset's structure; no respondent text was copied. Our reading of it is recorded in consultation-analysis-structure.md beside this file.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/policy-evidence/policy-evidence.data.json",
    purpose:
      "Use 20 synthetic consultation responses to explore theme grouping without holding a consultation mailbox.",
    preparation:
      "AI authored fictional responses shaped by the structure and vocabulary of a published consultation response report.",
    limitations: [
      "The dataset is far smaller and tidier than a real consultation mailbox.",
      "The six themes and four stances are this project's own choices, verified in no official source.",
    ],
  },
  caveats: [
    {
      title: "Keywords do not establish meaning",
      detail:
        "A matched keyword shows a response used a word, not what the respondent meant by it; a real analysis needs human reading.",
    },
    {
      title: "Synthetic analysis proves no operational outcome",
      detail:
        "Nothing on this page is evidence that an AI system would analyse a real consultation accurately, fairly, or lawfully.",
    },
  ],
  lastReviewed: "2026-08-21",
})
