import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const violenceRiskResearch = defineAssessedPlaybook({
  slug: "violence-risk-research",
  title: "Violence Risk Pattern Research",
  summary:
    "Document why linked-record risk identification is a very-high-risk research proposition requiring independent scrutiny.",
  sector: "Community safety",
  tags: ["violence-prevention", "safeguarding", "linked-data"],
  technicalPatterns: ["risk-modelling", "record-linkage", "research-only"],
  problem:
    "Services need to prevent violence and support people at risk, but linked administrative records are partial and can expose people to surveillance or unsafe intervention.",
  intendedUsers: ["Safeguarding researchers", "Violence-prevention policy teams"],
  affectedGroups: ["Women and girls who may experience violence", "People represented in linked justice or health records"],
  supportedDecision:
    "Whether a narrowly defined research question is lawful, necessary, safe, and suitable for further independent study.",
  publicBenefit:
    "Could help reviewers expose the evidence, rights, and safeguarding barriers before any technical development is considered.",
  dataAccessibility: "restricted",
  riskLevel: "very-high",
  riskReasons: [
    "Linked justice and health data is exceptionally sensitive and can place victim-survivors at further risk.",
    "False positives, false negatives, coercive intervention, function creep, and biased records can cause severe harm.",
  ],
  mitigations: [
    "Keep this playbook assessment-only with no public interactive risk model.",
    "Require independent safeguarding, legal, equality, ethics, security, and victim-survivor-led review before further work.",
  ],
  sourceApplication: "data linkage to identify people most at risk of violence against women and girls",
  sourceRationale:
    "The strategy names access to justice and health records but does not establish necessity, legality, safety, or an acceptable intervention pathway.",
  syntheticMethod:
    "No person-level synthetic risk records are planned; any future research teaching material should use abstract aggregate diagrams only.",
  baseline: {
    name: "Safeguarding research gate",
    description:
      "A multidisciplinary checklist tests necessity, proportionality, evidence, intervention safety, and affected-person involvement.",
    method:
      "Stop the proposal unless each legal, ethical, safeguarding, data, security, equality, and redress question has an accountable answer.",
    limitations: ["A governance checklist cannot by itself make a harmful or unsupported intervention safe."],
  },
  limitations: [
    "This playbook does not endorse predictive risk scoring, person-level linkage, or automated intervention.",
    "An aggregate description cannot capture victim-survivor safety, context, or service capacity.",
  ],
  failureModes: [
    "A risk label may expose a person, trigger unsafe contact, or be seen by a perpetrator.",
    "Institutional reporting patterns may be mistaken for an individual's future behaviour or need.",
  ],
  nextValidationSteps: [
    "Commission independent victim-survivor-led and specialist review of the premise and alternatives.",
    "Define a safe intervention pathway, redress, and evidence threshold before discussing modelling.",
    "Assess whether service capacity, data quality, or non-technical coordination should be addressed instead.",
  ],
  demoBarrier:
    "No public demo is appropriate without independent safeguarding, legal, equality, ethics, security, domain, and affected-community approval.",
  responsibleRole: "Statutory safeguarding lead",
  partnerRequirements: [
    "Victim-survivor-led oversight",
    "Independent safeguarding and ethics review",
    "Legal, equality, security, and data-protection approval",
  ],
})
