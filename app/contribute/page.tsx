import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Three ways to improve a playbook: clarify the opportunity, verify published research, or improve synthetic starter data.",
}

const tracks = [
  {
    title: "Improve a playbook's plain English",
    description:
      "Sharpen the summary, the strategy example, or the caveats. If a sentence reads like documentation, or claims more than the evidence supports, rewrite it.",
    requirement:
      "No starter dataset is required. Clear, evidence-bounded writing is useful on its own.",
  },
  {
    title: "Add or verify a data source",
    description:
      "Name a real published source, say who publishes it, what it covers, how open it is, and why it fits the example. Or check that a source already listed still resolves and still says what we claim.",
    requirement:
      "The URL must be public and current, and the access classification must match what a reader would actually meet.",
  },
  {
    title: "Contribute a synthetic dataset",
    description:
      "Write a small dataset for a playbook that has none, shaped by the fields, units, and categories the real sources publish. Say plainly what it approximates and what it leaves out.",
    requirement:
      "It must use the shared envelope with the Synthetic working data disclosure, and pass the dataset tests in content/playbooks/content.test.ts.",
  },
]

export default function ContributePage() {
  return (
    <div className="page-shell contribute-page">
      <header className="page-intro reading-width">
        <h1>Three ways to move a playbook forward</h1>
        <p>
          Pick the track that matches what you can bring, and run{" "}
          <code>npm run check</code> before opening a pull request.
        </p>
      </header>

      <ol className="contribution-tracks">
        {tracks.map((track, index) => (
          <li key={track.title}>
            <span className="contribution-tracks__number" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h2>{track.title}</h2>
              <p>{track.description}</p>
              <p className="contribution-tracks__requirement">
                {track.requirement}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="privacy-rule" aria-labelledby="privacy-title">
        <h2 id="privacy-title">Privacy is a contribution gate</h2>
        <p>
          Never commit a real person&rsquo;s data or anything shaped like it: no
          names, email addresses, telephone numbers, National Insurance or health
          and care numbers, exact residential addresses, or real person-level
          health, justice, education, housing, benefits, or consultation-response
          records. No credentials, private endpoints, or personal local paths
          either.
        </p>
        <p>
          This is enforced, not just asked for. Every committed dataset is walked
          against the patterns in <code>lib/privacy-patterns.ts</code>, and a
          match fails the test suite. If you think a pattern is wrong, change the
          pattern in its own pull request rather than working around it.
        </p>
        <p>
          <Link href="/method">How the four sections work</Link>
        </p>
      </section>
    </div>
  )
}
