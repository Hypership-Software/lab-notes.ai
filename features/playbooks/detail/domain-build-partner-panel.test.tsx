import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { DomainBuildPartnerPanel } from "./domain-build-partner-panel"

const prompt =
  "Use the build-policy-evidence skill as my domain build partner.\n\nHelp me understand the opportunity, sources, synthetic dataset and constraints before we decide what—if anything—is worth prototyping."

const partner = {
  name: "build-policy-evidence",
  invocations: [
    { agent: "Claude Code" as const, command: "/build-policy-evidence" },
    { agent: "Codex" as const, command: "$build-policy-evidence" },
  ],
  skillPath: ".agents/skills/build-policy-evidence/SKILL.md" as const,
  briefPath:
    ".agents/skills/build-policy-evidence/references/domain-brief.md" as const,
}

describe("DomainBuildPartnerPanel", () => {
  afterEach(() => vi.restoreAllMocks())

  it("hands the exact repository skill and full starter prompt to the builder", async () => {
    const user = userEvent.setup()
    const writeText = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined)

    render(<DomainBuildPartnerPanel partner={partner} starterPrompt={prompt} />)

    expect(screen.getByText("/build-policy-evidence")).toBeVisible()
    expect(screen.getByText("$build-policy-evidence")).toBeVisible()
    expect(screen.getByText("Claude Code")).toBeVisible()
    expect(screen.getByText("Codex")).toBeVisible()
    expect(screen.getByRole("textbox", { name: "Starter prompt" })).toHaveValue(
      prompt,
    )
    expect(screen.getByRole("link", { name: /^Open SKILL.md/ })).toHaveAttribute(
      "href",
      "https://github.com/Hypership-Software/lab-notes.ai/blob/main/.agents/skills/build-policy-evidence/SKILL.md",
    )
    expect(screen.getByRole("link", { name: /^Open domain brief/ })).toHaveAttribute(
      "href",
      "https://github.com/Hypership-Software/lab-notes.ai/blob/main/.agents/skills/build-policy-evidence/references/domain-brief.md",
    )

    await user.click(screen.getByRole("button", { name: "Copy starter prompt" }))

    expect(writeText).toHaveBeenCalledWith(prompt)
    expect(screen.getByText("Copied")).toBeVisible()
  })

  it("keeps the prompt selectable and explains a clipboard rejection", async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("denied"),
    )

    render(<DomainBuildPartnerPanel partner={partner} starterPrompt={prompt} />)
    await user.tab()
    expect(
      screen.getByRole("button", { name: "Copy starter prompt" }),
    ).toHaveFocus()
    await user.keyboard("{Enter}")

    expect(
      screen.getByText("Copy failed — select the prompt instead."),
    ).toBeVisible()
    await user.tab()

    const promptControl = screen.getByRole("textbox", { name: "Starter prompt" })
    expect(promptControl).toHaveFocus()
    expect(promptControl).toHaveAttribute("readonly")
    expect(promptControl).toHaveValue(prompt)

    await user.keyboard("{Control>}a{/Control}")
    expect(promptControl).toHaveProperty("selectionStart", 0)
    expect(promptControl).toHaveProperty("selectionEnd", prompt.length)
  })
})
