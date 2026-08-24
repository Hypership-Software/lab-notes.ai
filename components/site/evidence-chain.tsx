/**
 * The A/B/C/D chain every playbook answers, in the order the pages present
 * it. The same four names appear as detail-page section headings, so the
 * strip teaches the structure a reader is about to meet.
 */
const stages = [
  {
    title: "Strategy example",
    description: "What the draft strategy proposed for this public service.",
  },
  {
    title: "Investigated sources",
    description: "The real published data behind it, and how open each source is.",
  },
  {
    title: "Synthetic dataset",
    description: "Invented stand-in data, so you can try the idea with no key or agreement.",
  },
  {
    title: "Working demo",
    description: "Where one has been built, see it run end to end and read its method.",
  },
]

export function EvidenceChain() {
  return (
    <section className="evidence-chain" aria-labelledby="evidence-chain-title">
      <div className="section-heading section-heading--compact">
        <h2 id="evidence-chain-title">What every playbook answers</h2>
        <p>
          The same four questions in the same order, whether the answer is a
          working demo or a plain statement that nobody has built one yet.
        </p>
      </div>
      <ol aria-label="How a playbook is built">
        {stages.map((stage, index) => (
          <li key={stage.title}>
            <span className="evidence-chain__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
