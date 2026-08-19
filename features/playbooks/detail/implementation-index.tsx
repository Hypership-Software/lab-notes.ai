import Link from "next/link"
import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import type { Playbook } from "@/lib/playbooks/schema"

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

      <div className="implementation-index__list">
        <h3>Inputs</h3>
        <ul>
          {implementation.inputs.map((input) => (
            <li key={input}>{input}</li>
          ))}
        </ul>
      </div>

      <div className="implementation-index__list">
        <h3>Outputs</h3>
        <ul>
          {implementation.outputs.map((output) => (
            <li key={output}>{output}</li>
          ))}
        </ul>
      </div>

      <div className="implementation-index__list">
        <h3>Reusable parts</h3>
        <ul>
          {implementation.reusableParts.map((part) => (
            <li key={part}>{part}</li>
          ))}
        </ul>
      </div>

      {implementation.partnerRequirements.length > 0 ? (
        <div className="implementation-index__list">
          <h3>Partner requirements</h3>
          <ul>
            {implementation.partnerRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {references.length > 0 ? (
        <div className="implementation-index__list">
          <h3>References</h3>
          <ul>
            {references.map((reference) => (
              <li key={reference.url}>
                <ExternalLink href={reference.url}>
                  {reference.title}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p>
        <Link href="/contribute">Contribute an improvement to this playbook</Link>
      </p>
    </div>
  )
}
