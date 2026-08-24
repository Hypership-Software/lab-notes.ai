import type { Metadata } from "next"

import { ExternalLink } from "@/components/site/external-link"
import {
  strategyDraftReference,
  strategyDraftUrl,
} from "@/content/playbooks/strategy-draft"

export const metadata: Metadata = {
  title: "How this works",
  description:
    "Where each playbook's strategy example comes from, how its data sources are chosen, how its synthetic dataset is made, and what a demo can and cannot show.",
}

export default function MethodPage() {
  return (
    <div className="page-shell method-page">
      <header className="page-intro reading-width">
        <h1>How this works</h1>
        <p>
          Every playbook answers the same four questions in the same order. This
          page says where each answer comes from, and what it is not worth.
        </p>
      </header>

      <section className="method-section reading-width" aria-labelledby="a-title">
        <h2 id="a-title">A — the strategy example</h2>
        <p>
          Northern Ireland&rsquo;s draft AI strategy went out for public
          consultation with a list of example projects for public services. Those
          examples are where the catalogue comes from: one playbook per example,
          and no playbook for an idea the draft did not raise.
        </p>
        <p>
          Each playbook quotes the example in our own plain English, names the
          part of the draft it came from &mdash; {strategyDraftReference} &mdash;
          and links straight to the draft so you can check the reading against
          the source.
        </p>
        <p>
          <ExternalLink href={strategyDraftUrl}>
            Read the draft strategy consultation
          </ExternalLink>
        </p>
      </section>

      <section className="method-section method-grid" aria-labelledby="b-title">
        <div>
          <h2 id="b-title">B — the data sources investigated</h2>
          <p>
            A source earns its place by being real, published, and relevant to
            the example &mdash; not by being convenient. Each one records who
            publishes it, what it covers, and why it fits the question the
            playbook is asking.
          </p>
        </div>
        <div>
          <h3>Access is stated, not assumed</h3>
          <p>
            Every source is classified as open data, registration or key
            required, or restricted. That answer often matters more than the
            data: a good idea behind a restricted source is a different project
            from the same idea behind an open one.
          </p>
        </div>
      </section>

      <section className="method-section method-grid" aria-labelledby="c-title">
        <div>
          <h2 id="c-title">C — the synthetic dataset</h2>
          <p>
            Where a stand-in is responsible, the playbook ships one: a small
            dataset authored by AI and shaped by what the real sources actually
            publish &mdash; their fields, units, categories, and vocabulary. It
            is committed to the repository, labelled{" "}
            <strong>Synthetic working data</strong> wherever it appears, and
            checked against a shared list of person-shaped patterns before it can
            be merged. There is no generator, no seed, and no hash: an authored
            dataset is its own original.
          </p>
        </div>
        <div>
          <h3>What a synthetic dataset can never prove</h3>
          <p>
            It cannot show that a system would be accurate, fair, or lawful on
            real data, because it is not real data. It is a way to try the shape
            of an idea without an account, a key, or a data-sharing agreement
            &mdash; and nothing more than that.
          </p>
          <h3>When we do not make one</h3>
          <p>
            Two playbooks answer C by saying no. Where any useful stand-in would
            be person-shaped by construction, inventing one would be
            irresponsible, so the playbook says why and says what a contributor
            would need instead.
          </p>
        </div>
      </section>

      <section className="method-section method-grid" aria-labelledby="d-title">
        <div>
          <h2 id="d-title">D — the demo</h2>
          <p>
            A demo computes its result from the committed dataset on every
            render. No model is called, no key is needed, and the method is
            ordinary code you can read in the repository. The page shows the
            whole input before it shows any conclusion, and every citation links
            back to the record it quotes.
          </p>
        </div>
        <div>
          <h3>What a demo does not show</h3>
          <p>
            That the idea works. A demo run over invented data is evidence about
            a method, not about a service, and it has been through no
            operational, legal, equality, or safeguarding review. Where no demo
            exists, the playbook says so rather than implying one is coming.
          </p>
        </div>
      </section>

      <section className="method-section reading-width" aria-labelledby="honesty-title">
        <h2 id="honesty-title">Real, synthetic, and computed are kept apart</h2>
        <p>
          Linked sources are real and belong to their publishers. Datasets in
          this repository are invented and are labelled as such everywhere they
          appear. Demo output is computed from those invented datasets. Nothing
          on this site is official data, and nothing on it is evidence that a
          public body should adopt an AI system.
        </p>
      </section>
    </div>
  )
}
