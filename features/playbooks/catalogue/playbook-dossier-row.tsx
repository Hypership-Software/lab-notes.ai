import { ArrowRight, Database } from "lucide-react"
import Link from "next/link"

import { RiskBadge } from "@/components/site/risk-badge"
import { StatusBadge } from "@/components/site/status-badge"
import { formatUtcDate } from "@/lib/format-date"
import type { PlaybookSummary } from "@/lib/playbooks/schema"
import { dataAccessibilityLabel } from "@/lib/playbooks/vocabulary"

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
            {dataAccessibilityLabel[playbook.dataAccessibility]}
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
              {formatUtcDate(playbook.lastReviewed)}
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
