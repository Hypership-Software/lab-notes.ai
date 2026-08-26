import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import { Badge } from "@/components/ui/badge"
import { ProvenanceLabel } from "@/components/site/provenance-label"
import type { DataAccess, Playbook } from "@/lib/playbooks/schema"

const literalAccessLabels: Record<DataAccess, string> = {
  open: "Open",
  "registration-or-key": "Registration or key",
  restricted: "Restricted",
}

export function DataSourcesSection({
  dataSources,
  headingId,
}: {
  dataSources: Playbook["dataSources"]
  headingId: string
}): ReactNode {
  return (
    <section
      className="scroll-mt-28 border-t-2 border-peat py-16 sm:py-20"
      aria-labelledby={headingId}
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-evidence-strong">
            Source register
          </p>
          <h2
            id={headingId}
            className="mt-3 scroll-mt-28 text-4xl sm:text-5xl lg:text-6xl"
          >
            Research already done
          </h2>
        </div>
        <ProvenanceLabel kind="source" />
      </div>
      <p className="mt-6 max-w-3xl text-lg text-peat-muted">
        We reviewed these published sources so you do not have to start from
        zero. Each source shows what it covers, how it can be accessed, and why
        it matters.
      </p>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-peat-muted">
        {dataSources.length} {dataSources.length === 1 ? "source" : "sources"}
      </p>

      <ol className="mt-10 border-t-2 border-peat">
        {dataSources.map((source, index) => (
          <li key={source.id} className="border-b-2 border-peat">
            <article className="grid gap-5 py-7 md:grid-cols-[5rem_minmax(0,1fr)] md:py-9">
              <p
                className="font-display text-5xl font-extrabold text-evidence sm:text-6xl"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-peat-muted">
                    {source.publisher}
                  </p>
                  <Badge variant="outline">
                    {literalAccessLabels[source.access]}
                  </Badge>
                </div>
                <h3 className="mt-3 max-w-4xl text-2xl sm:text-3xl">
                  {source.title}
                </h3>
                <dl className="mt-6 grid gap-5 lg:grid-cols-2">
                  <div className="border-l-2 border-structure pl-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-peat-muted">
                      What it covers
                    </dt>
                    <dd className="mt-2">{source.covers}</dd>
                  </div>
                  <div className="border-l-2 border-structure pl-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-peat-muted">
                      Why it matters here
                    </dt>
                    <dd className="mt-2">{source.relevance}</dd>
                  </div>
                </dl>
                <p className="mt-6 font-semibold text-evidence-strong">
                  <ExternalLink href={source.url}>Open source</ExternalLink>
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
