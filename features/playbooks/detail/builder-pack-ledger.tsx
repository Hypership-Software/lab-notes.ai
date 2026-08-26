import type { ReactNode } from "react"

import { formatUtcDate } from "@/lib/format-date"
import type { BuildPartnerDescriptor } from "@/lib/playbooks/build-partner"
import type { DatasetSummary } from "@/lib/playbooks/dataset-registry"
import type { SyntheticData } from "@/lib/playbooks/schema"

export function BuilderPackLedger({
  sourceCount,
  dataset,
  datasetState,
  partner,
  lastReviewed,
}: {
  sourceCount: number
  dataset: DatasetSummary | undefined
  datasetState: SyntheticData["status"]
  partner: BuildPartnerDescriptor
  lastReviewed: string
}): ReactNode {
  const datasetLabel = dataset
    ? `${dataset.recordCount} synthetic records`
    : datasetState === "not-responsible"
      ? "Responsible refusal"
      : "Dataset file unavailable"

  return (
    <section
      className="border-2 border-peat bg-surface"
      aria-label="Builder pack"
    >
      <dl className="grid sm:grid-cols-2 lg:grid-cols-1">
        <div className="border-b border-structure p-4 sm:border-r lg:border-r-0">
          <dt className="font-mono text-xs uppercase tracking-[0.16em] text-peat-muted">
            Published sources
          </dt>
          <dd className="mt-1 font-display text-3xl font-extrabold" data-numeric>
            {sourceCount}
          </dd>
        </div>
        <div className="border-b border-structure p-4">
          <dt className="font-mono text-xs uppercase tracking-[0.16em] text-peat-muted">
            Starter data
          </dt>
          <dd className="mt-1 font-semibold">{datasetLabel}</dd>
        </div>
        <div className="border-b border-structure p-4 sm:border-r sm:border-b-0 lg:border-r-0 lg:border-b">
          <dt className="font-mono text-xs uppercase tracking-[0.16em] text-peat-muted">
            Domain build partner
          </dt>
          <dd className="mt-1 break-words font-mono text-sm text-evidence-strong">
            {partner.invocation}
          </dd>
        </div>
        <div className="p-4">
          <dt className="font-mono text-xs uppercase tracking-[0.16em] text-peat-muted">
            Last reviewed
          </dt>
          <dd className="mt-1 font-semibold">
            <time dateTime={lastReviewed}>{formatUtcDate(lastReviewed)}</time>
          </dd>
        </div>
      </dl>
    </section>
  )
}
