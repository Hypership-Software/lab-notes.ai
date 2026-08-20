import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"

import { getPlaybook } from "@/lib/playbooks/registry"

import { PolicyEvidenceWorkbench } from "./policy-evidence-workbench"

const playbook = getPlaybook("policy-evidence")

if (!playbook) throw new Error("Policy Evidence playbook is not registered")

describe("PolicyEvidenceWorkbench", () => {
  beforeEach(() => {
    render(<PolicyEvidenceWorkbench playbook={playbook} />)
  })

  it("orients the reader with a standing disclosure that no model was involved", () => {
    const banner = screen.getByRole("note", { name: "Baseline demonstration" })

    expect(within(banner).getByText(/no model is involved/i)).toBeVisible()
    expect(
      within(banner).getByText(/no part of it has been operationally validated/i),
    ).toBeVisible()
  })

  it("does not describe anything on the page as recorded or live AI output", () => {
    expect(screen.queryByText("Recorded demonstration")).not.toBeInTheDocument()
    expect(
      screen.queryByText("Recorded AI-assisted output"),
    ).not.toBeInTheDocument()
  })

  it("states the decision it supports and what it must not be read as", () => {
    expect(screen.getByText(playbook.supportedDecision)).toBeVisible()
    expect(screen.getByText(/does not decide policy/i)).toBeVisible()
  })

  it("labels the official sources it was modelled on", () => {
    expect(
      screen.getByRole("heading", { name: /where the shape came from/i }),
    ).toBeVisible()
    expect(
      screen.getByRole("link", {
        name: /Draft Circular Economy Strategy.*opens in a new tab/i,
      }),
    ).toBeVisible()
  })

  it("labels the working data as synthetic and shows the whole of it", () => {
    expect(screen.getAllByText("Synthetic working data").length).toBeGreaterThan(0)

    // Every response is in the page. A reader who cannot see the whole input
    // cannot judge a finding over it.
    expect(screen.getByText(/All 20 responses are invented/i)).toBeVisible()
    for (const id of ["SYN-0001", "SYN-0002", "SYN-0019", "SYN-0020"]) {
      expect(screen.getAllByText(id).length).toBeGreaterThan(0)
    }
  })

  it("lists one finding per theme, each naming its review state", () => {
    const findings = screen.getByRole("navigation", { name: "Findings" })
    const links = within(findings).getAllByRole("link")

    expect(links).toHaveLength(6)
    expect(links[0]).toHaveAccessibleName(/Access to services/)
    for (const link of links) {
      expect(link).toHaveAccessibleName(/Not yet reviewed/)
    }
  })

  it("renders every evidence thread in the page, not only the selected one", () => {
    for (const label of [
      "Access to services",
      "Workforce capability",
      "Data governance",
      "Accountability",
      "Procurement and reuse",
      "Environmental cost",
    ]) {
      expect(screen.getByRole("region", { name: label })).toBeVisible()
    }
  })

  it("orders each evidence thread from finding to review", () => {
    const thread = screen.getByRole("list", {
      name: "Evidence for Workforce capability",
    })

    const stages = within(thread)
      .getAllByRole("heading", { level: 4 })
      .map((heading) => heading.textContent)

    expect(stages).toEqual([
      "1. Finding",
      "2. Citation",
      "3. Synthetic response cited",
      "4. How that response was made",
      "5. What a reader expected",
      "6. Your review",
    ])
  })

  it("offers the four review states for a finding, with the current one named", () => {
    const group = screen.getByRole("group", {
      name: /Review state for Workforce capability: Not yet reviewed/,
    })

    expect(within(group).getAllByRole("radio")).toHaveLength(4)
    for (const label of [
      "Not yet reviewed",
      "Worth investigating further",
      "Not supported by the evidence shown",
      "Needs subject-matter review",
    ]) {
      expect(within(group).getByRole("radio", { name: label })).toBeInTheDocument()
    }
  })

  it("says review states record no approval and do not persist", () => {
    expect(
      screen.getAllByText(/record no approval, priority, or policy position/i)
        .length,
    ).toBeGreaterThan(0)
  })

  it("shows each metric with its numerator and denominator", () => {
    expect(screen.getByText("Citation precision")).toBeVisible()
    expect(screen.getByText("(19 of 22)")).toBeVisible()
    expect(screen.getByText("Evidence coverage")).toBeVisible()
    expect(screen.getByText("(19 of 20)")).toBeVisible()
  })

  it("names the response the baseline missed in its evaluation table", () => {
    const cases = screen.getByRole("table")

    expect(within(cases).getByRole("rowheader", { name: /Access to services/ })).toBeVisible()
    expect(within(cases).getAllByText("SYN-0002").length).toBeGreaterThan(0)
  })

  it("says what the evaluation cannot tell you", () => {
    expect(
      screen.getByRole("heading", { name: /what this evaluation does not tell you/i }),
    ).toBeVisible()
  })

  it("points at the reusable parts and the assessed playbook", () => {
    expect(
      screen.getByRole("heading", { name: /taking this further/i }),
    ).toBeVisible()
    expect(
      screen.getByRole("link", { name: /read the full assessed playbook/i }),
    ).toHaveAttribute("href", "/playbooks/policy-evidence")
  })
})

