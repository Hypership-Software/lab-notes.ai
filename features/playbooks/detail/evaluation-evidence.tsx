import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import { assertNever } from "@/lib/assert-never"
import type { Playbook } from "@/lib/playbooks/schema"

function statusNote(evaluation: Playbook["evaluation"]) {
  switch (evaluation.status) {
    case "not-run":
      return (
        <>
          <p>Evaluation not available</p>
          <p>{evaluation.reason}</p>
        </>
      )
    case "fixture-evaluated":
    case "partner-evaluated":
      return null
    default:
      return assertNever(evaluation)
  }
}

function metricRows(evaluation: Playbook["evaluation"]) {
  switch (evaluation.status) {
    case "not-run":
      return null
    case "fixture-evaluated":
      return (
        <div className="evaluation-metrics">
          <dl>
            {evaluation.metrics.map((metric) => (
              <div key={metric.id}>
                <dt>{metric.name}</dt>
                <dd>{metric.definition}</dd>
              </div>
            ))}
            <div>
              <dt>Labelled fixture</dt>
              <dd>{evaluation.labelledFixtureId}</dd>
            </div>
          </dl>
        </div>
      )
    case "partner-evaluated":
      return (
        <div className="evaluation-metrics">
          <dl>
            {evaluation.metrics.map((metric) => (
              <div key={metric.id}>
                <dt>{metric.name}</dt>
                <dd>{metric.definition}</dd>
              </div>
            ))}
          </dl>
          <ExternalLink href={evaluation.evidenceUrl}>
            Published evaluation evidence
          </ExternalLink>
        </div>
      )
    default:
      return assertNever(evaluation)
  }
}

export function EvaluationEvidence({
  evaluation,
}: {
  evaluation: Playbook["evaluation"]
}): ReactNode {
  return (
    <div className="evaluation-evidence">
      {statusNote(evaluation)}
      <ul className="evaluation-questions">
        {evaluation.questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
      {metricRows(evaluation)}
      <ul className="evaluation-limitations">
        {evaluation.limitations.map((limitation) => (
          <li key={limitation}>{limitation}</li>
        ))}
      </ul>
    </div>
  )
}
