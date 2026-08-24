import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const adaptiveTutoring = definePlaybook({
  schemaVersion: 3,
  slug: "adaptive-tutoring",
  title: "Adaptive Tutoring",
  summary:
    "Explore what a practice tool would need to record before choosing a learner's next activity, using topic-level data rather than learner records.",
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
    purpose:
      "Use 18 synthetic topic-level practice summaries to explore how a tool might choose a next activity without learner records.",
    preparation:
      "AI authored fictional topic and difficulty steps with banded attempt counts and success rates.",
    limitations: [
      "The bands were invented for this project and are not measurements, so no figure here is evidence about how hard any topic really is.",
      "Everything is aggregated by topic, which is the safe choice and also removes the sequence of attempts that a real adaptive tool would work from.",
      "Eighteen topics from one subject area cannot stand in for a curriculum, and there is no reviewed bank of activities behind them.",
    ],
  },
  caveats: [
    {
      title: "Learner data reveals sensitive details",
      detail:
        "Practice data about children can reveal age, ability, additional needs, and behaviour, which is why this file counts attempts by topic and never by learner.",
    },
    {
      title: "Small choices can narrow opportunity",
      detail:
        "A tool that keeps choosing the wrong next step can narrow what a learner is ever offered, and each individual choice looks too small to notice.",
    },
    {
      title: "Practice scores do not prove understanding",
      detail:
        "Attempts and success rates say nothing about whether anyone understood the topic, and a low score may only mean the wording, the language, or the device got in the way.",
    },
    {
      title: "Learning styles are not a sound basis",
      detail:
        "Sorting learners by a preferred way of learning is not a sound basis for deciding what they see next, whatever the tool reports.",
    },
  ],
  lastReviewed: "2026-08-21",
})
