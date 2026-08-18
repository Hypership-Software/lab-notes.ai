const stages = [
  {
    title: "Public problem",
    description: "Name the task, affected people, and decision before naming a tool.",
  },
  {
    title: "Official source sample",
    description: "Record origin, access, reuse terms, purpose, and known gaps.",
  },
  {
    title: "Synthetic working data",
    description: "Reproduce only defensible structure using invented, labelled records.",
  },
  {
    title: "Bounded demonstration",
    description: "Show one inspectable task with a transparent non-AI comparison.",
  },
  {
    title: "Evidence and code",
    description: "Expose evaluation, risks, oversight, limitations, and reusable parts.",
  },
]

export function EvidenceChain() {
  return (
    <section className="evidence-chain" aria-labelledby="evidence-chain-title">
      <div className="section-heading section-heading--compact">
        <h2 id="evidence-chain-title">From proposal to credible starting point</h2>
        <p>Each stage must remain visible; an attractive result cannot skip its evidence.</p>
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
