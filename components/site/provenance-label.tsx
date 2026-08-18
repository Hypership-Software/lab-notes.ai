import {
  ArchiveRestore,
  FileCheck2,
  FlaskConical,
  ListChecks,
  UserCheck,
} from "lucide-react"

import { cn } from "@/lib/utils"

const provenance = {
  source: { label: "Official source sample", icon: FileCheck2 },
  synthetic: { label: "Synthetic working data", icon: FlaskConical },
  recorded: { label: "Recorded AI-assisted output", icon: ArchiveRestore },
  baseline: { label: "Deterministic non-AI baseline", icon: ListChecks },
  review: { label: "Human review state", icon: UserCheck },
} as const

export function ProvenanceLabel({
  kind,
  className,
}: {
  kind: keyof typeof provenance
  className?: string
}) {
  const item = provenance[kind]
  const Icon = item.icon

  return (
    <span className={cn("provenance-label", className)} data-provenance={kind}>
      <Icon aria-hidden="true" />
      {item.label}
    </span>
  )
}
