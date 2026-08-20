import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const roadMaintenance = defineAssessedPlaybook({
  slug: "road-maintenance",
  title: "Road Maintenance Planning",
  summary:
    "Explore evidence-led defect triage without turning an image score into an automatic repair or funding decision.",
  sector: "Transport",
  tags: ["roads", "maintenance", "assets"],
  technicalPatterns: ["computer-vision", "ranking", "asset-management"],
  problem:
    "Road teams must inspect a large network and prioritise maintenance under safety, condition, access, and budget constraints.",
  intendedUsers: ["Road inspectors", "Asset managers", "Maintenance planners"],
  affectedGroups: ["Road users and communities affected by road condition or works"],
  supportedDecision:
    "Which reported defect a qualified inspector should verify and assess for maintenance priority.",
  publicBenefit:
    "Could provide a more inspectable route from observed defect evidence to human inspection planning.",
  dataAccessibility: "partial",
  riskLevel: "moderate",
  riskReasons: [
    "Missed defects can create safety risks, while false alerts consume inspection capacity.",
    "Uneven imagery and reporting can shift resources away from less observed areas.",
  ],
  mitigations: [
    "Retain inspection standards and human verification before severity or repair decisions.",
    "Audit geographic coverage and separate defect evidence from allocation policy.",
  ],
  sourceApplication: "AI for road management",
  sourceRationale:
    "The strategy describes early defect detection and repair prioritisation without defining imagery, inspection standards, or allocation rules.",
  syntheticMethod:
    "Stand in for the inspection records a roads authority already holds, so the pattern could be tried without them: invented road segments, inspection events, image-quality flags, defect categories, and maintenance constraints, shaped by the published inspection standard.",
  baseline: {
    name: "Standards-based inspection queue",
    description:
      "Reported defects are ordered by documented severity, route, and inspection-age rules.",
    method:
      "Apply published or partner-reviewed inspection categories and show the factor behind each queue position.",
    limitations: ["The baseline depends on reports and inspections that may be incomplete or delayed."],
  },
  limitations: [
    "Synthetic metadata cannot establish performance on real surfaces, weather, cameras, or road layouts.",
    "A defect classifier does not determine repair method, cost, or network priority.",
  ],
  failureModes: [
    "Shadows, standing water, markings, or repairs may be mistaken for damage.",
    "Areas with fewer surveys may appear to have fewer needs.",
  ],
  nextValidationSteps: [
    "Map one inspection workflow and confirm the authoritative defect taxonomy.",
    "Identify permissible labelled imagery and test across weather, road types, and capture devices.",
    "Evaluate coverage, false negatives, inspector workload, and geographic distribution.",
  ],
  demoBarrier:
    "The defect taxonomy, labelled imagery rights, capture conditions, and inspection workflow need transport-partner validation.",
  responsibleRole: "Qualified road inspector or asset manager",
  partnerRequirements: [
    "Road inspection partner",
    "Asset management and safety review",
    "Permissible representative imagery",
  ],
})
