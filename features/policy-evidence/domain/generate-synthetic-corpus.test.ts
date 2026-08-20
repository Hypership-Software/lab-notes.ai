import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { sensitiveKeyPattern, findPersonalDataShape } from "@/lib/privacy-patterns"

import { stanceFraming, themeSubjects, themeTemplates } from "./corpus-fragments"
import { fillTemplate, generateSyntheticCorpus } from "./generate-synthetic-corpus"
import {
  corpusSchema,
  corpusStanceValues,
  corpusThemeValues,
  type CorpusTheme,
  type SyntheticCorpusConfig,
} from "./types"

const equalWeights = Object.fromEntries(
  corpusThemeValues.map((theme) => [theme, 1]),
) as Record<CorpusTheme, number>

const committedConfig: SyntheticCorpusConfig = {
  seed: 20260820,
  size: 48,
  themeWeights: equalWeights,
}

const contrastingConfig: SyntheticCorpusConfig = {
  ...committedConfig,
  seed: 20260821,
}

/** Forces fractional remainders and a declaration-order tie-break. */
const unevenConfig: SyntheticCorpusConfig = {
  seed: 20260820,
  size: 20,
  themeWeights: {
    "access-to-services": 5,
    "workforce-capability": 3,
    "data-governance": 3,
    accountability: 3,
    "procurement-and-reuse": 3,
    "environmental-cost": 3,
  },
}

function countBy<T extends string>(values: readonly T[]): Record<string, number> {
  return values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1
    return counts
  }, {})
}

function collectKeys(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectKeys)
  if (!value || typeof value !== "object") return []
  return Object.entries(value).flatMap(([key, child]) => [key, ...collectKeys(child)])
}

// Common forenames that are also ordinary English words are the reason this
// check is case-sensitive and word-bounded: "mark", "grace", "bill", and
// "hope" all appear legitimately in consultation prose.
const forbiddenNames = [
  "Aoife",
  "Bill",
  "Ciara",
  "Conor",
  "Grace",
  "Hope",
  "James",
  "Mark",
  "Mary",
  "Niamh",
  "Patrick",
  "Sarah",
  "Smith",
  "Murphy",
  "O'Neill",
  "Kelly",
]

// Every `themeSubjects` entry is phrased as an interrogative clause ("how X",
// "whether X", "who X", "which X", ...). A `stanceFraming` entry whose verb
// demands a declarative complement instead (e.g. "...because X", "...and
// said X") reads as ungrammatical once concatenated with a `themeSubjects`
// entry. This list must cover the real defect surface, not a sample: it has
// already been too narrow once, missing "saying"/"argued"/"warning" (the
// literal pre-fix `mixed` framings) and the "who"/"which" subjects that
// appear in `corpus-fragments.ts`.
const declarativeOnlyComplements = [
  "said",
  "saying",
  "added",
  "adding",
  "noting",
  "noted",
  "observing",
  "observed",
  "arguing",
  "argued",
  "warning",
  "warned",
  "stating",
  "stated",
  "commenting",
  "commented",
  "because",
  "on the grounds that",
  "concerns that",
]
const interrogativeWords = ["whether", "what", "how", "who", "which", "when", "where", "why"]

const forbiddenComplementPatterns = declarativeOnlyComplements.flatMap((complement) =>
  interrogativeWords.map(
    (word) =>
      new RegExp(`\\b${complement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${word}\\b`, "i"),
  ),
)

function findForbiddenComplementMatch(text: string): RegExp | undefined {
  return forbiddenComplementPatterns.find((pattern) => pattern.test(text))
}

