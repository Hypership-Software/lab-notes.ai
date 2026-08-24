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
    expect(value("With a working demo")).toBe(
      String(summaries.filter((p) => p.demo.status === "available").length),
    )
  })

  it("shows the A/B/C/D strip and leads to the one working demo", () => {
    render(<HomePage />)

    expect(
      within(
        screen.getByRole("list", { name: "How a playbook is built" }),
      ).getAllByRole("listitem"),
    ).toHaveLength(4)
    expect(screen.getByRole("link", { name: /Try the demo/ })).toHaveAttribute(
      "href",
      "/playbooks/policy-evidence/demo",
    )
  })

  it("previews the catalogue without repeating the featured playbook", () => {
    render(<HomePage />)

    const preview = screen.getByRole("region", {
      name: "The rest of the catalogue",
    })
    const rows = within(preview).getAllByRole("article")
    expect(rows).toHaveLength(4)
    expect(
      within(preview).queryByRole("link", { name: "Policy Evidence Workbench" }),
    ).toBeNull()
    expect(
      within(preview).getByRole("link", { name: `See all ${summaries.length}` }),
    ).toHaveAttribute("href", "/playbooks")
  })

  it("closes with both the method and contribute prompts", () => {
    render(<HomePage />)

    const close = screen.getByRole("region", {
      name: /A playbook is useful before it has a demo/,
    })
    expect(
      within(close).getByRole("link", { name: "How this works" }),
    ).toHaveAttribute("href", "/method")
    expect(
      within(close).getByRole("link", { name: "How to contribute" }),
    ).toHaveAttribute("href", "/contribute")
  })
})
