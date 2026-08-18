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
    "Use a fixed seed to combine invented positions, themes, document lengths, and writing styles derived only from an approved structural sample.",
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
    "Confirm a permissible methodology excerpt and document its reuse terms.",
    "Co-design the review and evaluation protocol with policy and public-engagement specialists.",
    "Record a bounded output only after its prompt, inputs, citations, and hashes can be checked in together.",
  ],
  demoBarrier:
    "The recorded workbench is not published until its synthetic corpus, baseline, prompt, output, citations, evaluation, and hashes are complete.",
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
})
