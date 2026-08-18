import { defineAssessedPlaybook } from "../define-assessed-playbook"

export const justiceResearch = defineAssessedPlaybook({
  slug: "justice-research",
  title: "Justice Research and Analysis",
  summary:
    "Assess research support for large justice datasets without automating legal, enforcement, sentencing, or eligibility decisions.",
  sector: "Justice",
  tags: ["justice", "research", "administrative-data"],
  technicalPatterns: ["document-analysis", "retrieval", "aggregate-analysis"],
  problem:
    "Researchers may need to inspect large, fragmented collections while preserving legal context, provenance, and protections for people represented.",
  intendedUsers: ["Justice researchers", "Policy analysts", "Legal information specialists"],
  affectedGroups: ["People represented in justice records or affected by justice policy"],
  supportedDecision:
    "Which research question, source, or aggregate pattern deserves further expert investigation.",
  publicBenefit:
    "Could make exploratory justice research more traceable without positioning software as a legal decision-maker.",
  dataAccessibility: "restricted",
  riskLevel: "high",
  riskReasons: [
    "Justice data can be highly sensitive, stigmatising, incomplete, and consequential.",
    "Historical patterns can reflect enforcement, reporting, and institutional bias rather than underlying behaviour.",
  ],
  mitigations: [
    "Limit any public example to aggregate or invented material and prohibit person-level risk or enforcement outputs.",
    "Require legal, statistical, equality, and affected-community review of questions and interpretations.",
  ],
  sourceApplication: "justice data analysis and research",
  sourceRationale:
    "The strategy proposes processing large volumes more quickly but does not define lawful access, research purpose, or acceptable outputs.",
  syntheticMethod:
    "Generate invented aggregate case-flow tables and document metadata with explicit missingness and no realistic person histories.",
  baseline: {
    name: "Structured query and manual evidence review",
    description:
      "Predefined aggregate queries and a documented evidence table provide the comparison.",
    method:
      "Run approved counts or searches, inspect sources, and record interpretation and caveats in a review template.",
    limitations: ["Manual synthesis is slower and still vulnerable to poor questions or incomplete data."],
  },
  limitations: [
    "Synthetic aggregates cannot reproduce legal context, data linkage error, or institutional processes.",
    "Exploratory association is not causation and must not be used for person-level action.",
  ],
  failureModes: [
    "A model may invent a legal proposition or omit a controlling exception.",
    "Biased or missing records may be summarised as if they describe a population fairly.",
  ],
  nextValidationSteps: [
    "Define a lawful aggregate research question and prohibited uses with justice specialists.",
    "Document source-generating processes, missingness, linkage, and equality concerns.",
    "Compare evidence retrieval and citation accuracy with existing research workflows.",
  ],
  demoBarrier:
    "Justice records are restricted and the research purpose, lawful basis, prohibited uses, and affected-community safeguards are not yet defined.",
  responsibleRole: "Accountable justice research lead",
  partnerRequirements: [
    "Justice research and legal partner",
    "Data protection and equality review",
    "Affected-community participation",
  ],
})
