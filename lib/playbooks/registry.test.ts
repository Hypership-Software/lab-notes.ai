import { describe, expect, it } from "vitest"

import { definePlaybook } from "./define-playbook"
import { createPlaybookRegistry } from "./registry"
import type { PlaybookInput } from "./schema"

function makePlaybook(slug: string, title: string) {
  const input = {
    schemaVersion: 3,
    slug,
    title,
    summary: `A bounded assessment for ${title.toLowerCase()} in a public-service context.`,
    sector: "Cross-government",
    strategyExample: {
      proposal: "The draft strategy names this pattern as a potential public-service application.",
      draftReference: "Table 2 — potential public-service applications",
      url: `https://example.gov/${slug}`,
    },
    dataSources: [
      {
        id: `${slug}-source`,
        publisher: "Public authority",
        title: `${title} public source`,
        url: `https://example.gov/${slug}/source`,
        covers: "The published material relevant to this example.",
        access: "open",
        relevance: "It grounds the problem statement in a real public-service document.",
      },
    ],
    syntheticData: {
      status: "not-responsible",
      reason: "A useful stand-in would still be shaped like real, sensitive records.",
      whatContributorsNeed: "Formal research access agreed with the responsible data owner.",
    },
    caveats: [{
      title: "Early exploration only",
      detail: "This is an early example and not evidence of service effectiveness.",
    }],
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

  it("projects compact atlas summaries without the source register", () => {
    const registry = createPlaybookRegistry([alpha])
    const [summary] = registry.getPlaybookSummaries()
    const removedShowcaseField = ["de", "mo"].join("")

    expect(summary).toMatchObject({
      slug: "alpha-service",
      title: "Alpha Service",
      sector: "Cross-government",
    })
    expect(summary).not.toHaveProperty("strategyExample")
    expect(summary).not.toHaveProperty(removedShowcaseField)
    expect(summary).not.toHaveProperty("dataSources")
    expect(summary).not.toHaveProperty("caveats")
    expect(summary.dataSourceCount).toBe(1)
    expect(Object.isFrozen(registry.getPlaybookSummaries())).toBe(true)
  })
})
