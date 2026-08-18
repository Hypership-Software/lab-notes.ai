import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const trafficFlow = defineAssessedPlaybook({
  slug: "traffic-flow",
  title: "Traffic Flow Management",
  summary:
    "Assess congestion and signal-planning support with transparent assumptions, safety constraints, and operator control.",
  sector: "Transport",
  tags: ["traffic", "congestion", "road-safety"],
  technicalPatterns: ["forecasting", "optimisation", "simulation"],
  problem:
    "Transport teams balance changing demand, incidents, safety, public transport, walking, cycling, and network constraints.",
  intendedUsers: ["Traffic control teams", "Transport planners", "Road safety specialists"],
  affectedGroups: ["People travelling through or living beside the road network"],
  supportedDecision:
    "Which congestion scenario or signal-plan adjustment a qualified operator should investigate.",
  publicBenefit:
    "Could help teams compare traffic-management scenarios while exposing safety and distributional trade-offs.",
  dataAccessibility: "partial",
  riskLevel: "moderate",
  riskReasons: [
    "Signal recommendations affect road safety, accessibility, emissions, and journey distribution.",
    "Coverage gaps can systematically under-represent some modes, places, or times.",
  ],
  mitigations: [
    "Treat safety and accessibility constraints as hard requirements rather than optimisation weights.",
    "Keep operators responsible and evaluate effects across modes and neighbourhoods.",
  ],
  sourceApplication: "AI for traffic management",
  sourceRationale:
    "The strategy mentions congestion prediction, signal optimisation, and safety breaches without a defined network or objective.",
  syntheticMethod:
    "Generate a small invented junction network with fixed demand profiles, modal flows, incidents, sensor gaps, and safety constraints.",
  baseline: {
    name: "Time-of-day signal plan",
    description:
      "A documented fixed schedule provides a legible comparison for the same synthetic demand.",
    method:
      "Apply reviewed signal phases by time band and report queues, delay, and safety-constraint breaches.",
    limitations: ["A static plan cannot respond quickly to incidents or unusual demand."],
  },
  limitations: [
    "A toy network cannot establish road-safety, emissions, or local journey impacts.",
    "Reduced average delay can still shift burdens onto pedestrians, buses, or particular communities.",
  ],
  failureModes: [
    "Missing counts may make a low-volume route look uncongested or unimportant.",
    "Optimisation can produce unstable changes that confuse road users or operators.",
  ],
  nextValidationSteps: [
    "Choose one junction-scale planning question and publish the objective and constraints.",
    "Confirm permissible aggregate traffic and incident data with transport specialists.",
    "Compare safety, accessibility, mode, emissions, and delay measures under failure scenarios.",
  ],
  demoBarrier:
    "A credible demonstration needs verified network semantics, safety constraints, multimodal measures, and operator-reviewed scenarios.",
  responsibleRole: "Authorised traffic control lead",
  partnerRequirements: [
    "Traffic operations partner",
    "Road safety and accessibility review",
    "Permissible aggregate sensor data",
  ],
})
