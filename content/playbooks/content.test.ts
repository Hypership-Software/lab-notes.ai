import { describe, expect, it } from "vitest"

import { getAllPlaybooks, getPlaybookSlugs } from "@/lib/playbooks/registry"
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
  /\b(guarantees?|proven|will (?:save|improve|reduce)|better outcomes?|transformative)\b/i

function collectKeys(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectKeys)
  if (!value || typeof value !== "object") return []

  return Object.entries(value).flatMap(([key, child]) => [key, ...collectKeys(child)])
}

describe("playbook content inventory", () => {
  it("contains the exact seventeen strategy use cases", () => {
    expect(getPlaybookSlugs()).toEqual(expectedSlugs)
  })

  it("keeps every entry assessed until a demonstration is fully recorded", () => {
    const playbooks = getAllPlaybooks()

    expect(playbooks).toHaveLength(17)
    expect(playbooks.every((playbook) => playbook.maturity === "assessed")).toBe(
      true,
    )
    expect(
      playbooks.every((playbook) => playbook.demo.availability === "none"),
    ).toBe(true)
  })

  it("keeps violence-risk research assessment-only and very high risk", () => {
    const playbook = getAllPlaybooks().find(
      (candidate) => candidate.slug === "violence-risk-research",
    )

    expect(playbook?.risk.level).toBe("very-high")
    expect(playbook?.demo.availability).toBe("none")
  })

  it("does not publish banned outcome claims or sensitive metadata shapes", () => {
    for (const playbook of getAllPlaybooks()) {
      expect(playbook.publicBenefit).not.toMatch(bannedClaimPattern)
      expect(collectKeys(playbook).filter((key) => sensitiveKeyPattern.test(key))).toEqual(
        [],
      )
    }
  })
})