describe("PolicyEvidenceWorkbench interaction", () => {
  beforeEach(() => {
    render(<PolicyEvidenceWorkbench playbook={playbook} />)
  })

  it("marks the first finding as current before anything is selected", () => {
    const findings = screen.getByRole("navigation", { name: "Findings" })
    const links = within(findings).getAllByRole("link")

    expect(links[0]).toHaveAttribute("aria-current", "true")
    expect(links[1]).not.toHaveAttribute("aria-current")
  })

  it("moves the current finding when another is chosen from the keyboard", async () => {
    const user = userEvent.setup()
    const findings = screen.getByRole("navigation", { name: "Findings" })
    const links = within(findings).getAllByRole("link")

    links[2]?.focus()
    await user.keyboard("{Enter}")

    expect(links[2]).toHaveAttribute("aria-current", "true")
    expect(links[0]).not.toHaveAttribute("aria-current")
  })

  it("records a review state, and reports it in the finding list and the legend", async () => {
    const user = userEvent.setup()

    await user.click(
      within(
        screen.getByRole("group", {
          name: /Review state for Data governance: Not yet reviewed/,
        }),
      ).getByRole("radio", { name: "Worth investigating further" }),
    )

    expect(
      screen.getByRole("group", {
        name: /Review state for Data governance: Worth investigating further/,
      }),
    ).toBeInTheDocument()

    const findings = screen.getByRole("navigation", { name: "Findings" })
    expect(
      within(findings).getByRole("link", {
        name: /Data governance.*Worth investigating further/,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText("1 of 6 findings have a review state.")).toBeVisible()
  })

  it("keeps the selected finding when a different finding is reviewed", async () => {
    const user = userEvent.setup()
    const findings = screen.getByRole("navigation", { name: "Findings" })

    await user.click(within(findings).getAllByRole("link")[4]!)

    await user.click(
      within(
        screen.getByRole("group", { name: /Review state for Accountability/ }),
      ).getByRole("radio", { name: "Needs subject-matter review" }),
    )

    // Reviewing a finding selects it, which is the only thing that should have
    // moved the selection.
    expect(
      within(findings).getByRole("link", { name: /Accountability.*Needs subject-matter review/ }),
    ).toHaveAttribute("aria-current", "true")
  })

  it("cannot reset until something has been reviewed, and confirms before clearing", async () => {
    const user = userEvent.setup()

    expect(screen.getByRole("button", { name: "Reset review states" })).toBeDisabled()

    await user.click(
      within(
        screen.getByRole("group", { name: /Review state for Environmental cost/ }),
      ).getByRole("radio", { name: "Not supported by the evidence shown" }),
    )

    await user.click(screen.getByRole("button", { name: "Reset review states" }))

    const confirmation = screen.getByRole("group", { name: "Confirm reset" })
    expect(
      within(confirmation).getByText(/clear every review state on this page/i),
    ).toBeVisible()

    await user.click(within(confirmation).getByRole("button", { name: "Keep them" }))
    expect(screen.getByText("1 of 6 findings have a review state.")).toBeVisible()

    await user.click(screen.getByRole("button", { name: "Reset review states" }))
    await user.click(screen.getByRole("button", { name: "Yes, clear them" }))

    expect(
      screen.getByText("No findings have been given a review state yet."),
    ).toBeVisible()
    expect(screen.getByRole("button", { name: "Reset review states" })).toBeDisabled()
  })

  it("links a citation to the response it quotes", () => {
    const thread = screen.getByRole("list", {
      name: "Evidence for Environmental cost",
    })

    const citationLink = within(thread).getAllByRole("link")[0]

    expect(citationLink).toHaveAttribute("href", "#document-SYN-0019")
    expect(document.getElementById("document-SYN-0019")).not.toBeNull()
  })
})
