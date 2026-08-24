"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { type FormEvent, useTransition } from "react"

import type { CatalogueQuery } from "./catalogue-query"
import type { CatalogueFilterOptions } from "./filter-options"

export function CatalogueFilters({
  query,
  options,
}: {
  query: CatalogueQuery
  options: CatalogueFilterOptions
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // The form's own values are the source of truth, so the URL is rewritten
  // from the DOM rather than from React state. Ticking a box replaces the
  // history entry in a transition: the inputs are never unmounted, so the
  // checkbox the reader just used keeps focus.
  function replaceFromForm(form: HTMLFormElement) {
    const searchParams = new URLSearchParams()

    for (const [key, value] of new FormData(form).entries()) {
      if (typeof value === "string" && value.trim()) {
        searchParams.append(key, value.trim())
      }
    }

    const queryString = searchParams.toString()
    startTransition(() => {
      router.replace(queryString ? `/playbooks?${queryString}` : "/playbooks", {
        scroll: false,
      })
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    replaceFromForm(event.currentTarget)
  }

  return (
    // `action`/`method` keep the form working as a plain GET without
    // JavaScript; the handlers below only make it feel immediate.
    <form
      className="catalogue-filters"
      action="/playbooks"
      method="get"
      onSubmit={handleSubmit}
      onChange={(event) => {
        if (
          event.target instanceof HTMLInputElement &&
          event.target.type === "checkbox"
        ) {
          replaceFromForm(event.currentTarget)
        }
      }}
      aria-busy={isPending}
    >
      <div className="catalogue-search">
        <label htmlFor="catalogue-query">Search the playbooks</label>
        <div>
          <Search aria-hidden="true" />
          <input
            id="catalogue-query"
            type="search"
            name="q"
            defaultValue={query.query}
            maxLength={120}
            placeholder="Title, summary, or sector"
          />
          <button type="submit">Search</button>
        </div>
      </div>

      <div className="catalogue-filter-groups" aria-label="Catalogue filters">
        <span className="catalogue-filter-groups__label">
          <SlidersHorizontal aria-hidden="true" />
          Refine
        </span>
        <details className="filter-group">
          <summary>
            Sector
            {query.sectors.length > 0 ? ` (${query.sectors.length})` : ""}
          </summary>
          <fieldset>
            <legend className="sr-only">Filter by sector</legend>
            {options.sectors.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  name="sector"
                  value={option.value}
                  defaultChecked={query.sectors.includes(option.value)}
                />
                <span>{option.label}</span>
                <span className="filter-option__count">{option.count}</span>
              </label>
            ))}
          </fieldset>
        </details>
      </div>
      {isPending ? <p className="filter-pending">Updating results…</p> : null}
    </form>
  )
}
