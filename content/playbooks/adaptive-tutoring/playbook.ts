import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const adaptiveTutoring = definePlaybook({
  schemaVersion: 2,
  slug: "adaptive-tutoring",
  title: "Adaptive Tutoring",
  summary:
    "Ask what a practice tool would have to record before it could choose a learner's next activity, and keep the stand-in data at the level of topics rather than children.",
  sector: "Education",
  strategyExample: {
    proposal:
      "The draft strategy names adaptive material, tutoring, and interactive learning as a potential public-service application, suggesting it could suit different ways of learning, without saying what evidence the choice of next activity would rest on.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "de-school-leavers",
      publisher: "Department of Education",
      title: "School leavers",
      url: "https://www.education-ni.gov.uk/articles/school-leavers",
      covers:
        "Annual figures on the highest qualifications Northern Ireland school leavers achieve and where they go next, broken down by school type and by pupil characteristics.",
      access: "open",
      relevance:
        "It is the published record of how attainment is spread here, which is the only evidence available about outcomes without going near an individual learner.",
    },
    {
      id: "de-school-performance",
      publisher: "Department of Education",
      title: "School performance",
      url: "https://www.education-ni.gov.uk/articles/school-performance",
      covers:
        "Annual examination performance bulletins for pupils in Year 12 and Year 14 across Northern Ireland post-primary schools.",
      access: "open",
      relevance:
        "It shows what is published about how pupils do, and by contrast that nothing published describes how anyone practises, which is what this example would depend on.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/adaptive-tutoring/adaptive-tutoring.data.json",
    method:
      "Eighteen invented practice summaries written by hand, one per topic and difficulty step, holding banded attempt counts and banded success rates so the choice of next activity can be discussed without collecting anything from a learner.",
    limitations: [
      "The bands were invented for this project and are not measurements, so no figure here is evidence about how hard any topic really is.",
      "Everything is aggregated by topic, which is the safe choice and also removes the sequence of attempts that a real adaptive tool would work from.",
      "Eighteen topics from one subject area cannot stand in for a curriculum, and there is no reviewed bank of activities behind them.",
    ],
  },
  demo: {
    status: "not-yet",
    note: "A demo could show which topic these bands would offer next and say plainly why, but nobody has built one, and it would need a bank of activities a teacher had approved first.",
  },
  caveats: [
    "Practice data about children can reveal age, ability, additional needs, and behaviour, which is why this file counts attempts by topic and never by learner.",
    "A tool that keeps choosing the wrong next step can narrow what a learner is ever offered, and each individual choice looks too small to notice.",
    "Attempts and success rates say nothing about whether anyone understood the topic, and a low score may only mean the wording, the language, or the device got in the way.",
    "Sorting learners by a preferred way of learning is not a sound basis for deciding what they see next, whatever the tool reports.",
  ],
  lastReviewed: "2026-08-21",
})
