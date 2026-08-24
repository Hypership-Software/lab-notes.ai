import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { EvidenceChain } from "./evidence-chain"

describe("EvidenceChain", () => {
  it("names the four stages of a playbook in contract order", () => {
    render(<EvidenceChain />)

    const list = screen.getByRole("list", { name: "How a playbook is built" })
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((item) => item.querySelector("h3")?.textContent),
    ).toEqual([
      "Strategy example",
      "Investigated sources",
      "Synthetic dataset",
      "Working demo",
    ])
  })
})
