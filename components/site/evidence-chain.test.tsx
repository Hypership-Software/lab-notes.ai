import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import HomePage from "@/app/page"

import { EvidenceChain } from "./evidence-chain"

describe("EvidenceChain", () => {
  it("keeps the evidence stages in their governed reading order", () => {
    render(<EvidenceChain />)

    const list = screen.getByRole("list", { name: "How a playbook is built" })
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((item) => item.querySelector("h3")?.textContent),
    ).toEqual([
      "Public problem",
      "Official source sample",
      "Synthetic working data",
      "Bounded demonstration",
      "Evidence and code",
    ])
  })

  it("makes the catalogue the primary action and labels exemplar readiness honestly", () => {
    render(<HomePage />)

    expect(screen.getByRole("link", { name: "Explore the playbooks" })).toHaveAttribute(
      "href",
      "/playbooks",
    )
    expect(screen.getByText("Assessed concept")).toBeVisible()

    // The exemplar offers a baseline demonstration, which runs no model. The
    // home page must say what that demonstration actually does and must not
    // let it read as a recorded AI demonstration.
    expect(
      screen.getByRole("link", { name: /try the baseline demonstration/i }),
    ).toHaveAttribute("href", "/playbooks/policy-evidence/demo")
    expect(screen.getByText(/reviewed list of words and phrases/i)).toBeVisible()
    expect(screen.queryByText("Recorded demonstration")).not.toBeInTheDocument()
  })
})
