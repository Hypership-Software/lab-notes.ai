import type { Metadata } from "next"

import { ExternalLink } from "@/components/site/external-link"
import {
  strategyDraftReference,
  strategyDraftUrl,
} from "@/content/playbooks/strategy-draft"

export const metadata: Metadata = {
  title: "How this works",
  description:
    "How strategy opportunities become researched playbooks with published sources, synthetic starter data, and explicit constraints.",
}

export default function MethodPage() {
  return (
    <div className="page-shell method-page">
      <header className="page-intro reading-width">
        <h1>How this works</h1>
        <p>
          Each playbook begins with an opportunity named in the draft strategy,
          records the published research already investigated, and states
          clearly whether responsible starter data is available.
        </p>
      </header>

      <section className="method-section reading-width" aria-labelledby="opportunity-title">
        <h2 id="opportunity-title">The strategy opportunity</h2>
        <p>
          Northern Ireland&rsquo;s draft AI strategy went out for public
          consultation with examples for public services. The catalogue follows
          that list rather than inventing a separate set of recommendations.
        </p>
        <p>
          Each playbook names where its opportunity came from &mdash;{" "}
          {strategyDraftReference} &mdash; and links to the draft so readers can
          check this project&rsquo;s plain-English interpretation.
        </p>
        <p>
          <ExternalLink href={strategyDraftUrl}>
            Read the draft strategy consultation
          </ExternalLink>
        </p>
      </section>

      <section className="method-section method-grid" aria-labelledby="research-title">
        <div>
          <h2 id="research-title">Published research</h2>
          <p>
            A source earns its place by being published and relevant. Each entry
            records who publishes it, what it covers, how it can be accessed,
            and why it matters to the opportunity.
          </p>
        </div>
        <div>
          <h3>Access is stated, not assumed</h3>
          <p>
            Every source is labelled as open, registration or key required, or
            restricted. Access is a fact about the research, not a quality score.
          </p>
        </div>
      </section>

      <section className="method-section method-grid" aria-labelledby="data-title">
        <div>
          <h2 id="data-title">Synthetic starter data</h2>
          <p>
            Where a stand-in is responsible, the playbook ships a small dataset
            shaped by fields and vocabulary visible in the published sources.
            It is committed to the repository and labelled{" "}
            <strong>Synthetic working data</strong> wherever it appears.
          </p>
        </div>
        <div>
          <h3>What it cannot prove</h3>
          <p>
            Synthetic data cannot show that an approach would be accurate, fair,
            lawful, or effective with real service data. Where a useful stand-in
            would be person-shaped, the playbook explains why none is supplied.
          </p>
        </div>
      </section>

      <section className="method-section reading-width" aria-labelledby="integrity-title">
        <h2 id="integrity-title">Published and synthetic material stay distinct</h2>
        <p>
          Linked sources belong to their publishers. Files in this repository
          are invented working material. Nothing on this site is official data
          or evidence that a public body should adopt an AI system.
        </p>
      </section>
    </div>
  )
}
