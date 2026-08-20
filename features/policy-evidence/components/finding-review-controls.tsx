import type { ReactNode } from "react"

import {
  reviewDispositionDescriptions,
  reviewDispositionLabels,
  reviewDispositionValues,
  type ReviewDisposition,
} from "../domain/review-disposition"
import type { Finding } from "../domain/types"

/**
 * The four review states, as native radios inside a fieldset.
 *
 * The legend names both the finding and the state currently chosen, so a screen
 * reader entering the group announces which finding is being judged rather than
 * a bare "Review state" repeated six times down the page.
 */
export function FindingReviewControls({
  finding,
  value,
  onChange,
}: {
  finding: Finding
  value: ReviewDisposition
  onChange: (disposition: ReviewDisposition) => void
}): ReactNode {
  return (
    <fieldset className="review-controls" data-disposition={value}>
      <legend>
        Review state for {finding.label}: {reviewDispositionLabels[value]}
      </legend>
      <div className="review-controls__options">
        {reviewDispositionValues.map((disposition) => (
          <label key={disposition} className="review-controls__option">
            <input
              type="radio"
              name={`disposition-${finding.id}`}
              value={disposition}
              checked={value === disposition}
              onChange={() => onChange(disposition)}
            />
            <span>{reviewDispositionLabels[disposition]}</span>
          </label>
        ))}
      </div>
      <p className="review-controls__description">
        {reviewDispositionDescriptions[value]}
      </p>
      <p className="review-controls__caveat">
        Review states are for reading this example. They stay in your browser,
        reset when the page reloads, and record no approval, priority, or policy
        position.
      </p>
    </fieldset>
  )
}
