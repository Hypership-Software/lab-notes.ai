import Link from "next/link"

import type { PlaybookSummary } from "@/lib/playbooks/schema"

import { CatalogueFilters } from "./catalogue-filters"
import type { CatalogueQuery } from "./catalogue-query"
import type { CatalogueFilterOptions } from "./filter-options"
import { FilterSummary } from "./filter-summary"
import { groupPlaybooksByArea } from "./group-playbooks"
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
  // A search or a sector filter is already a statement about what the reader
  // wants, so results come back as one ranked list. Re-grouping a four-result
  // search under three area headings buries the results in furniture.
  const isFiltered = query.query !== "" || query.sectors.length > 0
  const groups = isFiltered ? [] : groupPlaybooksByArea(playbooks)

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
            Nothing matches that search and sector combination. The inventory
            holds {totalCount} playbooks across seven service areas, so a
            shorter search term usually finds more.
          </p>
          <Link href="/playbooks">Clear all filters</Link>
        </section>
      ) : isFiltered ? (
        <div className="dossier-list">
          {playbooks.map((playbook) => (
            <PlaybookDossierRow
              key={playbook.slug}
              playbook={playbook}
              headingLevel={2}
            />
          ))}
        </div>
      ) : (
        <div className="catalogue-groups">
          {groups.map((group) => (
            <section
              key={group.area}
              className="catalogue-group"
              aria-labelledby={`area-${group.area.replace(/[^a-z]+/gi, "-")}`}
            >
              <div className="catalogue-group__heading">
                <h2 id={`area-${group.area.replace(/[^a-z]+/gi, "-")}`}>
                  {group.area}
                </h2>
                <p className="catalogue-group__count" data-numeric>
                  {`${group.playbooks.length} ${
                    group.playbooks.length === 1 ? "playbook" : "playbooks"
                  }`}
                </p>
                <p className="catalogue-group__description">
                  {group.description}
                </p>
              </div>

              <div className="dossier-list">
                {group.playbooks.map((playbook) => (
                  <PlaybookDossierRow
                    key={playbook.slug}
                    playbook={playbook}
                    headingLevel={3}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  )
}
