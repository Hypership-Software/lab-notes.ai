import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const policyEvidence = defineAssessedPlaybook({
  slug: "policy-evidence",
  title: "Policy Evidence Workbench",
  summary:
    "Explore how a policy team could inspect themes, citations, and limitations without treating generated analysis as policy advice.",
  sector: "Cross-government",
  tags: ["policy", "consultation", "evidence"],
  technicalPatterns: ["retrieval", "structured-analysis", "human-review"],
  problem:
    "Policy teams may need to review substantial public evidence while retaining traceability to individual excerpts and minority views.",
  intendedUsers: ["Policy teams", "Researchers", "Public-engagement teams"],
  affectedGroups: ["People and organisations represented in public evidence"],
  supportedDecision:
    "Whether an emerging theme deserves further investigation by the responsible policy team.",
  publicBenefit:
    "Could make exploratory synthesis easier to inspect, challenge, and compare with a transparent manual method.",
  dataAccessibility: "public-readonly",
  riskLevel: "moderate",
  riskReasons: [
    "Theme summaries can flatten disagreement, context, and views expressed by smaller groups.",
    "Public consultation material can still include personal or sensitive information.",
  ],
  mitigations: [
    "Use invented consultation-style responses in the hosted example and retain exact evidence links.",
    "Keep policy judgement, weighting, and decisions with the responsible team.",
  ],
  sourceApplication: "consultation analysis and evidence generation for policies",
  sourceRationale:
    "The report frames these as efficiency opportunities but does not establish that automated synthesis is appropriate for a particular consultation.",
  syntheticMethod:
    "A stand-in for the consultation responses a department holds, so this example can be tried without access to any: twenty invented responses follow the headings, analytical stages, and plain public-service vocabulary of a published consultation response report, while the themes, positions, and wording are this project's own.",
  baseline: {
    name: "Reviewed keyword grouping",
    description:
      "A deterministic phrase list groups passages while leaving interpretation to a policy researcher.",
    method:
      "Match reviewed terms, show every matching excerpt, and count documents rather than treating mentions as support.",
    limitations: [
      "A phrase list misses paraphrases and cannot judge the importance or meaning of a response.",
    ],
  },
  limitations: [
    "The planned demonstration uses synthetic responses and cannot represent the diversity of a real consultation.",
    "Frequency is not importance, agreement, representativeness, or a policy recommendation.",
  ],
  failureModes: [
    "A fluent theme label may overstate weak or conflicting evidence.",
    "Quoted text may be accurate while the surrounding interpretation is not.",
  ],
  nextValidationSteps: [
    "Co-design the review and evaluation protocol with policy and public-engagement specialists.",
    "Record a bounded output only after its prompt, inputs, and citations can be checked in together.",
  ],
  evaluationReason:
    "The non-AI baseline has been measured against a hand-labelled expectation set covering all twenty responses, and its citation precision, evidence coverage, misses, and false attributions are reproduced by the test suite. The playbook stays not-run because the comparison it promises is between that baseline and a recorded AI-assisted analysis, and no such recording exists yet.",
  evaluationLimitations: [
    "The expectation set was written by the same author as the responses it labels, so it records one person's intent rather than an independent judgement.",
    "Only the non-AI baseline has been measured; there is no recorded AI-assisted analysis to compare it against.",
    "Citation precision and evidence coverage test whether findings point at the agreed evidence, not whether an analysis is useful, fair, or safe for real consultation responses.",
  ],
  demoBarrier:
    "The synthetic dataset, the non-AI baseline, and the evaluation are in place. The recorded workbench is not published until an AI-assisted analysis has been recorded against this exact dataset and compared with the baseline.",
  responsibleRole: "Responsible policy lead",
  partnerRequirements: [
    "Policy-method review",
    "Public-engagement review",
    "Data-protection and equality review",
  ],
  additionalSources: [
    {
      id: "ai-strategic-direction",
      publisher: "Department for the Economy",
      jurisdiction: "Northern Ireland",
      title: "AI Strategic Direction",
      canonicalUrl:
        "https://www.economy-ni.gov.uk/publications/ai-strategic-direction",
      sourceType: "strategy",
      coveredPeriod: "Published strategic direction",
      accessedAt: "2026-08-18",
      reuseStatus: "Public webpage used as context; no local extract is redistributed.",
      purpose:
        "Provide wider public-sector context for responsible artificial-intelligence adoption in Northern Ireland.",
      transformations: ["Recorded only the source purpose and public link."],
      caveats: ["Strategic context is not an evaluation of this workbench pattern."],
    },
    {
      id: "circular-economy-consultation-report",
      publisher: "Department for the Economy",
      jurisdiction: "Northern Ireland",
      title:
        "Draft Circular Economy Strategy for Northern Ireland - Public Consultation Response Report",
      canonicalUrl:
        "https://www.economy-ni.gov.uk/publications/draft-circular-economy-strategy-northern-ireland-public-consultation-response-report",
      sourceType: "consultation-report",
      coveredPeriod: "Published consultation response report",
      accessedAt: "2026-08-18",
      reuseStatus:
        "Public report used to study consultation-analysis structure; no respondent text is copied.",
      purpose:
        "Establish realistic headings, analytical stages, and public-sector consultation vocabulary without using real responses.",
      transformations: [
        "Retained method and structure only; excluded all respondent text and metadata.",
      ],
      caveats: [
        "One published report cannot define a general consultation-analysis method.",
      ],
    },
  ],
  syntheticDataset: {
    dataPath: "content/playbooks/policy-evidence/policy-evidence.data.json",
    structureNotePath:
      "content/playbooks/policy-evidence/consultation-analysis-structure.md",
    sourceCharacteristics: [
      "Document structure, analytical stages, and public-service vocabulary follow a published consultation response report, recorded in consultation-analysis-structure.md; the six themes and four positions are this project's own choice and are verified in no official source.",
    ],
    approximations: [
      "Twenty responses are enough to show the shape of the task and far too few to represent a consultation; how often each theme and position appears was chosen by the author, not measured in any real one.",
    ],
    alterations: [
      "Every response, position, and phrasing is invented; no respondent text, organisation, or place is used.",
    ],
    limitations: [
      "The dataset mirrors the structure of real consultation analysis and not its content, volume, or difficulty, so it cannot establish operational effectiveness, fairness, or readiness for use with real responses.",
    ],
    implementationSummary:
      "The exemplar reads a small synthetic dataset shaped by a published consultation response report, so it runs with no account, key, or live call; the comparison baseline, recorded output, citations, and evaluation are still outstanding.",
  },
})
