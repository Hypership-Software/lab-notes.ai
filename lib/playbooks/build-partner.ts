/**
 * The coding agents this repository's skills are wired up for. Every skill
 * lives once, in `.agents/skills`, and follows the open Agent Skills
 * standard; `.claude/skills` holds one symlink per skill so Claude Code finds
 * the same folder. Any other agent that reads the standard can load a skill
 * by name.
 */
export const buildPartnerAgents = [
  { id: "claude-code", label: "Claude Code", prefix: "/", skillsRoot: ".claude/skills" },
  { id: "codex", label: "Codex", prefix: "$", skillsRoot: ".agents/skills" },
] as const

export type BuildPartnerAgent = (typeof buildPartnerAgents)[number]

export type BuildPartnerInvocation = {
  agent: BuildPartnerAgent["label"]
  command: string
}

export type BuildPartnerDescriptor = {
  /** The agent-agnostic skill name, e.g. `build-life-event-services`. */
  name: string
  /** How to call the skill in each supported agent, in display order. */
  invocations: readonly BuildPartnerInvocation[]
  skillPath: `.agents/skills/${string}/SKILL.md`
  briefPath: `.agents/skills/${string}/references/domain-brief.md`
}

export function getBuildPartnerDescriptor(slug: string): BuildPartnerDescriptor {
  const name = `build-${slug}`

  return {
    name,
    invocations: buildPartnerAgents.map((agent) => ({
      agent: agent.label,
      command: `${agent.prefix}${name}`,
    })),
    skillPath: `.agents/skills/${name}/SKILL.md`,
    briefPath: `.agents/skills/${name}/references/domain-brief.md`,
  }
}

/** Asks for the skill by name, which works in any agent that supports skills. */
export function getBuildPartnerStarterPrompt(slug: string): string {
  const { name } = getBuildPartnerDescriptor(slug)

  return `Use the ${name} skill as my domain build partner.\n\nHelp me understand the opportunity, sources, synthetic dataset and constraints before we decide what—if anything—is worth prototyping.`
}
