import { render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { getPlaybookSummaries } from "@/lib/playbooks/registry"
import { getServiceArea, serviceAreaValues } from "@/lib/playbooks/service-area"

import type { CatalogueQuery } from "./catalogue-query"
import { getCatalogueFilterOptions } from "./filter-options"
import { PlaybookCatalogue } from "./playbook-catalogue"

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
}))

const emptyQuery: CatalogueQuery = { query: "", sectors: [] }

const playbooks = getPlaybookSummaries()
const options = getCatalogueFilterOptions(playbooks)

function renderCatalogue(
  overrides: Partial<Parameters<typeof PlaybookCatalogue>[0]> = {},
) {
  render(
    <PlaybookCatalogue
      playbooks={playbooks}
      query={emptyQuery}
      options={options}
      totalCount={playbooks.length}
      {...overrides}
    />,
  )
}

// The fixtures cover both literal starter-data answers rather than a particular
// subject area.
const withDataset = playbooks.find(
  (playbook) => playbook.syntheticData.status === "available",
)
const withoutDataset = playbooks.find(
  (playbook) => playbook.syntheticData.status === "not-responsible",
)
if (!withDataset || !withoutDataset) {
  throw new Error("The inventory must keep both starter-data answers")
}

describe("PlaybookCatalogue", () => {
  it("renders every playbook and announces the result count", () => {
    renderCatalogue()

    expect(screen.getAllByRole("article")).toHaveLength(17)
    expect(screen.getByRole("status")).toHaveTextContent("17 playbooks shown")
  })

  it("links each row to its playbook by name", () => {
    renderCatalogue({ playbooks: [playbooks[0]] })

    expect(
      screen.getByRole("link", { name: playbooks[0].title }),
    ).toHaveAttribute("href", `/playbooks/${playbooks[0].slug}`)
  })

  it("groups an unfiltered catalogue by service area", () => {
    renderCatalogue()

    for (const area of serviceAreaValues) {
      const group = screen.getByRole("region", { name: area })
      const expected = playbooks.filter(
        (playbook) => getServiceArea(playbook.sector) === area,
      )

      expect(within(group).getAllByRole("article")).toHaveLength(
        expected.length,
      )
      for (const playbook of expected) {
        expect(
          within(group).getByRole("link", { name: playbook.title }),
        ).toBeVisible()
      }
    }
  })

  it("describes and counts every group it shows", () => {
    renderCatalogue()

    for (const area of serviceAreaValues) {
      const group = screen.getByRole("region", { name: area })
      const count = playbooks.filter(
        (playbook) => getServiceArea(playbook.sector) === area,
      ).length

      expect(
        within(group).getByText(
          `${count} ${count === 1 ? "playbook" : "playbooks"}`,
        ),
      ).toBeVisible()
    }
  })

  it("drops the grouping for a search, so results are one ranked list", () => {
    renderCatalogue({
      playbooks: [withDataset],
      query: { ...emptyQuery, query: "policy" },
    })

    expect(screen.getAllByRole("article")).toHaveLength(1)
    for (const area of serviceAreaValues) {
      expect(screen.queryByRole("region", { name: area })).toBeNull()
    }
  })

  it("states starter-data availability in words on every row", () => {
    renderCatalogue({ playbooks: [withDataset, withoutDataset] })

    const [available, withheld] = screen.getAllByRole("article")
    expect(
      within(available).getByText("Synthetic dataset available"),
    ).toBeVisible()
    expect(within(withheld).getByText("No synthetic dataset")).toBeVisible()
  })

  it("counts the sources each playbook investigated", () => {
    renderCatalogue({ playbooks: [withDataset] })

    expect(
      screen.getByText(`${withDataset.dataSourceCount} investigated`),
    ).toBeVisible()
    expect(withDataset.dataSourceCount).toBeGreaterThan(0)
  })

  it("contains no retired showcase copy or route", () => {
    renderCatalogue()

    expect(screen.queryByText(/de\u006do/i)).toBeNull()
    expect(screen.queryByRole("link", { name: /de\u006do/i })).toBeNull()
  })

  it("offers one clear recovery action when no result matches", () => {
    renderCatalogue({ playbooks: [], query: { ...emptyQuery, query: "missing" } })

    expect(
      screen.getByRole("heading", { name: "No playbooks match" }),
    ).toBeVisible()
    expect(
      screen.getByRole("link", { name: "Clear all filters" }),
    ).toHaveAttribute("href", "/playbooks")
    expect(screen.getByRole("status")).toHaveTextContent("0 playbooks shown")
  })

  it("offers a sector filter built from the inventory and nothing else", () => {
    renderCatalogue()

    const filters = screen.getByRole("group", { name: "Filter by sector" })
    expect(within(filters).getAllByRole("checkbox")).toHaveLength(13)
    expect(
      within(filters).getByRole("checkbox", { name: /Health/ }),
    ).not.toBeChecked()
    // Sector is the only filter group left — the maturity, risk, data-access,
    // and technical-pattern groups went with the v1 schema — so every
    // checkbox the catalogue offers belongs to this one group.
    expect(screen.getAllByRole("checkbox")).toHaveLength(13)
  })
})
