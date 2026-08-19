import type { ReactNode } from "react"

import { RiskBadge } from "@/components/site/risk-badge"
import { StatusBadge } from "@/components/site/status-badge"
import { formatUtcDate } from "@/lib/format-date"
import type { Playbook } from "@/lib/playbooks/schema"
import { dataAccessibilityLabel } from "@/lib/playbooks/vocabulary"

import type { ReviewStatus } from "./review-status"

export function MetadataRail({
  playbook,
  reviewStatus,
}: {
  playbook: Playbook
  reviewStatus: ReviewStatus
}): ReactNode {
  return (
    <dl className="metadata-rail">
      <div>
        <dt>Maturity</dt>
        <dd>
          <StatusBadge maturity={playbook.maturity} />
        </dd>
      </div>
      <div>
        <dt>Data accessibility</dt>
        <dd>{dataAccessibilityLabel[playbook.dataAccessibility]}</dd>
      </div>
      <div>
        <dt>Risk</dt>
        <dd>
          <RiskBadge level={playbook.risk.level} reasons={playbook.risk.reasons} />
        </dd>
      </div>
      <div>
        <dt>Sector</dt>
        <dd>{playbook.sector}</dd>
      </div>
      <div>
        <dt>Technical patterns</dt>
        <dd>{playbook.technicalPatterns.join(", ")}</dd>
      </div>
      <div>
        <dt>Review status</dt>
        <dd>
          {reviewStatus.status === "review-needed" ? "Review needed" : "Current"}
        </dd>
      </div>
      <div>
        <dt>Last reviewed</dt>
        <dd>
          <time dateTime={reviewStatus.reviewedAt}>
            {formatUtcDate(reviewStatus.reviewedAt)}
          </time>
        </dd>
      </div>
      <div>
        <dt>Review due</dt>
        <dd>
          <time dateTime={reviewStatus.reviewDueAt}>
            {formatUtcDate(reviewStatus.reviewDueAt)}
          </time>
        </dd>
      </div>
    </dl>
  )
}
