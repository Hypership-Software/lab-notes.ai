import type {
  DataAccessibility,
  Maturity,
  PlaybookSummary,
} from "@/lib/playbooks/schema"

import type { CatalogueQuery } from "./catalogue-query"

const collator = new Intl.Collator("en-GB", { sensitivity: "base" })

const maturityRank: Record<Maturity, number> = {
  "recorded-demo": 0,
  assessed: 1,
  "partner-ready": 2,
  "operational-pilot": 3,
  "evaluated-service": 4,
}

const dataAccessibilityRank: Record<DataAccessibility, number> = {
  open: 0,
  "public-readonly": 1,
  partial: 2,
  restricted: 3,
  unknown: 4,
}

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-GB")
}

function matchesSearch(playbook: PlaybookSummary, query: string) {
  if (!query) return true

  const haystack = normalise(
    [
      playbook.title,
      playbook.summary,
      playbook.problem,
      playbook.sector,
      ...playbook.technicalPatterns,
      ...playbook.tags,
    ].join(" "),
  )

  return haystack.includes(normalise(query))
}

function comparePlaybooks(left: PlaybookSummary, right: PlaybookSummary) {
  return (
    maturityRank[left.maturity] - maturityRank[right.maturity] ||
    dataAccessibilityRank[left.dataAccessibility] -
      dataAccessibilityRank[right.dataAccessibility] ||
    collator.compare(left.title, right.title)
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
    .filter(
      (playbook) =>
        query.patterns.length === 0 ||
        playbook.technicalPatterns.some((pattern) => query.patterns.includes(pattern)),
    )
    .filter(
      (playbook) =>
        query.dataAccessibility.length === 0 ||
        query.dataAccessibility.includes(playbook.dataAccessibility),
    )
    .filter(
      (playbook) =>
        query.maturity.length === 0 || query.maturity.includes(playbook.maturity),
    )
    .filter(
      (playbook) =>
        query.risk.length === 0 || query.risk.includes(playbook.risk.level),
    )
    .sort(comparePlaybooks)
}
