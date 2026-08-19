import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import { assertNever } from "@/lib/assert-never"
import type { Playbook } from "@/lib/playbooks/schema"

type EvaluationMetric = Playbook["evaluation"]["metrics"][number]

function metricRows(metrics: readonly EvaluationMetric[]) {
  return metrics.map((metric) => (
    <div key={metric.id}>
      <dt>{metric.name}</dt>
      <dd>{metric.definition}</dd>
    </div>
  ))
}

// One switch over `evaluation.status` producing everything that differs
// between variants: the not-run explanation, and the metrics block (which
// shares its row markup across the two evaluated variants and only differs
// in its trailing element — a labelled-fixture row or a link to partner
// evidence).
function evaluationDetails(evaluation: Playbook["evaluation"]): {
  note: ReactNode
  metricsBlock: ReactNode
} {
  switch (evaluation.status) {
    case "not-run":
      return {
        note: (
          <>
            <p>Evaluation not available</p>
            <p>{evaluation.reason}</p>
          </>
        ),
        metricsBlock: null,
      }
    case "fixture-evaluated":
      return {
        note: null,
        metricsBlock: (
          <div className="evaluation-metrics">
            <dl>
              {metricRows(evaluation.metrics)}
              <div>
                <dt>Labelled fixture</dt>
                <dd>{evaluation.labelledFixtureId}</dd>
              </div>
            </dl>
          </div>
        ),
      }
    case "partner-evaluated":
      return {
        note: null,
        metricsBlock: (
          <div className="evaluation-metrics">
            <dl>{metricRows(evaluation.metrics)}</dl>
            <ExternalLink href={evaluation.evidenceUrl}>
              Published evaluation evidence
            </ExternalLink>
          </div>
        ),
      }
    default:
      return assertNever(evaluation)
  }
}

export function EvaluationEvidence({
  evaluation,
}: {
  evaluation: Playbook["evaluation"]
}): ReactNode {
  const { note, metricsBlock } = evaluationDetails(evaluation)

  return (
    <div className="evaluation-evidence">
      {note}
      <div>
        <p>Evaluation questions</p>
        <ul className="evaluation-questions">
          {evaluation.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>
      {metricsBlock}
      <div>
        <p>Limitations</p>
        <ul className="evaluation-limitations">
          {evaluation.limitations.map((limitation) => (
            <li key={limitation}>{limitation}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
