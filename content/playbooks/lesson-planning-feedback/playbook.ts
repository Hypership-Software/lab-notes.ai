import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const lessonPlanningFeedback = definePlaybook({
  schemaVersion: 2,
  slug: "lesson-planning-feedback",
  title: "Lesson Planning and Feedback Support",
  summary:
    "Look at what a drafting assistant for teachers would need to know about the Northern Ireland curriculum, and start from invented lesson notes rather than anyone's real class.",
  sector: "Education",
  strategyExample: {
    proposal:
      "The draft strategy names help with lessons, teaching content, and consistent feedback as a potential public-service application, on the grounds that it would save teachers time, without naming a curriculum, an age group, or what would count as a good draft.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "ccea-key-stage-3-curriculum",
      publisher: "Council for the Curriculum, Examinations and Assessment",
      title: "Curriculum at Key Stage 3",
      url: "https://ccea.org.uk/key-stage-3/curriculum",
      covers:
        "The statutory Northern Ireland curriculum at Key Stage 3, set out as areas of learning with their subject strands, together with the skills expected across all of them.",
      access: "open",
      relevance:
        "Its areas of learning and subject names are what the synthetic records use, so the invented objectives sit inside the curriculum a teacher here actually works to.",
    },
    {
      id: "de-school-enrolments",
      publisher: "Department of Education",
      title: "School enrolments",
      url: "https://www.education-ni.gov.uk/topics/school-enrolments",
      covers:
        "Published enrolment figures for Northern Ireland schools, including school-level data and population projections.",
      access: "open",
      relevance:
        "It gives the scale this example would have to work at, and shows that nothing published tells you what any teacher writes when planning a lesson.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/lesson-planning-feedback/lesson-planning-feedback.data.json",
    method:
      "Eighteen lesson objectives written by hand for this project, spread across key stages and curriculum subjects and phrased the way a rough planning note tends to be phrased, including one left unfinished.",
    limitations: [
      "The objectives were invented here, not collected from teachers, so they show a plausible starting point rather than how planning is really written in any school.",
      "There is no pupil work in the file at all, which means the feedback half of this example cannot be tried on it.",
      "Eighteen notes across three key stages is far too thin to represent the range of subjects, settings, and support needs in Northern Ireland classrooms.",
    ],
  },
  demo: {
    status: "not-yet",
    note: "A demo could take one of these objectives and show a teacher a draft activity beside the curriculum wording it claims to match, and nobody has built that here yet.",
  },
  caveats: [
    "A draft that reads well can still be wrong about the subject, pitched at the wrong age, or off the curriculum, and it is the polish that makes that hard to catch.",
    "Standard wording tends to suit the middle of a class, so a draft can quietly leave out pupils with additional needs, other home languages, or different circumstances.",
    "Real pupil work and real feedback carry personal information, so nothing about this example should be tried on a class without the school's data protection and safeguarding people involved first.",
  ],
  lastReviewed: "2026-08-21",
})
