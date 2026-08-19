import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"
import { assertNever } from "@/lib/assert-never"
import type { Playbook } from "@/lib/playbooks/schema"

import { DefinitionListRow } from "./definition-list-row"

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
            <dd data-technical>{syntheticData.fixturePath}</dd>
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
        <DefinitionListRow
          term="Source characteristics"
          items={syntheticData.sourceCharacteristics}
        />
        <DefinitionListRow
          term="Approximations"
          items={syntheticData.approximations}
        />
        <DefinitionListRow term="Alterations" items={syntheticData.alterations} />
        <DefinitionListRow term="Exclusions" items={syntheticData.exclusions} />
        {fixtureRows(syntheticData)}
        <DefinitionListRow term="Limitations" items={syntheticData.limitations} />
      </dl>
    </div>
  )
}
