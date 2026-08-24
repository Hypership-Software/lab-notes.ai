export type BuildPartnerDescriptor = {
  name: string
  invocation: `$${string}`
  skillPath: `.agents/skills/${string}/SKILL.md`
  briefPath: `.agents/skills/${string}/references/domain-brief.md`
}

export function getBuildPartnerDescriptor(slug: string): BuildPartnerDescriptor {
  const name = `build-${slug}`

  return {
    name,
    invocation: `$${name}`,
    skillPath: `.agents/skills/${name}/SKILL.md`,
    briefPath: `.agents/skills/${name}/references/domain-brief.md`,
  }
}

export function getBuildPartnerStarterPrompt(slug: string): string {
  const { invocation } = getBuildPartnerDescriptor(slug)

  return `Use ${invocation} as my domain build partner.\n\nHelp me understand the opportunity, sources, synthetic dataset and constraints before we decide what—if anything—is worth prototyping.`
}
