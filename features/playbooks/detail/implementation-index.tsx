import type { ReactNode } from "react"

import type { Playbook } from "@/lib/playbooks/schema"

import { DefinitionListRow } from "./definition-list-row"

export function ImplementationIndex({
  implementation,
}: {
  implementation: Playbook["implementation"]
}): ReactNode {
  return (
    <div className="implementation-index">
      <p>{implementation.summary}</p>
      <p>{implementation.architecture}</p>

      <dl>
        <DefinitionListRow term="Inputs" items={implementation.inputs} />
        <DefinitionListRow term="Outputs" items={implementation.outputs} />
        <DefinitionListRow
          term="Reusable parts"
          items={implementation.reusableParts}
        />
        <DefinitionListRow
          term="Partner requirements"
          items={implementation.partnerRequirements}
        />
      </dl>
    </div>
  )
}
