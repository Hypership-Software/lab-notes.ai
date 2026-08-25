import { describe, expect, it } from "vitest"

import { getOpportunityAtlasItems } from "./atlas-model"
import { groupPlaybooksByArea } from "./group-playbooks"

const all = getOpportunityAtlasItems()
const shuffled = [...all].reverse()

describe("groupPlaybooksByArea", () => {
  it("keeps every playbook exactly once", () => {
    const slugs = groupPlaybooksByArea(shuffled).flatMap((group) =>
      group.playbooks.map((playbook) => playbook.slug),
    )

    expect(slugs).toHaveLength(all.length)
    expect(new Set(slugs).size).toBe(all.length)
  })

  it("orders service areas alphabetically", () => {
    const areas = groupPlaybooksByArea(shuffled).map((group) => group.area)

    expect(areas).toEqual(
      [...areas].sort((left, right) => left.localeCompare(right, "en-GB")),
    )
  })

  it("orders playbooks by title inside every service area", () => {
    for (const group of groupPlaybooksByArea(shuffled)) {
      const titles = group.playbooks.map((playbook) => playbook.title)

      expect(titles).toEqual(
        [...titles].sort((left, right) => left.localeCompare(right, "en-GB")),
      )
    }
  })

  it("omits areas with no matching playbook", () => {
    const grouped = groupPlaybooksByArea(
      shuffled.filter((playbook) => playbook.serviceArea === "Transport"),
    )

    expect(grouped).toHaveLength(1)
    expect(grouped[0].area).toBe("Transport")
  })

  it("describes every group it returns", () => {
    for (const group of groupPlaybooksByArea(shuffled)) {
      expect(group.description).not.toBe("")
    }
  })
})
