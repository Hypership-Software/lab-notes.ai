import { describe, expect, it } from "vitest"

import {
  getBuildPartnerDescriptor,
  getBuildPartnerStarterPrompt,
} from "./build-partner"

describe("build partner", () => {
  it("derives a repository skill from a playbook slug", () => {
    expect(getBuildPartnerDescriptor("life-event-services")).toEqual({
      name: "build-life-event-services",
      invocation: "$build-life-event-services",
      skillPath: ".agents/skills/build-life-event-services/SKILL.md",
      briefPath:
        ".agents/skills/build-life-event-services/references/domain-brief.md",
    })
  })

  it("builds the copyable starter prompt", () => {
    expect(getBuildPartnerStarterPrompt("life-event-services")).toBe(
      "Use $build-life-event-services as my domain build partner.\n\n" +
        "Help me understand the opportunity, sources, synthetic dataset and constraints before we decide what—if anything—is worth prototyping.",
    )
  })
})
