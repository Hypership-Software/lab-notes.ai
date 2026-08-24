import type { PlaybookSummary } from "@/lib/playbooks/schema"

import type { CatalogueQuery } from "./catalogue-query"

const collator = new Intl.Collator("en-GB", { sensitivity: "base" })

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-GB")
}

// Search covers only what a row actually shows: title, summary, and sector.
// Nothing here searches text the reader cannot see on the page.
function matchesSearch(playbook: PlaybookSummary, query: string) {
  if (!query) return true

  const haystack = normalise(
    [playbook.title, playbook.summary, playbook.sector].join(" "),
  )

  return haystack.includes(normalise(query))
}

// A playbook someone can actually try comes first; everything else is
// alphabetical, so the order never implies a quality ranking.
function comparePlaybooks(left: PlaybookSummary, right: PlaybookSummary) {
  const demoRank = (playbook: PlaybookSummary) =>
    playbook.demo.status === "available" ? 0 : 1

  return (
    demoRank(left) - demoRank(right) || collator.compare(left.title, right.title)
  )
}

export function filterPlaybooks(
  playbooks: readonly PlaybookSummary[],
  query: CatalogueQuery,
): PlaybookSummary[] {
  return playbooks
    .filter((playbook) => matchesSearch(playbook, query.query))
    .filter(
      (playbook) =>
        query.sectors.length === 0 || query.sectors.includes(playbook.sector),
    )
    .sort(comparePlaybooks)
}
