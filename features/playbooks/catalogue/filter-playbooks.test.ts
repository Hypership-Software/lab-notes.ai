import { describe, expect, it } from "vitest"

import { getPlaybookSummaries } from "@/lib/playbooks/registry"

import {
  parseCatalogueQuery,
  serializeCatalogueQuery,
  type CatalogueQuery,
} from "./catalogue-query"
import { filterPlaybooks } from "./filter-playbooks"
import { getCatalogueFilterOptions } from "./filter-options"

const emptyQuery: CatalogueQuery = {
  query: "",
  sectors: [],
  patterns: [],
  dataAccessibility: [],
  maturity: [],
  risk: [],
}

describe("catalogue query and filtering", () => {
  const summaries = getPlaybookSummaries()

  it("matches text case-insensitively across narrative and tags", () => {
    expect(
      filterPlaybooks(summaries, { ...emptyQuery, query: "GRIEF" }).map(
        (playbook) => playbook.slug,
      ),
    ).toEqual(["life-event-services"])

    expect(
      filterPlaybooks(summaries, { ...emptyQuery, query: "PRECISION-AGRICULTURE" }).map(
        (playbook) => playbook.slug,
      ),
    ).toEqual(["farm-advisory"])
  })

  it("normalises diacritics for search", () => {
    const [summary] = summaries
    const accented = [{ ...summary, title: "Café evidence review" }]

    expect(filterPlaybooks(accented, { ...emptyQuery, query: "cafe" })).toHaveLength(1)
  })

  it("uses OR within a filter group and AND across groups", () => {
    expect(
      filterPlaybooks(summaries, {
        ...emptyQuery,
        sectors: ["Health", "Education"],
      }),
    ).toHaveLength(4)

    expect(
      filterPlaybooks(summaries, {
        ...emptyQuery,
        sectors: ["Health"],
        risk: ["moderate"],
      }),
    ).toEqual([])
  })

  it("keeps repeated valid values and ignores invalid enum values", () => {
    expect(
      parseCatalogueQuery({
        q: "  road  ",
        sector: ["Transport", "Health"],
        data: ["open", "not-a-value", "partial"],
        maturity: ["assessed", "imagined"],
        risk: ["moderate", "unknown"],
      }),
    ).toEqual({
      query: "road",
      sectors: ["Transport", "Health"],
      patterns: [],
      dataAccessibility: ["open", "partial"],
      maturity: ["assessed"],
      risk: ["moderate"],
    })
  })

  it("caps text queries and round-trips serialised values", () => {
    const query: CatalogueQuery = {
      query: "x".repeat(140),
      sectors: ["Health", "Education"],
      patterns: ["forecasting"],
      dataAccessibility: ["partial"],
      maturity: ["assessed"],
      risk: ["high", "moderate"],
    }
    const serialised = serializeCatalogueQuery(query)
    const searchParams = Object.fromEntries(
      [...new Set(serialised.keys())].map((key) => {
        const values = serialised.getAll(key)
        return [key, values.length === 1 ? values[0] : values]
      }),
    )
    const parsed = parseCatalogueQuery(searchParams)

    expect(parsed).toEqual({ ...query, query: "x".repeat(120) })
  })

  it("returns zero results without mutating input and uses stable default order", () => {
    const before = summaries.map((summary) => summary.slug)
    const ordered = filterPlaybooks(summaries, emptyQuery)

    expect(filterPlaybooks(summaries, { ...emptyQuery, query: "no-such-playbook" })).toEqual(
      [],
    )
    expect(ordered[0]?.slug).toBe("earth-observation")
    expect(ordered.slice(1, 3).map((playbook) => playbook.slug)).toEqual([
      "community-participation",
      "policy-evidence",
    ])
    expect(summaries.map((summary) => summary.slug)).toEqual(before)
    expect(ordered).not.toBe(summaries)
  })

  it("derives filter options and inventory counts from content", () => {
    const options = getCatalogueFilterOptions(summaries)

    expect(options.sectors.find((option) => option.value === "Health")).toMatchObject({
      label: "Health",
      count: 2,
    })
    expect(
      options.risk.find((option) => option.value === "very-high"),
    ).toMatchObject({ count: 1 })
  })
})
