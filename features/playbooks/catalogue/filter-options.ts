import type { PlaybookSummary } from "@/lib/playbooks/schema"

export type CatalogueFilterOption = {
  value: string
  label: string
  count: number
}

export type CatalogueFilterOptions = {
  sectors: CatalogueFilterOption[]
}

const collator = new Intl.Collator("en-GB", { sensitivity: "base" })

/**
 * Sector options come from the inventory itself, so the filter can never
 * offer a sector no playbook uses. Counts are of the whole inventory, not
 * of the current result set: they describe what is there to be found.
 */
export function getCatalogueFilterOptions(
  playbooks: readonly PlaybookSummary[],
): CatalogueFilterOptions {
  const counts = new Map<string, number>()
  for (const playbook of playbooks) {
    counts.set(playbook.sector, (counts.get(playbook.sector) ?? 0) + 1)
  }

  return {
    sectors: [...counts]
      .map(([value, count]) => ({ value, label: value, count }))
      .sort((left, right) => collator.compare(left.label, right.label)),
  }
}
