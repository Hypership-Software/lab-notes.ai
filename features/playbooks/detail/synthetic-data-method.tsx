import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"
import { assertNever } from "@/lib/assert-never"
import type { Playbook } from "@/lib/playbooks/schema"

import { DefinitionListRow } from "./definition-list-row"

function datasetRows(syntheticData: Playbook["syntheticData"]) {
  switch (syntheticData.status) {
    case "planned":
      return null
    case "available":
      return (
        <>
          <div>
            <dt>Data file</dt>
            <dd data-technical>{syntheticData.dataPath}</dd>
          </div>
          <div>
            <dt>Structure note</dt>
            <dd data-technical>{syntheticData.structureNotePath}</dd>
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
        <p>No synthetic dataset has been written yet</p>
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
        {datasetRows(syntheticData)}
        <DefinitionListRow term="Limitations" items={syntheticData.limitations} />
      </dl>
    </div>
  )
}
