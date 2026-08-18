import type { Metadata } from "next"

import { PlaybookCatalogue } from "@/features/playbooks/catalogue/playbook-catalogue"
import { parseCatalogueQuery } from "@/features/playbooks/catalogue/catalogue-query"
import { getCatalogueFilterOptions } from "@/features/playbooks/catalogue/filter-options"
import { filterPlaybooks } from "@/features/playbooks/catalogue/filter-playbooks"
import { getPlaybookSummaries } from "@/lib/playbooks/registry"

export const metadata: Metadata = {
  title: "Playbooks",
  description:
    "Browse assessed public-service AI proposals by sector, data accessibility, maturity, risk, and technical pattern.",
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
          Compare the problem, evidence state, data reality, risks, and reusable
          technical pattern behind every proposal. An assessed concept is not a
          deployed service.
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
