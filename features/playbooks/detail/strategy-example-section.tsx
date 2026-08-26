import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import type { Playbook } from "@/lib/playbooks/schema"

export function StrategyExampleSection({
  strategyExample,
  headingId,
}: {
  strategyExample: Playbook["strategyExample"]
  headingId: string
}): ReactNode {
  return (
    <section
      className="scroll-mt-28 border-t-2 border-peat py-16 sm:py-20"
      aria-labelledby={headingId}
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-evidence-strong">
        From the draft strategy
      </p>
      <h2
        id={headingId}
        className="mt-3 scroll-mt-28 text-4xl sm:text-5xl lg:text-6xl"
      >
        Opportunity
      </h2>
      <p className="mt-8 max-w-4xl font-display text-2xl font-bold leading-tight sm:text-3xl">
        {strategyExample.proposal}
      </p>
      <div className="mt-8 border-l-4 border-signal pl-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-peat-muted">
          Where the draft says it
        </p>
        <p className="mt-2">
          <cite>{strategyExample.draftReference}</cite>
        </p>
        <p className="mt-3 font-semibold text-evidence-strong">
          <ExternalLink href={strategyExample.url}>
            Read the draft strategy source
          </ExternalLink>
        </p>
      </div>
    </section>
  )
}
