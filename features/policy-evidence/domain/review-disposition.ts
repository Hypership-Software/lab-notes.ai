export const reviewDispositionValues = [
  "unreviewed",
  "investigate",
  "unsupported",
  "specialist-review",
] as const

export type ReviewDisposition = (typeof reviewDispositionValues)[number]

/**
 * Wording for the four review states.
 *
 * None of these may read as approval. A reviewer working through a synthetic
 * example is deciding what deserves a closer look, not signing anything off, and
 * the labels have to keep saying so even when read out of context by a screen
 * reader announcing a radio group.
 */
export const reviewDispositionLabels: Record<ReviewDisposition, string> = {
  unreviewed: "Not yet reviewed",
  investigate: "Worth investigating further",
  unsupported: "Not supported by the evidence shown",
  "specialist-review": "Needs subject-matter review",
}

export const reviewDispositionDescriptions: Record<ReviewDisposition, string> = {
  unreviewed: "No judgement has been recorded against this finding.",
  investigate:
    "A reader thinks this is worth a closer look. It is not a decision, a priority, or a policy position.",
  unsupported:
    "The cited evidence does not support the finding as written.",
  "specialist-review":
    "The finding touches something a domain, legal, equality, or safeguarding specialist should judge.",
}
