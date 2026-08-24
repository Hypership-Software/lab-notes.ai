import { describe, expect, it } from "vitest"

import { getPlaybookSummaries } from "./registry"
import { sectorValues } from "./schema"
import {
  getServiceArea,
  serviceAreaDescriptions,
  serviceAreaValues,
} from "./service-area"

describe("service areas", () => {
  it("maps every sector in the vocabulary to a known area", () => {
    for (const sector of sectorValues) {
      expect(serviceAreaValues).toContain(getServiceArea(sector))
    }
  })

  it("describes every area", () => {
    for (const area of serviceAreaValues) {
      expect(serviceAreaDescriptions[area].length).toBeGreaterThan(20)
    }
  })

  it("lists areas alphabetically so the order carries no ranking", () => {
    const sorted = [...serviceAreaValues].sort((left, right) =>
      left.localeCompare(right, "en-GB"),
    )
    expect([...serviceAreaValues]).toEqual(sorted)
  })

  it("leaves no area holding a single playbook", () => {
    const counts = new Map<string, number>()
    for (const playbook of getPlaybookSummaries()) {
      const area = getServiceArea(playbook.sector)
      counts.set(area, (counts.get(area) ?? 0) + 1)
    }

    expect(counts.size).toBe(serviceAreaValues.length)
    for (const [area, count] of counts) {
      expect(count, `${area} holds only one playbook`).toBeGreaterThan(1)
    }
  })
})
