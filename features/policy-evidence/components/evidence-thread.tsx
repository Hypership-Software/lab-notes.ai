import type { ReactNode } from "react"

import type { EvidenceThreadModel } from "../domain/build-evidence-threads"

/**
 * The fixed order in which a finding is traced back to its evidence. Every
 * stage is labelled in text: the numbers and the connector rule are decoration
 * that may reinforce the order but never carry it, so the thread reads the same
 * with styles off, in forced colours, or through a screen reader.
 */
const stageTitles = [
  "1. Finding",
  "2. Citation",
  "3. Synthetic response cited",
  "4. How that response was made",
  "5. What a reader expected",
  "6. Your review",
] as const

export function EvidenceThread({
  thread,
  syntheticMethod,
  documentElementId,
  reviewSlot,
}: {
  thread: EvidenceThreadModel
  /** The playbook's own synthetic-data method sentence, shown as stage four. */
  syntheticMethod: string
  documentElementId: (documentId: string) => string
  /** Stage six. Passed in so the thread itself stays free of client state. */
  reviewSlot: ReactNode
}): ReactNode {
  const { finding, citations, evaluationCase, caseResult } = thread

  return (
    <ol className="evidence-thread" aria-label={`Evidence for ${finding.label}`}>
      <li className="evidence-thread__stage">
        <h4>{stageTitles[0]}</h4>
        <p className="evidence-thread__finding-summary">{finding.summary}</p>
        <p>What this finding cannot tell you:</p>
        <ul>
          {finding.limitations.map((limitation) => (
            <li key={limitation}>{limitation}</li>
          ))}
        </ul>
      </li>

      <li className="evidence-thread__stage">
        <h4>{stageTitles[1]}</h4>
        {citations.length === 0 ? (
          <p data-citation-state="none">
            This finding cites nothing. There is no evidence here to follow.
          </p>
        ) : (
          <ul className="evidence-thread__citations">
            {citations.map((entry) => (
              <li
                key={`${entry.citation.documentId}-${entry.citation.start}`}
                data-citation-state={entry.intact ? "resolved" : "broken"}
              >
                <blockquote>
                  <p>{entry.citation.quote}</p>
                </blockquote>
                <p>
                  <a href={`#${documentElementId(entry.citation.documentId)}`}>
                    <span data-technical>{entry.citation.documentId}</span>,
                    characters {entry.citation.start} to {entry.citation.end}
                  </a>
                </p>
                {entry.intact ? null : (
                  <p className="evidence-thread__broken">
                    This citation does not resolve: the quoted text is not what
                    those offsets select in that response. It is excluded from
                    the evaluation rather than scored.
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>

      <li className="evidence-thread__stage">
        <h4>{stageTitles[2]}</h4>
        {citations.length === 0 ? (
          <p>No response to show, because this finding cites none.</p>
        ) : (
          <ul className="evidence-thread__documents">
            {citations.map((entry) =>
              entry.document ? (
                <li key={entry.document.id}>
                  <p>
                    <span data-technical>{entry.document.id}</span> &mdash;{" "}
                    {entry.document.disclosure}
                  </p>
                  <blockquote>
                    <p>{entry.document.text}</p>
                  </blockquote>
                </li>
              ) : (
                <li key={entry.citation.documentId}>
                  <p>
                    <span data-technical>{entry.citation.documentId}</span> is
                    not in this dataset, so there is no response to read.
                  </p>
                </li>
              ),
            )}
          </ul>
        )}
      </li>

      <li className="evidence-thread__stage">
        <h4>{stageTitles[3]}</h4>
        <p>{syntheticMethod}</p>
      </li>

      <li className="evidence-thread__stage">
        <h4>{stageTitles[4]}</h4>
        {evaluationCase && caseResult ? (
          <>
            <p>{evaluationCase.rationale}</p>
            <dl className="evidence-thread__case">
              <div>
                <dt>Expected</dt>
                <dd>{evaluationCase.expectedDocumentIds.join(", ")}</dd>
              </div>
              <div>
                <dt>Missed by this analysis</dt>
                <dd>
                  {caseResult.missedDocumentIds.length === 0
                    ? "None"
                    : caseResult.missedDocumentIds.join(", ")}
                </dd>
              </div>
              <div>
                <dt>Cited but not expected</dt>
                <dd>
                  {caseResult.unexpectedDocumentIds.length === 0
                    ? "None"
                    : caseResult.unexpectedDocumentIds.join(", ")}
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <p>
            No reader has labelled what this finding should contain, so it is
            neither credited nor penalised in the evaluation.
          </p>
        )}
      </li>

      <li className="evidence-thread__stage">
        <h4>{stageTitles[5]}</h4>
        {reviewSlot}
      </li>
    </ol>
  )
}
