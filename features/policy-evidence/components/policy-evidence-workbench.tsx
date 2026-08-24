import Link from "next/link"
import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"
import type { Playbook } from "@/lib/playbooks/schema"

import { runAnalysis, themeLabels } from "../domain/run-analysis"
import type { CorpusStance } from "../domain/types"
import { policyEvidenceCorpus, policyEvidenceDataset } from "../fixtures"

import { documentElementId } from "./element-ids"

const stanceLabels: Record<CorpusStance, string> = {
  supportive: "Supportive",
  critical: "Critical",
  mixed: "Mixed",
  uncertain: "Uncertain",
}

/**
 * The demo, assembled entirely on the server.
 *
 * The dataset is parsed through its envelope and the corpus contract at module
 * load; the analysis is recomputed from that committed data on every render.
 * There is no client boundary anywhere in this feature, so every state on the
 * page is text and the page reads the same with JavaScript switched off.
 *
 * Order is deliberate: what this is not, then the whole input, then what the
 * analysis made of it. A reader who cannot see the input has no way to judge a
 * finding drawn from it, so the records come first and every citation links
 * back up to the one it quotes.
 */
export function PolicyEvidenceWorkbench({
  playbook,
}: {
  playbook: Playbook
}): ReactNode {
  const analysis = runAnalysis(policyEvidenceCorpus)

  return (
    <div className="page-shell workbench-page">
      <header className="page-intro reading-width">
        <p className="workbench-page__breadcrumb">
          <Link href={`/playbooks/${playbook.slug}`}>
            Back to the {playbook.title} playbook
          </Link>
        </p>
        <h1>{playbook.title}: demo</h1>
      </header>

      <section
        className="demo-banner reading-width"
        aria-labelledby="demo-honesty-title"
      >
        <ProvenanceLabel kind="synthetic" />
        <h2 id="demo-honesty-title">What this is, and what it is not</h2>
        <p>
          No model is involved. Nothing on this page is evidence that an AI
          system would analyse a real consultation accurately, fairly, or
          lawfully, and none of it has been operationally validated.
        </p>
        <p>
          What it is: a transparent keyword analysis over invented responses,
          recomputed from a committed file every time the page renders. It asks
          for no account or key, because there is no service behind it to sign
          in to.
        </p>
        {playbook.demo.status === "available" ? (
          <p>{playbook.demo.howItWorks}</p>
        ) : null}
      </section>

      <section
        className="workbench-section"
        aria-labelledby="workbench-dataset-title"
      >
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-dataset-title">The synthetic dataset</h2>
          <p>Read the whole input before judging any finding drawn from it.</p>
        </div>
        <p className="reading-width">{policyEvidenceDataset.description}</p>
        <ol className="corpus-inspector__list">
          {policyEvidenceCorpus.map((record) => (
            <li key={record.id}>
              <article
                id={documentElementId(record.id)}
                className="corpus-document"
                aria-labelledby={`${record.id}-title`}
              >
                <h3 id={`${record.id}-title`}>
                  <span data-technical>{record.id}</span>
                </h3>
                <p className="corpus-document__tags">
                  <span className="corpus-document__disclosure">
                    {themeLabels[record.theme]}
                  </span>
                  <span>{stanceLabels[record.stance]}</span>
                </p>
                <blockquote>
                  <p>{record.text}</p>
                </blockquote>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="workbench-section"
        aria-labelledby="workbench-findings-title"
      >
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-findings-title">What the analysis found</h2>
          <ProvenanceLabel kind="demo" />
          <p>
            One finding per theme whose words appear, in the order the
            vocabulary declares them. The order is not a ranking, and the number
            of matches is not a measure of importance.
          </p>
        </div>
        {analysis.findings.map((finding) => (
          <section
            key={finding.id}
            className="workbench-finding"
            aria-labelledby={`${finding.id}-title`}
          >
            <h3 id={`${finding.id}-title`}>{finding.label}</h3>
            <p className="workbench-finding__summary">{finding.summary}</p>

            <h4>The passages it matched</h4>
            <ul className="workbench-finding__citations">
              {finding.evidence.map((citation) => (
                <li key={`${citation.documentId}-${citation.start}`}>
                  <a href={`#${documentElementId(citation.documentId)}`}>
                    <span data-technical>{citation.documentId}</span>{" "}
                    <q>{citation.quote}</q>
                  </a>
                </li>
              ))}
            </ul>

            <h4>What this finding cannot show</h4>
            <ul className="workbench-finding__limitations">
              {finding.limitations.map((limitation) => (
                <li key={limitation}>{limitation}</li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </div>
  )
}