describe("generateSyntheticCorpus", () => {
  it("is stable across repeated calls with the recorded seed", () => {
    expect(generateSyntheticCorpus(committedConfig)).toEqual(
      generateSyntheticCorpus(committedConfig),
    )
  })

  it("changes at least one document when the seed changes", () => {
    const recorded = generateSyntheticCorpus(committedConfig)
    const contrasting = generateSyntheticCorpus(contrastingConfig)

    expect(contrasting).toHaveLength(recorded.length)
    expect(contrasting).not.toEqual(recorded)
  })

  it("allocates themes exactly by weight, for every seed", () => {
    for (const config of [committedConfig, contrastingConfig]) {
      const counts = countBy(
        generateSyntheticCorpus(config).map((document) => document.theme),
      )

      for (const theme of corpusThemeValues) {
        expect(counts[theme]).toBe(8)
      }
    }
  })

  it("distributes remainders in declaration order for uneven weights", () => {
    const counts = countBy(
      generateSyntheticCorpus(unevenConfig).map((document) => document.theme),
    )

    // Weights 5:3:3:3:3:3 over 20 documents give exact quotas of
    // 5.0 and 3.0 each, so every theme lands on its floor with no remainder.
    expect(counts).toEqual({
      "access-to-services": 5,
      "workforce-capability": 3,
      "data-governance": 3,
      accountability: 3,
      "procurement-and-reuse": 3,
      "environmental-cost": 3,
    })

    // 21 documents leave exactly one slot after flooring (5.25 and 3.15 each,
    // flooring to 20). It goes to the single largest remainder, .25.
    expect(
      countBy(
        generateSyntheticCorpus({ ...unevenConfig, size: 21 }).map(
          (document) => document.theme,
        ),
      ),
    ).toEqual({
      "access-to-services": 6,
      "workforce-capability": 3,
      "data-governance": 3,
      accountability: 3,
      "procurement-and-reuse": 3,
      "environmental-cost": 3,
    })

    // 22 documents leave two slots (5.5 and 3.3 each, flooring to 20). The
    // first goes to .5; the second breaks a five-way tie at .3, which must
    // resolve to the earliest theme in corpusThemeValues declaration order.
    expect(
      countBy(
        generateSyntheticCorpus({ ...unevenConfig, size: 22 }).map(
          (document) => document.theme,
        ),
      ),
    ).toEqual({
      "access-to-services": 6,
      "workforce-capability": 4,
      "data-governance": 3,
      accountability: 3,
      "procurement-and-reuse": 3,
      "environmental-cost": 3,
    })
  })

  it("gives every stance an equal share and uses all four", () => {
    const counts = countBy(
      generateSyntheticCorpus(committedConfig).map((document) => document.stance),
    )

    for (const stance of corpusStanceValues) {
      expect(counts[stance]).toBe(12)
    }
  })

  it("refuses a weighting that starves a theme", () => {
    expect(() =>
      generateSyntheticCorpus({
        seed: 20260820,
        size: 48,
        themeWeights: {
          "access-to-services": 100,
          "workforce-capability": 1,
          "data-governance": 1,
          accountability: 1,
          "procurement-and-reuse": 1,
          "environmental-cost": 1,
        },
      }),
    ).toThrow(/themeWeights/)
  })

  it("emits unique, zero-padded identifiers in ascending order", () => {
    const ids = generateSyntheticCorpus(committedConfig).map(
      (document) => document.id,
    )

    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toEqual([...ids].sort())
    expect(ids[0]).toBe("SYN-0001")
    expect(ids.at(-1)).toBe("SYN-0048")
  })

  it("produces a corpus that satisfies the shared contract", () => {
    expect(corpusSchema.safeParse(generateSyntheticCorpus(committedConfig)).success).toBe(
      true,
    )
  })

  it("carries no person-shaped key or text", () => {
    const documents = generateSyntheticCorpus(committedConfig)

    expect(collectKeys(documents).filter((key) => sensitiveKeyPattern.test(key))).toEqual(
      [],
    )

    for (const document of documents) {
      expect(findPersonalDataShape(document.text)).toBeUndefined()
    }
  })

  it("contains no personal names", () => {
    for (const document of generateSyntheticCorpus(committedConfig)) {
      for (const name of forbiddenNames) {
        expect(document.text).not.toMatch(new RegExp(`\\b${name}\\b`))
      }
    }
  })

  it("never pairs a declarative-only complement with an interrogative subject in the generated corpus", () => {
    // Scans the actual generated document text across a few different
    // seeds/configs, as a check on the real shipped output. This is a
    // sample, not a proof: it only inspects pairings the given seeds
    // happen to produce. The next test is the exhaustive, durable guard.
    for (const config of [committedConfig, contrastingConfig, unevenConfig]) {
      const documents = generateSyntheticCorpus(config)

      const offending = documents.flatMap((document) => {
        const matched = findForbiddenComplementMatch(document.text)
        return matched
          ? [`${document.id} (matched /${matched.source}/i): "${document.text}"`]
          : []
      })

      expect(offending).toEqual([])
    }
  })

  it("composes every authored stance framing, theme subject, and theme template into grammatical text", () => {
    // Exhaustive check at the source, routed through the generator's own
    // substitution (`fillTemplate`), not an approximation of it: every
    // `stanceFraming` entry x every `themeSubjects` entry x every
    // `themeTemplates` entry for that theme (4 stances x 4 framings x 6
    // themes x 6 subjects x 4 templates = 2304 combinations), independent of
    // the generator and of any seed. A bad combination cannot hide behind
    // seed luck here, which is what makes this guard durable rather than
    // sampled.
    //
    // Composing only `${framing} ${subject}` (as this guard once did) is
    // blind to the whole `themeTemplates` tail -- ", and asked...", ", and
    // suggested...", ", and warned..." -- which is exactly where a
    // non-agentive framing subject ("Views differed on...") produces "Views
    // ... asked", a subject that cannot perform the verb. Routing through the
    // real template closes that gap.
    const offending: string[] = []

    for (const stance of corpusStanceValues) {
      for (const framing of stanceFraming[stance]) {
        for (const theme of corpusThemeValues) {
          for (const subject of themeSubjects[theme]) {
            for (const template of themeTemplates[theme]) {
              const composed = fillTemplate(template, framing, subject)

              // A mistyped placeholder (e.g. `{framming}`) would otherwise
              // ship a literal brace into public prose with nothing to catch
              // it.
              if (composed.includes("{") || composed.includes("}")) {
                offending.push(
                  `stance="${stance}" theme="${theme}" template="${template}" left an unfilled placeholder: "${composed}"`,
                )
                continue
              }

              const matched = findForbiddenComplementMatch(composed)

              if (matched) {
                offending.push(
                  `stance="${stance}" theme="${theme}" framing="${framing}" subject="${subject}" template="${template}" (matched /${matched.source}/i): "${composed}"`,
                )
              }
            }
          }
        }
      }
    }

    expect(offending).toEqual([])
  })

  it("gives every stance framing an agent subject that can perform the template's chained verb", () => {
    // Every `themeTemplates` entry chains a second verb onto the same,
    // elided subject as the framing ("{framing} {subject}, and asked...",
    // ", and suggested...", ", and warned..."). A framing opening with a
    // non-agentive subject reads fine on its own ("Views differed on
    // whether...") but produces "Views ... asked" once the template's tail
    // is attached, and views cannot ask. Checking this directly against
    // `stanceFraming`, independent of any template or subject, fails a
    // future non-agentive framing at authoring time rather than only in a
    // generated fixture.
    const agentSubjectPattern =
      /^(Respondents|Several responses|A number of responses|There was broad agreement)\b/

    const offending = corpusStanceValues.flatMap((stance) =>
      stanceFraming[stance]
        .filter((framing) => !agentSubjectPattern.test(framing))
        .map(
          (framing) =>
            `stance="${stance}" framing="${framing}" does not open with an agent subject`,
        ),
    )

    expect(offending).toEqual([])
  })

  it("gives every document distinct text", () => {
    const texts = generateSyntheticCorpus(committedConfig).map(
      (document) => document.text,
    )

    expect(new Set(texts).size).toBe(texts.length)
  })

  it("rejects every invalid configuration, naming the field", () => {
    const cases: [Partial<SyntheticCorpusConfig>, RegExp][] = [
      [{ seed: 1.5 }, /seed/],
      [{ seed: -1 }, /seed/],
      [{ size: 0 }, /size/],
      [{ size: 4.2 }, /size/],
      [{ size: 10_000 }, /size/],
      [
        { themeWeights: { ...equalWeights, accountability: 0 } },
        /themeWeights/,
      ],
      [
        { themeWeights: { ...equalWeights, accountability: -2 } },
        /themeWeights/,
      ],
    ]

    for (const [override, message] of cases) {
      expect(() =>
        generateSyntheticCorpus({ ...committedConfig, ...override }),
      ).toThrow(message)
    }
  })

  it("reproduces the committed fixture byte for byte", () => {
    // Read raw bytes rather than importing the JSON: an import parses the file
    // and destroys the exact formatting the recorded hash is taken over.
    const committed = readFileSync(
      "content/playbooks/policy-evidence/fixtures/synthetic/corpus.json",
      "utf8",
    )

    expect(`${JSON.stringify(generateSyntheticCorpus(committedConfig), null, 2)}\n`).toBe(
      committed,
    )
  })
})
