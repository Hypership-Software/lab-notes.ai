import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const adaptiveTutoring = defineAssessedPlaybook({
  slug: "adaptive-tutoring",
  title: "Adaptive Tutoring",
  summary:
    "Assess learner-controlled practice support with clear curriculum boundaries, safeguarding, and educator oversight.",
  sector: "Education",
  tags: ["tutoring", "personalisation", "safeguarding"],
  technicalPatterns: ["recommendation", "content-generation", "progress-modelling"],
  problem:
    "Learners benefit from timely practice and explanation, but personalisation can profile children or reinforce an incorrect view of ability.",
  intendedUsers: ["Learners", "Teachers", "Learning-support staff"],
  affectedGroups: ["Children and adult learners using adaptive learning material"],
  supportedDecision:
    "Which reviewed practice activity a learner should be offered next, subject to educator control.",
  publicBenefit:
    "Could help educators explore accessible practice sequences while keeping curriculum and safeguarding decisions with people.",
  dataAccessibility: "restricted",
  riskLevel: "high",
  riskReasons: [
    "Learner interaction data can reveal age, ability, disability, behaviour, and other sensitive characteristics.",
    "Incorrect adaptation can narrow opportunity or repeatedly expose a learner to unsuitable material.",
  ],
  mitigations: [
    "Use a closed bank of educator-reviewed activities and minimise stored learner data.",
    "Provide educator override, learner explanation, safe stopping, and a non-adaptive route.",
  ],
  sourceApplication: "adaptive material, tutoring, and interactive learning",
  sourceRationale:
    "The strategy describes potential support for different learning styles but provides no evidence model or safeguarding design.",
  syntheticMethod:
    "Generate invented mastery states and answer histories against a small reviewed activity graph, with no realistic learner profiles.",
  baseline: {
    name: "Rule-based practice sequence",
    description:
      "A teacher-authored progression unlocks reviewed activities after explicit completion checks.",
    method:
      "Follow a fixed curriculum graph and allow the learner or teacher to repeat, skip, or stop activities.",
    limitations: ["A fixed sequence responds only to the checks anticipated by its author."],
  },
  limitations: [
    "Synthetic answer histories cannot establish learning, motivation, or inclusion outcomes.",
    "Learning-style labels are not a sufficient or safe basis for personalisation.",
  ],
  failureModes: [
    "The system may mistake unfamiliarity, language, or access needs for low ability.",
    "Generated explanations may be confidently wrong or outside the approved curriculum.",
  ],
  nextValidationSteps: [
    "Define one narrow curriculum progression and a closed reviewed content bank.",
    "Co-design safeguards and explanations with educators, learners, and accessibility specialists.",
    "Evaluate opportunity, error recovery, and subgroup experience rather than completion speed alone.",
  ],
  demoBarrier:
    "A public adaptive tutor needs educator-approved content, child-safety review, accessibility testing, and a defensible data-minimisation design.",
  responsibleRole: "Qualified educator responsible for the learning activity",
  partnerRequirements: [
    "Educator and curriculum partner",
    "Safeguarding and accessibility specialists",
    "Learner and parent or carer participation where appropriate",
  ],
})
