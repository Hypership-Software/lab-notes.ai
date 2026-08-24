import type { CatalogueQuery } from "./catalogue-query"

export function hasActiveFilters(query: CatalogueQuery) {
  return Boolean(query.query || query.sectors.length)
}

export function FilterSummary({ query }: { query: CatalogueQuery }) {
  if (!hasActiveFilters(query)) {
    return <p className="filter-summary">Showing every playbook.</p>
  }

  const parts = [
    query.query ? `text “${query.query}”` : "",
    query.sectors.length ? `sector ${query.sectors.join(" or ")}` : "",
  ].filter(Boolean)

  return <p className="filter-summary">Active filters: {parts.join("; ")}.</p>
}
