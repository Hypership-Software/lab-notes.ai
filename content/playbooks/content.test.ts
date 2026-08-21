import { describe, expect, it } from "vitest"

import { getAllPlaybooks } from "@/lib/playbooks/registry"
import { sensitiveKeyPattern } from "@/lib/privacy-patterns"

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

describe("playbook inventory", () => {
  const playbooks = getAllPlaybooks()

  it("contains exactly the seventeen expected playbooks", () => {
    expect(playbooks.map((playbook) => playbook.slug)).toEqual(expectedSlugs)
  })

  it("has exactly one available demo, on policy-evidence", () => {
    const withDemo = playbooks.filter((playbook) => playbook.demo.status === "available")
    expect(withDemo.map((playbook) => playbook.slug)).toEqual(["policy-evidence"])
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
