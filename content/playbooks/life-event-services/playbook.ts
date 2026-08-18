import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const lifeEventServices = defineAssessedPlaybook({
  slug: "life-event-services",
  title: "Joined-up Support after a Life Event",
  summary:
    "Examine consent-based service coordination after bereavement without creating an opaque cross-government profile.",
  sector: "Citizen services",
  tags: ["life-events", "bereavement", "service-coordination"],
  technicalPatterns: ["workflow-orchestration", "rules", "consent-management"],
  problem:
    "After a bereavement, people may need to notify several services while dealing with grief, deadlines, different evidence, and accessibility needs.",
  intendedUsers: ["Bereaved people and their representatives", "Citizen service teams"],
  affectedGroups: ["People navigating government services after a bereavement"],
  supportedDecision:
    "Which service notification or guidance step the person chooses to begin, confirm, skip, or complete separately.",
  publicBenefit:
    "Could help people understand and coordinate relevant steps while preserving consent and direct access to each service.",
  dataAccessibility: "restricted",
  riskLevel: "high",
  riskReasons: [
    "Bereavement records link identity, family, financial, health, property, and legal circumstances across services.",
    "Incorrect or premature notification can cause distress, loss, fraud exposure, or administrative harm.",
  ],
  mitigations: [
    "Prefer a transparent rules and consent workflow before considering artificial intelligence.",
    "Require explicit confirmation for each notification, minimal data sharing, accessible alternatives, and reversible steps where possible.",
  ],
  sourceApplication: "linked citizen services after bereavement",
  sourceRationale:
    "The strategy describes notifying relevant services to reduce stress but does not define consent, authority, data sharing, or correction.",
  syntheticMethod:
    "Generate invented service requirements, event states, consent choices, deadlines, and error cases without realistic identities or family structures.",
  baseline: {
    name: "Consent-based service checklist",
    description:
      "A maintained rules directory explains relevant services, evidence, choices, and direct routes.",
    method:
      "Ask only necessary non-identifying questions, list possible steps, and require the person to confirm each action.",
    limitations: ["A rules directory requires coordinated maintenance and may still omit unusual circumstances."],
  },
  limitations: [
    "A synthetic journey cannot represent grief, authority disputes, complex estates, or accessibility needs.",
    "Service coordination is primarily an interoperability, consent, and service-design problem rather than a model problem.",
  ],
  failureModes: [
    "A service may be notified without valid authority or before the person is ready.",
    "An incorrect match may expose a death or private circumstance to the wrong party.",
  ],
  nextValidationSteps: [
    "Map the existing bereavement journey with affected people, representatives, and service teams.",
    "Define lawful authority, consent, minimum data, correction, security, and service ownership for each step.",
    "Prototype the transparent checklist baseline before evaluating any AI-specific component.",
  ],
  demoBarrier:
    "Cross-service authority, consent, security, data correction, and grief-sensitive design must be resolved before an interactive example.",
  responsibleRole: "Accountable citizen-service owner for each confirmed notification",
  partnerRequirements: [
    "Bereaved-person and representative participation",
    "Cross-government service owners",
    "Legal, security, accessibility, and data-protection review",
  ],
})
