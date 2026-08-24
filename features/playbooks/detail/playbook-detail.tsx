import type { ReactNode } from "react"

import { formatUtcDate } from "@/lib/format-date"
import type { Playbook } from "@/lib/playbooks/schema"

import { DataSourcesSection } from "./data-sources-section"
import { DemoSection } from "./demo-section"
import { StrategyExampleSection } from "./strategy-example-section"
import { SyntheticDataSection } from "./synthetic-data-section"

/**
 * A playbook dossier: one title, then the A/B/C/D chain and its caveats as
 * exactly five sections in exactly this order (DESIGN.md §7). Document
 * order is the reading order at every width — there is no table of
 * contents, no sixth section, and no breakpoint that reorders the page.
 *
 * Each section's `<h2>` carries the stable fragment ID and names its own
 * section, so `#synthetic-dataset` deep-links to the heading rather than to
 * an unlabelled container.
 */
export function PlaybookDetail({
  playbook,
}: {
  playbook: Playbook
}): ReactNode {
  return (
    <article className="playbook-detail">
      <header className="page-intro playbook-detail__header">
        <p className="playbook-detail__sector">{playbook.sector}</p>
        <h1>{playbook.title}</h1>
        <p className="playbook-detail__summary">{playbook.summary}</p>
        <p className="playbook-detail__reviewed">
          Last reviewed{" "}
          <time dateTime={playbook.lastReviewed}>
            {formatUtcDate(playbook.lastReviewed)}
          </time>
        </p>
      </header>

      <StrategyExampleSection
        strategyExample={playbook.strategyExample}
        headingId="strategy-example"
      />
      <DataSourcesSection
        dataSources={playbook.dataSources}
        headingId="data-sources"
      />
      <SyntheticDataSection
        syntheticData={playbook.syntheticData}
        headingId="synthetic-dataset"
      />
      <DemoSection demo={playbook.demo} headingId="demo" />

      <section className="playbook-detail__section" aria-labelledby="caveats">
        <h2 id="caveats">Caveats</h2>
        <ul className="reading-width">
          {playbook.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
