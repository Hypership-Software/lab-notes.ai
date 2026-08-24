import { Database } from "lucide-react"
import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import type { Playbook } from "@/lib/playbooks/schema"
import { dataAccessLabels } from "@/lib/playbooks/vocabulary"

/**
 * B — the real, published sources investigated for this playbook. Each one
 * is a dossier rather than a bare link: what it covers, how open it is, and
 * why it was considered, so a reader can judge the evidence without opening
 * every tab.
 */
export function DataSourcesSection({
  dataSources,
  headingId,
}: {
  dataSources: Playbook["dataSources"]
  headingId: string
}): ReactNode {
  return (
    <section className="playbook-detail__section" aria-labelledby={headingId}>
      <h2 id={headingId}>Data sources investigated</h2>
      <ol className="source-register">
        {dataSources.map((source) => (
          <li key={source.id}>
            <article className="source-dossier">
              <h3>
                <ExternalLink href={source.url}>{source.title}</ExternalLink>
              </h3>
              <dl>
                <div>
                  <dt>Publisher</dt>
                  <dd>{source.publisher}</dd>
                </div>
                <div>
                  <dt>Access</dt>
                  <dd className="data-access-label">
                    <Database aria-hidden="true" />
                    {dataAccessLabels[source.access]}
                  </dd>
                </div>
                <div>
                  <dt>What it covers</dt>
                  <dd>{source.covers}</dd>
                </div>
                <div>
                  <dt>Why it is relevant</dt>
                  <dd>{source.relevance}</dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
