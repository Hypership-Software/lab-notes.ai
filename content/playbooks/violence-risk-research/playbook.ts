import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const violenceRiskResearch = definePlaybook({
  schemaVersion: 2,
  slug: "violence-risk-research",
  title: "Violence Risk Pattern Research",
  summary:
    "Set out why this is one of the two examples here with no stand-in data: anything useful for risk research in this domain describes individual people by construction.",
  sector: "Community safety",
  strategyExample: {
    proposal:
      "The draft strategy names linking justice and health records to identify the people most at risk of violence against women and girls as a potential public-service application, without establishing that it is necessary, that it is safe, or that there is something worth being identified for at the end of it.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "teo-ending-violence-against-women-and-girls",
      publisher: "The Executive Office",
      title: "Ending Violence Against Women and Girls",
      url: "https://www.executiveoffice-ni.gov.uk/topics/ending-violence-against-women-and-girls",
      covers:
        "The Northern Ireland strategic framework on ending violence against women and girls, its delivery plans, the commissioned research behind it, and the funding routed to community and voluntary organisations.",
      access: "open",
      relevance:
        "It is the published work this example would have to sit inside, and it describes an approach built on services and prevention rather than on identifying individuals.",
    },
    {
      id: "doj-statistics-and-research",
      publisher: "Department of Justice",
      title: "Statistics and Research",
      url: "https://www.justice-ni.gov.uk/topics/statistics-and-research-justice",
      covers:
        "The department's collection of justice statistics and research, including reoffending bulletins, the Safe Community Survey, and research undertaken with victims and witnesses of crime.",
      access: "open",
      relevance:
        "It is what is actually published in this area, and everything in it is counts and survey findings, which is a long way from the linked person-level records the strategy's example assumes.",
    },
  ],
  syntheticData: {
    status: "not-responsible",
    reason:
      "Every stand-in we sketched for this task described individual people, because a risk model's input is a person's history; the aggregate bands that would be safe to publish are exactly the ones that make the task meaningless.",
    whatContributorsNeed:
      "Anyone taking this further needs formal research access under ethics and data-protection approval, with domain experts and people with lived experience owning the question from the start rather than reviewing an answer at the end.",
  },
  demo: {
    status: "not-yet",
    note: "A demo would mean showing people sorted by predicted risk, which is the thing this page says should not be built here, so there is none.",
  },
  caveats: [
    "Linked justice and health records are exceptionally sensitive, and a risk label seen by the wrong person can leave someone in more danger than they were in before.",
    "False positives bring attention to people who did not need it while false negatives quietly withdraw help from people who did, and both happen at the same time.",
    "Institutional reporting patterns are not individual behaviour, so anything trained on who was recorded will mostly learn who gets recorded.",
    "Being identified is only useful if there is something safe to offer, and whether that exists is a question about services rather than about models.",
  ],
  lastReviewed: "2026-08-21",
})
