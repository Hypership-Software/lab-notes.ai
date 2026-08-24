import Link from "next/link"

import { AvailabilityBadge } from "@/components/site/availability-badge"
import { formatUtcDate } from "@/lib/format-date"
import type { PlaybookSummary } from "@/lib/playbooks/schema"

/**
 * `headingLevel` exists because the same row appears under a page `h1` in the
 * catalogue and under a section `h2` on the home page; the title has to sit
 * one level below whichever heading introduces the list.
 */
export function PlaybookDossierRow({
  playbook,
  headingLevel = 2,
}: {
  playbook: PlaybookSummary
  headingLevel?: 2 | 3
}) {
  const Title = headingLevel === 3 ? "h3" : "h2"

  return (
    <article className="dossier-row">
      <div className="dossier-row__identity">
        <p className="dossier-row__sector">{playbook.sector}</p>
        <Title>
          <Link href={`/playbooks/${playbook.slug}`}>{playbook.title}</Link>
        </Title>
        <p>{playbook.summary}</p>
      </div>

      <dl className="dossier-row__metadata">
        <div>
          <dt>Synthetic dataset</dt>
          <dd>
            <AvailabilityBadge
              kind="dataset"
              available={playbook.syntheticData.status === "available"}
            />
          </dd>
        </div>
        <div>
          <dt>Demo</dt>
          <dd>
            <AvailabilityBadge
              kind="demo"
              available={playbook.demo.status === "available"}
            />
          </dd>
        </div>
        <div>
          <dt>Last reviewed</dt>
          <dd>
            <time dateTime={playbook.lastReviewed}>
              {formatUtcDate(playbook.lastReviewed)}
            </time>
          </dd>
        </div>
      </dl>
    </article>
  )
}
