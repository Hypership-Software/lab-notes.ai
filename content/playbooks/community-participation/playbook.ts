import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const communityParticipation = defineAssessedPlaybook({
  slug: "community-participation",
  title: "Community Participation Analysis",
  summary:
    "Explore how communities could inspect and challenge analysis of public participation without treating volume as democratic legitimacy.",
  sector: "Communities",
  tags: ["participation", "civic-data", "inclusion"],
  technicalPatterns: ["text-analysis", "aggregation", "participatory-design"],
  problem:
    "Participation evidence can be large and uneven while some communities face digital, language, trust, time, or accessibility barriers.",
  intendedUsers: ["Community engagement teams", "Community organisations", "Policy researchers"],
  affectedGroups: ["People and communities represented or missing from participation data"],
  supportedDecision:
    "Which participation gap, theme, or disagreement deserves further community-led investigation.",
  publicBenefit:
    "Could make participation gaps and supporting evidence more visible to communities and accountable teams.",
  dataAccessibility: "public-readonly",
  riskLevel: "moderate",
  riskReasons: [
    "Participation data may include personal views and may not represent the wider population.",
    "Automated grouping can erase minority views, disagreement, or reasons for non-participation.",
  ],
  mitigations: [
    "Use invented submissions publicly and show missingness and representation limits beside every summary.",
    "Give community reviewers a route to contest categories and add contextual evidence.",
  ],
  sourceApplication: "AI for community-led social change",
  sourceRationale:
    "The strategy encourages citizens to use data for change but does not define participation, consent, representation, or decision power.",
  syntheticMethod:
    "Generate invented participation channels, area-level aggregates, access barriers, and submission excerpts with deliberately unequal coverage.",
  baseline: {
    name: "Published coding framework",
    description:
      "Human reviewers apply a visible theme codebook and record disagreements and uncategorised evidence.",
    method:
      "Double-code a small sample, reconcile differences, publish definitions, and keep counts separate from representativeness.",
    limitations: ["Manual coding still reflects reviewer judgement and does not solve participation gaps."],
  },
  limitations: [
    "Synthetic participation cannot reproduce trust, power, identity, or lived experience.",
    "More submissions do not establish greater need, support, or democratic legitimacy.",
  ],
  failureModes: [
    "A majority theme may crowd out a severe concern raised by few participants.",
    "Digital participation patterns may be mistaken for community-wide opinion.",
  ],
  nextValidationSteps: [
    "Co-design the question, categories, and contestability process with community organisations.",
    "Define representation and missingness disclosures before analysing any submissions.",
    "Compare automated grouping with double-coded review and investigate every disagreement.",
  ],
  demoBarrier:
    "A credible demonstration needs community co-design, a published coding framework, and safely invented participation material.",
  responsibleRole: "Accountable community engagement lead",
  partnerRequirements: [
    "Community-organisation participation",
    "Equality and accessibility review",
    "Public-engagement methods specialist",
  ],
})
