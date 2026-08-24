import Link from "next/link"

import { AvailabilityBadge } from "@/components/site/availability-badge"
import { formatUtcDate } from "@/lib/format-date"
import type { PlaybookSummary } from "@/lib/playbooks/schema"

export function PlaybookDossierRow({ playbook }: { playbook: PlaybookSummary }) {
  return (
    <article className="dossier-row">
      <div className="dossier-row__identity">
        <p className="dossier-row__sector">{playbook.sector}</p>
        <h2>
          <Link href={`/playbooks/${playbook.slug}`}>{playbook.title}</Link>
        </h2>
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
