import { ArrowRight, Database } from "lucide-react"
import Link from "next/link"

import { RiskBadge } from "@/components/site/risk-badge"
import { StatusBadge } from "@/components/site/status-badge"
import type { Playbook, PlaybookSummary } from "@/lib/playbooks/schema"

const dataLabel: Record<Playbook["dataAccessibility"], string> = {
  open: "Open data",
  "public-readonly": "Public, reuse to confirm",
  partial: "Partly accessible",
  restricted: "Partner data required",
  unknown: "Access not yet assessed",
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export function PlaybookDossierRow({ playbook }: { playbook: PlaybookSummary }) {
  const riskDescriptionId = `${playbook.slug}-risk-reasons`

  return (
    <article className="dossier-row">
      <div className="dossier-row__identity">
        <p className="dossier-row__sector">{playbook.sector}</p>
        <h2>{playbook.title}</h2>
        <p>{playbook.summary}</p>
      </div>

      <dl className="dossier-row__metadata">
        <div>
          <dt>Evidence state</dt>
          <dd>
            <StatusBadge maturity={playbook.maturity} />
          </dd>
        </div>
        <div>
          <dt>Data access</dt>
          <dd className="data-access-label">
            <Database aria-hidden="true" />
            {dataLabel[playbook.dataAccessibility]}
          </dd>
        </div>
        <div>
          <dt>Risk</dt>
          <dd>
            <RiskBadge
              level={playbook.risk.level}
              reasons={playbook.risk.reasons}
              descriptionId={riskDescriptionId}
            />
          </dd>
        </div>
        <div>
          <dt>Technical patterns</dt>
          <dd>{playbook.technicalPatterns.join(", ")}</dd>
        </div>
        <div>
          <dt>Last reviewed</dt>
          <dd>
            <time dateTime={playbook.lastReviewed}>
              {dateFormatter.format(new Date(`${playbook.lastReviewed}T00:00:00Z`))}
            </time>
          </dd>
        </div>
      </dl>

      <Link
        className="dossier-row__link"
        href={`/playbooks/${playbook.slug}`}
        aria-label={`Open ${playbook.title} playbook`}
      >
        Open playbook
        <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  )
}
