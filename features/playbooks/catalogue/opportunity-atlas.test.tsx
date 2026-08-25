import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import type { OpportunityAtlasItem } from "./atlas-model"
import { OpportunityAtlas } from "./opportunity-atlas"

const items: readonly OpportunityAtlasItem[] = [
  {
    slug: "first-opportunity",
    title: "First opportunity",
    summary: "A first builder-oriented opportunity summary.",
    sector: "Citizen services",
    serviceArea: "Citizen services and government",
    dataSourceCount: 2,
    dataset: { status: "available", recordCount: 16 },
    buildPartner: {
      name: "build-first-opportunity",
      invocation: "$build-first-opportunity",
      skillPath: ".agents/skills/build-first-opportunity/SKILL.md",
      briefPath:
        ".agents/skills/build-first-opportunity/references/domain-brief.md",
    },
  },
  {
    slug: "second-opportunity",
    title: "Second opportunity",
    summary: "A second builder-oriented opportunity summary.",
    sector: "Education",
    serviceArea: "Education and learning",
    dataSourceCount: 3,
    dataset: { status: "not-responsible" },
    buildPartner: {
      name: "build-second-opportunity",
      invocation: "$build-second-opportunity",
      skillPath: ".agents/skills/build-second-opportunity/SKILL.md",
      briefPath:
        ".agents/skills/build-second-opportunity/references/domain-brief.md",
    },
  },
  {
    slug: "third-opportunity",
    title: "Third opportunity",
    summary: "A third builder-oriented opportunity summary.",
    sector: "Transport",
    serviceArea: "Transport",
    dataSourceCount: 1,
    dataset: { status: "available", recordCount: 8 },
    buildPartner: {
      name: "build-third-opportunity",
      invocation: "$build-third-opportunity",
      skillPath: ".agents/skills/build-third-opportunity/SKILL.md",
      briefPath:
        ".agents/skills/build-third-opportunity/references/domain-brief.md",
    },
  },
]

describe("OpportunityAtlas", () => {
  it("selects the first opportunity in the visible grouped order", () => {
    render(<OpportunityAtlas items={[items[1], items[0], items[2]]} />)

    expect(
      screen.getByRole("heading", { name: items[0].title }),
    ).toBeVisible()
    expect(
      screen.getByRole("button", { name: /01\s*first opportunity/i }),
    ).toHaveAttribute("aria-pressed", "true")
  })

  it("selects the first opportunity and previews another on focus", async () => {
    const user = userEvent.setup()
    render(<OpportunityAtlas items={items} />)

    expect(
      screen.getByRole("heading", { name: items[0].title }),
    ).toBeVisible()

    await user.tab()
    await user.tab()
    // The selected mobile row exposes its normal playbook link between rows.
    // Continue through that action to the next opportunity control.
    await user.tab()

    expect(screen.getByText(items[1].summary)).toBeVisible()
    expect(
      screen.getByRole("button", { name: /second opportunity/i }),
    ).toHaveAttribute("aria-pressed", "true")
  })

  it("previews opportunities on pointer enter and activation", async () => {
    const user = userEvent.setup()
    render(<OpportunityAtlas items={items} />)

    const third = screen.getByRole("button", { name: /third opportunity/i })
    await user.hover(third)
    expect(screen.getByText(items[2].summary)).toBeVisible()

    await user.click(screen.getByRole("button", { name: /first opportunity/i }))
    expect(screen.getByText(items[0].summary)).toBeVisible()
  })

  it("connects the selected control to a stable expanded preview", async () => {
    const user = userEvent.setup()
    render(<OpportunityAtlas items={items} />)

    const first = screen.getByRole("button", { name: /first opportunity/i })
    const second = screen.getByRole("button", { name: /second opportunity/i })
    const preview = screen.getByRole("complementary", {
      name: "Selected opportunity",
    })

    expect(first).toHaveAttribute("aria-expanded", "true")
    expect(first).toHaveAttribute(
      "aria-controls",
      "opportunity-preview-first-opportunity",
    )
    expect(second).toHaveAttribute("aria-expanded", "false")
    expect(preview).toHaveAttribute(
      "id",
      "opportunity-preview-first-opportunity",
    )

    await user.hover(second)

    expect(first).toHaveAttribute("aria-expanded", "false")
    expect(second).toHaveAttribute("aria-expanded", "true")
    expect(second).toHaveAttribute(
      "aria-controls",
      "opportunity-preview-second-opportunity",
    )
    expect(
      screen.getByRole("complementary", { name: "Selected opportunity" }),
    ).toHaveAttribute("id", "opportunity-preview-second-opportunity")
  })

  it("uses passing palette roles and only transform motion for selection", () => {
    render(<OpportunityAtlas items={items} />)

    const first = screen.getByRole("button", { name: /first opportunity/i })
    const preview = screen.getByRole("complementary", {
      name: "Selected opportunity",
    })
    const index = within(preview).getByText("01 / 17")
    const action = within(preview).getByRole("link", { name: "Open playbook" })

    expect(first).toHaveClass("transition-transform")
    expect(first.className).not.toContain("transition-[color")
    expect(index).toHaveClass("bg-signal-strong", "text-surface")
    expect(action).toHaveClass("focus-visible:outline-surface")
  })

  it("keeps every opportunity name in the document", () => {
    render(<OpportunityAtlas items={items} />)

    for (const item of items) {
      expect(screen.getAllByText(item.title)[0]).toBeVisible()
    }
  })

  it("keeps navigation as a normal link in the selected preview", () => {
    render(<OpportunityAtlas items={items} />)

    const preview = screen.getByRole("complementary", {
      name: "Selected opportunity",
    })
    expect(
      within(preview).getByRole("link", { name: "Open playbook" }),
    ).toHaveAttribute("href", "/playbooks/first-opportunity")
  })
})
