"use client"

import { useState, type ReactNode } from "react"

import type { EvidenceThreadModel } from "../domain/build-evidence-threads"
import type { ReviewDisposition } from "../domain/review-disposition"
import type { FindingId } from "../domain/types"

import { documentElementId, threadElementId } from "./element-ids"
import { EvidenceThread } from "./evidence-thread"
import { FindingList } from "./finding-list"
import { FindingReviewControls } from "./finding-review-controls"

/**
 * The page's only client boundary.
 *
 * It holds exactly three things: which finding is currently emphasised, the
 * local review state per finding, and whether the reset confirmation is open.
 * No fixture parsing, baseline scoring, or content-registry code crosses into
 * the browser; the threads arrive as already-computed plain data.
 *
 * Every thread renders regardless of selection. Hiding the unselected ones
 * would put the page's substance behind hydration, and the page has to stay
 * readable with JavaScript switched off.
 */
export function WorkbenchClient({
  threads,
  syntheticMethod,
}: {
  threads: readonly EvidenceThreadModel[]
  syntheticMethod: string
}): ReactNode {
  const [activeFindingId, setActiveFindingId] = useState<FindingId | undefined>(
    threads[0]?.finding.id,
  )
  const [dispositions, setDispositions] = useState<
    Record<string, ReviewDisposition>
  >({})
  const [resetPending, setResetPending] = useState(false)

  const reviewedCount = Object.values(dispositions).filter(
    (disposition) => disposition !== "unreviewed",
  ).length

  return (
    <div className="workbench-client">
      <FindingList
        findings={threads.map((thread) => thread.finding)}
        activeFindingId={activeFindingId}
        dispositions={dispositions}
        onSelect={setActiveFindingId}
        threadElementId={threadElementId}
      />

      <div className="workbench-client__review-state">
        <p aria-live="polite">
          {reviewedCount === 0
            ? "No findings have been given a review state yet."
            : `${reviewedCount} of ${threads.length} findings have a review state.`}
        </p>
        {resetPending ? (
          <div className="workbench-client__reset-confirm" role="group" aria-label="Confirm reset">
            <p>Clear every review state on this page?</p>
            <button
              type="button"
              onClick={() => {
                setDispositions({})
                setResetPending(false)
              }}
            >
              Yes, clear them
            </button>
            <button type="button" onClick={() => setResetPending(false)}>
              Keep them
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setResetPending(true)}
            disabled={reviewedCount === 0}
          >
            Reset review states
          </button>
        )}
      </div>

      {threads.map((thread) => (
        <section
          key={thread.finding.id}
          id={threadElementId(thread.finding.id)}
          className="workbench-client__thread"
          data-active={thread.finding.id === activeFindingId ? "true" : undefined}
          aria-labelledby={`${thread.finding.id}-title`}
        >
          <h3 id={`${thread.finding.id}-title`}>{thread.finding.label}</h3>
          <EvidenceThread
            thread={thread}
            syntheticMethod={syntheticMethod}
            documentElementId={documentElementId}
            reviewSlot={
              <FindingReviewControls
                finding={thread.finding}
                value={dispositions[thread.finding.id] ?? "unreviewed"}
                onChange={(disposition) => {
                  setActiveFindingId(thread.finding.id)
                  setDispositions((current) => ({
                    ...current,
                    [thread.finding.id]: disposition,
                  }))
                }}
              />
            }
          />
        </section>
      ))}
    </div>
  )
}
