import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { getPlaybookSummaries } from "@/lib/playbooks/registry"

import HomePage from "./page"

const summaries = getPlaybookSummaries()

describe("HomePage", () => {
  it("states the proposition and the project's independence", () => {
    render(<HomePage />)

    expect(
      screen.getByText(/calls out example projects for public services/),
    ).toBeVisible()
    expect(
      screen.getByText(/independent open-source project, not a\s+government service/),
    ).toBeVisible()
  })

  it("counts the catalogue from the registry rather than asserting a figure", () => {
    render(<HomePage />)

    const note = screen.getByRole("complementary", {
      name: "What is in the catalogue",
    })
    const value = (term: string) =>
      within(note).getByText(term).nextElementSibling?.textContent

    expect(value("Playbooks")).toBe(String(summaries.length))
    expect(value("With a synthetic dataset")).toBe(
      String(
        summaries.filter((p) => p.syntheticData.status === "available").length,
      ),
    )
  })

  it("contains no retired showcase copy or route", () => {
    render(<HomePage />)

    expect(screen.queryByText(/de\u006do/i)).toBeNull()
    expect(screen.queryByRole("link", { name: /de\u006do/i })).toBeNull()
  })

  it("previews the catalogue", () => {
    render(<HomePage />)

    const preview = screen.getByRole("region", {
      name: "Explore the catalogue",
    })
    const rows = within(preview).getAllByRole("article")
    expect(rows).toHaveLength(4)
    expect(
      within(preview).getByRole("link", { name: `See all ${summaries.length}` }),
    ).toHaveAttribute("href", "/playbooks")
  })

  it("closes with both the method and contribute prompts", () => {
    render(<HomePage />)

    const close = screen.getByRole("region", {
      name: "Explore or improve the research",
    })
    expect(
      within(close).getByRole("link", { name: "How this works" }),
    ).toHaveAttribute("href", "/method")
    expect(
      within(close).getByRole("link", { name: "How to contribute" }),
    ).toHaveAttribute("href", "/contribute")
  })
})
