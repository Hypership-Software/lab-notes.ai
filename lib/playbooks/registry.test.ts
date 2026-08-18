import { describe, expect, it } from "vitest"

import { definePlaybook } from "./define-playbook"
import { createPlaybookRegistry } from "./registry"
import type { PlaybookInput } from "./schema"

function makePlaybook(slug: string, title: string) {
  const input = {
    schemaVersion: 1,
    slug,
    title,
    summary: `A bounded assessment for ${title.toLowerCase()} in a public-service context.`,
    sector: "Public services",
    tags: ["assessment"],
    technicalPatterns: ["decision-support"],
    problem: "A public-service team needs a clearer and more inspectable evidence process.",
    intendedUsers: ["Public-service delivery teams"],
    affectedGroups: ["People who use the relevant public service"],
    supportedDecision: "Whether the proposed pattern deserves further investigation.",
    publicBenefit: "Make early discovery more transparent and easier to scrutinise.",
    maturity: "assessed",
    dataAccessibility: "unknown",
    risk: {
      level: "moderate",
      reasons: ["The assessment may omit important domain or community knowledge."],
      mitigations: ["Require specialist and affected-community review before development."],
    },
    officialSources: [
      {
        id: `${slug}-source`,
        publisher: "Public authority",
        jurisdiction: "Northern Ireland",
        title: `${title} public source`,
        canonicalUrl: `https://example.gov/${slug}`,
        sourceType: "strategy",
        coveredPeriod: "Current published material",
        accessedAt: "2026-08-18",
        reuseStatus: "Publicly viewable; redistribution status requires confirmation.",
        purpose: "Establish the problem statement and realistic public-service context.",
        transformations: [],
        caveats: ["This source record does not imply permission for bulk reuse."],
      },
    ],
    syntheticData: {
      status: "planned",
      label: "Synthetic working data",
      method: "Create deterministic invented records only after the source structure is verified.",
      sourceCharacteristics: ["Expected structure"],
      approximations: ["No distribution is claimed at assessment stage."],
      alterations: ["All future records will use invented identifiers."],
      exclusions: ["Personal and sensitive person-level data"],
      limitations: ["No synthetic fixture exists at the assessed maturity stage."],
    },
    nonAiBaseline: {
      name: "Structured manual review",
      description: "A person follows a documented checklist against the same evidence.",
      method: "Review each source and record findings in a consistent structured template.",
      limitations: ["Manual review can be slow and inconsistent without quality assurance."],
    },
    evaluation: {
      status: "not-run",
      questions: ["Would the proposed approach improve the decision without obscuring evidence?"],
      metrics: [],
      limitations: ["No result exists to evaluate at the assessed maturity stage."],
      reason: "The playbook documents an assessed concept rather than an implemented result.",
    },
    humanOversight: {
      responsibleRole: "Responsible public-service lead",
      reviewPoint: "Before the concept advances beyond problem and data discovery.",
      escalation: "Refer consequential or sensitive questions to the appropriate specialist.",
      redress: "Correct the assessment and document why the earlier claim was unsupported.",
    },
    limitations: ["This is an early assessment and not evidence of service effectiveness."],
    failureModes: ["A plausible technical pattern may distract from a service-design problem."],
    nextValidationSteps: ["Verify the problem, source access, and safeguards with domain partners."],
    implementation: {
      summary: "A static assessed playbook with no runtime model or data integration.",
      architecture: "Typed content rendered through the shared Next.js playbook detail route.",
      inputs: ["Public source register"],
      outputs: ["Problem and feasibility assessment"],
      reusableParts: ["Shared playbook contract"],
      partnerRequirements: ["Domain review", "Source access review"],
    },
    references: [],
    demo: {
      availability: "none",
      reason: "The concept has not met the evidence and data gate for a recorded demonstration.",
    },
    lastReviewed: "2026-08-18",
  } satisfies PlaybookInput

  return definePlaybook(input)
}

describe("createPlaybookRegistry", () => {
  const zeta = makePlaybook("zeta-service", "Zeta Service")
  const alpha = makePlaybook("alpha-service", "Alpha Service")

  it("uses a stable alphabetical fallback order", () => {
    const registry = createPlaybookRegistry([zeta, alpha])

    expect(registry.getPlaybookSlugs()).toEqual(["alpha-service", "zeta-service"])
  })

  it("rejects duplicate slugs", () => {
    expect(() => createPlaybookRegistry([alpha, alpha])).toThrow(
      'Duplicate playbook slug "alpha-service"',
    )
  })

  it("returns frozen arrays", () => {
    const registry = createPlaybookRegistry([alpha])
    const playbooks = registry.getAllPlaybooks()

    expect(Object.isFrozen(playbooks)).toBe(true)
    expect(() =>
      (playbooks as Array<typeof alpha>).push(zeta),
    ).toThrowError(TypeError)
  })

  it("looks up a known playbook and returns undefined for an unknown slug", () => {
    const registry = createPlaybookRegistry([alpha])

    expect(registry.getPlaybook("alpha-service")).toBe(alpha)
    expect(registry.getPlaybook("missing-service")).toBeUndefined()
  })

  it("projects searchable catalogue summaries without the source register", () => {
    const registry = createPlaybookRegistry([alpha])
    const [summary] = registry.getPlaybookSummaries()

    expect(summary).toMatchObject({
      slug: "alpha-service",
      title: "Alpha Service",
      problem:
        "A public-service team needs a clearer and more inspectable evidence process.",
      maturity: "assessed",
    })
    expect(summary).not.toHaveProperty("officialSources")
    expect(Object.isFrozen(registry.getPlaybookSummaries())).toBe(true)
  })
})
