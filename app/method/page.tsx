import type { Metadata } from "next"
import Link from "next/link"

import { ExternalLink } from "@/components/site/external-link"
import {
  strategyDraftReference,
  strategyDraftUrl,
} from "@/content/playbooks/strategy-draft"
import { repositoryFileUrl } from "@/lib/repository"

export const metadata: Metadata = {
  title: "How this works",
  description:
    "How strategy opportunities become researched, agent-ready builder playbooks without becoming product recommendations.",
}

const stages = [
  {
    index: "01",
    title: "Start with the strategy",
    description:
      "Each playbook begins with an opportunity named in Northern Ireland’s draft AI strategy. We translate the example into plain English without deciding what should be built.",
    output: "A bounded opportunity, not a product brief",
  },
  {
    index: "02",
    title: "Investigate the public evidence",
    description:
      "AI-assisted research helps identify and interpret published sources. The playbook records the publisher, coverage, access conditions and relevance so builders can verify the research themselves.",
    output: "A traceable source register",
  },
  {
    index: "03",
    title: "Prepare safe working data",
    description:
      "Where it is responsible, we author a small non-sensitive dataset shaped by fields and vocabulary visible in those sources. Where a person-shaped stand-in would mislead, we supply a refusal instead.",
    output: "Synthetic working data—or an explicit stop",
  },
  {
    index: "04",
    title: "Package the domain context",
    description:
      "Every playbook has a repository skill and domain brief. After cloning, a coding agent can load the sources, known unknowns and safety boundaries before discussing possible directions.",
    output: "A domain build partner in .agents/skills",
  },
  {
    index: "05",
    title: "Keep judgement with the builder",
    description:
      "The playbook offers evidence and constraints, not a recommended application. Builders still need affected people, service owners, professional reviewers and data authorities before operational decisions.",
    output: "A credible place to start—not permission to deploy",
  },
] as const

export default function MethodPage() {
  return (
    <div className="w-full overflow-x-clip">
      <header className="border-y-2 border-peat bg-surface">
        <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-10">
          <div className="px-4 py-12 sm:px-6 sm:py-16 lg:col-span-7 lg:px-8 lg:py-24">
            <p className="font-mono text-xs font-bold tracking-[0.16em] text-evidence-strong uppercase">
              Method / evidence before invention
            </p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,9vw,9rem)] leading-[0.84] tracking-[-0.065em]">
              Research once. Build from a clearer starting line.
            </h1>
          </div>
          <aside className="border-t-2 border-peat bg-peat p-5 text-surface sm:p-8 lg:col-span-3 lg:border-t-0 lg:border-l-2 lg:p-10">
            <p className="font-mono text-xs font-bold tracking-[0.14em] text-synthetic uppercase">
              The governing rule
            </p>
            <p className="mt-6 text-2xl leading-snug font-semibold">
              The project accelerates investigation. It does not choose a product,
              prove an outcome or make AI necessary.
            </p>
          </aside>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[96rem] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 border-b-2 border-peat pb-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.14em] text-signal-strong uppercase">
              Five-stage research chain
            </p>
            <h2 className="mt-4 text-[clamp(2.75rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.055em]">
              What is already done for you.
            </h2>
          </div>
          <p className="self-end border-l-8 border-synthetic pl-5 text-xl leading-relaxed text-peat-muted">
            Source links stay visible because this is assisted research, not formal
            assurance. The fastest route to trust is being able to inspect the trail.
          </p>
        </div>

        <ol className="list-none p-0">
          {stages.map((stage) => (
            <li
              className="grid gap-4 border-b-2 border-peat py-8 sm:grid-cols-[5rem_minmax(12rem,0.7fr)_minmax(0,1.3fr)] sm:gap-8 sm:py-10"
              key={stage.index}
            >
              <span className="font-mono text-sm font-bold text-signal-strong">
                {stage.index}
              </span>
              <h3 className="text-2xl sm:text-3xl">{stage.title}</h3>
              <div>
                <p className="max-w-3xl text-lg leading-relaxed text-peat-muted">
                  {stage.description}
                </p>
                <p className="mt-5 border-l-4 border-evidence pl-4 font-mono text-xs font-bold tracking-[0.08em] text-evidence-strong uppercase">
                  Output / {stage.output}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <section className="grid border-b-2 border-peat lg:grid-cols-2" aria-labelledby="verify-title">
          <div className="py-12 lg:border-r-2 lg:border-peat lg:pr-12">
            <p className="font-mono text-xs font-bold tracking-[0.14em] text-evidence-strong uppercase">
              Verify the foundation
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl" id="verify-title">
              Follow the evidence yourself.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-peat-muted">
              The opportunity list comes from {strategyDraftReference}. Every
              playbook then links the public sources used to interpret its domain.
            </p>
            <ExternalLink className="mt-6" href={strategyDraftUrl}>
              Read the draft strategy consultation
            </ExternalLink>
          </div>
          <div className="border-t-2 border-peat bg-synthetic p-6 text-synthetic-ink sm:p-10 lg:border-t-0">
            <p className="font-mono text-xs font-bold tracking-[0.14em] uppercase">
              Inspect the agent contract
            </p>
            <h2 className="mt-4 text-4xl text-synthetic-ink sm:text-5xl">
              The skill is part of the product.
            </h2>
            <p className="mt-5 max-w-2xl text-lg">
              Skills are checked into the repository, reviewed like code and
              validated against every registered playbook.
            </p>
            <ExternalLink
              className="mt-6 text-synthetic-ink"
              href={repositoryFileUrl(".agents/skills/build-life-event-services/SKILL.md")}
            >
              Inspect an example build-partner skill
            </ExternalLink>
          </div>
        </section>

        <section className="mt-14 flex flex-col items-start justify-between gap-7 bg-peat p-6 text-surface sm:p-10 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.14em] text-synthetic uppercase">
              Ready to inspect the work?
            </p>
            <h2 className="mt-3 max-w-4xl text-4xl text-surface sm:text-6xl">
              All 17 opportunities are available at once.
            </h2>
          </div>
          <Link
            className="inline-flex min-h-12 shrink-0 items-center border-2 border-synthetic bg-synthetic px-5 py-3 font-bold text-synthetic-ink no-underline transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-surface motion-reduce:transition-none"
            href="/playbooks"
          >
            Open the opportunity atlas
          </Link>
        </section>
      </div>
    </div>
  )
}
