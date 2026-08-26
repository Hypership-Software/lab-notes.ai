import { ArrowRight, Download, FileCode2 } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import { ProvenanceLabel } from "@/components/site/provenance-label"
import { assertNever } from "@/lib/assert-never"
import type { DatasetSummary } from "@/lib/playbooks/dataset-registry"
import type { Playbook } from "@/lib/playbooks/schema"
import { repositoryFileUrl, repositoryRawUrl } from "@/lib/repository"

const transparencyCopy =
  "AI-assisted research helped identify and interpret the published sources. We then created a small, non-sensitive synthetic dataset shaped by the information those sources expose. It is for exploration—not evidence, training, or operational decisions."

function datasetBody(
  syntheticData: Playbook["syntheticData"],
  slug: string,
  dataset: DatasetSummary | undefined,
): ReactNode {
  switch (syntheticData.status) {
    case "available":
      return (
        <>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)]">
            <div>
              <ProvenanceLabel kind="synthetic" />
              <p className="mt-4 max-w-3xl font-display text-2xl font-bold leading-tight sm:text-3xl">
                {syntheticData.purpose}
              </p>
              <p className="mt-5 max-w-3xl text-peat-muted">{transparencyCopy}</p>
            </div>
            <dl className="grid grid-cols-2 self-start border-2 border-peat bg-surface">
              <div className="border-r border-structure p-4">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-peat-muted">
                  Records
                </dt>
                <dd className="mt-2 font-display text-4xl font-extrabold" data-numeric>
                  {dataset?.recordCount ?? "—"}
                </dd>
              </div>
              <div className="p-4">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-peat-muted">
                  Fields
                </dt>
                <dd className="mt-2 font-display text-4xl font-extrabold" data-numeric>
                  {dataset?.fields.length ?? "—"}
                </dd>
              </div>
            </dl>
          </div>

          {dataset && (
            <div className="mt-10 border-2 border-peat bg-surface">
              <div className="flex items-center justify-between gap-4 border-b border-peat px-4 py-3">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em]">
                  Field preview
                </h3>
                <span className="font-mono text-xs text-peat-muted">
                  {dataset.defaultView} view
                </span>
              </div>
              <ul className="grid md:grid-cols-2">
                {dataset.fields.slice(0, 6).map((field) => (
                  <li
                    key={field.name}
                    className="min-w-0 border-b border-structure p-4 md:odd:border-r"
                  >
                    <code className="break-words font-mono text-sm font-bold text-evidence-strong">
                      {field.name}
                    </code>
                    <p className="mt-2 truncate text-sm text-peat-muted">
                      {field.sampleValues.length > 0
                        ? field.sampleValues.join(" · ")
                        : field.types.join(" / ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center gap-2 bg-evidence px-4 py-2 font-bold text-paper no-underline hover:bg-evidence-strong"
              href={`/playbooks/${slug}/dataset`}
            >
              Inspect all {dataset ? `${dataset.recordCount} records` : "records"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <ExternalLink
              className="inline-flex min-h-11 items-center gap-2 border-2 border-peat px-4 py-2 font-bold no-underline"
              href={repositoryFileUrl(syntheticData.dataPath)}
            >
              <FileCode2 className="size-4" aria-hidden="true" />
              View repository file
            </ExternalLink>
            <ExternalLink
              className="inline-flex min-h-11 items-center gap-2 px-3 py-2 font-bold text-evidence-strong"
              href={repositoryRawUrl(syntheticData.dataPath)}
            >
              <Download className="size-4" aria-hidden="true" />
              Download JSON
            </ExternalLink>
          </div>

          <div className="mt-10 grid gap-8 border-t border-structure pt-8 lg:grid-cols-2">
            <div>
              <h3 className="text-xl">How it was prepared</h3>
              <p className="mt-3 text-peat-muted">{syntheticData.preparation}</p>
            </div>
            <div>
              <h3 className="text-xl">Limitations</h3>
              <ul className="mt-3 flex list-[square] flex-col gap-2 pl-5 text-peat-muted marker:text-signal">
                {syntheticData.limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )
    case "not-responsible":
      return (
        <div className="mt-8 border-2 border-peat bg-surface">
          <p className="bg-signal-strong px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper">
            No synthetic dataset — by design
          </p>
          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-2">
            <div>
              <h3 className="text-xl">Why we stopped</h3>
              <p className="mt-3 text-peat-muted">{syntheticData.reason}</p>
            </div>
            <div>
              <h3 className="text-xl">What responsible work needs instead</h3>
              <p className="mt-3 text-peat-muted">
                {syntheticData.whatContributorsNeed}
              </p>
            </div>
          </div>
        </div>
      )
    default:
      return assertNever(syntheticData)
  }
}

export function SyntheticDataSection({
  syntheticData,
  slug,
  headingId,
  dataset,
}: {
  syntheticData: Playbook["syntheticData"]
  slug: string
  headingId: string
  dataset: DatasetSummary | undefined
}): ReactNode {
  return (
    <section
      className="scroll-mt-28 border-t-2 border-peat py-16 sm:py-20"
      aria-labelledby={headingId}
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-evidence-strong">
        Starter data
      </p>
      <h2
        id={headingId}
        className="mt-3 scroll-mt-28 text-4xl sm:text-5xl lg:text-6xl"
      >
        Starter dataset
      </h2>
      {datasetBody(syntheticData, slug, dataset)}
    </section>
  )
}
