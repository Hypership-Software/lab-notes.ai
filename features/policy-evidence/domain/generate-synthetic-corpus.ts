import { stanceFraming, themeSubjects, themeTemplates } from "./corpus-fragments"
import {
  corpusStanceValues,
  corpusThemeValues,
  type CorpusDocument,
  type CorpusStance,
  type CorpusTheme,
  type SyntheticCorpusConfig,
} from "./types"

/** Identifiers are zero-padded to four digits, so this is the hard ceiling. */
const maxCorpusSize = 9_999

/** Bounded redraws before a thin fragment pool is reported rather than hidden. */
const maxTextAttempts = 64

/**
 * Deterministic pseudo-random generator, authored here so that no dependency
 * version can ever change committed fixture bytes. It relies only on
 * `Math.imul` and IEEE 754 doubles, both of which are exact across platforms
 * and Node versions.
 */
function mulberry32(seed: number): () => number {
  let state = seed | 0

  return () => {
    state = (state + 0x6d2b79f5) | 0
    let value = Math.imul(state ^ (state >>> 15), state | 1)
    value = (value + Math.imul(value ^ (value >>> 7), value | 61)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296
  }
}

/**
 * Largest-remainder apportionment. Produces integer counts that sum exactly to
 * `total`: every key takes its floor, then leftover slots go to the largest
 * fractional remainders, with ties broken by declaration order so the result
 * never depends on sort stability.
 *
 * Because every remainder is below one, the leftover is always fewer than the
 * number of keys, so one pass distributes all of it.
 */
function apportion<T extends string>(
  keys: readonly T[],
  weights: Record<T, number>,
  total: number,
): Record<T, number> {
  const weightTotal = keys.reduce((sum, key) => sum + weights[key], 0)

  const quotas = keys.map((key, index) => {
    const exact = (weights[key] / weightTotal) * total
    const floor = Math.floor(exact)
    return { key, index, floor, remainder: exact - floor }
  })

  const counts = Object.fromEntries(
    quotas.map((quota) => [quota.key, quota.floor]),
  ) as Record<T, number>

  let assigned = quotas.reduce((sum, quota) => sum + quota.floor, 0)

  const byRemainder = [...quotas].sort(
    (left, right) => right.remainder - left.remainder || left.index - right.index,
  )

  for (const quota of byRemainder) {
    if (assigned >= total) break
    counts[quota.key] += 1
    assigned += 1
  }

  return counts
}

function assertValidConfig(config: SyntheticCorpusConfig): void {
  if (!Number.isInteger(config.seed) || config.seed < 0) {
    throw new Error("seed: expected a non-negative integer")
  }

  if (!Number.isInteger(config.size)) {
    throw new Error("size: expected an integer")
  }

  if (config.size < 1) {
    throw new Error("size: expected at least one document")
  }

  if (config.size > maxCorpusSize) {
    throw new Error(
      `size: expected at most ${maxCorpusSize} documents, because identifiers are zero-padded to four digits`,
    )
  }

  for (const theme of corpusThemeValues) {
    const weight = config.themeWeights[theme]

    if (!Number.isFinite(weight) || weight <= 0) {
      throw new Error(`themeWeights: "${theme}" must be greater than zero`)
    }
  }
}

/** Fisher-Yates, driven entirely by the seeded stream. */
function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const held = result[index]
    result[index] = result[swap]
    result[swap] = held
  }

  return result
}

function pick<T>(items: readonly T[], random: () => number): T {
  return items[Math.floor(random() * items.length)]
}

function composeText(
  theme: CorpusTheme,
  stance: CorpusStance,
  random: () => number,
): string {
  return pick(themeTemplates[theme], random)
    .replace("{framing}", pick(stanceFraming[stance], random))
    .replace("{subject}", pick(themeSubjects[theme], random))
}

export function generateSyntheticCorpus(
  config: SyntheticCorpusConfig,
): CorpusDocument[] {
  assertValidConfig(config)

  const themeCounts = apportion(corpusThemeValues, config.themeWeights, config.size)

  // Exactness is not coverage. A low weight can legitimately floor to zero, but
  // a corpus that silently omits a configured theme misrepresents itself.
  for (const theme of corpusThemeValues) {
    if (themeCounts[theme] === 0) {
      throw new Error(
        `themeWeights: "${theme}" has a positive weight but was allocated no documents at size ${config.size}`,
      )
    }
  }

  const uniformStanceWeights = Object.fromEntries(
    corpusStanceValues.map((stance) => [stance, 1]),
  ) as Record<CorpusStance, number>

  const stanceCounts = apportion(corpusStanceValues, uniformStanceWeights, config.size)

  const random = mulberry32(config.seed)

  const themePool = shuffle(
    corpusThemeValues.flatMap((theme) =>
      Array.from({ length: themeCounts[theme] }, () => theme),
    ),
    random,
  )

  const stancePool = shuffle(
    corpusStanceValues.flatMap((stance) =>
      Array.from({ length: stanceCounts[stance] }, () => stance),
    ),
    random,
  )

  const seenText = new Set<string>()

  const documents = themePool.map((theme, index) => {
    const stance = stancePool[index]

    let text = composeText(theme, stance, random)
    let attempts = 1

    while (seenText.has(text)) {
      if (attempts >= maxTextAttempts) {
        throw new Error(
          `corpus-fragments: could not compose distinct text for "${theme}" and "${stance}" after ${maxTextAttempts} attempts; add fragments`,
        )
      }

      text = composeText(theme, stance, random)
      attempts += 1
    }

    seenText.add(text)

    return {
      id: `SYN-${String(index + 1).padStart(4, "0")}`,
      synthetic: true as const,
      disclosure: "Synthetic working data" as const,
      theme,
      stance,
      text,
    }
  })

  return documents.sort((left, right) => left.id.localeCompare(right.id))
}
