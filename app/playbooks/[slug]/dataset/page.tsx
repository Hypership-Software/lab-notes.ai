import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ExternalLink } from "@/components/site/external-link"
import { DatasetViewer } from "@/features/playbooks/dataset/dataset-viewer"
import { getSyntheticDataset } from "@/lib/playbooks/dataset-registry"
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks/registry"
import { repositoryFileUrl } from "@/lib/repository"

export const dynamicParams = false

/**
 * Every playbook gets a dataset route, including the two that withhold one. A
 * slug that resolves on the playbook page but 404s here would be a worse
 * answer than a page saying why the dataset is not there, so the params cover
 * the whole registry and the page branches on the playbook's own answer to C.
 */
export function generateStaticParams() {
  return getPlaybookSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/playbooks/[slug]/dataset">): Promise<Metadata> {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) return {}

  const available = playbook.syntheticData.status === "available"

  return {
    title: available
      ? `${playbook.title}: synthetic dataset`
      : `${playbook.title}: no synthetic dataset`,
    description: available
      ? `Every record in the synthetic dataset behind ${playbook.title}, with the method that produced it and its limitations.`
      : `Why ${playbook.title} has no synthetic dataset.`,
  }
}

export default async function PlaybookDatasetPage({
  params,
}: PageProps<"/playbooks/[slug]/dataset">) {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) notFound()

  if (playbook.syntheticData.status !== "available") {
    return (
      <div className="page-shell dataset-page">
        <header className="page-intro reading-width">
          <p className="workbench-page__breadcrumb">
            <Link href={`/playbooks/${playbook.slug}`}>
              Back to the {playbook.title} playbook
            </Link>
          </p>
          <h1>{playbook.title}: no synthetic dataset</h1>
          <p>{playbook.syntheticData.reason}</p>
        </header>

        <section className="limits reading-width" aria-labelledby="needed-title">
          <h2 id="needed-title">What a contributor would need instead</h2>
          <p>{playbook.syntheticData.whatContributorsNeed}</p>
        </section>
      </div>
    )
  }

  const dataset = getSyntheticDataset(playbook.slug)
  if (!dataset) {
    // The playbook declares a dataset the registry does not hold. The schema
    // and `dataset-registry.test.ts` both forbid it, so reaching here means a
    // file was committed without being registered.
    throw new Error(
      `Playbook "${playbook.slug}" declares a synthetic dataset that is not registered`,
    )
  }

  const { dataPath, purpose, preparation, limitations } = playbook.syntheticData

  return (
    <div className="page-shell dataset-page">
      <header className="dataset-page__header">
        <p className="workbench-page__breadcrumb">
          <Link href={`/playbooks/${playbook.slug}`}>
            Back to the {playbook.title} playbook
          </Link>
        </p>
        <h1>{playbook.title}: the synthetic dataset</h1>
        <p className="dataset-page__lede">{dataset.description}</p>

        <dl className="dataset-page__facts">
          <div>
            <dt>Records</dt>
            <dd data-numeric>{dataset.records.length}</dd>
          </div>
          <div>
            <dt>In the repository</dt>
            <dd>
              <ExternalLink href={repositoryFileUrl(dataPath)}>
                <code>{dataPath}</code>
              </ExternalLink>
            </dd>
          </div>
        </dl>
      </header>

      <section className="workbench-section" aria-labelledby="method-title">
        <div className="workbench-heading">
          <h2 id="method-title">How it was made</h2>
        </div>
        <p className="reading-width">{purpose}</p>
        <p className="reading-width">{preparation}</p>

        <div className="limits reading-width">
          <h3>What this dataset cannot be used for</h3>
          <ol className="limits__list">
            {limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
            <li>
              It is invented. No record describes a real person, place, case, or
              measurement, and no result computed from it is evidence that
              anything works in service.
            </li>
          </ol>
        </div>
      </section>

      <section className="workbench-section" aria-labelledby="records-title">
        <div className="workbench-heading">
          <h2 id="records-title">Every record</h2>
          <p>
            The whole file, rendered from the committed JSON on every build.
            Nothing here is summarised or sampled.
          </p>
        </div>
        <DatasetViewer dataset={dataset} />
      </section>
    </div>
  )
}
