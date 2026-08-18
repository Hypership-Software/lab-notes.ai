import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const farmAdvisory = defineAssessedPlaybook({
  slug: "farm-advisory",
  title: "Farm Advisory Support",
  summary:
    "Assess decision support for yields, livestock, water, and fertiliser without presenting generic output as farm-specific advice.",
  sector: "Agriculture",
  tags: ["farming", "precision-agriculture", "resources"],
  technicalPatterns: ["forecasting", "recommendation", "geospatial"],
  problem:
    "Farm decisions combine weather, soils, crops, livestock, regulation, costs, and local knowledge under substantial uncertainty.",
  intendedUsers: ["Farmers", "Agricultural advisers", "Environmental land managers"],
  affectedGroups: ["Farm businesses, workers, animals, communities, and environments affected by farm decisions"],
  supportedDecision:
    "Which resource-use or monitoring question a farmer and qualified adviser should investigate further.",
  publicBenefit:
    "Could make assumptions and evidence behind advisory scenarios easier for farmers and advisers to scrutinise.",
  dataAccessibility: "partial",
  riskLevel: "moderate",
  riskReasons: [
    "Poor advice can affect livelihoods, animal welfare, water quality, soil, and regulatory compliance.",
    "Data coverage and recommendations may favour farm types or equipment with better digital representation.",
  ],
  mitigations: [
    "Use public aggregate data and invented holdings in any hosted example.",
    "Keep decisions with farmers and qualified advisers and show uncertainty and local-data gaps.",
  ],
  sourceApplication: "AI for farming and precision agriculture",
  sourceRationale:
    "The strategy mentions yield, livestock, water, and fertiliser but does not define a farm decision, evidence source, or environmental constraint.",
  syntheticMethod:
    "Generate invented field, herd, weather, and input records from documented ranges, with fixed missing-data and extreme-weather cases.",
  baseline: {
    name: "Adviser-reviewed decision table",
    description:
      "Published guidance and explicit farm inputs produce a transparent set of considerations.",
    method:
      "Apply documented thresholds and conditions, showing which input and guidance statement triggered each suggestion.",
    limitations: ["A decision table cannot capture every local condition, interaction, or changing market factor."],
  },
  limitations: [
    "Invented holdings cannot establish financial, environmental, yield, or animal-welfare effects.",
    "A general model cannot replace site inspection, farmer knowledge, or regulated professional advice.",
  ],
  failureModes: [
    "Missing local soil or weather detail may make a suggestion unsuitable.",
    "Optimising one input can shift cost or harm to water, emissions, biodiversity, or welfare.",
  ],
  nextValidationSteps: [
    "Choose one advisory question and identify authoritative guidance and open aggregate inputs.",
    "Define environmental, welfare, economic, and uncertainty checks with farmers and advisers.",
    "Test across diverse invented farm types and explicitly document where partner data is essential.",
  ],
  demoBarrier:
    "The broad strategy entry must be narrowed to one adviser-reviewed decision with authoritative guidance and defensible data ranges.",
  responsibleRole: "Farmer supported by a qualified agricultural adviser",
  partnerRequirements: [
    "Farmer and agricultural-adviser participation",
    "Environmental and animal-welfare review",
    "Authoritative guidance and aggregate data",
  ],
})
