import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import { formatUtcDate } from "@/lib/format-date"
import type { Playbook } from "@/lib/playbooks/schema"
import { sourceTypeLabel } from "@/lib/playbooks/vocabulary"

import { DefinitionListRow } from "./definition-list-row"

export function SourceRegister({
  sources,
}: {
  sources: Playbook["officialSources"]
}): ReactNode {
  return (
    <ol className="source-register">
      {sources.map((source) => (
        <li key={source.id}>
          <article>
            <h3>
              <ExternalLink href={source.canonicalUrl}>
                {source.title}
              </ExternalLink>
            </h3>
            <dl>
              <div>
                <dt>Publisher</dt>
                <dd>{source.publisher}</dd>
              </div>
              <div>
                <dt>Jurisdiction</dt>
                <dd>{source.jurisdiction}</dd>
              </div>
              <div>
                <dt>Source type</dt>
                <dd>{sourceTypeLabel[source.sourceType]}</dd>
              </div>
              <div>
                <dt>Covered period</dt>
                <dd>{source.coveredPeriod}</dd>
              </div>
              <div>
                <dt>Accessed</dt>
                <dd>
                  <time dateTime={source.accessedAt}>
                    {formatUtcDate(source.accessedAt)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>Reuse status</dt>
                <dd>{source.reuseStatus}</dd>
              </div>
              {source.localSamplePath && source.sha256 ? (
                <>
                  <div>
                    <dt>Local sample</dt>
                    <dd>{source.localSamplePath}</dd>
                  </div>
                  <div>
                    <dt>SHA-256</dt>
                    <dd>{source.sha256}</dd>
                  </div>
                </>
              ) : null}
              <div>
                <dt>Purpose</dt>
                <dd>{source.purpose}</dd>
              </div>
              <DefinitionListRow
                term="Transformations"
                items={source.transformations}
              />
              <DefinitionListRow term="Caveats" items={source.caveats} />
            </dl>
          </article>
        </li>
      ))}
    </ol>
  )
}
