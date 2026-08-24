import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { AvailabilityBadge } from "./availability-badge"
import { ExternalLink } from "./external-link"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

vi.mock("next/navigation", () => ({
  usePathname: () => "/playbooks",
}))

describe("site shell", () => {
  it("starts keyboard navigation at a skip link and labels primary navigation", async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)

    await user.tab()

    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveFocus()
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeVisible()
  })

  it("marks the current navigation item", () => {
    render(<SiteHeader />)

    expect(screen.getByRole("link", { name: "Playbooks" })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })

  it("states dataset and demo availability in text rather than colour alone", () => {
    render(
      <>
        <AvailabilityBadge kind="dataset" available />
        <AvailabilityBadge kind="demo" available={false} />
      </>,
    )

    // Both answers are words. The bullet is decorative, so stripping every
    // symbol and colour must leave the state still readable.
    expect(
      screen.getByText("Synthetic dataset available"),
    ).toBeVisible()
    expect(screen.getByText("No demo yet")).toBeVisible()
  })

  it("opens explicitly external links safely", () => {
    render(
      <ExternalLink href="https://example.org" target="_self" rel="">
        Source
      </ExternalLink>,
    )

    expect(screen.getByRole("link", { name: /Source/ })).toHaveAttribute(
      "target",
      "_blank",
    )
    expect(screen.getByRole("link", { name: /Source/ })).toHaveAttribute(
      "rel",
      "noreferrer noopener",
    )
  })

  it("states the project's independent status without an official-service claim", () => {
    render(<SiteFooter />)

    expect(screen.getByText(/Independent open-source project/i)).toBeVisible()
    expect(screen.queryByText(/official government service/i)).not.toBeInTheDocument()
  })
})
