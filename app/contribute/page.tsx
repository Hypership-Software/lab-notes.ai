import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Contribution paths for improving an assessment, verifying an official source, or building a complete recorded exemplar.",
}

const tracks = [
  {
    title: "Improve an assessed playbook",
    description:
      "Clarify the problem, data reality, non-AI baseline, risks, oversight, limitations, or next validation questions.",
    requirement: "No demonstration or model output is required.",
  },
  {
    title: "Add or verify an official source",
    description:
      "Record a canonical public source, access date, reuse status, purpose, transformations, and caveats.",
    requirement: "Do not copy personal responses or material without clear permission.",
  },
  {
    title: "Build a recorded exemplar",
    description:
      "Record the published structure of a real source, add a small synthetic dataset that mirrors it, then a non-AI baseline, recorded output, citations, evaluation, and human review.",
    requirement: "Every artefact must land together before maturity changes.",
  },
]

export default function ContributePage() {
  return (
    <div className="page-shell contribute-page">
      <header className="page-intro reading-width">
        <h1>Contribute at the evidence level you have</h1>
        <p>
          A useful contribution can improve an assessment without building a demo.
          The shared schema keeps every route comparable and makes missing evidence
          explicit.
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
              <p className="contribution-tracks__requirement">{track.requirement}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="privacy-rule" aria-labelledby="privacy-title">
        <h2 id="privacy-title">Privacy is a contribution gate</h2>
        <p>
          Do not commit names, contact details, exact addresses, personal local
          paths, credentials, private endpoints, or real person-level health,
          justice, education, housing, benefits, or consultation-response data.
        </p>
      </section>
    </div>
  )
}
