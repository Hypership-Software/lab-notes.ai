import { readFile } from "node:fs/promises"

import { describe, expect, it } from "vitest"

import { syntheticDatasetSchema } from "@/lib/playbooks/dataset"
import { getAllPlaybooks } from "@/lib/playbooks/registry"
import { findPersonalDataShape, sensitiveKeyPattern } from "@/lib/privacy-patterns"

const expectedSlugs = [
  "adaptive-tutoring",
  "community-participation",
  "diagnostic-imaging-support",
  "earth-observation",
  "farm-advisory",
  "health-operations",
  "housing-insight",
  "justice-research",
  "lesson-planning-feedback",
  "life-event-services",
  "offender-learning",
  "policy-evidence",
  "road-maintenance",
  "traffic-flow",
  "violence-risk-research",
  "wastewater-monitoring",
  "water-management",
]

const bannedClaimPattern =
  /\b(guarantee[sd]?|proven|revolutioni[sz]e[sd]?|eliminat(?:es?|ed)|world-class|cutting[- ]edge)\b/i

function collectKeys(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectKeys)
  if (!value || typeof value !== "object") return []
  return Object.entries(value).flatMap(([key, child]) => [key, ...collectKeys(child)])
}

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (!value || typeof value !== "object") return []
  return Object.values(value).flatMap(collectStrings)
}

describe("playbook inventory", () => {
  const playbooks = getAllPlaybooks()

  it("contains exactly the seventeen expected playbooks", () => {
    expect(playbooks.map((playbook) => playbook.slug)).toEqual(expectedSlugs)
  })

  it("ships seventeen complete accelerator playbooks", () => {
    expect(playbooks).toHaveLength(17)

    for (const playbook of playbooks) {
      expect(playbook.schemaVersion).toBe(3)
      expect(playbook.dataSources.length).toBeGreaterThan(0)
      expect(playbook.caveats.length).toBeGreaterThan(0)
      expect("demo" in playbook).toBe(false)
    }
  })

  it("keeps available starter-data copy concise and separated by purpose", () => {
    for (const playbook of playbooks) {
      if (playbook.syntheticData.status !== "available") continue
      expect(playbook.syntheticData.purpose.length).toBeLessThanOrEqual(240)
      expect(playbook.syntheticData.preparation.length).toBeLessThanOrEqual(240)
      expect(playbook.syntheticData.purpose).not.toBe(playbook.syntheticData.preparation)
    }
  })

  it("answers C on every playbook, with datasets at the conventional path", () => {
    for (const playbook of playbooks) {
      if (playbook.syntheticData.status === "available") {
        expect(playbook.syntheticData.dataPath).toBe(
          `content/playbooks/${playbook.slug}/${playbook.slug}.data.json`,
        )
      } else {
        expect(playbook.syntheticData.reason.length).toBeGreaterThan(10)
      }
    }
  })

  it("keeps sensitive domains dataset-free", () => {
    for (const slug of ["violence-risk-research", "diagnostic-imaging-support"]) {
      const playbook = playbooks.find((candidate) => candidate.slug === slug)
      expect(playbook?.syntheticData.status).toBe("not-responsible")
    }
  })

  it("makes no marketing claims in summaries or proposals", () => {
    for (const playbook of playbooks) {
      expect(playbook.summary).not.toMatch(bannedClaimPattern)
      expect(playbook.strategyExample.proposal).not.toMatch(bannedClaimPattern)
    }
  })

  it("carries no person-shaped metadata keys", () => {
    for (const playbook of playbooks) {
      expect(collectKeys(playbook).filter((key) => sensitiveKeyPattern.test(key))).toEqual([])
    }
  })
})

/**
 * The committed datasets, checked from the paths the playbooks declare. Reading
 * each file here is also the check that a declared `dataPath` still points at
 * something: the detail route prints that path and the demo reads the file, so
 * a renamed dataset is a broken page rather than a typecheck error.
 */
describe("synthetic datasets", () => {
  const withDataset = getAllPlaybooks().flatMap((playbook) =>
    playbook.syntheticData.status === "available"
      ? [{ slug: playbook.slug, dataPath: playbook.syntheticData.dataPath }]
      : [],
  )

  async function readDataset(dataPath: string) {
    return syntheticDatasetSchema.parse(JSON.parse(await readFile(dataPath, "utf8")))
  }

  it("ships one for every playbook that claims one", () => {
    expect(withDataset).toHaveLength(15)
  })

  it.each(withDataset)("$slug parses through the shared envelope", async ({ dataPath }) => {
    const dataset = await readDataset(dataPath)

    expect(dataset.disclosure).toBe("Synthetic working data")
    expect(dataset.records.length).toBeGreaterThan(0)
  })

  it.each(withDataset)("$slug holds no person-shaped data", async ({ dataPath }) => {
    const dataset = await readDataset(dataPath)

    expect(collectKeys(dataset).filter((key) => sensitiveKeyPattern.test(key))).toEqual([])
    expect(
      collectStrings(dataset)
        .map((text) => findPersonalDataShape(text))
        .filter((shape) => shape !== undefined),
    ).toEqual([])
  })
})
