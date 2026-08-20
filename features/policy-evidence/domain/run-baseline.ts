import { toRecord } from "@/lib/to-record"

import {
  corpusThemeValues,
  type BaselineAnalysis,
  type Citation,
  type CorpusDocument,
  type CorpusDocumentId,
  type CorpusTheme,
  type Finding,
} from "./types"

/**
 * Bump whenever a term is added, removed, or reworded. The version travels with
 * every result so a comparison between the baseline and a recorded analysis can
 * say which word list produced it, rather than leaving the reader to assume the
 * list never changed.
 */
export const baselineVocabularyVersion = "1.0.0"

/**
 * The whole baseline, in one readable place. This is deliberately a word list
 * and nothing else: no embeddings, no model call, no learned weights. A policy
 * researcher can read it, disagree with it, and edit it, which is the property
 * that makes it a fair comparison rather than a straw person.
 *
 * Terms are lowercase and matched case-insensitively. No term may appear under
 * two themes: a shared term would make theme attribution depend on iteration
 * order, which `run-baseline.test.ts` forbids.
 */
export const themeVocabulary: Record<CorpusTheme, readonly string[]> = {
  "access-to-services": [
    "internet",
    "smartphone",
    "online",
    "digital",
    "broadband",
    "paper alternative",
    "single point of contact",
    "opening hours",
    "form filling",
    "another language",
    "point of refusal",
  ],
  "workforce-capability": [
    "training",
    "staff",
    "experienced staff",
    "duties",
    "go-live",
    "vacancies",
    "overtime",
    "workload",
  ],
  "data-governance": [
    "anonymous",
    "lawful basis",
    "personal information",
    "retention period",
    "privacy notice",
    "redaction",
    "data protection",
    "proportionate",
    "contractors",
  ],
  accountability: [
    "responsible",
    "responsible officer",
    "accountable",
    "ownership",
    "decision",
    "policy number",
  ],
  "procurement-and-reuse": [
    "specification",
    "requirements",
    "tender",
    "supplier",
    "single supplier",
    "exit plan",
    "lock-in",
    "reuse",
    "signature",
  ],
  "environmental-cost": [
    "impact assessment",
    "electricity",
    "computation",
    "mileage",
    "storage",
    "site visits",
    "net figure",
    "carbon",
  ],
}

const themeLabels: Record<CorpusTheme, string> = {
  "access-to-services": "Access to services",
  "workforce-capability": "Workforce capability",
  "data-governance": "Data governance",
  accountability: "Accountability",
  "procurement-and-reuse": "Procurement and reuse",
  "environmental-cost": "Environmental cost",
}

/** Every finding cites at most this many documents. */
const maxEvidencePerFinding = 6

/**
 * The weaknesses of a phrase list, stated on every finding it produces. These
 * are not boilerplate caveats: each one names a failure this method actually
 * has, so a reader can tell what the baseline cannot see.
 */
const baselineLimitations = [
  "A matched term shows only that a response used the word, not whether it supported, opposed, or merely mentioned the theme.",
  "A response raising the same concern in different words is not matched at all.",
  "The number of matching responses is not a measure of importance, agreement, or how many people hold the view.",
]

/**
 * Build a matcher for one vocabulary term. Words are separated by any run of
 * non-alphanumeric characters, so "lawful   basis," and "lawful basis" both
 * match, and the term is fenced by lookaround rather than `\b` so that
 * "training" does not match inside "retraining".
 */
function termPattern(term: string): RegExp {
  const words = term
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))

  return new RegExp(
    `(?<![A-Za-z0-9])${words.join("[^A-Za-z0-9]+")}(?![A-Za-z0-9])`,
    "gi",
  )
}

type CompiledTerm = { term: string; weight: number; pattern: RegExp }

const compiledVocabulary = toRecord(
  corpusThemeValues,
  (theme): readonly CompiledTerm[] =>
    themeVocabulary[theme].map((term) => ({
      term,
      // A multi-word phrase is stronger evidence than a bare token, so it is
      // worth its length. Nothing subtler is justified by a word list.
      weight: term.split(/[^a-z0-9]+/).filter(Boolean).length,
      pattern: termPattern(term),
    })),
)

/**
 * Expand a match to the sentence containing it, so a citation reads as evidence
 * rather than as the matched word on its own. Offsets stay exact: the quote is
 * sliced from the original text and never normalised.
 */
function enclosingSentence(text: string, matchStart: number, matchEnd: number) {
  let start = 0

  for (let index = matchStart - 1; index >= 0; index -= 1) {
    if (text[index] === "." || text[index] === "!" || text[index] === "?") {
      start = index + 1
      break
    }
  }

  while (start < matchStart && /\s/.test(text[start] ?? "")) start += 1

  let end = text.length

  for (let index = matchEnd; index < text.length; index += 1) {
    const character = text[index]
    if (character === "." || character === "!" || character === "?") {
      end = index + 1
      break
    }
  }

  return { start, end, quote: text.slice(start, end) }
}

type DocumentMatch = {
  documentId: CorpusDocumentId
  score: number
  citation: Citation
}

/**
 * Score one document against one theme. Returns the total weight of every
 * matched term and a single citation for the strongest match, so a document is
 * cited once per finding however many times its terms recur.
 */
function scoreDocument(
  document: CorpusDocument,
  theme: CorpusTheme,
): DocumentMatch | undefined {
  let score = 0
  let best: { weight: number; start: number; end: number; quote: string } | undefined

  for (const { weight, pattern } of compiledVocabulary[theme]) {
    // `pattern` carries the global flag and is reused across documents, so its
    // cursor is reset rather than trusted.
    pattern.lastIndex = 0

    for (const match of document.text.matchAll(pattern)) {
      const start = match.index
      score += weight

      if (best && (best.weight > weight || (best.weight === weight && best.start <= start))) {
        continue
      }

      best = { weight, ...enclosingSentence(document.text, start, start + match[0].length) }
    }
  }

  if (!best) return undefined

  return {
    documentId: document.id,
    score,
    citation: {
      documentId: document.id,
      start: best.start,
      end: best.end,
      quote: best.quote,
    },
  }
}

/**
 * Group a corpus into one finding per theme whose vocabulary it matches.
 *
 * Findings are returned in theme declaration order rather than ranked by how
 * many documents matched. Ranking would read as a claim about which concern
 * matters most, which a word list cannot support and which this playbook
 * explicitly disclaims.
 */
export function runBaseline(corpus: readonly CorpusDocument[]): BaselineAnalysis {
  const findings: Finding[] = []

  for (const theme of corpusThemeValues) {
    const matches = corpus
      .map((document) => scoreDocument(document, theme))
      .filter((match): match is DocumentMatch => match !== undefined)
      .sort(
        (left, right) =>
          right.score - left.score || left.documentId.localeCompare(right.documentId),
      )

    if (matches.length === 0) continue

    findings.push({
      id: `F-${theme}`,
      label: themeLabels[theme],
      summary: `Matched ${matches.length} of ${corpus.length} responses on reviewed ${themeLabels[theme].toLowerCase()} terms.`,
      evidence: matches
        .slice(0, maxEvidencePerFinding)
        .map((match) => match.citation),
      limitations: [...baselineLimitations],
    })
  }

  return { kind: "baseline", vocabularyVersion: baselineVocabularyVersion, findings }
}
