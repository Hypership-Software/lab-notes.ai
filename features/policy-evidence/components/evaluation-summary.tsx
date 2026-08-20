import type { ReactNode } from "react"

import type { EvaluationResult, Metric } from "../domain/evaluate-analysis"

/**
 * Render a metric as its own arithmetic.
 *
 * An empty denominator prints `Not available`, never `0`: "we could not measure
 * this" and "we measured this and it scored nothing" are different claims, and
 * a zero in a metric slot is read as the second.
 */
function MetricValue({ metric }: { metric: Metric }): ReactNode {
  if (metric.value === null) {
    return (
      <span className="metric__value" data-metric-state="unavailable">
        Not available
      </span>
    )
  }

  return (
    <span className="metric__value" data-metric-state="measured">
      <strong>{Math.round(metric.value * 100)}%</strong>{" "}
      <span className="metric__working">
        ({metric.numerator} of {metric.denominator})
      </span>
    </span>
  )
}

export function EvaluationSummary({
  evaluation,
}: {
  evaluation: EvaluationResult
}): ReactNode {
  return (
    <div className="evaluation-summary">
      <dl className="evaluation-summary__metrics">
        <div>
          <dt>Citation precision</dt>
          <dd>
            <MetricValue metric={evaluation.citationPrecision} />
            <p>
              Of the citations this analysis made, how many pointed at a response
              the expectation set agreed belonged to that theme.
            </p>
          </dd>
        </div>
        <div>
          <dt>Evidence coverage</dt>
          <dd>
            <MetricValue metric={evaluation.evidenceCoverage} />
            <p>
              Of the responses the expectation set says belong to a theme, how
              many the analysis actually cited.
            </p>
          </dd>
        </div>
        <div>
          <dt>Findings with no evidence</dt>
          <dd>
            <span className="metric__value">
              <strong>{evaluation.unsupportedFindingCount}</strong>
            </span>
            <p>Findings that cited nothing a reader can check.</p>
          </dd>
        </div>
        <div>
          <dt>Citations that do not resolve</dt>
          <dd>
            <span className="metric__value">
              <strong>{evaluation.brokenReferenceCount}</strong>
            </span>
            <p>
              Citations naming a response that does not exist, or quoting text
              that is not at the offsets given. These are excluded from both
              metrics rather than scored.
            </p>
          </dd>
        </div>
      </dl>

      <div className="evaluation-summary__cases">
        <h4>Case by case</h4>
        <table>
          <caption>
            Each labelled expectation, what the analysis cited for it, and where
            the two disagree.
          </caption>
          <thead>
            <tr>
              <th scope="col">Expectation</th>
              <th scope="col">Expected</th>
              <th scope="col">Cited</th>
              <th scope="col">Missed</th>
              <th scope="col">Not expected</th>
            </tr>
          </thead>
          <tbody>
            {evaluation.cases.map((entry) => (
              <tr key={entry.caseId}>
                <th scope="row">
                  {entry.label}{" "}
                  <span data-technical>{entry.caseId}</span>
                </th>
                <td>{entry.expectedDocumentIds.length}</td>
                <td>{entry.citedDocumentIds.length}</td>
                <td>
                  {entry.missedDocumentIds.length === 0
                    ? "None"
                    : entry.missedDocumentIds.join(", ")}
                </td>
                <td>
                  {entry.unexpectedDocumentIds.length === 0
                    ? "None"
                    : entry.unexpectedDocumentIds.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="evaluation-summary__limitations">
        <h4>What this evaluation does not tell you</h4>
        <ul>
          {evaluation.limitations.map((limitation) => (
            <li key={limitation}>{limitation}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
