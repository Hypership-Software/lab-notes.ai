import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const offenderLearning = definePlaybook({
  schemaVersion: 3,
  slug: "offender-learning",
  title: "Learning Support in Custodial Settings",
  summary:
    "Explore what a suggestion about a learner's next course would need to know when enrolments and completions are not published by course.",
  sector: "Justice and education",
  strategyExample: {
    proposal:
      "The draft strategy names AI support for education in justice settings as a potential public-service application, linking personalised material with rehabilitation, without saying what protects the learner, what the curriculum is, or what would count as a good outcome.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "doj-prisons-learning-and-skills",
      publisher: "Department of Justice",
      title: "Learning and skills",
      url: "https://www.justice-ni.gov.uk/topics/learning-and-skills",
      covers:
        "How learning in Northern Ireland's prisons is organised: delivery by two further education colleges under agreement with the Prison Service, essential skills in literacy and numeracy, higher-level study by distance learning, and personal development plans used to schedule what each person does.",
      access: "open",
      relevance:
        "It is where this playbook's course types come from, and it publishes no counts at all, which is why the numbers in the synthetic file have nothing published to check them against.",
    },
    {
      id: "doj-ni-prison-service-statistics",
      publisher: "Department of Justice",
      title: "NI Prison Service statistics",
      url: "https://www.justice-ni.gov.uk/topics/ni-prison-service-statistics",
      covers:
        "The Prison Service's official statistics publications and the notes on how they are compiled and what they can be used for.",
      access: "open",
      relevance:
        "It is where prison figures do get published, and comparing it with the learning pages shows that course-level activity is not among them.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/offender-learning/offender-learning.data.json",
    purpose:
      "Use 20 synthetic quarterly rows across five course types to explore next-resource choices without learner records.",
    preparation:
      "AI authored fictional banded enrolment counts and completion rates for each course type.",
    limitations: [
      "Enrolments and completions by course are not published, so the two most useful columns here have no published counterpart at all.",
      "The bands are invented, so nothing here describes learning in any prison.",
      "A course-level table cannot hold what actually decides things in custody: what is running this week, who is allowed to attend, and whether a sentence is about to end.",
    ],
  },
  caveats: [
    {
      title: "Consent is different in custody",
      detail:
        "Education, justice, disability, and behaviour information sit close together in custody, and consent means something different in a place people cannot leave.",
    },
    {
      title: "Learning data can become surveillance",
      detail:
        "Anything collected to support learning can be experienced as surveillance, or later used for a decision about discipline or release, which is why this file holds no learner records.",
    },
    {
      title: "Partial histories can narrow opportunity",
      detail:
        "A suggestion built from a partial history can quietly narrow what someone is ever offered, and in custody there is rarely another route to the same course.",
    },
  ],
  lastReviewed: "2026-08-21",
})
