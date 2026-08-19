import type { ReactNode } from "react"

import type { Playbook } from "@/lib/playbooks/schema"
import { maturityLadder } from "@/lib/playbooks/vocabulary"

export function MaturityLadder({
  maturity,
  nextValidationSteps,
}: {
  maturity: Playbook["maturity"]
  nextValidationSteps: Playbook["nextValidationSteps"]
}): ReactNode {
  return (
    <div className="maturity-ladder-block">
      <ol className="maturity-ladder" aria-label="Evidence maturity">
        {maturityLadder.map((rung, index) => {
          const isCurrent = rung.value === maturity

          return (
            <li key={rung.value} aria-current={isCurrent ? "step" : undefined}>
              <span aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{rung.label}</h3>
                {isCurrent ? <p>Current maturity</p> : null}
                <p>{rung.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
      <p>Work still required to reach a more credible maturity state:</p>
      <ul className="maturity-next-steps">
        {nextValidationSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  )
}
