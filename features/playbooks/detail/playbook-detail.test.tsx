import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { formatUtcDate } from "@/lib/format-date"
import { getPlaybook } from "@/lib/playbooks/registry"

import { PlaybookDetail } from "./playbook-detail"

const playbook = getPlaybook("policy-evidence")
if (!playbook) {
  throw new Error("The policy-evidence playbook must stay registered")
}

// The worked example answers C and D with `available`. A playbook that
// answers both honestly the other way must still render the same five
// sections, so the contract is asserted against that shape too.
const withheld = getPlaybook("diagnostic-imaging-support")
if (!withheld) {
  throw new Error("The diagnostic-imaging-support playbook must stay registered")
}

// [fragment ID, heading] transcribed from the A/B/C/D contract in
// DESIGN.md §7 ("Playbook detail sequence" and "Detail-page rendering
// contract"), so this pins the published contract rather than the
// component's self-consistency. Five headings is the whole sequence:
// there is no table of contents and no sixth section.
const expectedSections = [
  ["strategy-example", "What the strategy draft proposed"],
  ["data-sources", "Data sources investigated"],
  ["synthetic-dataset", "Synthetic dataset"],
  ["demo", "Demo"],
  ["caveats", "Caveats"],
] as const

function isBefore(earlier: Element, later: Element) {
  return Boolean(
    earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING,
  )
}

describe("PlaybookDetail", () => {
  it("renders one title above exactly the five contract sections, in order", () => {
    render(<PlaybookDetail playbook={playbook} />)

    const [title] = screen.getAllByRole("heading", { level: 1 })
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(title).toHaveTextContent(playbook.title)
    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(expectedSections.map(([, heading]) => heading))
  })

  it("puts the summary, sector, and last-reviewed date above the first section", () => {
    render(<PlaybookDetail playbook={playbook} />)

    const [firstHeading] = screen.getAllByRole("heading", { level: 2 })
    for (const text of [
      playbook.summary,
      playbook.sector,
      formatUtcDate(playbook.lastReviewed),
    ]) {
      const element = screen.getByText(text)
      expect(element).toBeVisible()
      expect(isBefore(element, firstHeading)).toBe(true)
    }
  })

  it("labels each section by its heading and exposes it as a deep-link target", () => {
    render(<PlaybookDetail playbook={playbook} />)

    for (const [id, heading] of expectedSections) {
      // The heading carries the fragment ID and names its own section, so
      // `#id` lands on the words that describe what follows.
      const target = document.getElementById(id)
      expect(target).not.toBeNull()
      expect(target).toHaveTextContent(heading)
      expect(screen.getByRole("region", { name: heading })).toContainElement(
        target,
      )
    }
  })

  it("keeps the five sections for a playbook with no dataset and no demo", () => {
    expect(withheld.syntheticData.status).toBe("not-responsible")
    expect(withheld.demo.status).toBe("not-yet")
    render(<PlaybookDetail playbook={withheld} />)

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(expectedSections.map(([, heading]) => heading))
    expect(
      within(screen.getByRole("region", { name: "Demo" })).queryByRole("link"),
    ).toBeNull()
  })

  it("lists every caveat in the caveats section", () => {
    render(<PlaybookDetail playbook={playbook} />)

    const caveats = screen.getByRole("region", { name: "Caveats" })
    const items = within(caveats).getAllByRole("listitem")
    expect(items.map(({ textContent }) => textContent)).toEqual([
      ...playbook.caveats,
    ])
  })
})
