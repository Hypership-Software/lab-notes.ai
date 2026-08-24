import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import { ProvenanceLabel } from "@/components/site/provenance-label"
import { assertNever } from "@/lib/assert-never"
import { getSyntheticDataset } from "@/lib/playbooks/dataset-registry"
import type { Playbook } from "@/lib/playbooks/schema"
import { repositoryFileUrl, repositoryRawUrl } from "@/lib/repository"

import { DefinitionListRow } from "./definition-list-row"

// Exhaustive over the synthetic-data answer: a new status fails typecheck here
// rather than rendering an empty section.
function datasetBody(
  syntheticData: Playbook["syntheticData"],
  slug: string,
): ReactNode {
  switch (syntheticData.status) {
    case "available": {
      const dataset = getSyntheticDataset(slug)

      return (
        <>
          <ProvenanceLabel kind="synthetic" />
          <p className="reading-width">{syntheticData.purpose}</p>
          <p className="reading-width">{syntheticData.preparation}</p>

          {/* The file used to be inert text. A reader who wants the data has
              three real destinations now: read every record on this site,
              browse the file in the repository, or download the raw JSON. */}
          <div className="dataset-links">
            <Link
              className="dataset-links__primary"
              href={`/playbooks/${slug}/dataset`}
            >
              <span>
                Read all{" "}
                {dataset ? `${dataset.records.length} records` : "the records"}
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <p className="dataset-links__file">
              <ExternalLink href={repositoryFileUrl(syntheticData.dataPath)}>
                <code>{syntheticData.dataPath}</code>
              </ExternalLink>
            </p>
            <p className="dataset-links__raw">
              <ExternalLink href={repositoryRawUrl(syntheticData.dataPath)}>
                <Download aria-hidden="true" />
                Download the raw JSON
              </ExternalLink>
            </p>
          </div>

          <dl>
            <DefinitionListRow
              term="Limitations"
              items={syntheticData.limitations}
            />
          </dl>
        </>
      )
    }
    case "not-responsible":
      return (
        <>
          <p className="reading-width">{syntheticData.reason}</p>
          <dl>
            <div>
              <dt>What a contributor would need instead</dt>
              <dd>{syntheticData.whatContributorsNeed}</dd>
            </div>
          </dl>
        </>
      )
    default:
      return assertNever(syntheticData)
  }
}

/**
 * Either the committed synthetic dataset that lets someone explore the
 * opportunity without a key or an agreement, or a plain statement of why
 * standing this domain in with invented data would not be responsible. A
 * withheld dataset carries no provenance label, no file path, and no links:
 * there is nothing to label and nowhere to send anyone.
 */
export function SyntheticDataSection({
  syntheticData,
  slug,
  headingId,
}: {
  syntheticData: Playbook["syntheticData"]
  slug: string
  headingId: string
}): ReactNode {
  return (
    <section className="playbook-detail__section" aria-labelledby={headingId}>
      <h2 id={headingId}>Synthetic dataset</h2>
      <div className="synthetic-data-method">
        {datasetBody(syntheticData, slug)}
      </div>
    </section>
  )
}
