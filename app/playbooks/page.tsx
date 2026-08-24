import type { Metadata } from "next"

import { PlaybookCatalogue } from "@/features/playbooks/catalogue/playbook-catalogue"
import { parseCatalogueQuery } from "@/features/playbooks/catalogue/catalogue-query"
import { getCatalogueFilterOptions } from "@/features/playbooks/catalogue/filter-options"
import { filterPlaybooks } from "@/features/playbooks/catalogue/filter-playbooks"
import { getPlaybookSummaries } from "@/lib/playbooks/registry"

export const metadata: Metadata = {
  title: "Playbooks",
  description:
    "Browse the public-service AI examples from Northern Ireland's draft AI strategy by sector and inspect their published sources and starter-data state.",
}

type PlaybooksPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function PlaybooksPage({ searchParams }: PlaybooksPageProps) {
  const allPlaybooks = getPlaybookSummaries()
  const query = parseCatalogueQuery(await searchParams)
  const playbooks = filterPlaybooks(allPlaybooks, query)

  return (
    <div className="page-shell catalogue-page">
      <header className="page-intro">
        <h1>Public-service AI playbooks</h1>
        <p>
          One playbook per example project in the draft strategy. Each says what
          the draft proposed, which real sources were investigated, whether a
          synthetic dataset exists to explore the idea with, and what must be
          considered before building. None of them is a deployed service.
        </p>
      </header>
      <PlaybookCatalogue
        playbooks={playbooks}
        query={query}
        options={getCatalogueFilterOptions(allPlaybooks)}
        totalCount={allPlaybooks.length}
      />
    </div>
  )
}
