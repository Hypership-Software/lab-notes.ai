import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const healthOperations = defineAssessedPlaybook({
  slug: "health-operations",
  title: "Health Service Demand and Operations",
  summary:
    "Examine demand, bed, discharge, and allocation support as an operational decision problem with explicit safety constraints.",
  sector: "Health",
  tags: ["operations", "capacity", "discharge"],
  technicalPatterns: ["forecasting", "optimisation", "scenario-modelling"],
  problem:
    "Teams coordinate uncertain demand and constrained capacity across services where delays and poor allocation can affect care.",
  intendedUsers: ["Operational managers", "Discharge teams", "Clinical service leads"],
  affectedGroups: ["Patients waiting for, receiving, or leaving care"],
  supportedDecision:
    "Which operational scenario deserves review when planning capacity, discharge coordination, or resource allocation.",
  publicBenefit:
    "Could make capacity assumptions and trade-offs more visible to accountable operational teams.",
  dataAccessibility: "restricted",
  riskLevel: "high",
  riskReasons: [
    "Operational records can reveal sensitive health information and vulnerable circumstances.",
    "Optimisation targets can disadvantage people whose needs are complex or poorly represented.",
  ],
  mitigations: [
    "Evaluate service and equality impacts rather than optimising a single throughput measure.",
    "Keep clinical suitability and individual discharge decisions outside the model.",
  ],
  sourceApplication: "AI-supported health operational processes",
  sourceRationale:
    "The strategy mentions discharge, bed demand, and allocation but does not define objectives, constraints, or safety measures.",
  syntheticMethod:
    "Generate fixed-seed aggregate arrival, capacity, and pathway events with invented service identifiers and deliberately varied demand scenarios.",
  baseline: {
    name: "Rolling aggregate forecast",
    description:
      "A transparent moving average and documented capacity rules provide the comparison.",
    method:
      "Calculate recent aggregate demand, apply known capacity constraints, and display assumptions for planner adjustment.",
    limitations: ["Simple averages respond slowly to structural changes and unusual events."],
  },
  limitations: [
    "Synthetic flows cannot reproduce local dependencies, clinical complexity, or human behaviour.",
    "A useful forecast does not determine a safe allocation or discharge decision.",
  ],
  failureModes: [
    "Optimising average flow may hide unsafe tail risks or unequal delays.",
    "Historical constraints may be learned as if they were desirable practice.",
  ],
  nextValidationSteps: [
    "Map the exact operational decision, responsible roles, and non-negotiable clinical constraints.",
    "Compare forecasting value against existing planning tools using aggregate historical back-testing.",
    "Evaluate distributional effects and failure procedures with service and patient representatives.",
  ],
  demoBarrier:
    "Operational health data is restricted and the objectives and clinical constraints require a data-owning service partner.",
  responsibleRole: "Accountable health service operations lead",
  partnerRequirements: [
    "Health service operations partner",
    "Clinical safety and equality review",
    "Lawful aggregate evaluation data",
  ],
})
