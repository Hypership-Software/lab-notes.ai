import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import type { Playbook } from "@/lib/playbooks/schema"

/**
 * The opportunity as the draft strategy gave it. The proposal is this
 * project's plain-English reading; the link is the draft itself, so a reader
 * can check the reading against the source in one step.
 *
 * `headingId` is both the section's accessible name target and the page's
 * fragment ID for it, so `#strategy-example` lands on the words that
 * describe what follows.
 */
export function StrategyExampleSection({
  strategyExample,
  headingId,
}: {
  strategyExample: Playbook["strategyExample"]
  headingId: string
}): ReactNode {
  return (
    <section className="playbook-detail__section" aria-labelledby={headingId}>
      <h2 id={headingId}>What the strategy draft proposed</h2>
      <p className="reading-width">{strategyExample.proposal}</p>
      <p className="reading-width">
        Where this comes from: <cite>{strategyExample.draftReference}</cite>
      </p>
      <p>
        <ExternalLink href={strategyExample.url}>
          Read the draft strategy consultation
        </ExternalLink>
      </p>
    </section>
  )
}
