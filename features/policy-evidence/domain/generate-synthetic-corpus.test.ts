import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { sensitiveKeyPattern, findPersonalDataShape } from "@/lib/privacy-patterns"

import { generateSyntheticCorpus } from "./generate-synthetic-corpus"
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
