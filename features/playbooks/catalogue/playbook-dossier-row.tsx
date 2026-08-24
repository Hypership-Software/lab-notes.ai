import Link from "next/link"

import { AvailabilityBadge } from "@/components/site/availability-badge"
import { formatUtcDate } from "@/lib/format-date"
import type { PlaybookSummary } from "@/lib/playbooks/schema"

/**
 * `headingLevel` exists because the same row appears under a group `h2` in the
 * catalogue and under a section `h2` on the home page; the title has to sit one
 * level below whichever heading introduces the list.
 */
export function PlaybookDossierRow({
  playbook,
  headingLevel = 3,
}: {
  playbook: PlaybookSummary
  headingLevel?: 2 | 3 | 4
}) {
  const Title = headingLevel === 2 ? "h2" : headingLevel === 3 ? "h3" : "h4"

  return (
    <article className="dossier-row">
      <div className="dossier-row__identity">
        <p className="dossier-row__sector">{playbook.sector}</p>
        <Title>
          <Link href={`/playbooks/${playbook.slug}`}>{playbook.title}</Link>
        </Title>
        <p className="dossier-row__summary">{playbook.summary}</p>
      </div>

      <div className="dossier-row__state">
        <dl className="dossier-row__metadata">
          <div>
            <dt>Starter dataset</dt>
            <dd>
              <AvailabilityBadge
                available={playbook.syntheticData.status === "available"}
              />
            </dd>
          </div>
          <div>
            <dt>Published sources</dt>
            <dd>{playbook.dataSourceCount} investigated</dd>
          </div>
        </dl>
        <p className="dossier-row__reviewed">
          Last reviewed{" "}
          <time dateTime={playbook.lastReviewed}>
            {formatUtcDate(playbook.lastReviewed)}
          </time>
        </p>
      </div>
    </article>
  )
}
