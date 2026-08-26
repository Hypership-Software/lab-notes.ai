import { ArrowRight, ArrowUpRight, GitFork } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { getBuildPartnerDescriptor } from "@/lib/playbooks/build-partner"
import { getSyntheticDataset } from "@/lib/playbooks/dataset-registry"
import { homepageExemplar } from "@/lib/playbooks/exemplar"
import { getPlaybook } from "@/lib/playbooks/registry"
import { repositoryFileUrl, repositoryUrl } from "@/lib/repository"
import { cn } from "@/lib/utils"

export function ResearchStackHero() {
  const playbook = getPlaybook(homepageExemplar.slug)
  const dataset = getSyntheticDataset(homepageExemplar.slug)

  if (!playbook || playbook.syntheticData.status !== "available" || !dataset) {
    throw new Error("The homepage exemplar research trail is incomplete")
  }

  const source = playbook.dataSources[0]
  const firstRecord = dataset.records[0]
  const partner = getBuildPartnerDescriptor(playbook.slug)
  const caveat = playbook.caveats.find(
    (item) => item.title === homepageExemplar.heroCaveatTitle,
  )

  if (!firstRecord || !caveat) {
    throw new Error("The homepage exemplar artefacts are incomplete")
  }

  return (
    <section className="overflow-hidden border-b-2 border-peat bg-paper">
      <div className="mx-auto grid w-full max-w-[96rem] lg:min-h-[48rem] lg:grid-cols-[minmax(0,7fr)_minmax(22rem,3fr)]">
        <div className="flex flex-col justify-between border-peat px-4 py-12 sm:px-6 sm:py-16 lg:border-r-2 lg:px-8 lg:py-20 xl:py-24">
          <div>
            <p className="mb-7 flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.14em] text-evidence uppercase">
              <span className="block h-0.5 w-10 bg-evidence" aria-hidden="true" />
              Open-source public-service accelerator
            </p>
            <h1 className="max-w-6xl font-display text-[clamp(3.5rem,9vw,9.5rem)] leading-[0.82] font-extrabold tracking-[-0.07em] text-peat">
              17 public-service opportunities.{" "}
              <span className="text-evidence">The desk research is already done.</span>
            </h1>
          </div>

          <div className="mt-12 grid items-end gap-8 border-t-2 border-peat pt-8 xl:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="max-w-3xl text-xl leading-relaxed font-medium text-peat sm:text-2xl">
                Explore the public-service opportunities named in Northern
                Ireland&rsquo;s draft AI strategy. Each playbook includes
                published sources, safe starter data, honest constraints, and a
                domain build partner for your coding agent.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-peat-muted">
                An independent open-source project, not a government service.
                It does not recommend products or claim that AI is required.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row xl:flex-col">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-3 border-2 border-peat bg-evidence px-5 py-3 text-sm font-bold text-surface no-underline transition-transform duration-150 hover:-translate-y-0.5 hover:bg-evidence-strong focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-evidence motion-reduce:transition-none"
                href="/playbooks"
              >
                Open the opportunity atlas
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-3 border-2 border-peat bg-synthetic px-5 py-3 text-sm font-bold text-synthetic-ink no-underline transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-evidence motion-reduce:transition-none"
                href={repositoryUrl}
              >
                Clone the reference
                <GitFork className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <aside
          className="relative flex min-h-[42rem] flex-col justify-center overflow-hidden bg-surface p-4 sm:p-8 lg:min-h-full"
          aria-label={`${playbook.title} research trail`}
        >
          <div className="absolute inset-y-0 left-9 w-0.5 bg-peat sm:left-14" aria-hidden="true" />

          <p className="relative mb-6 ml-7 font-mono text-[0.6875rem] font-semibold tracking-[0.12em] text-peat-muted uppercase sm:ml-10">
            How one playbook fits together /{" "}
            <span className="text-peat">{playbook.title}</span>
          </p>

          <ol className="relative m-0 list-none p-0">
            <Step
              index="01"
              gloss="Start from what the government already publishes."
              className="ml-7 sm:ml-10"
            >
              <a
                className="relative block border-2 border-evidence bg-surface p-5 no-underline motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-4 motion-safe:duration-300 motion-reduce:transition-none"
                href={source.url}
              >
                <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.1em] text-evidence uppercase">
                  Real published source
                </span>
                <strong className="mt-3 block font-display text-xl leading-tight text-peat">
                  {source.title}
                </strong>
                <span className="mt-3 block text-sm leading-relaxed text-peat-muted">
                  {source.covers}
                </span>
                <ArrowUpRight className="absolute top-4 right-4 size-4 text-evidence" aria-hidden="true" />
              </a>
            </Step>

            <Step
              index="02"
              gloss="Write invented rows shaped like it. No real junction, no real vehicle."
              className="mt-6 mr-4 sm:mr-8"
            >
              <div className="border-2 border-peat bg-synthetic p-5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-4 motion-safe:delay-100 motion-safe:duration-300 motion-reduce:transition-none">
                <p className="flex justify-between gap-3 font-mono text-[0.6875rem] font-semibold tracking-[0.1em] text-synthetic-ink uppercase">
                  <span>Synthetic working data</span>
                  <span aria-hidden="true">row 01</span>
                </p>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm text-synthetic-ink">
                  {homepageExemplar.heroRow.map((cell) => (
                    <div className="contents" key={cell.field}>
                      <dt>{cell.label}</dt>
                      <dd className="font-mono font-semibold">
                        {String(firstRecord[cell.field])}
                        {"suffix" in cell ? cell.suffix : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Step>

            <Step
              index="03"
              gloss="Keep the file in the repository, ready to open or clone."
              className="mt-6 ml-12 sm:ml-20"
            >
              <a
                className="block border-2 border-peat bg-peat p-5 font-mono text-xs leading-relaxed text-surface no-underline motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-4 motion-safe:delay-200 motion-safe:duration-300 motion-reduce:transition-none"
                href={repositoryFileUrl(playbook.syntheticData.dataPath)}
              >
                <span className="block text-synthetic">repository / dataset</span>
                <span className="mt-2 block break-all">
                  {playbook.syntheticData.dataPath}
                </span>
              </a>
            </Step>

            <Step
              index="04"
              gloss="Hand that context to your coding agent through a skill."
              className="mt-6 mr-8"
            >
              <a
                className="block border-2 border-peat bg-evidence p-5 font-mono text-sm text-surface no-underline motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-4 motion-safe:delay-300 motion-safe:duration-300 motion-reduce:transition-none"
                href={repositoryFileUrl(partner.skillPath)}
              >
                <span className="block text-xs tracking-[0.1em] text-synthetic uppercase">
                  Domain build partner
                </span>
                <strong className="mt-2 block break-all text-base">
                  {partner.name}
                </strong>
              </a>
            </Step>

            <Step
              index="05"
              gloss="Say what a responsible build has to respect."
              className="mt-6 ml-6 sm:ml-14"
            >
              <div className="border-2 border-signal-strong bg-signal-strong p-5 text-surface motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-4 motion-safe:delay-400 motion-safe:duration-300 motion-reduce:transition-none">
                <p className="font-mono text-[0.6875rem] tracking-[0.1em] uppercase">
                  Before you build
                </p>
                <strong className="mt-2 block font-display text-xl leading-tight">
                  {caveat.title}
                </strong>
                <p className="mt-2 text-sm leading-relaxed">{caveat.detail}</p>
              </div>
            </Step>
          </ol>
        </aside>
      </div>
    </section>
  )
}

/**
 * One artefact on the trail: a numbered plain-English line saying what this
 * step is, then the artefact itself. The gloss is what lets a first-time
 * visitor read the composition top to bottom without knowing the project.
 */
function Step({
  index,
  gloss,
  className,
  children,
}: {
  index: string
  gloss: string
  className?: string
  children: ReactNode
}) {
  return (
    <li className={cn("relative", className)}>
      <p className="mb-2 flex w-fit items-baseline gap-2 bg-surface pr-2 text-sm leading-snug text-peat-muted">
        <span className="font-mono text-[0.6875rem] font-semibold text-signal-strong">
          {index}
        </span>
        {gloss}
      </p>
      {children}
    </li>
  )
}
