import type { ReactNode } from "react"

import {
  reviewDispositionLabels,
  type ReviewDisposition,
} from "../domain/review-disposition"
import type { Finding, FindingId } from "../domain/types"

/**
 * The list of findings, doubling as the page's finding navigation.
 *
 * Selecting one moves the reader to its thread rather than hiding the others:
 * every thread is in the page whether or not JavaScript ran, so this is
 * emphasis and movement, not disclosure. `aria-current` carries the selection,
 * and each button names its finding's review state so the state is legible
 * without opening the thread.
 */
export function FindingList({
  findings,
  activeFindingId,
  dispositions,
  onSelect,
  threadElementId,
}: {
  findings: readonly Finding[]
  activeFindingId: FindingId | undefined
  dispositions: Record<string, ReviewDisposition>
  onSelect: (findingId: FindingId) => void
  threadElementId: (findingId: string) => string
}): ReactNode {
  return (
    <nav className="finding-list" aria-label="Findings">
      <ol>
        {findings.map((finding) => {
          const disposition = dispositions[finding.id] ?? "unreviewed"
          const isActive = finding.id === activeFindingId

          return (
            <li key={finding.id}>
              <a
                href={`#${threadElementId(finding.id)}`}
                aria-current={isActive ? "true" : undefined}
                data-active={isActive ? "true" : undefined}
                data-disposition={disposition}
                onClick={() => onSelect(finding.id)}
              >
                <span className="finding-list__label">{finding.label}</span>
                <span className="finding-list__count">
                  {finding.evidence.length} cited
                </span>
                <span className="finding-list__disposition">
                  {reviewDispositionLabels[disposition]}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
