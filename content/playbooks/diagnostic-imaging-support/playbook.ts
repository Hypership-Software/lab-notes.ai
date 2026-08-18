import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const diagnosticImagingSupport = defineAssessedPlaybook({
  slug: "diagnostic-imaging-support",
  title: "Diagnostic Imaging Support",
  summary:
    "Assess how image-analysis support might assist qualified clinicians without replacing diagnosis or clinical accountability.",
  sector: "Health",
  tags: ["diagnostics", "imaging", "clinical-safety"],
  technicalPatterns: ["computer-vision", "ranking", "human-review"],
  problem:
    "Imaging services face high demand, but missing or mis-prioritising a finding can cause serious patient harm.",
  intendedUsers: ["Radiologists", "Reporting clinicians", "Imaging service managers"],
  affectedGroups: ["Patients whose care involves diagnostic imaging"],
  supportedDecision:
    "Which study a qualified clinician should review next and which image regions merit attention.",
  publicBenefit:
    "Could help clinical teams investigate workload support while keeping diagnosis with qualified professionals.",
  dataAccessibility: "restricted",
  riskLevel: "high",
  riskReasons: [
    "Imaging and linked outcomes are sensitive health data used in consequential care decisions.",
    "False negatives, false positives, and performance differences across groups can cause serious harm.",
  ],
  mitigations: [
    "Require clinical-safety governance, subgroup evaluation, and independent human interpretation.",
    "Do not expose a public diagnostic simulation based on realistic patient records.",
  ],
  sourceApplication: "AI-based diagnostics from medical images",
  sourceRationale:
    "The strategy describes possible support for fractures, cancer, and strokes but supplies no clinical dataset or safety evaluation.",
  syntheticMethod:
    "If a safe teaching fixture is justified, generate abstract image-quality and workflow metadata rather than diagnostic patient images.",
  baseline: {
    name: "Clinician-led worklist rules",
    description:
      "Existing urgency categories and referral information order studies for qualified clinical review.",
    method:
      "Apply documented clinical priority and service rules without inferring a diagnosis from image content.",
    limitations: ["Rule-based prioritisation cannot surface unrecorded visual concerns."],
  },
  limitations: [
    "Open data is unlikely to represent the local population, equipment, workflow, or prevalence.",
    "A browser proof of concept cannot establish clinical safety or diagnostic performance.",
  ],
  failureModes: [
    "A confident overlay may anchor a clinician on an incorrect region.",
    "Performance may degrade with different scanners, protocols, or patient groups.",
  ],
  nextValidationSteps: [
    "Define the clinical task and intended-use statement with radiology specialists.",
    "Identify lawful, representative evaluation data and a clinical-safety case.",
    "Agree subgroup, false-negative, workflow, and human-factors evaluation before prototyping.",
  ],
  demoBarrier:
    "Restricted clinical data, medical-device considerations, and patient-safety risk make a public diagnostic demo inappropriate at this stage.",
  responsibleRole: "Qualified reporting clinician",
  partnerRequirements: [
    "Clinical safety officer",
    "Radiology service partner",
    "Information governance and medical-device review",
  ],
})
