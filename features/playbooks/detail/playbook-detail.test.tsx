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

// [fragment ID, heading] pairs transcribed from the spec's fixed
// information architecture table
// (docs/superpowers/specs/2026-08-18-playbook-detail-route-design.md:29-40),
// so the tests pin the contract itself rather than merely the component's
// self-consistency.
const expectedSections = [
  ["at-a-glance", "At a glance"],
  ["public-service-problem", "The public-service problem"],
  ["users-and-decision", "Intended user and supported decision"],
  [
    "demonstration-readiness",
    "Demonstration or demonstration-readiness assessment",
  ],
  ["official-sources", "Official sources"],
  ["synthetic-data-method", "Source sample and synthetic-data method"],
  ["non-ai-baseline", "Non-AI baseline"],
  ["evaluation-and-maturity", "Evaluation and evidence maturity"],
  [
    "risks-and-oversight",
    "Risks, human oversight, contestability, and redress",
  ],
  ["technical-implementation", "Technical implementation"],
  ["references-and-contribution", "References and contribution path"],
] as const

describe("PlaybookDetail", () => {
  it("renders one title and the fixed evidence sequence", () => {
    render(<PlaybookDetail playbook={playbook} reviewStatus={reviewStatus} />)

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(expectedSections.map(([, heading]) => heading))
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

  it("offers a contents list whose fragment IDs match the spec's deep-link contract, without JavaScript", () => {
    render(<PlaybookDetail playbook={playbook} reviewStatus={reviewStatus} />)

    const contents = screen.getByRole("navigation", { name: "On this page" })
    const links = within(contents).getAllByRole("link")
    expect(links).toHaveLength(11)

    // Pin both the exact fragment ID and its heading text against the spec
    // table, in document order — not just that each href resolves to *some*
    // element within the same, possibly-drifted, document.
    expect(links.map((link) => [link.getAttribute("href"), link.textContent])).toEqual(
      expectedSections.map(([id, heading]) => [`#${id}`, heading]),
    )

    for (const [id] of expectedSections) {
      expect(document.getElementById(id)).not.toBeNull()
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
    // Assert on the actual invariant (no link other than /contribute), not
    // on the absence of a `list` role — a proxy that would break the moment
    // this section gained any other list that isn't a reference list.
    const links = within(references).getAllByRole("link")
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAccessibleName(
      "Contribute an improvement to this playbook",
    )
    expect(links[0]).toHaveAttribute("href", "/contribute")
  })
})
