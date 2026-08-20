import { readFile } from "node:fs/promises"

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
    // No playbook may claim a recorded demonstration: none has been recorded.
    // A baseline demonstration is a weaker claim and does not move maturity.
    expect(
      playbooks.every((playbook) => playbook.demo.availability !== "recorded"),
    ).toBe(true)
  })

  it("publishes a demonstration only where a baseline can actually run", () => {
    const withDemo = getAllPlaybooks().filter(
      (playbook) => playbook.demo.availability !== "none",
    )

    expect(withDemo.map((playbook) => playbook.slug)).toEqual(["policy-evidence"])
    expect(withDemo[0]?.demo.availability).toBe("baseline-only")
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

  it("declares the policy-evidence dataset available without claiming an AI demonstration", () => {
    const playbook = getAllPlaybooks().find(
      (candidate) => candidate.slug === "policy-evidence",
    )

    expect(playbook?.syntheticData.status).toBe("available")
    // A baseline demonstration runs no model, so it is not evidence of one and
    // does not move maturity off `assessed`.
    expect(playbook?.maturity).toBe("assessed")
    expect(playbook?.demo.availability).toBe("baseline-only")
  })

  it("keeps every other playbook's synthetic data planned", () => {
    const others = getAllPlaybooks().filter(
      (candidate) => candidate.slug !== "policy-evidence",
    )

    expect(others).toHaveLength(16)
    expect(others.every((playbook) => playbook.syntheticData.status === "planned")).toBe(
      true,
    )
  })

  it("does not describe the policy-evidence corpus in the conditional future", () => {
    const playbook = getAllPlaybooks().find(
      (candidate) => candidate.slug === "policy-evidence",
    )
    const synthetic = playbook?.syntheticData

    const prose = [
      synthetic?.method,
      ...(synthetic?.approximations ?? []),
      ...(synthetic?.alterations ?? []),
      ...(synthetic?.limitations ?? []),
      playbook?.implementation.summary,
      playbook?.demo.availability === "none" ? playbook.demo.reason : undefined,
    ].filter((value): value is string => typeof value === "string")

    for (const sentence of prose) {
      expect(sentence).not.toMatch(/\bwould be\b|\bfuture proof of concept\b/i)
      expect(sentence).not.toMatch(/no synthetic dataset exists/i)
    }
  })

  it("keeps the structure note's honesty claims intact", async () => {
    // The note's authorship statement and its citation of the source it was
    // informed by are load-bearing for the provenance contract: nothing else
    // machine-checks that a future edit does not quietly turn this into (or
    // leave it reading as) an official-source extract. Content validation only
    // proves the file is readable, so this is the check on what it says.
    const note = await readFile(
      "content/playbooks/policy-evidence/consultation-analysis-structure.md",
      "utf8",
    )

    expect(note).toMatch(/this note is written by this project/i)
    expect(note).toContain("circular-economy-consultation-report")
  })
})
