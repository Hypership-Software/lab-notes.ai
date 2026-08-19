import {
  BookOpenCheck,
  ClipboardCheck,
  FlaskConical,
  Handshake,
  RadioTower,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Playbook } from "@/lib/playbooks/schema"
import { maturityLadder } from "@/lib/playbooks/vocabulary"

const icon = {
  assessed: BookOpenCheck,
  "recorded-demo": FlaskConical,
  "partner-ready": Handshake,
  "operational-pilot": RadioTower,
  "evaluated-service": ClipboardCheck,
} satisfies Record<Playbook["maturity"], LucideIcon>

const rungByValue = Object.fromEntries(
  maturityLadder.map((rung) => [rung.value, rung]),
) as Record<Playbook["maturity"], (typeof maturityLadder)[number]>

export function StatusBadge({ maturity }: { maturity: Playbook["maturity"] }) {
  const rung = rungByValue[maturity]
  const Icon = icon[maturity]

  return (
    <Badge
      variant="outline"
      className="status-badge"
      aria-label={`${rung.label}. ${rung.description}`}
    >
      <Icon aria-hidden="true" data-icon="inline-start" />
      {rung.label}
    </Badge>
  )
}
