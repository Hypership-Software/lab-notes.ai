import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const lessonPlanningFeedback = defineAssessedPlaybook({
  slug: "lesson-planning-feedback",
  title: "Lesson Planning and Feedback Support",
  summary:
    "Explore teacher-controlled planning and formative-feedback support without automating grading or replacing professional judgement.",
  sector: "Education",
  tags: ["teaching", "feedback", "curriculum"],
  technicalPatterns: ["content-generation", "retrieval", "human-review"],
  problem:
    "Educators spend time adapting lesson material and feedback while needing to preserve curriculum quality and knowledge of each learner.",
  intendedUsers: ["Teachers", "Curriculum leads", "Learning-support staff"],
  affectedGroups: ["Learners receiving teaching material or feedback"],
  supportedDecision:
    "Which draft activity or feedback suggestion a teacher should adapt, reject, or investigate further.",
  publicBenefit:
    "Could give educators inspectable starting material while preserving their control over teaching and feedback.",
  dataAccessibility: "partial",
  riskLevel: "moderate",
  riskReasons: [
    "Generated material can be inaccurate, biased, age-inappropriate, or misaligned with the curriculum.",
    "Learner work and feedback may contain personal information or reveal additional needs.",
  ],
  mitigations: [
    "Use public curriculum material and invented learner work in any hosted example.",
    "Require teacher review and prohibit automatic grading or learner profiling.",
  ],
  sourceApplication: "lesson, content, and consistent-feedback support",
  sourceRationale:
    "The strategy suggests educator time savings but does not define a curriculum, age group, or quality standard.",
  syntheticMethod:
    "Create invented lesson briefs and learner excerpts from a fixed curriculum-topic matrix without copying real pupil work.",
  baseline: {
    name: "Teacher-authored template library",
    description:
      "Reviewed lesson and feedback templates provide a reusable non-generative starting point.",
    method:
      "Select a curriculum objective, learner stage, and reviewed template, then let the teacher edit it directly.",
    limitations: ["Templates require maintenance and may not reflect a particular class context."],
  },
  limitations: [
    "An invented classroom example cannot establish learning impact or teacher workload effects.",
    "Consistency is not automatically fairness, accuracy, or appropriate personalisation.",
  ],
  failureModes: [
    "A polished draft may contain a subtle factual or pedagogical error.",
    "Standardised wording may overlook disability, language, culture, or classroom context.",
  ],
  nextValidationSteps: [
    "Choose one curriculum-bounded teacher task and define an expert review rubric.",
    "Compare drafts with a reviewed template baseline for accuracy, usefulness, and editing effort.",
    "Review privacy, accessibility, equality, and academic-integrity safeguards with educators and learners.",
  ],
  demoBarrier:
    "A credible example needs a curriculum-bounded task, educator review rubric, and safely invented learner material.",
  responsibleRole: "Qualified teacher",
  partnerRequirements: [
    "Teacher and curriculum partner",
    "Safeguarding and data-protection review",
    "Accessible-learning review",
  ],
})
