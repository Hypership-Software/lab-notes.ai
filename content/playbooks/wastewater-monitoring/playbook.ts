import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const wastewaterMonitoring = defineAssessedPlaybook({
  slug: "wastewater-monitoring",
  title: "Wastewater Monitoring",
  summary:
    "Explore anomaly triage for wastewater flows while making sensor quality, thresholds, and operator escalation explicit.",
  sector: "Infrastructure",
  tags: ["wastewater", "monitoring", "pollution"],
  technicalPatterns: ["anomaly-detection", "time-series", "alerting"],
  problem:
    "Operators need to notice abnormal flow and contamination signals early across noisy sensors and complex networks.",
  intendedUsers: ["Wastewater operators", "Environmental response teams", "Asset managers"],
  affectedGroups: ["Communities and environments affected by wastewater incidents"],
  supportedDecision:
    "Which sensor event or network area an operator should inspect and escalate first.",
  publicBenefit:
    "Could make anomaly evidence and escalation thresholds easier for infrastructure teams to inspect.",
  dataAccessibility: "partial",
  riskLevel: "moderate",
  riskReasons: [
    "Missed or noisy alerts can delay a response or divert limited operational resources.",
    "Public network detail can create security and misuse concerns.",
  ],
  mitigations: [
    "Separate public synthetic teaching data from operational locations and network topology.",
    "Retain operator confirmation and documented fallback thresholds.",
  ],
  sourceApplication: "AI for wastewater management",
  sourceRationale:
    "The strategy mentions abnormal flow, contamination, and spillovers but supplies no sensor specification or incident labels.",
  syntheticMethod:
    "Stand in for the monitoring feed an operator already holds, so the pattern could be tried without access to it: short invented traces with declared seasonality, missingness, drift, maintenance events, and deliberately placed anomalies.",
  baseline: {
    name: "Reviewed threshold alerts",
    description:
      "Engineering limits and rate-of-change rules flag values for operator review.",
    method:
      "Apply documented thresholds to each synthetic signal and show the rule that produced every alert.",
    limitations: ["Fixed thresholds can miss context-dependent anomalies or over-alert during normal variation."],
  },
  limitations: [
    "Synthetic traces cannot represent a real network's hydraulics, maintenance, or sensor failure modes.",
    "An anomaly score cannot identify a contaminant or prescribe an operational response.",
  ],
  failureModes: [
    "Sensor drift may look like a network event or conceal a real one.",
    "An operator may over-trust a ranked alert when several linked sensors are missing.",
  ],
  nextValidationSteps: [
    "Identify public aggregate sensor examples and confirm permissible fields and units.",
    "Define incident labels, response windows, false-alert costs, and safe fallback rules with operators.",
    "Evaluate robustness to missing sensors, drift, seasonality, and previously unseen events.",
  ],
  demoBarrier:
    "A useful proof requires verified sensor semantics, operator thresholds, incident labels, and removal of sensitive network detail.",
  responsibleRole: "Duty wastewater operations lead",
  partnerRequirements: [
    "Wastewater operations partner",
    "Environmental incident specialist",
    "Infrastructure security review",
  ],
})
