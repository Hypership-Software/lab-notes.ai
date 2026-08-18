import type { CatalogueQuery } from "./catalogue-query"

export function hasActiveFilters(query: CatalogueQuery) {
  return Boolean(
    query.query ||
      query.sectors.length ||
      query.patterns.length ||
      query.dataAccessibility.length ||
      query.maturity.length ||
      query.risk.length,
  )
}

export function FilterSummary({ query }: { query: CatalogueQuery }) {
  if (!hasActiveFilters(query)) {
    return <p className="filter-summary">Showing the complete assessed inventory.</p>
  }

  const parts = [
    query.query ? `text “${query.query}”` : "",
    query.sectors.length ? `sector ${query.sectors.join(" or ")}` : "",
    query.patterns.length ? `pattern ${query.patterns.join(" or ")}` : "",
    query.dataAccessibility.length
      ? `data ${query.dataAccessibility.join(" or ")}`
      : "",
    query.maturity.length ? `maturity ${query.maturity.join(" or ")}` : "",
    query.risk.length ? `risk ${query.risk.join(" or ")}` : "",
  ].filter(Boolean)

  return <p className="filter-summary">Active filters: {parts.join("; ")}.</p>
}
