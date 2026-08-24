import { describe, expect, it } from "vitest"

import { getPlaybookSummaries } from "@/lib/playbooks/registry"

import {
  parseCatalogueQuery,
  serializeCatalogueQuery,
  type CatalogueQuery,
} from "./catalogue-query"
import { getCatalogueFilterOptions } from "./filter-options"
import { filterPlaybooks } from "./filter-playbooks"

const emptyQuery: CatalogueQuery = { query: "", sectors: [] }

const slugsOf = (playbooks: readonly { slug: string }[]) =>
  playbooks.map((playbook) => playbook.slug)

describe("catalogue query and filtering", () => {
  const summaries = getPlaybookSummaries()

  it("searches title, summary, and sector, ignoring case", () => {
    // One term per searched field, so a field dropped from the haystack
    // fails this test rather than silently narrowing what search can find.
    expect(
      slugsOf(filterPlaybooks(summaries, { ...emptyQuery, query: "WORKBENCH" })),
    ).toEqual(["policy-evidence"])
    expect(
      slugsOf(filterPlaybooks(summaries, { ...emptyQuery, query: "curriculum" })),
    ).toEqual(["lesson-planning-feedback"])
    expect(
      slugsOf(
        filterPlaybooks(summaries, { ...emptyQuery, query: "Citizen Services" }),
      ),
    ).toEqual(["life-event-services"])
  })

  it("normalises diacritics for search", () => {
    const accented = [{ ...summaries[0], title: "Café evidence review" }]

    expect(
      filterPlaybooks(accented, { ...emptyQuery, query: "cafe" }),
    ).toHaveLength(1)
    expect(
      filterPlaybooks(accented, { ...emptyQuery, query: "café" }),
    ).toHaveLength(1)
  })

  it("uses OR within the sector group and AND across search and sector", () => {
    expect(
      slugsOf(
        filterPlaybooks(summaries, {
          ...emptyQuery,
          sectors: ["Health", "Education"],
        }),
      ),
    ).toEqual([
      "adaptive-tutoring",
      "diagnostic-imaging-support",
      "health-operations",
      "lesson-planning-feedback",
    ])

    expect(
      slugsOf(
        filterPlaybooks(summaries, {
          query: "practice tool",
          sectors: ["Education"],
        }),
      ),
    ).toEqual(["adaptive-tutoring"])
  })

  it("keeps repeated sector params and drops values no playbook uses", () => {
    expect(
      parseCatalogueQuery({
        q: "  road  ",
        sector: ["Transport", "Kingdom of Mourne", "Health", "Transport"],
      }),
    ).toEqual({ query: "road", sectors: ["Transport", "Health"] })
  })

  it("ignores parameters the catalogue no longer offers", () => {
    expect(
      parseCatalogueQuery({ maturity: "assessed", risk: "high", pattern: "rag" }),
    ).toEqual(emptyQuery)
  })

  it("caps text queries at 120 characters and round-trips serialised values", () => {
    const query: CatalogueQuery = {
      query: "x".repeat(140),
      sectors: ["Health", "Education"],
    }
    const serialised = serializeCatalogueQuery(query)
    const searchParams = Object.fromEntries(
      [...new Set(serialised.keys())].map((key) => {
        const values = serialised.getAll(key)
        return [key, values.length === 1 ? values[0] : values]
      }),
    )

    expect(parseCatalogueQuery(searchParams)).toEqual({
      ...query,
      query: "x".repeat(120),
    })
  })

  it("orders playbooks by title", () => {
    expect(slugsOf(filterPlaybooks(summaries, emptyQuery))).toEqual([
      "adaptive-tutoring",
      "community-participation",
      "diagnostic-imaging-support",
      "earth-observation",
      "farm-advisory",
      "health-operations",
      "housing-insight",
      "life-event-services",
      "justice-research",
      "offender-learning",
      "lesson-planning-feedback",
      "policy-evidence",
      "road-maintenance",
      "traffic-flow",
      "violence-risk-research",
      "wastewater-monitoring",
      "water-management",
    ])
  })

  it("returns an empty array for no match and never mutates its input", () => {
    const before = slugsOf(summaries)
    const ordered = filterPlaybooks(summaries, emptyQuery)

    expect(
      filterPlaybooks(summaries, { ...emptyQuery, query: "no-such-playbook" }),
    ).toEqual([])
    expect(slugsOf(summaries)).toEqual(before)
    expect(ordered).not.toBe(summaries)
  })

  it("derives sector options and inventory counts from the content itself", () => {
    const options = getCatalogueFilterOptions(summaries)

    expect(Object.keys(options)).toEqual(["sectors"])
    expect(options.sectors).toHaveLength(13)
    expect(options.sectors[0]).toEqual({
      value: "Agriculture",
      label: "Agriculture",
      count: 1,
    })
    expect(
      options.sectors.find((option) => option.value === "Health"),
    ).toEqual({ value: "Health", label: "Health", count: 2 })
    expect(
      options.sectors.reduce((total, option) => total + option.count, 0),
    ).toBe(summaries.length)
  })
})
