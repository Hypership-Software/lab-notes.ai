import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const housingInsight = defineAssessedPlaybook({
  slug: "housing-insight",
  title: "Housing Need and Service Insight",
  summary:
    "Assess property and tenant-service insight without automating allocation, enforcement, tenancy, or eligibility decisions.",
  sector: "Housing",
  tags: ["housing", "property-management", "tenant-services"],
  technicalPatterns: ["forecasting", "triage", "aggregate-analysis"],
  problem:
    "Housing teams manage repairs, property condition, service demand, and communication amid constrained supply and diverse tenant needs.",
  intendedUsers: ["Housing service teams", "Property managers", "Tenant support teams"],
  affectedGroups: ["Tenants, applicants, and people experiencing housing need"],
  supportedDecision:
    "Which aggregate service pattern or maintenance issue deserves investigation by the responsible housing team.",
  publicBenefit:
    "Could help teams inspect service patterns while keeping tenancy and allocation decisions outside the example.",
  dataAccessibility: "restricted",
  riskLevel: "high",
  riskReasons: [
    "Housing records can reveal finances, disability, household circumstances, location, and vulnerability.",
    "Poor prioritisation or profiling can affect safety, housing stability, and access to support.",
  ],
  mitigations: [
    "Restrict the pattern to aggregate service insight or property maintenance and prohibit person-level eligibility or enforcement scoring.",
    "Require tenant participation, human review, clear reasons, and correction routes.",
  ],
  sourceApplication: "AI in housing for property management and tenant services",
  sourceRationale:
    "The strategy states a broad opportunity but does not identify the service problem, data boundary, or prohibited decisions.",
  syntheticMethod:
    "Generate invented properties, aggregate service events, repair categories, accessibility flags, and response times without exact locations or household profiles.",
  baseline: {
    name: "Standards-based service dashboard",
    description:
      "Published service standards and aggregate counts highlight backlogs and exceptions.",
    method:
      "Group invented events by service category and compare age and status with documented response thresholds.",
    limitations: ["Aggregate thresholds can miss urgent circumstances not captured in the recorded category."],
  },
  limitations: [
    "Synthetic property and service data cannot establish tenant experience, need, or operational impact.",
    "Maintenance patterns must not be repurposed to judge a tenant or household.",
  ],
  failureModes: [
    "Recorded demand may reflect barriers to reporting rather than underlying need.",
    "An efficiency metric may deprioritise complex cases or accessible communication.",
  ],
  nextValidationSteps: [
    "Choose a non-eligibility task such as aggregate repair backlog or communication accessibility.",
    "Co-design success, redress, and prohibited uses with tenants and housing staff.",
    "Evaluate missing demand, subgroup experience, urgent exceptions, and data-minimisation controls.",
  ],
  demoBarrier:
    "The broad housing proposal must be narrowed away from consequential person-level decisions and reviewed with tenants and service partners.",
  responsibleRole: "Accountable housing service lead",
  partnerRequirements: [
    "Tenant participation",
    "Housing service and property partner",
    "Equality, accessibility, and data-protection review",
  ],
})
