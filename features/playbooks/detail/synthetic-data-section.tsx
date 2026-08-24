import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"
import { assertNever } from "@/lib/assert-never"
import type { Playbook } from "@/lib/playbooks/schema"

import { DefinitionListRow } from "./definition-list-row"

// Exhaustive over the C union: a new status fails typecheck here rather
// than rendering an empty section.
function datasetBody(syntheticData: Playbook["syntheticData"]): ReactNode {
  switch (syntheticData.status) {
    case "available":
      return (
        <>
          <ProvenanceLabel kind="synthetic" />
          <p className="reading-width">{syntheticData.method}</p>
          <dl>
            <DefinitionListRow
              term="Limitations"
              items={syntheticData.limitations}
            />
            <div>
              <dt>Dataset file</dt>
              <dd data-technical>
                <code>{syntheticData.dataPath}</code>
              </dd>
            </div>
          </dl>
        </>
      )
    case "not-responsible":
      return (
        <>
          <p className="reading-width">{syntheticData.reason}</p>
          <dl>
            <div>
              <dt>What a contributor would need instead</dt>
              <dd>{syntheticData.whatContributorsNeed}</dd>
            </div>
          </dl>
        </>
      )
    default:
      return assertNever(syntheticData)
  }
}

/**
 * C — either the committed synthetic dataset that lets someone try the idea
 * without a key or an agreement, or a plain statement of why standing this
 * domain in with invented data would not be responsible. A withheld dataset
 * carries no provenance label and no file path: there is nothing to label.
 */
export function SyntheticDataSection({
  syntheticData,
  headingId,
}: {
  syntheticData: Playbook["syntheticData"]
  headingId: string
}): ReactNode {
  return (
    <section className="playbook-detail__section" aria-labelledby={headingId}>
      <h2 id={headingId}>Synthetic dataset</h2>
      <div className="synthetic-data-method">{datasetBody(syntheticData)}</div>
    </section>
  )
}
