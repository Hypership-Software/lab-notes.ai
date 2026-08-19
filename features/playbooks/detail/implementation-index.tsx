import Link from "next/link"
import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import type { Playbook } from "@/lib/playbooks/schema"

import { DefinitionListRow } from "./definition-list-row"

export function ImplementationIndex({
  implementation,
  references,
}: {
  implementation: Playbook["implementation"]
  references: Playbook["references"]
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
        {references.length > 0 ? (
          <div>
            <dt>References</dt>
            <dd>
              <ul>
                {references.map((reference) => (
                  <li key={reference.url}>
                    <ExternalLink href={reference.url}>
                      {reference.title}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
      </dl>

      <p>
        <Link href="/contribute">Contribute an improvement to this playbook</Link>
      </p>
    </div>
  )
}
