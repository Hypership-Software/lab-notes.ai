import type { Playbook, PlaybookSummary } from "./schema"

function comparePlaybooks(left: Playbook, right: Playbook) {
  return (
    left.title.localeCompare(right.title, "en-GB") ||
    left.slug.localeCompare(right.slug, "en-GB")
  )
}

function toSummary(playbook: Playbook): PlaybookSummary {
  return Object.freeze({
    slug: playbook.slug,
    title: playbook.title,
    summary: playbook.summary,
    sector: playbook.sector,
    technicalPatterns: playbook.technicalPatterns,
    maturity: playbook.maturity,
    dataAccessibility: playbook.dataAccessibility,
    risk: playbook.risk,
    demo: playbook.demo,
    lastReviewed: playbook.lastReviewed,
  })
}

export function createPlaybookRegistry(input: readonly Playbook[]) {
  const duplicateCheck = new Set<string>()

  for (const playbook of input) {
    if (duplicateCheck.has(playbook.slug)) {
      throw new Error(`Duplicate playbook slug "${playbook.slug}"`)
    }

    duplicateCheck.add(playbook.slug)
  }

  const playbooks = Object.freeze([...input].sort(comparePlaybooks))
  const bySlug = new Map(playbooks.map((playbook) => [playbook.slug, playbook]))
  const summaries = Object.freeze(playbooks.map(toSummary))
  const slugs = Object.freeze(playbooks.map((playbook) => playbook.slug))

  return Object.freeze({
    getAllPlaybooks: () => playbooks,
    getPlaybook: (slug: string) => bySlug.get(slug),
    getPlaybookSummaries: () => summaries,
    getPlaybookSlugs: () => slugs,
  })
}

// Task 3 replaces this explicit empty list with the reviewed content imports.
const registeredPlaybooks: readonly Playbook[] = []
const registry = createPlaybookRegistry(registeredPlaybooks)

export const getAllPlaybooks = registry.getAllPlaybooks
export const getPlaybook = registry.getPlaybook
export const getPlaybookSummaries = registry.getPlaybookSummaries
export const getPlaybookSlugs = registry.getPlaybookSlugs
