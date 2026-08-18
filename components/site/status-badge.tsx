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

const status = {
  assessed: {
    label: "Assessed concept",
    description: "Problem, evidence boundaries, risks, and next checks documented.",
    icon: BookOpenCheck,
  },
  "recorded-demo": {
    label: "Recorded demonstration",
    description: "Checked-in output is replayed against deterministic synthetic data.",
    icon: FlaskConical,
  },
  "partner-ready": {
    label: "Partner-ready",
    description: "Interfaces and validation plans have received partner review.",
    icon: Handshake,
  },
  "operational-pilot": {
    label: "Operational pilot",
    description: "The pattern has been tested in a controlled real-world setting.",
    icon: RadioTower,
  },
  "evaluated-service": {
    label: "Evaluated service",
    description: "Operational outcomes and harms have received independent evaluation.",
    icon: ClipboardCheck,
  },
} satisfies Record<
  Playbook["maturity"],
  { label: string; description: string; icon: LucideIcon }
>

export function StatusBadge({ maturity }: { maturity: Playbook["maturity"] }) {
  const item = status[maturity]
  const Icon = item.icon

  return (
    <Badge
      variant="outline"
      className="status-badge"
      aria-label={`${item.label}. ${item.description}`}
    >
      <Icon aria-hidden="true" data-icon="inline-start" />
      {item.label}
    </Badge>
  )
}
