import Link from "next/link"

import type { PlaybookSummary } from "@/lib/playbooks/schema"

import type { CatalogueQuery } from "./catalogue-query"
import { CatalogueFilters } from "./catalogue-filters"
import type { CatalogueFilterOptions } from "./filter-options"
import { FilterSummary } from "./filter-summary"
import { PlaybookDossierRow } from "./playbook-dossier-row"

type PlaybookCatalogueProps = {
  playbooks: readonly PlaybookSummary[]
  query: CatalogueQuery
  options: CatalogueFilterOptions
  totalCount: number
}

export function PlaybookCatalogue({
  playbooks,
  query,
  options,
  totalCount,
}: PlaybookCatalogueProps) {
  const resultLabel = `${playbooks.length} ${
    playbooks.length === 1 ? "playbook" : "playbooks"
  } shown`

  return (
    <>
      <CatalogueFilters query={query} options={options} />
      <div className="catalogue-results-heading">
        <div>
          <p role="status" aria-live="polite" aria-atomic="true">
            {resultLabel}
          </p>
          <FilterSummary query={query} />
        </div>
        <p>{totalCount} in the complete inventory</p>
      </div>

      {playbooks.length === 0 ? (
        <section className="catalogue-empty" aria-labelledby="empty-title">
          <h2 id="empty-title">No playbooks match</h2>
          <p>
            No playbook matches the current search and sector filters.
          </p>
          <Link href="/playbooks">Clear all filters</Link>
        </section>
      ) : (
        <div className="dossier-list">
          {playbooks.map((playbook) => (
            <PlaybookDossierRow key={playbook.slug} playbook={playbook} />
          ))}
        </div>
      )}
    </>
  )
}
