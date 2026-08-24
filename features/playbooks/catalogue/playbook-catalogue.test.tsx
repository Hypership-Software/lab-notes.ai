import { render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { getPlaybookSummaries } from "@/lib/playbooks/registry"

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

// The catalogue's honesty rests on two claims per row, so the fixtures are
// picked for the answers they give rather than for their subject.
const withDataset = playbooks.find(
  (playbook) => playbook.syntheticData.status === "available",
)
const withoutDataset = playbooks.find(
  (playbook) => playbook.syntheticData.status === "not-responsible",
)
if (!withDataset || !withoutDataset) {
  throw new Error("The inventory must keep a playbook of each dataset answer")
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

  it("states both availability answers in words on every row", () => {
    renderCatalogue({ playbooks: [withDataset, withoutDataset] })

    const [available, withheld] = screen.getAllByRole("article")
    expect(
      within(available).getByText("Synthetic dataset available"),
    ).toBeVisible()
    expect(within(withheld).getByText("No synthetic dataset")).toBeVisible()

    // Only policy-evidence has a demo, so at least one of these two rows
    // must say so plainly rather than leaving the answer blank.
    expect(screen.getAllByText("No demo yet").length).toBeGreaterThan(0)
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
