import {
  BookOpenCheck,
  ClipboardCheck,
  FlaskConical,
  Handshake,
  RadioTower,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Maturity } from "@/lib/playbooks/schema"
import { maturityRung } from "@/lib/playbooks/vocabulary"

const icon = {
  assessed: BookOpenCheck,
  "recorded-demo": FlaskConical,
  "partner-ready": Handshake,
  "operational-pilot": RadioTower,
  "evaluated-service": ClipboardCheck,
} satisfies Record<Maturity, LucideIcon>

export function StatusBadge({ maturity }: { maturity: Maturity }) {
  const rung = maturityRung[maturity]
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
