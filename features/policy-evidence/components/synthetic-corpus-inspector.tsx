import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"

import type { CorpusDocument } from "../domain/types"

import type { DocumentElementId } from "./element-ids"

const stanceLabels: Record<CorpusDocument["stance"], string> = {
  supportive: "Supportive",
  critical: "Critical",
  mixed: "Mixed",
  uncertain: "Uncertain",
}

/**
 * Every synthetic response, in full, with nothing behind a control.
 *
 * The dataset is twenty documents precisely so it can be read end to end. A
 * reader who cannot see the whole input has no way to judge whether a finding
 * over it is fair, so this is a list rather than a searchable table or a
 * paginated preview.
 */
export function SyntheticCorpusInspector({
  corpus,
  documentElementId,
}: {
  corpus: readonly CorpusDocument[]
  /** Builds the anchor an evidence thread links back to. */
  documentElementId: DocumentElementId
}): ReactNode {
  return (
    <div className="corpus-inspector">
      <ProvenanceLabel kind="synthetic" />
      <p>
        All {corpus.length} responses are invented for this example. No real
        respondent, organisation, or place is represented.
      </p>
      <ol className="corpus-inspector__list">
        {corpus.map((document) => (
          <li key={document.id} id={documentElementId(document.id)}>
            <article className="corpus-document" aria-labelledby={`${document.id}-title`}>
              <h4 id={`${document.id}-title`}>
                <span data-technical>{document.id}</span>
              </h4>
              <p className="corpus-document__tags">
                <span className="corpus-document__disclosure">
                  {document.disclosure}
                </span>
                <span>{stanceLabels[document.stance]}</span>
              </p>
              <blockquote>
                <p>{document.text}</p>
              </blockquote>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}
