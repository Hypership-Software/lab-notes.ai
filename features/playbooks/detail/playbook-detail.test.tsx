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

const expectedSections = [
  ["opportunity", "Opportunity"],
  ["research", "Research already done"],
  ["starter-dataset", "Starter dataset"],
  ["build-partner", "Domain build partner"],
  ["before-you-build", "Before you build"],
] as const

describe("PlaybookDetail", () => {
  it("renders exactly the five builder-handoff sections in document order", () => {
    render(<PlaybookDetail playbook={playbook} />)

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      playbook.title,
    )
    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(expectedSections.map(([, heading]) => heading))

    for (const [id, heading] of expectedSections) {
      const target = document.getElementById(id)
      expect(target).toHaveTextContent(heading)
      expect(screen.getByRole("region", { name: heading })).toContainElement(
        target,
      )
    }
  })

  it("summarises the builder pack before the sections", () => {
    render(<PlaybookDetail playbook={playbook} />)

    const ledger = screen.getByRole("region", { name: "Builder pack" })
    expect(within(ledger).getByText(`${playbook.dataSources.length}`)).toBeVisible()
    expect(within(ledger).getByText("Published sources")).toBeVisible()
    expect(within(ledger).getByText("20 synthetic records")).toBeVisible()
    expect(within(ledger).getByText("$build-policy-evidence")).toBeVisible()
    expect(
      within(ledger).getByText(formatUtcDate(playbook.lastReviewed)),
    ).toBeVisible()
  })

  it("renders literal source-access facts and titled, unranked constraints", () => {
    render(<PlaybookDetail playbook={playbook} />)

    const research = screen.getByRole("region", { name: "Research already done" })
    expect(within(research).getAllByText(/^(Open|Registration or key|Restricted)$/)).not.toHaveLength(0)

    const constraints = screen.getByRole("region", { name: "Before you build" })
    for (const caveat of playbook.caveats) {
      expect(within(constraints).getByText(caveat.title)).toBeVisible()
      expect(within(constraints).getByText(caveat.detail)).toBeVisible()
    }
    expect(within(constraints).queryByText(/score|rank|severity/i)).toBeNull()
  })

  it("keeps the five-section handoff and no dataset controls after a responsible refusal", () => {
    expect(withheld.syntheticData.status).toBe("not-responsible")
    render(<PlaybookDetail playbook={withheld} />)

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(expectedSections.map(([, heading]) => heading))

    const dataset = screen.getByRole("region", { name: "Starter dataset" })
    expect(within(dataset).queryByRole("link")).toBeNull()
    expect(within(dataset).queryByRole("button")).toBeNull()
  })

  it("contains no retired showcase language", () => {
    render(<PlaybookDetail playbook={playbook} />)

    expect(document.body).not.toHaveTextContent(/de\u006do/i)
  })
})
