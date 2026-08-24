import type { ReactNode } from "react"

import {
  demoBadgeLabels,
  syntheticDataBadgeLabels,
} from "@/lib/playbooks/vocabulary"

/**
 * Says in words whether a playbook has the thing, for both answers. The
 * leading symbol is decorative: the label alone carries the state, so the
 * badge still reads correctly in forced colours, in monochrome, and to a
 * screen reader.
 */
export function AvailabilityBadge({
  kind,
  available,
}: {
  kind: "dataset" | "demo"
  available: boolean
}): ReactNode {
  const label =
    kind === "dataset"
      ? syntheticDataBadgeLabels[available ? "available" : "not-responsible"]
      : demoBadgeLabels[available ? "available" : "not-yet"]

  return (
    <span className="status-badge" data-available={available}>
      <span aria-hidden="true">{available ? "●" : "○"}</span>
      {label}
    </span>
  )
}
