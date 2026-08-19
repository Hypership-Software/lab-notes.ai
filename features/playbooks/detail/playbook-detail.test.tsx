import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { getPlaybook } from "@/lib/playbooks/registry"

import { PlaybookDetail } from "./playbook-detail"

const playbook = getPlaybook("policy-evidence")
if (!playbook) {
  throw new Error("The policy-evidence playbook must stay registered")
}
const reviewStatus = {
  status: "current",
  reviewedAt: playbook.lastReviewed,
  reviewDueAt: "2027-08-18",
} as const

const expectedHeadings = [
  "At a glance",
  "The public-service problem",
  "Intended user and supported decision",
  "Demonstration or demonstration-readiness assessment",
  "Official sources",
  "Source sample and synthetic-data method",
  "Non-AI baseline",
  "Evaluation and evidence maturity",
  "Risks, human oversight, contestability, and redress",
  "Technical implementation",
  "References and contribution path",
]

describe("PlaybookDetail", () => {
  it("renders one title and the fixed evidence sequence", () => {
    render(<PlaybookDetail playbook={playbook} reviewStatus={reviewStatus} />)

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(expectedHeadings)
  })

  it("keeps plain-English evidence before technical implementation", () => {
    render(<PlaybookDetail playbook={playbook} reviewStatus={reviewStatus} />)

    const summary = screen.getByText(playbook.summary)
    const technical = screen.getByRole("heading", {
      name: "Technical implementation",
    })
    expect(
      summary.compareDocumentPosition(technical) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(screen.getByText(playbook.problem)).toBeVisible()
    expect(screen.getByText(playbook.supportedDecision)).toBeVisible()
    expect(screen.getByText(playbook.nonAiBaseline.method)).toBeVisible()
    expect(screen.getByText(playbook.humanOversight.redress)).toBeVisible()
  })

  it("renders risk reasons and mitigations once, in the risks section", () => {
    render(<PlaybookDetail playbook={playbook} reviewStatus={reviewStatus} />)

    const risks = screen.getByRole("region", {
      name: "Risks, human oversight, contestability, and redress",
    })
    expect(within(risks).getByText(playbook.risk.reasons[0])).toBeVisible()
    expect(within(risks).getByText(playbook.risk.mitigations[0])).toBeVisible()
    expect(screen.getAllByText(playbook.risk.reasons[0])).toHaveLength(1)
  })

  it("offers a contents list that matches the document without JavaScript", () => {
    render(<PlaybookDetail playbook={playbook} reviewStatus={reviewStatus} />)

    const contents = screen.getByRole("navigation", { name: "On this page" })
    const links = within(contents).getAllByRole("link")
    expect(links).toHaveLength(11)

    for (const link of links) {
      const fragment = link.getAttribute("href") ?? ""
      expect(fragment.startsWith("#")).toBe(true)
      expect(document.getElementById(fragment.slice(1))).not.toBeNull()
    }
  })

  // Relocated from detail-primitives.test.tsx: ImplementationIndex no longer
  // renders references or the contribution link (section 10 is implementation
  // only). The composed document is the right place to assert section 11.
  it("links each reference and always offers the contribution path", () => {
    render(<PlaybookDetail playbook={playbook} reviewStatus={reviewStatus} />)

    const references = screen.getByRole("region", {
      name: "References and contribution path",
    })
    expect(playbook.references.length).toBeGreaterThan(0)
    for (const reference of playbook.references) {
      // ExternalLink appends a screen-reader-only "(opens in a new tab)"
      // suffix to the accessible name, so match the reference title as a
      // prefix rather than requiring an exact accessible name.
      const escapedTitle = reference.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      expect(
        within(references).getByRole("link", {
          name: new RegExp(`^${escapedTitle}`),
        }),
      ).toHaveAttribute("href", reference.url)
    }
    expect(
      within(references).getByRole("link", {
        name: "Contribute an improvement to this playbook",
      }),
    ).toHaveAttribute("href", "/contribute")
  })

  it("omits the reference list entirely when a playbook has none", () => {
    render(
      <PlaybookDetail
        playbook={{ ...playbook, references: [] }}
        reviewStatus={reviewStatus}
      />,
    )

    const references = screen.getByRole("region", {
      name: "References and contribution path",
    })
    expect(within(references).queryByRole("list")).not.toBeInTheDocument()
    expect(
      within(references).getByRole("link", {
        name: "Contribute an improvement to this playbook",
      }),
    ).toBeVisible()
  })
})
