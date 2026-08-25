import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { ResearchStackHero } from "@/components/site/research-stack-hero"
import { getOpportunityAtlasItems } from "@/features/playbooks/catalogue/atlas-model"
import { getBuildPartnerDescriptor } from "@/lib/playbooks/build-partner"
import { getDatasetSummary } from "@/lib/playbooks/dataset-registry"
import { getPlaybook } from "@/lib/playbooks/registry"
import { repositoryFileUrl, repositoryUrl } from "@/lib/repository"

const exemplarSlug = "life-event-services"

export default function HomePage() {
  const opportunities = getOpportunityAtlasItems()
  const preview = opportunities.slice(0, 4)
  const exemplar = getPlaybook(exemplarSlug)
  const dataset = getDatasetSummary(exemplarSlug)
  const partner = getBuildPartnerDescriptor(exemplarSlug)

  if (!exemplar || exemplar.syntheticData.status !== "available" || !dataset) {
    throw new Error("The homepage accelerator handoff is incomplete")
  }

  const cloneCommand = "git clone " + repositoryUrl + ".git"

  return (
    <div>
      <ResearchStackHero />

      <section
        className="border-b-2 border-peat bg-peat text-surface"
        aria-labelledby="workflow-title"
      >
        <div className="mx-auto w-full max-w-[96rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 border-b-2 border-surface/40 pb-8 lg:grid-cols-[1fr_2fr]">
            <p className="font-mono text-xs font-semibold tracking-[0.12em] text-synthetic uppercase">
              Builder workflow / 01—04
            </p>
            <h2
              id="workflow-title"
              className="font-display text-[clamp(2.75rem,6vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.055em] text-surface"
            >
              From atlas to agent
            </h2>
          </div>
          <ol className="mt-8 grid list-none gap-0 p-0 lg:grid-cols-4">
            {[
              "Choose an opportunity",
              "Inspect sources and starter data",
              cloneCommand,
              partner.invocation,
            ].map((step, index) => (
              <li
                className="relative flex min-h-36 flex-col justify-between border-b border-surface/40 py-5 lg:border-r lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0"
                key={step}
              >
                <span className="font-mono text-xs text-synthetic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index < 2 ? (
                  <span className="mt-8 text-lg leading-snug font-semibold text-surface">
                    {step}
                  </span>
                ) : (
                  <code className="mt-8 break-words font-mono text-base leading-snug text-surface sm:text-lg">
                    {step}
                  </code>
                )}
                {index < 3 ? (
                  <ArrowRight
                    className="absolute right-4 bottom-5 hidden size-5 text-synthetic lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="handoff-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.12em] text-signal-strong uppercase">
              One real accelerator handoff
            </p>
            <h2
              id="handoff-title"
              className="mt-4 max-w-5xl font-display text-[clamp(3rem,7vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.06em] text-peat"
            >
              Research becomes working context.
            </h2>
          </div>
          <p className="self-end border-l-8 border-synthetic pl-5 text-lg leading-relaxed text-peat-muted">
            Joined-up Support after a Life Event moves from two investigated
            sources to {dataset.recordCount} safe sample records, then into a
            checked-in build partner. It offers context, not a prescribed
            application.
          </p>
        </div>

        <ol className="mt-12 list-none border-t-2 border-peat p-0">
          <HandoffRow
            index="01"
            label="Published evidence"
            value={exemplar.dataSources.length + " sources already investigated"}
            href={"/playbooks/" + exemplarSlug + "#research"}
          />
          <HandoffRow
            index="02"
            label="Starter material"
            value={dataset.recordCount + " synthetic records ready to inspect"}
            href={"/playbooks/" + exemplarSlug + "/dataset"}
          />
          <HandoffRow
            index="03"
            label="Repository path"
            value={exemplar.syntheticData.dataPath}
            href={repositoryFileUrl(exemplar.syntheticData.dataPath)}
            technical
          />
          <HandoffRow
            index="04"
            label="Domain build partner"
            value={partner.invocation}
            href={repositoryFileUrl(partner.skillPath)}
            technical
          />
        </ol>
      </section>

      <section className="border-y-2 border-peat bg-surface" aria-labelledby="atlas-preview-title">
        <div className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-7 border-b-2 border-peat pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-evidence uppercase">
                Across the atlas
              </p>
              <h2
                id="atlas-preview-title"
                className="mt-3 font-display text-[clamp(2.75rem,5vw,5.5rem)] leading-[0.9] font-extrabold tracking-[-0.055em] text-peat"
              >
                Four of seventeen.
              </h2>
            </div>
            <Link
              className="inline-flex min-h-12 items-center gap-3 border-2 border-peat bg-synthetic px-5 py-3 text-sm font-bold text-synthetic-ink no-underline transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-evidence motion-reduce:transition-none"
              href="/playbooks"
            >
              Open all 17 opportunities
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="list-none p-0">
            {preview.map((item, index) => (
              <li className="border-b border-structure" key={item.slug}>
                <Link
                  className="group grid min-h-20 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 py-4 no-underline transition-transform duration-150 hover:translate-x-1 motion-reduce:transition-none"
                  href={"/playbooks/" + item.slug}
                >
                  <span className="font-mono text-xs text-peat-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-xl leading-tight font-bold text-peat sm:text-2xl">
                      {item.title}
                    </span>
                    <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.08em] text-evidence uppercase">
                      {item.serviceArea}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 text-evidence" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

function HandoffRow({
  index,
  label,
  value,
  href,
  technical = false,
}: {
  index: string
  label: string
  value: string
  href: string
  technical?: boolean
}) {
  return (
    <li className="border-b-2 border-peat">
      <Link
        className="group grid min-h-24 gap-3 py-5 no-underline transition-transform duration-150 hover:translate-x-1 hover:bg-synthetic/35 motion-reduce:transition-none sm:grid-cols-[4rem_minmax(10rem,0.7fr)_minmax(0,1.3fr)_auto] sm:items-center sm:px-4"
        href={href}
      >
        <span className="font-mono text-xs font-semibold text-signal-strong">
          {index}
        </span>
        <span className="font-mono text-xs font-semibold tracking-[0.08em] text-peat-muted uppercase">
          {label}
        </span>
        <span
          className={
            technical
              ? "break-all font-mono text-sm text-peat"
              : "font-display text-xl leading-tight font-bold text-peat"
          }
        >
          {value}
        </span>
        <ArrowUpRight
          className="size-5 text-evidence transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Link>
    </li>
  )
}
