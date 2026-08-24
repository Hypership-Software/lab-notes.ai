import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { formatUtcDate } from "@/lib/format-date"
import { getPlaybook } from "@/lib/playbooks/registry"

import { PlaybookDetail } from "./playbook-detail"

const playbook = getPlaybook("policy-evidence")
if (!playbook) {
  throw new Error("The policy-evidence playbook must stay registered")
}

const withheld = getPlaybook("diagnostic-imaging-support")
if (!withheld) {
  throw new Error("The diagnostic-imaging-support playbook must stay registered")
}

// [fragment ID, heading] transcribed from the Task 4 intermediate contract.
const expectedSections = [
  ["opportunity", "Opportunity"],
  ["research", "Research already done"],
  ["starter-dataset", "Starter dataset"],
  ["before-you-build", "Before you build"],
] as const

function isBefore(earlier: Element, later: Element) {
  return Boolean(
    earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING,
  )
}

describe("PlaybookDetail", () => {
  it("renders one title above exactly the four intermediate sections, in order", () => {
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

  it("renders research sources as self-contained cards without rail wrappers", () => {
    render(<PlaybookDetail playbook={playbook} />)

    const research = screen.getByRole("region", { name: "Research already done" })
    const sources = within(research).getAllByRole("article")
    expect(sources).toHaveLength(playbook.dataSources.length)

    for (const [index, source] of sources.entries()) {
      expect(source.firstElementChild).toBe(
        within(source).getByRole("heading", {
          level: 3,
          name: playbook.dataSources[index].title,
        }),
      )
      expect(source.querySelector(".source-dossier__index")).toBeNull()
      expect(source.querySelector(".source-dossier__body")).toBeNull()
    }
  })

  it("keeps the four sections for a playbook without a responsible dataset", () => {
    expect(withheld.syntheticData.status).toBe("not-responsible")
    render(<PlaybookDetail playbook={withheld} />)

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(expectedSections.map(([, heading]) => heading))
  })

  it("contains no retired showcase copy or route", () => {
    render(<PlaybookDetail playbook={playbook} />)

    expect(screen.queryByText(/de\u006do/i)).toBeNull()
    expect(screen.queryByRole("link", { name: /de\u006do/i })).toBeNull()
  })

  it("lists every caveat in the caveats section", () => {
    render(<PlaybookDetail playbook={playbook} />)

    const caveats = screen.getByRole("region", { name: "Before you build" })
    const items = within(caveats).getAllByRole("listitem")
    expect(items.map(({ textContent }) => textContent)).toEqual(
      playbook.caveats.map(({ title, detail }) => `${title}${detail}`),
    )
  })
})
