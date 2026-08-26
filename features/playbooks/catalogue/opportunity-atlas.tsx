"use client"

import { ArrowUpRight, Database, Files, Terminal } from "lucide-react"
import Link from "next/link"
import { type CSSProperties, useState } from "react"

import { cn } from "@/lib/utils"

import type { OpportunityAtlasItem } from "./atlas-model"
import { groupPlaybooksByArea } from "./group-playbooks"

export function OpportunityAtlas({
  items,
}: {
  items: readonly OpportunityAtlasItem[]
}) {
  const groups = groupPlaybooksByArea(items)
  const orderedItems = groups.flatMap((group) => group.playbooks)
  // One grid row per group heading and per opportunity row. The preview pane
  // spans every row (plus a trailing 1fr row that absorbs any height the
  // preview needs beyond the list), so it can sit sticky beside the whole list
  // instead of pinning itself to row one and pushing the list beneath it.
  const rowCount = groups.length + orderedItems.length
  const [selectedSlug, setSelectedSlug] = useState(
    orderedItems[0]?.slug ?? "",
  )

  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <header className="grid gap-8 border-b-2 border-peat pb-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-12 lg:pb-14">
        <div>
          <p className="mb-4 font-mono text-xs font-semibold tracking-[0.14em] text-evidence uppercase">
            Opportunity atlas / NI public services
          </p>
          <h1 className="max-w-4xl font-display text-[clamp(3.25rem,8vw,8.5rem)] leading-[0.84] font-extrabold tracking-[-0.065em] text-peat">
            Find your starting point.
          </h1>
        </div>
        <div className="flex max-w-3xl flex-col justify-end gap-5 lg:pb-2">
          <p className="border-l-8 border-signal pl-5 text-xl leading-snug font-semibold text-peat sm:text-2xl">
            17 opportunities from Northern Ireland&rsquo;s draft AI strategy,
            each connected to the published research and starter data a
            builder needs to begin.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-peat-muted">
            This is an independent open-source reference, not a government
            service or a ranked list. Explore every opportunity, then inspect
            the evidence before deciding what—if anything—is worth building.
          </p>
        </div>
      </header>

      <div
        className="mt-10 border-t-2 border-peat lg:grid lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:grid-rows-[repeat(var(--atlas-rows),auto)_1fr] lg:items-start lg:gap-x-10"
        style={{ "--atlas-rows": rowCount } as CSSProperties}
      >
        {groups.map((group, groupIndex) => (
          <section
            key={group.area}
            className="border-b-2 border-peat lg:contents"
            aria-labelledby={`atlas-${toId(group.area)}`}
          >
            <div
              className={cn(
                "flex items-baseline justify-between gap-4 bg-peat px-3 py-2.5 text-surface lg:col-start-1",
                groupIndex > 0 && "lg:mt-6",
              )}
            >
              <h2
                id={`atlas-${toId(group.area)}`}
                className="font-mono text-[0.6875rem] leading-tight font-semibold tracking-[0.1em] text-inherit uppercase"
              >
                {group.area}
              </h2>
              <span
                className="font-mono text-[0.6875rem] text-synthetic"
                aria-hidden="true"
              >
                [{String(group.playbooks.length).padStart(2, "0")}]
              </span>
            </div>

            {group.playbooks.map((item) => {
              const index =
                orderedItems.findIndex((entry) => entry.slug === item.slug) + 1
              const selected = item.slug === selectedSlug

              return (
                <article className="border-t border-structure first:border-t-0 lg:contents" key={item.slug}>
                  <button
                    type="button"
                    className={cn(
                      "group grid min-h-16 w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 text-left transition-transform duration-150 motion-reduce:transition-none lg:col-start-1",
                      "focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-evidence",
                      selected
                        ? "bg-synthetic text-synthetic-ink"
                        : "bg-transparent text-peat hover:translate-x-1 hover:bg-surface",
                    )}
                    aria-pressed={selected}
                    aria-expanded={selected}
                    aria-controls={`opportunity-preview-${item.slug}`}
                    onPointerEnter={() => setSelectedSlug(item.slug)}
                    onFocus={() => setSelectedSlug(item.slug)}
                    onClick={() => setSelectedSlug(item.slug)}
                  >
                    <span className="font-mono text-xs font-semibold tabular-nums opacity-70">
                      {String(index).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg leading-[1.05] font-bold tracking-[-0.025em] sm:text-xl">
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-lg transition-transform duration-150 motion-reduce:transition-none",
                        selected ? "translate-x-0" : "-translate-x-1 opacity-40",
                      )}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>

                  {selected ? (
                    <OpportunityPreview item={item} index={index} />
                  ) : null}
                </article>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  )
}

function OpportunityPreview({
  item,
  index,
}: {
  item: OpportunityAtlasItem
  index: number
}) {
  return (
    <aside
      id={`opportunity-preview-${item.slug}`}
      className="relative overflow-hidden border-t-2 border-peat bg-surface p-5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200 motion-reduce:transition-none sm:p-8 lg:sticky lg:top-6 lg:col-start-2 lg:row-span-full lg:border-2 lg:p-10 xl:p-14"
      aria-label="Selected opportunity"
    >
      <div
        className="absolute top-0 right-0 border-b-2 border-l-2 border-peat bg-signal-strong px-3 py-2 font-mono text-xs font-semibold text-surface"
        aria-hidden="true"
      >
        {String(index).padStart(2, "0")} / 17
      </div>
      <p className="mb-8 max-w-[calc(100%-5rem)] font-mono text-[0.6875rem] font-semibold tracking-[0.1em] text-evidence uppercase">
        {item.serviceArea} · {item.sector}
      </p>
      <h3 className="max-w-4xl font-display text-[clamp(2.5rem,5vw,5.75rem)] leading-[0.92] font-extrabold tracking-[-0.055em] text-peat">
        {item.title}
      </h3>
      <p className="mt-7 max-w-3xl text-lg leading-relaxed text-peat-muted sm:text-xl">
        {item.summary}
      </p>

      <dl className="mt-10 grid border-y-2 border-peat sm:grid-cols-2">
        <div className="border-b border-structure py-5 sm:border-r sm:border-b-0 sm:pr-5">
          <dt className="flex items-center gap-2 font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-evidence uppercase">
            <Files className="size-4" aria-hidden="true" />
            Real published sources
          </dt>
          <dd className="mt-2 font-display text-3xl font-extrabold text-peat">
            {item.dataSourceCount} investigated
          </dd>
        </div>
        <div className="py-5 sm:pl-5">
          <dt className="flex items-center gap-2 font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-signal-strong uppercase">
            <Database className="size-4" aria-hidden="true" />
            Synthetic working data
          </dt>
          <dd className="mt-2 font-display text-3xl font-extrabold text-peat">
            {item.dataset.status === "available"
              ? `${item.dataset.recordCount} records`
              : "None — by design"}
          </dd>
        </div>
      </dl>

      <div className="mt-8 border-l-8 border-synthetic bg-peat p-4 text-surface sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
        <div>
          <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.08em] text-synthetic uppercase">
            <Terminal className="size-4" aria-hidden="true" />
            Domain build partner
          </p>
          <code className="mt-2 block break-all font-mono text-sm text-surface sm:text-base">
            {item.buildPartner.invocation}
          </code>
        </div>
        <Link
          className="mt-5 inline-flex min-h-11 shrink-0 items-center gap-2 border-2 border-synthetic bg-synthetic px-4 py-2.5 text-sm font-bold text-synthetic-ink no-underline transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-surface motion-reduce:transition-none sm:mt-0"
          href={`/playbooks/${item.slug}`}
        >
          Open playbook
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}

function toId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}
