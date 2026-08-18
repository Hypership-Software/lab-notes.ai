import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Method",
  description:
    "How the playbooks handle official sources, synthetic data, baselines, evaluation, risk, and evidence maturity.",
}

const maturity = [
  {
    title: "Assessed concept",
    description: "The problem, data reality, risks, baseline, and next checks are documented.",
  },
  {
    title: "Recorded demonstration",
    description: "Checked-in output is replayed against deterministic synthetic fixtures.",
  },
  {
    title: "Partner-ready",
    description: "A data-owning partner has reviewed interfaces and validation protocols.",
  },
  {
    title: "Operational pilot",
    description: "The system has been tested in a governed real-world setting.",
  },
  {
    title: "Evaluated service",
    description: "Operational outcomes and harms have received independent evaluation.",
  },
]

export default function MethodPage() {
  return (
    <div className="page-shell method-page">
      <header className="page-intro reading-width">
        <h1>How to read the evidence</h1>
        <p>
          Each playbook separates a proposal from what has actually been sourced,
          built, tested, and reviewed. Maturity is a ladder of evidence, not a
          percentage or confidence score.
        </p>
      </header>

      <section className="method-section" aria-labelledby="maturity-title">
        <h2 id="maturity-title">Evidence maturity</h2>
        <ol className="maturity-ladder" aria-label="Evidence maturity">
          {maturity.map((item, index) => (
            <li key={item.title}>
              <span aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="method-section method-grid" aria-labelledby="sources-title">
        <div>
          <h2 id="sources-title">Official sources, recorded once</h2>
          <p>
            A source register records publisher, jurisdiction, canonical URL,
            access date, reuse status, purpose, transformations, and caveats. A URL
            on its own is not provenance.
          </p>
        </div>
        <div>
          <h3>No production data pipeline</h3>
          <p>
            A small permissible example may establish fields, units, vocabulary,
            and constraints. The hosted playbook then runs on deterministic
            fixtures rather than a changing public endpoint.
          </p>
        </div>
      </section>

      <section className="method-section method-grid" aria-labelledby="synthetic-title">
        <div>
          <h2 id="synthetic-title">Synthetic, and visibly so</h2>
          <p>
            Synthetic working data uses a recorded seed, invented identifiers, and
            documented approximations, alterations, exclusions, and limitations.
            It cannot establish production performance or fairness.
          </p>
        </div>
        <div>
          <h3>Recorded output is not a live service</h3>
          <p>
            A recorded demonstration must preserve the exact input and prompt
            hashes, model identifier, date, structured output, citations, known
            failures, and human review state. The hosted page makes no model call.
          </p>
        </div>
      </section>

      <section className="method-section method-grid" aria-labelledby="comparison-title">
        <div>
          <h2 id="comparison-title">A non-AI baseline stays visible</h2>
          <p>
            Every interactive exemplar compares the same task with a transparent,
            deterministic alternative. The answer may be that better data, a rule,
            or service design is the more credible intervention.
          </p>
        </div>
        <div>
          <h3>Evaluation explains its denominator</h3>
          <p>
            Metrics name the question, labelled fixture, numerator, denominator,
            result status, and limitations. No result is shown as zero when an
            evaluation is unavailable.
          </p>
        </div>
      </section>

      <section className="method-section reading-width" aria-labelledby="oversight-title">
        <h2 id="oversight-title">Risk, oversight, and redress are product fields</h2>
        <p>
          A playbook names foreseeable harm, the person who remains responsible,
          the point at which review happens, how a concern escalates, and how an
          affected person can challenge or correct an output. High-risk proposals
          may remain assessment-only.
        </p>
      </section>
    </div>
  )
}
