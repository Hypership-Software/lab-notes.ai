import { describe, expect, it } from "vitest"

import { getOpportunityAtlasItems } from "./atlas-model"

describe("getOpportunityAtlasItems", () => {
  it("joins research, starter-data, area, and skill metadata", () => {
    const item = getOpportunityAtlasItems().find(
      (entry) => entry.slug === "life-event-services",
    )

    expect(item).toMatchObject({
      serviceArea: "Citizen services and government",
      dataSourceCount: 2,
      dataset: { status: "available", recordCount: 16 },
      buildPartner: { invocation: "$build-life-event-services" },
    })
  })

  it("keeps all seventeen opportunities visible", () => {
    expect(getOpportunityAtlasItems()).toHaveLength(17)
  })
})
