import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

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
})
