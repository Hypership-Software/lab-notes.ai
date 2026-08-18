import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const offenderLearning = defineAssessedPlaybook({
  slug: "offender-learning",
  title: "Learning Support in Custodial Settings",
  summary:
    "Explore educator-led learning support in custody with explicit consent, safeguarding, access, and non-punitive data boundaries.",
  sector: "Justice and education",
  tags: ["custody", "learning", "rehabilitation"],
  technicalPatterns: ["recommendation", "content-adaptation", "offline-first"],
  problem:
    "Learners in custody have varied education, language, disability, access, and sentence circumstances within a constrained environment.",
  intendedUsers: ["Custodial educators", "Learners in custody", "Learning-support staff"],
  affectedGroups: ["People receiving education in custodial settings"],
  supportedDecision:
    "Which reviewed learning resource an educator and learner should consider next.",
  publicBenefit:
    "Could help teams examine accessible learning pathways without using educational data for discipline, risk, or release decisions.",
  dataAccessibility: "restricted",
  riskLevel: "high",
  riskReasons: [
    "Education, justice, disability, and behavioural information can be sensitive and coercive in custody.",
    "A recommendation can limit opportunity or be repurposed for unrelated consequential decisions.",
  ],
  mitigations: [
    "Enforce purpose limitation and a technical separation from discipline, risk, and release systems.",
    "Provide educator control, learner choice, accessible alternatives, and an offline fallback.",
  ],
  sourceApplication: "AI support for education in justice settings",
  sourceRationale:
    "The strategy links personalisation with rehabilitation but supplies no learner protections, curriculum, or outcome definition.",
  syntheticMethod:
    "Generate invented learning goals, accessibility preferences, resource prerequisites, and progress events without justice histories.",
  baseline: {
    name: "Educator-curated pathway",
    description:
      "An educator and learner choose from a reviewed resource map using explicit prerequisites and goals.",
    method:
      "Match stated goals and completed prerequisites to a fixed list, with manual adjustment and learner choice.",
    limitations: ["A curated map may not cover specialised needs or changes in available provision."],
  },
  limitations: [
    "Synthetic learner paths cannot establish rehabilitation, education, or inclusion outcomes.",
    "Custodial constraints and power imbalances cannot be represented by a public interface alone.",
  ],
  failureModes: [
    "A learner may be channelled into a narrow pathway based on incomplete historical data.",
    "Data collected for support may be perceived or used as surveillance.",
  ],
  nextValidationSteps: [
    "Co-design the purpose and prohibited uses with learners, educators, and independent advocates.",
    "Define a small reviewed resource map and accessibility requirements.",
    "Evaluate choice, opportunity, privacy, offline use, and error correction before personalisation quality.",
  ],
  demoBarrier:
    "Custodial power dynamics, restricted data, safeguarding, and purpose-limitation requirements need independent review before any demo.",
  responsibleRole: "Qualified custodial education lead",
  partnerRequirements: [
    "Custodial education partner",
    "Independent learner advocacy",
    "Safeguarding, equality, accessibility, and data-protection review",
  ],
})
