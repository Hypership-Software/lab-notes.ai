import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"
import { assertNever } from "@/lib/assert-never"
import type { Playbook } from "@/lib/playbooks/schema"

function optionalListRow(term: string, items: readonly string[]) {
  if (items.length === 0) {
    return null
  }

  return (
    <div>
      <dt>{term}</dt>
      <dd>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

function fixtureRows(syntheticData: Playbook["syntheticData"]) {
  switch (syntheticData.status) {
    case "planned":
      return null
    case "available":
      return (
        <>
          <div>
            <dt>Seed</dt>
            <dd>{syntheticData.seed}</dd>
          </div>
          <div>
            <dt>Generator version</dt>
            <dd>{syntheticData.generatorVersion}</dd>
          </div>
          <div>
            <dt>Fixture</dt>
            <dd>{syntheticData.fixturePath}</dd>
          </div>
        </>
      )
    default:
      return assertNever(syntheticData)
  }
}

export function SyntheticDataMethod({
  syntheticData,
}: {
  syntheticData: Playbook["syntheticData"]
}): ReactNode {
  return (
    <div className="synthetic-data-method">
      <ProvenanceLabel kind="synthetic" />
      <p>{syntheticData.method}</p>
      {syntheticData.status === "planned" ? (
        <p>No synthetic fixture has been generated yet</p>
      ) : null}
      <dl>
        {optionalListRow(
          "Source characteristics",
          syntheticData.sourceCharacteristics,
        )}
        {optionalListRow("Approximations", syntheticData.approximations)}
        {optionalListRow("Alterations", syntheticData.alterations)}
        {optionalListRow("Exclusions", syntheticData.exclusions)}
        {fixtureRows(syntheticData)}
        {optionalListRow("Limitations", syntheticData.limitations)}
      </dl>
    </div>
  )
}
