import { ArrowDown, ArrowRight, GitBranch } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import {
  getBuildPartnerDescriptor,
  getBuildPartnerStarterPrompt,
} from "@/lib/playbooks/build-partner"
import { getDatasetSummary } from "@/lib/playbooks/dataset-registry"
import { getPlaybookSlugs } from "@/lib/playbooks/registry"
import type { Playbook } from "@/lib/playbooks/schema"
import { getServiceArea } from "@/lib/playbooks/service-area"

import { BuildConstraintList } from "./build-constraint-list"
import { BuilderPackLedger } from "./builder-pack-ledger"
import { DataSourcesSection } from "./data-sources-section"
import { DomainBuildPartnerPanel } from "./domain-build-partner-panel"
import { SectionNavigator } from "./section-navigator"
import { StrategyExampleSection } from "./strategy-example-section"
import { SyntheticDataSection } from "./synthetic-data-section"

const sections = [
  { id: "opportunity", label: "Opportunity" },
  { id: "research", label: "Research already done" },
  { id: "starter-dataset", label: "Starter dataset" },
  { id: "build-partner", label: "Domain build partner" },
  { id: "before-you-build", label: "Before you build" },
] as const

export function PlaybookDetail({
  playbook,
}: {
  playbook: Playbook
}): ReactNode {
  const dataset = getDatasetSummary(playbook.slug)
  const partner = getBuildPartnerDescriptor(playbook.slug)
  const starterPrompt = getBuildPartnerStarterPrompt(playbook.slug)
  const playbookSlugs = getPlaybookSlugs()
  const index = playbookSlugs.indexOf(playbook.slug) + 1

  return (
    <article>
      <header className="border-y-2 border-peat bg-surface">
        <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-10">
          <div className="p-5 sm:p-8 lg:col-span-7 lg:p-12">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.15em] text-peat-muted">
              <span className="text-evidence-strong">
                Opportunity {String(index).padStart(2, "0")}/
                {String(playbookSlugs.length).padStart(2, "0")}
              </span>
              <span aria-hidden="true">/</span>
              <span>{playbook.sector}</span>
              <span aria-hidden="true">/</span>
              <span>{getServiceArea(playbook.sector)}</span>
            </div>
            <h1 className="mt-7 max-w-5xl text-[clamp(3.4rem,8vw,8.5rem)] leading-[0.88] tracking-[-0.055em]">
              {playbook.title}
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-peat-muted sm:text-2xl">
              {playbook.summary}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {dataset && (
                <Link
                  className="inline-flex min-h-12 items-center gap-2 bg-evidence px-5 py-3 font-bold text-paper no-underline hover:bg-evidence-strong"
                  href={`/playbooks/${playbook.slug}/dataset`}
                >
                  Inspect starter data
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
              <a
                className="inline-flex min-h-12 items-center gap-2 border-2 border-peat px-5 py-3 font-bold no-underline hover:bg-synthetic"
                href="#build-partner"
              >
                {dataset ? "Set up the build partner" : "Start with the build partner"}
                {dataset ? (
                  <ArrowDown className="size-4" aria-hidden="true" />
                ) : (
                  <GitBranch className="size-4" aria-hidden="true" />
                )}
              </a>
            </div>
          </div>
          <div className="border-t-2 border-peat p-5 sm:p-8 lg:col-span-3 lg:border-t-0 lg:border-l-2 lg:p-8">
            <BuilderPackLedger
              sourceCount={playbook.dataSources.length}
              dataset={dataset}
              datasetState={playbook.syntheticData.status}
              partner={partner}
              lastReviewed={playbook.lastReviewed}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[96rem] gap-10 px-4 sm:px-6 lg:grid-cols-10 lg:gap-16 lg:px-10">
        <aside className="pt-10 lg:col-span-3 lg:col-start-8 lg:row-start-1 lg:pt-0">
          <div className="lg:sticky lg:top-24 lg:py-16">
            <SectionNavigator sections={sections} />
          </div>
        </aside>

        <div className="min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <StrategyExampleSection
            strategyExample={playbook.strategyExample}
            headingId="opportunity"
          />
          <DataSourcesSection
            dataSources={playbook.dataSources}
            headingId="research"
          />
          <SyntheticDataSection
            syntheticData={playbook.syntheticData}
            slug={playbook.slug}
            headingId="starter-dataset"
            dataset={dataset}
          />
          <DomainBuildPartnerPanel
            partner={partner}
            starterPrompt={starterPrompt}
            headingId="build-partner"
          />
        </div>
      </div>

      <BuildConstraintList
        caveats={playbook.caveats}
        headingId="before-you-build"
      />
    </article>
  )
}
