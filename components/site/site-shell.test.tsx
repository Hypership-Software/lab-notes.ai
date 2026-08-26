import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it, vi } from "vitest"

import RootLayout from "@/app/layout"

import { ExternalLink } from "./external-link"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

vi.mock("next/navigation", () => ({
  usePathname: () => "/playbooks",
}))

vi.mock("next/font/google", () => ({
  Archivo: () => ({ variable: "font-archivo" }),
  Bricolage_Grotesque: () => ({ variable: "font-bricolage" }),
  Fragment_Mono: () => ({ variable: "font-fragment-mono" }),
  Spline_Sans: () => ({ variable: "font-spline" }),
}))

describe("site shell", () => {
  it("keeps the complete primary navigation keyboard-reachable", async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)

    await user.tab()

    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveFocus()
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeVisible()
    expect(
      screen.getByRole("link", { name: /Public-Service AI Playbooks/ }),
    ).toHaveAttribute("href", "/")

    for (const label of ["Playbooks", "How this works", "Contribute"]) {
      await user.tab()

      if (label === "Playbooks") {
        await user.tab()
      }

      expect(screen.getByRole("link", { name: label })).toHaveFocus()
    }
  })

  it("keeps the skip-link destination on the root main content", () => {
    const markup = renderToStaticMarkup(
      <RootLayout params={Promise.resolve({})}>
        <p>Page content</p>
      </RootLayout>,
    )
    const document = new DOMParser().parseFromString(markup, "text/html")
    const main = document.querySelector("main")

    expect(main?.getAttribute("id")).toBe("main-content")
    expect(main?.getAttribute("tabindex")).toBe("-1")
  })

  it("marks the current navigation item", () => {
    render(<SiteHeader />)

    const currentLink = screen.getByRole("link", { name: "Playbooks" })

    expect(currentLink).toHaveAttribute("aria-current", "page")
    expect(currentLink).not.toHaveClass(
      "hover:bg-paper",
      "hover:text-evidence-strong",
    )
    expect(currentLink).toHaveClass(
      "hover:bg-evidence-strong",
      "hover:text-surface",
    )
  })

  it("exposes stable hooks for forced-colour and print fallbacks", () => {
    render(
      <>
        <SiteHeader />
        <SiteFooter />
      </>,
    )

    expect(screen.getByRole("banner")).toHaveAttribute("data-site-header")
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveAttribute(
      "data-primary-navigation",
    )
    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveAttribute("data-skip-link")
    expect(screen.getByRole("contentinfo")).toHaveAttribute("data-site-footer")
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

    expect(screen.getByText(/independent open-source accelerator/i)).toBeVisible()
    expect(screen.queryByText(/official government service/i)).not.toBeInTheDocument()
  })
})
