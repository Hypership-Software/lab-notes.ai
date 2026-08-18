import { render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import MethodPage from "@/app/method/page"
import { getPlaybookSummaries } from "@/lib/playbooks/registry"

import type { CatalogueQuery } from "./catalogue-query"
import { getCatalogueFilterOptions } from "./filter-options"
import { PlaybookCatalogue } from "./playbook-catalogue"

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
}))

const emptyQuery: CatalogueQuery = {
  query: "",
  sectors: [],
  patterns: [],
  dataAccessibility: [],
  maturity: [],
  risk: [],
}

describe("PlaybookCatalogue", () => {
  const playbooks = getPlaybookSummaries()
  const options = getCatalogueFilterOptions(playbooks)

  it("renders all seventeen playbooks and announces the result count", () => {
    render(
      <PlaybookCatalogue
        playbooks={playbooks}
        query={emptyQuery}
        options={options}
        totalCount={playbooks.length}
      />,
    )

    expect(screen.getAllByRole("article")).toHaveLength(17)
    expect(screen.getByRole("status")).toHaveTextContent("17 playbooks shown")
  })

  it("gives every dossier row a descriptive detail link", () => {
    render(
      <PlaybookCatalogue
        playbooks={[playbooks[0]]}
        query={emptyQuery}
        options={options}
        totalCount={playbooks.length}
      />,
    )

    expect(
      screen.getByRole("link", {
        name: `Open ${playbooks[0].title} playbook`,
      }),
    ).toHaveAttribute("href", `/playbooks/${playbooks[0].slug}`)
  })

  it("offers one clear recovery action when no result matches", () => {
    render(
      <PlaybookCatalogue
        playbooks={[]}
        query={{ ...emptyQuery, query: "missing" }}
        options={options}
        totalCount={playbooks.length}
      />,
    )

    expect(screen.getByRole("heading", { name: "No playbooks match" })).toBeVisible()
    expect(screen.getByRole("link", { name: "Clear all filters" })).toHaveAttribute(
      "href",
      "/playbooks",
    )
  })

  it("explains all five evidence-maturity rungs", () => {
    render(<MethodPage />)

    const ladder = screen.getByRole("list", { name: "Evidence maturity" })
    expect(within(ladder).getAllByRole("listitem")).toHaveLength(5)
    expect(within(ladder).getByText("Assessed concept")).toBeVisible()
    expect(within(ladder).getByText("Evaluated service")).toBeVisible()
  })
})
