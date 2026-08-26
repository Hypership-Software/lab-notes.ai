import { readFile, readdir, realpath } from "node:fs/promises"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import {
  buildPartnerAgents,
  getBuildPartnerDescriptor,
} from "@/lib/playbooks/build-partner"
import { getPlaybookSlugs } from "@/lib/playbooks/registry"

const skillsRoot = join(process.cwd(), ".agents", "skills")
const claudeSkillsRoot = join(process.cwd(), ".claude", "skills")

function frontmatterValue(source: string, key: string) {
  const match = source.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)`, "m"))
  return match?.[1]?.trim()
}

describe("playbook domain build partners", () => {
  it("has exactly one build skill for every registered playbook", async () => {
    const actual = (await readdir(skillsRoot))
      .filter((name) => name.startsWith("build-"))
      .sort()
    const expected = getPlaybookSlugs().map((slug) => `build-${slug}`).sort()

    expect(actual).toEqual(expected)
  })

  it("exposes the same skill folder to every supported agent", async () => {
    expect(buildPartnerAgents.map((agent) => agent.skillsRoot)).toEqual([
      ".claude/skills",
      ".agents/skills",
    ])

    const actual = (await readdir(claudeSkillsRoot))
      .filter((name) => name.startsWith("build-"))
      .sort()
    const expected = getPlaybookSlugs().map((slug) => `build-${slug}`).sort()
    expect(actual).toEqual(expected)

    for (const name of expected) {
      // One skill, two discovery paths: the Claude Code entry must be a link
      // to the Codex folder, not a copy that could drift.
      expect(await realpath(join(claudeSkillsRoot, name))).toBe(
        await realpath(join(skillsRoot, name)),
      )
      expect(
        await readFile(join(claudeSkillsRoot, name, "SKILL.md"), "utf8"),
      ).toContain(`name: ${name}`)
    }
  })

  it("validates every checked-in playbook skill", async () => {
    const actual = (await readdir(skillsRoot)).filter((name) => name.startsWith("build-"))

    expect(actual).toContain("build-life-event-services")

    for (const name of actual) {
      const slug = name.slice("build-".length)
      const descriptor = getBuildPartnerDescriptor(slug)
      const skill = await readFile(join(process.cwd(), descriptor.skillPath), "utf8")
      const brief = await readFile(join(process.cwd(), descriptor.briefPath), "utf8")
      const metadata = await readFile(
        join(skillsRoot, descriptor.name, "agents", "openai.yaml"),
        "utf8",
      )

      expect(frontmatterValue(skill, "name")).toBe(descriptor.name)
      expect(frontmatterValue(skill, "description")).toMatch(/build partner/i)
      expect(skill).toContain("references/domain-brief.md")
      expect(brief).toContain("## Known unknowns")
      expect(brief).toContain("## Assumptions to challenge")
      expect(metadata).toContain(`display_name: "`)
      expect(metadata).toContain(`default_prompt: "Use $${descriptor.name}`)
    }
  })
})
