import { FileCheck2, FlaskConical } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The three kinds of material this site shows, named in the exact words
 * DESIGN.md fixes for them. A reader should never have to work out whether
 * what they are looking at is real, invented, or derived — the label says so,
 * in the same words, everywhere it appears.
 */
const provenance = {
  source: { label: "Real published source", icon: FileCheck2 },
  synthetic: { label: "Synthetic working data", icon: FlaskConical },
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
