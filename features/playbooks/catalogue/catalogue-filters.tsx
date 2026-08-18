"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { type FormEvent, useRef, useTransition } from "react"

import type { CatalogueQuery } from "./catalogue-query"
import type {
  CatalogueFilterOption,
  CatalogueFilterOptions,
} from "./filter-options"

type FilterGroupProps = {
  label: string
  name: string
  options: readonly CatalogueFilterOption[]
  selected: readonly string[]
}

function FilterGroup({ label, name, options, selected }: FilterGroupProps) {
  if (options.length === 0) return null

  return (
    <details className="filter-group">
      <summary>
        {label}
        {selected.length > 0 ? ` (${selected.length})` : ""}
      </summary>
      <fieldset>
        <legend className="sr-only">Filter by {label.toLowerCase()}</legend>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              defaultChecked={selected.includes(option.value)}
            />
            <span>{option.label}</span>
            <span className="filter-option__count">{option.count}</span>
          </label>
        ))}
      </fieldset>
    </details>
  )
}

export function CatalogueFilters({
  query,
  options,
}: {
  query: CatalogueQuery
  options: CatalogueFilterOptions
}) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  function replaceFromForm(form: HTMLFormElement) {
    const formData = new FormData(form)
    const searchParams = new URLSearchParams()

    for (const [key, value] of formData.entries()) {
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
    <form
      ref={formRef}
      className="catalogue-filters"
      action="/playbooks"
      method="get"
      onSubmit={handleSubmit}
      onChange={(event) => {
        if (event.target instanceof HTMLInputElement && event.target.type === "checkbox") {
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
            placeholder="Problem, sector, or technical pattern"
          />
          <button type="submit">Search</button>
        </div>
      </div>

      <div className="catalogue-filter-groups" aria-label="Catalogue filters">
        <span className="catalogue-filter-groups__label">
          <SlidersHorizontal aria-hidden="true" />
          Refine
        </span>
        <FilterGroup
          label="Sector"
          name="sector"
          options={options.sectors}
          selected={query.sectors}
        />
        <FilterGroup
          label="Technical pattern"
          name="pattern"
          options={options.patterns}
          selected={query.patterns}
        />
        <FilterGroup
          label="Data access"
          name="data"
          options={options.dataAccessibility}
          selected={query.dataAccessibility}
        />
        <FilterGroup
          label="Maturity"
          name="maturity"
          options={options.maturity}
          selected={query.maturity}
        />
        <FilterGroup
          label="Risk"
          name="risk"
          options={options.risk}
          selected={query.risk}
        />
      </div>
      {isPending ? <p className="filter-pending">Updating results…</p> : null}
    </form>
  )
}
