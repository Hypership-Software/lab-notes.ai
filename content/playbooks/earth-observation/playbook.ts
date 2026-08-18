import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const earthObservation = defineAssessedPlaybook({
  slug: "earth-observation",
  title: "Earth Observation for Public Services",
  summary:
    "Explore transparent change-detection support for land use, habitats, and coasts using openly licensed imagery where possible.",
  sector: "Environment",
  tags: ["satellite", "land-use", "coastal-change"],
  technicalPatterns: ["computer-vision", "change-detection", "geospatial"],
  problem:
    "Environmental teams need to review change across large areas while accounting for clouds, seasons, resolution, and uncertain labels.",
  intendedUsers: ["Environmental analysts", "Land and coastal managers", "Remote-sensing specialists"],
  affectedGroups: ["Communities and ecosystems affected by environmental planning or intervention"],
  supportedDecision:
    "Which mapped change a qualified analyst should verify against imagery and other evidence.",
  publicBenefit:
    "Could make environmental change candidates and their source imagery easier to inspect and prioritise for review.",
  dataAccessibility: "open",
  riskLevel: "moderate",
  riskReasons: [
    "Classification error can misdirect inspection, planning, or environmental intervention.",
    "Fine-grained imagery may reveal sensitive sites or be misinterpreted without local context.",
  ],
  mitigations: [
    "Use openly licensed imagery, show dates and uncertainty, and require analyst confirmation.",
    "Avoid publishing sensitive habitat or infrastructure locations without review.",
  ],
  sourceApplication: "AI analysis of satellite data",
  sourceRationale:
    "The strategy mentions deforestation, land use, and coastal erosion but does not select imagery, labels, scale, or action.",
  syntheticMethod:
    "Create small invented raster tiles and change masks with fixed cloud, seasonal, resolution, and label-error scenarios.",
  baseline: {
    name: "Band-difference threshold",
    description:
      "A transparent difference measure highlights pixels that exceed a reviewed threshold.",
    method:
      "Align two synthetic observations, calculate a declared index difference, and show every thresholded area.",
    limitations: ["Simple thresholds confuse seasonal, atmospheric, and sensor differences with real change."],
  },
  limitations: [
    "Synthetic tiles cannot establish performance across real sensors, landscapes, or seasons.",
    "Observed surface change does not explain cause, ownership, legality, or required intervention.",
  ],
  failureModes: [
    "Cloud, shadow, tide, crop cycle, or alignment error may appear as environmental change.",
    "Coarse imagery may hide small but important changes.",
  ],
  nextValidationSteps: [
    "Select one openly licensed imagery source and a narrow analyst-reviewed change question.",
    "Define spatial, seasonal, cloud, and ground-truth evaluation requirements.",
    "Review publication risks for sensitive habitats, land, and infrastructure.",
  ],
  demoBarrier:
    "The use case needs one bounded environmental question, verified open-imagery terms, and analyst-reviewed labels before a useful demo.",
  responsibleRole: "Qualified environmental or remote-sensing analyst",
  partnerRequirements: [
    "Environmental domain partner",
    "Remote-sensing specialist",
    "Geospatial publication and licensing review",
  ],
})
