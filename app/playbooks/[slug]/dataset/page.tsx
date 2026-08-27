import { ArrowLeft, Download, FileCode2 } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ExternalLink } from "@/components/site/external-link"
import { ProvenanceLabel } from "@/components/site/provenance-label"
import { DatasetExplorer } from "@/features/playbooks/dataset/dataset-explorer"
import {
  getDatasetSummary,
  getSyntheticDataset,
} from "@/lib/playbooks/dataset-registry"
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks/registry"
import { pageMetadata } from "@/lib/site"
import { repositoryFileUrl, repositoryRawUrl } from "@/lib/repository"

export const dynamicParams = false

const transparencyCopy =
  "AI-assisted research helped identify and interpret the published sources. We then created a small, non-sensitive synthetic dataset shaped by the information those sources expose. It is for exploration—not evidence, training, or operational decisions."

/**
 * Every registered playbook gets a static dataset route, including playbooks
 * where a responsible synthetic stand-in is not possible. Those routes explain
 * the boundary rather than turning a deliberate refusal into a missing page.
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

  return pageMetadata({
    path: `/playbooks/${slug}/dataset`,
    title: available
      ? `${playbook.title}: synthetic dataset`
      : `${playbook.title}: no synthetic dataset`,
    description: available
      ? `Inspect every record, field, and limitation in the synthetic working data for ${playbook.title}.`
      : `Why ${playbook.title} has no synthetic dataset.`,
  })
}

export default async function PlaybookDatasetPage({
  params,
}: PageProps<"/playbooks/[slug]/dataset">) {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) notFound()

  if (playbook.syntheticData.status !== "available") {
    return (
      <article>
        <header className="border-y-2 border-peat bg-surface">
          <div className="mx-auto w-full max-w-[96rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
            <Link
              className="inline-flex min-h-11 items-center gap-2 font-bold text-evidence-strong"
              href={`/playbooks/${playbook.slug}`}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to {playbook.title}
            </Link>
            <p className="mt-10 font-mono text-xs font-bold uppercase tracking-[0.16em] text-signal-strong">
              Dataset boundary
            </p>
            <h1 className="mt-4 max-w-6xl text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.05em]">
              No synthetic dataset — by design
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-peat-muted sm:text-2xl">
              {playbook.syntheticData.reason}
            </p>
          </div>
        </header>

        <section
          aria-labelledby="responsible-work-title"
          className="mx-auto grid w-full max-w-[96rem] border-b-2 border-peat lg:grid-cols-10"
        >
          <div className="bg-signal-strong p-5 text-surface sm:p-8 lg:col-span-3 lg:p-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.15em]">
              Why we stopped
            </p>
            <p className="mt-5 text-lg leading-relaxed">
              We do not invent person-level records where a stand-in could
              normalise unsafe or unauthorised decisions.
            </p>
          </div>
          <div className="p-5 sm:p-8 lg:col-span-7 lg:p-10">
            <h2 id="responsible-work-title" className="text-3xl sm:text-4xl">
              What responsible work needs instead
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-peat-muted">
              {playbook.syntheticData.whatContributorsNeed}
            </p>
          </div>
        </section>
      </article>
    )
  }

  const dataset = getSyntheticDataset(playbook.slug)
  const summary = getDatasetSummary(playbook.slug)
  if (!dataset || !summary) {
    throw new Error(
      `Playbook "${playbook.slug}" declares a synthetic dataset that is not registered`,
    )
  }

  const { dataPath, purpose, preparation, limitations } = playbook.syntheticData

  return (
    <article>
      <header className="border-y-2 border-peat bg-surface">
        <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-10">
          <div className="min-w-0 p-4 py-10 sm:p-8 sm:py-14 lg:col-span-7 lg:p-12">
            <Link
              className="inline-flex min-h-11 items-center gap-2 font-bold text-evidence-strong"
              href={`/playbooks/${playbook.slug}`}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to {playbook.title}
            </Link>
            <div className="mt-9">
              <ProvenanceLabel kind="synthetic" />
            </div>
            <h1 className="mt-5 max-w-6xl text-[clamp(3.2rem,8vw,8rem)] leading-[0.88] tracking-[-0.055em]">
              Explore the starter data
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-peat-muted sm:text-2xl">
              We used AI-assisted research to investigate the published sources,
              then created {summary.recordCount} non-sensitive synthetic records
              shaped by what those sources expose. It is starter data for
              exploration—not real service data or evidence.
            </p>
            <details className="mt-7 max-w-3xl border-l-4 border-synthetic pl-4">
              <summary className="w-fit cursor-pointer font-mono text-xs font-bold tracking-[0.1em] text-evidence-strong uppercase">
                Read the note on this dataset
              </summary>
              <p className="mt-3 text-base leading-relaxed text-peat-muted">
                {dataset.description}
              </p>
            </details>
          </div>

          <aside className="border-t-2 border-peat bg-paper p-4 sm:p-8 lg:col-span-3 lg:border-t-0 lg:border-l-2 lg:p-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-evidence-strong">
              At a glance
            </p>
            <dl className="mt-6 border-y-2 border-peat">
              <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-structure py-4">
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-peat-muted">
                  Records
                </dt>
                <dd className="font-display text-3xl font-extrabold" data-numeric>
                  {summary.recordCount}
                </dd>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 py-4">
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-peat-muted">
                  Fields
                </dt>
                <dd className="font-display text-3xl font-extrabold" data-numeric>
                  {summary.fields.length}
                </dd>
              </div>
            </dl>
            <p className="mt-6 break-words font-mono text-xs leading-relaxed text-peat-muted [overflow-wrap:anywhere]">
              {dataPath}
            </p>
          </aside>
        </div>
      </header>

      <section
        aria-labelledby="working-surface-title"
        className="mx-auto w-full max-w-[96rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-10 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-evidence-strong">
              Every record in the file
            </p>
            <h2
              className="mt-3 text-4xl sm:text-5xl lg:text-6xl"
              id="working-surface-title"
            >
              Inspect, compare, understand
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-peat-muted">
              {purpose} Switch views without losing the description, source
              file, or limitations on this page.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:col-span-3 lg:justify-end">
            <ExternalLink
              className="inline-flex min-h-11 w-full items-center gap-2 border-2 border-peat px-4 py-2 font-bold text-peat no-underline hover:bg-synthetic"
              href={repositoryFileUrl(dataPath)}
            >
              <FileCode2 aria-hidden="true" className="size-4" />
              View repository file
            </ExternalLink>
            <ExternalLink
              className="inline-flex min-h-11 w-full items-center gap-2 bg-evidence px-4 py-2 font-bold text-surface no-underline hover:bg-evidence-strong"
              href={repositoryRawUrl(dataPath)}
            >
              <Download aria-hidden="true" className="size-4" />
              Download JSON
            </ExternalLink>
          </div>
        </div>

        <div className="mt-10">
          <DatasetExplorer dataset={dataset} summary={summary} />
        </div>
      </section>

      <section
        aria-labelledby="dataset-notes-title"
        className="border-t-2 border-peat"
      >
        <div className="bg-synthetic text-synthetic-ink">
          <div className="mx-auto w-full max-w-[96rem] px-4 py-7 sm:px-6 lg:px-10">
            <ProvenanceLabel className="text-signal-strong" kind="synthetic" />
            <p className="mt-4 max-w-5xl text-lg font-bold leading-relaxed">
              {transparencyCopy}
            </p>
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-10">
          <div className="p-5 sm:p-8 lg:col-span-4 lg:p-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-evidence-strong">
              Method note
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl" id="dataset-notes-title">
              How it was prepared
            </h2>
            <p className="mt-5 leading-relaxed text-peat-muted">{preparation}</p>
          </div>
          <div className="border-t-2 border-peat bg-surface p-5 sm:p-8 lg:col-span-6 lg:border-t-0 lg:border-l-2 lg:p-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-signal-strong">
              Conditions for use
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              What this dataset cannot tell you
            </h2>
            <ul className="mt-6 flex list-[square] flex-col gap-3 pl-5 text-peat-muted marker:text-signal">
              {limitations.map((limitation) => (
                <li key={limitation}>{limitation}</li>
              ))}
              <li>
                It is invented. No record describes a real person, place, case,
                or measurement, and no result computed from it is evidence that
                anything works in a live service.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </article>
  )
}
