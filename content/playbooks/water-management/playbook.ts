import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const waterManagement = defineAssessedPlaybook({
  slug: "water-management",
  title: "Water Resource Management",
  summary:
    "Explore sensor-based support for flooding, pollution, and resource planning with explicit uncertainty and emergency fallbacks.",
  sector: "Infrastructure",
  tags: ["water", "flooding", "pollution"],
  technicalPatterns: ["time-series", "forecasting", "alerting"],
  problem:
    "Water teams must combine incomplete observations, forecasts, assets, environmental conditions, and competing demands.",
  intendedUsers: ["Water resource planners", "Flood response teams", "Environmental regulators"],
  affectedGroups: ["Communities, water users, and ecosystems affected by water decisions"],
  supportedDecision:
    "Which water event or resource scenario an authorised team should inspect and escalate.",
  publicBenefit:
    "Could make sensor evidence, uncertainty, and competing resource scenarios easier to compare.",
  dataAccessibility: "partial",
  riskLevel: "moderate",
  riskReasons: [
    "Missed or false signals can affect emergency response, pollution control, and resource availability.",
    "Detailed network and asset information may be security-sensitive.",
  ],
  mitigations: [
    "Keep emergency procedures and statutory thresholds authoritative.",
    "Publish only abstract synthetic networks and retain authorised human escalation.",
  ],
  sourceApplication: "AI for water management",
  sourceRationale:
    "The strategy mentions flooding, pollution control, and resource allocation without defining a system boundary or decision horizon.",
  syntheticMethod:
    "Generate invented catchment, rainfall, level, quality, storage, and demand series with declared sensor outages and extreme events.",
  baseline: {
    name: "Threshold and water-balance model",
    description:
      "Documented limits and a simple inflow, storage, and outflow calculation provide the comparison.",
    method:
      "Apply statutory or partner-reviewed thresholds and show the terms in each synthetic balance calculation.",
    limitations: ["Simplified balances and thresholds omit complex hydrology and operational dependencies."],
  },
  limitations: [
    "Synthetic catchments cannot establish forecast skill or safe operational response.",
    "Flooding, pollution, and allocation are distinct decisions that may require separate systems.",
  ],
  failureModes: [
    "A failed or drifting sensor may conceal a hazardous event.",
    "Average performance may hide the extreme events that matter most for safety.",
  ],
  nextValidationSteps: [
    "Select one decision horizon and identify authoritative thresholds, units, and fallback procedures.",
    "Confirm permissible aggregate sensor data and representative failure scenarios.",
    "Evaluate lead time, missed events, false alarms, uncertainty, and distributional impact.",
  ],
  demoBarrier:
    "Flood, pollution, and allocation support must be separated and grounded in operator-reviewed thresholds and safe data semantics.",
  responsibleRole: "Authorised water or flood operations lead",
  partnerRequirements: [
    "Water or flood operations partner",
    "Environmental and emergency-planning review",
    "Infrastructure security review",
  ],
})
