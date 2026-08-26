import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { repositoryUrl } from "@/lib/repository"

import HomePage from "./page"

describe("HomePage", () => {
  it("leads with the builder proposition and exact primary actions", () => {
    render(<HomePage />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "17 public-service opportunities. The desk research is already done.",
      }),
    ).toBeVisible()
    expect(
      screen.getByRole("link", { name: "Open the opportunity atlas" }),
    ).toHaveAttribute("href", "/playbooks")
    expect(
      screen.getByRole("link", { name: "Clone the reference" }),
    ).toHaveAttribute("href", repositoryUrl)
  })

  it("builds the hero visual from real research-stack artefacts", () => {
    render(<HomePage />)

    const stack = screen.getByRole("complementary", {
      name: "Life event research stack",
    })
    expect(within(stack).getByText("Real published source")).toBeVisible()
    expect(within(stack).getByText("Synthetic working data")).toBeVisible()
    expect(within(stack).getByText("journeyStep")).toBeVisible()
    expect(
      within(stack).getByText("build-life-event-services"),
    ).toBeVisible()
    expect(within(stack).getByText("Authority comes first")).toBeVisible()

    const caveat = within(stack).getByText("Before you build").parentElement
    expect(caveat).toHaveClass("bg-signal-strong", "text-surface")
  })

  it("shows the handoff as an ordered builder sequence", () => {
    render(<HomePage />)

    const workflow = screen.getByRole("region", { name: "From atlas to agent" })
    const steps = within(workflow).getAllByRole("listitem")
    expect(steps).toHaveLength(4)
    expect(steps[0]).toHaveTextContent("Choose an opportunity")
    expect(steps[1]).toHaveTextContent("Inspect the sources and starter data")
    expect(steps[2]).toHaveTextContent("git clone")
    expect(steps[3]).toHaveTextContent("build-life-event-services")

    expect(steps[0].querySelector("code")).toBeNull()
    expect(steps[1].querySelector("code")).toBeNull()
    expect(steps[2].querySelector("code")).not.toBeNull()
    expect(steps[3].querySelector("code")).not.toBeNull()
  })

  it("keeps handoff feedback to transform-only motion", () => {
    render(<HomePage />)

    const handoff = screen.getByRole("region", {
      name: "One playbook, end to end.",
    })
    for (const link of within(handoff).getAllByRole("link")) {
      expect(link).toHaveClass("transition-transform")
      expect(link).not.toHaveClass("transition-colors")
    }
  })

  it("states the project's independence and contains no retired showcase", () => {
    render(<HomePage />)

    expect(
      screen.getByText(/independent open-source project, not a government service/i),
    ).toBeVisible()
    expect(screen.queryByText(/de\u006do/i)).toBeNull()
    expect(screen.queryByRole("link", { name: /de\u006do/i })).toBeNull()
  })

  it("uses one page heading", () => {
    render(<HomePage />)

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
  })
})
