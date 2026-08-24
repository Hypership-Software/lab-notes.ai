import Link from "next/link"
import type { ReactNode } from "react"

import { AvailabilityBadge } from "@/components/site/availability-badge"
import { ExternalLink } from "@/components/site/external-link"
import { ProvenanceLabel } from "@/components/site/provenance-label"
import { assertNever } from "@/lib/assert-never"
import { formatUtcDate } from "@/lib/format-date"
import type { Playbook } from "@/lib/playbooks/schema"
import { getServiceArea } from "@/lib/playbooks/service-area"

function StarterDataset({ playbook }: { playbook: Playbook }): ReactNode {
  switch (playbook.syntheticData.status) {
    case "available":
      return (
        <>
          <AvailabilityBadge available />
          <ProvenanceLabel kind="synthetic" />
          <p>{playbook.syntheticData.purpose}</p>
          <p>{playbook.syntheticData.preparation}</p>
          <p>
            <Link href={`/playbooks/${playbook.slug}/dataset`}>
              Inspect the starter dataset
            </Link>
          </p>
          <ul>
            {playbook.syntheticData.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </>
      )
    case "not-responsible":
      return (
        <>
          <AvailabilityBadge available={false} />
          <p>{playbook.syntheticData.reason}</p>
          <p>{playbook.syntheticData.whatContributorsNeed}</p>
        </>
      )
    default:
      return assertNever(playbook.syntheticData)
  }
}

/**
 * The smallest v3 detail shell. Later visual work can reshape it, but this
 * intermediate page exposes every surviving part of the typed contract.
 */
export function PlaybookDetail({
  playbook,
}: {
  playbook: Playbook
}): ReactNode {
  return (
    <article className="playbook-detail">
      <header className="playbook-detail__header">
        <p className="playbook-detail__eyebrow">
          <Link href={`/playbooks?sector=${encodeURIComponent(playbook.sector)}`}>
            {playbook.sector}
          </Link>
          <span aria-hidden="true">·</span>
          <span>{getServiceArea(playbook.sector)}</span>
        </p>
        <h1>{playbook.title}</h1>
        <p className="playbook-detail__summary">{playbook.summary}</p>
        <p className="playbook-detail__reviewed">
          Last reviewed{" "}
          <time dateTime={playbook.lastReviewed}>
            {formatUtcDate(playbook.lastReviewed)}
          </time>
        </p>
      </header>

      <div className="playbook-detail__sections">
        <section className="playbook-detail__section" aria-labelledby="opportunity">
          <h2 id="opportunity">Opportunity</h2>
          <p className="reading-width">{playbook.strategyExample.proposal}</p>
          <p>
            <ExternalLink href={playbook.strategyExample.url}>
              Read {playbook.strategyExample.draftReference}
            </ExternalLink>
          </p>
        </section>

        <section className="playbook-detail__section" aria-labelledby="research">
          <h2 id="research">Research already done</h2>
          <ProvenanceLabel kind="source" />
          <ol className="source-register">
            {playbook.dataSources.map((source) => (
              <li key={source.id}>
                <article className="source-dossier">
                  <h3>{source.title}</h3>
                  <p>{source.publisher}</p>
                  <p>{source.covers}</p>
                  <p>{source.relevance}</p>
                  <ExternalLink href={source.url}>Open the source</ExternalLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="playbook-detail__section"
          aria-labelledby="starter-dataset"
        >
          <h2 id="starter-dataset">Starter dataset</h2>
          <div className="synthetic-data-method">
            <StarterDataset playbook={playbook} />
          </div>
        </section>

        <section
          className="playbook-detail__section"
          aria-labelledby="before-you-build"
        >
          <h2 id="before-you-build">Before you build</h2>
          <ul className="reading-width">
            {playbook.caveats.map((caveat) => (
              <li key={caveat.title}>
                <strong>{caveat.title}</strong>
                <p>{caveat.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
