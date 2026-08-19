import { ShieldAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Playbook } from "@/lib/playbooks/schema"
import { riskLabel } from "@/lib/playbooks/vocabulary"

type RiskBadgeProps = {
  level: Playbook["risk"]["level"]
  reasons: readonly string[]
  descriptionId?: string
}

export function RiskBadge({
  level,
  reasons,
  descriptionId = `risk-${level}-reasons`,
}: RiskBadgeProps) {
  return (
    <span className="risk-badge-group">
      <Badge
        variant="outline"
        className="risk-badge"
        data-risk={level}
        aria-describedby={descriptionId}
      >
        <ShieldAlert aria-hidden="true" data-icon="inline-start" />
        {riskLabel[level]}
      </Badge>
      <span className="sr-only" id={descriptionId}>
        {reasons.join(" ")}
      </span>
    </span>
  )
}
