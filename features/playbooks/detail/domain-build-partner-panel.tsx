"use client"

import { Check, Copy, GitFork } from "lucide-react"
import { useState } from "react"

import { ExternalLink } from "@/components/site/external-link"
import { Button } from "@/components/ui/button"
import type { BuildPartnerDescriptor } from "@/lib/playbooks/build-partner"
import { repositoryFileUrl, repositoryUrl } from "@/lib/repository"

type CopyState = "idle" | "copied" | "failed"

export function DomainBuildPartnerPanel({
  partner,
  starterPrompt,
  headingId = "build-partner",
}: {
  partner: BuildPartnerDescriptor
  starterPrompt: string
  headingId?: string
}) {
  const [copyState, setCopyState] = useState<CopyState>("idle")
  const cloneCommand = `git clone ${repositoryUrl}.git`

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(starterPrompt)
      setCopyState("copied")
    } catch {
      setCopyState("failed")
    }
  }

  return (
    <section
      className="scroll-mt-28 border-t-2 border-peat py-16 sm:py-20"
      aria-labelledby={headingId}
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-evidence-strong">
        Repository handoff
      </p>
      <h2
        id={headingId}
        className="mt-3 scroll-mt-28 text-4xl sm:text-5xl lg:text-6xl"
      >
        Domain build partner
      </h2>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)]">
        <div>
          <h3 className="text-2xl sm:text-3xl">
            Build with a domain-aware coding agent
          </h3>
          <p className="mt-4 max-w-3xl text-lg text-peat-muted">
            Clone the repository, then ask Codex to load the checked-in skill.
            It brings the opportunity, sources, starter data, known unknowns,
            and constraints into the conversation before anything is proposed.
          </p>

          <div className="mt-8 grid gap-px border-2 border-peat bg-peat">
            <div className="bg-peat p-4 text-paper">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/70">
                01 / Clone
              </p>
              <code className="mt-2 block overflow-x-auto whitespace-nowrap font-mono text-sm">
                {cloneCommand}
              </code>
            </div>
            <div className="bg-synthetic p-4 text-synthetic-ink">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] opacity-70">
                02 / Invoke
              </p>
              <code className="mt-2 block break-words font-mono text-lg font-bold">
                {partner.invocation}
              </code>
            </div>
          </div>

          <div className="mt-8 border-2 border-peat bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-structure px-4 py-3">
              <label
                htmlFor="build-partner-starter-prompt"
                className="font-mono text-xs uppercase tracking-[0.16em] text-peat-muted"
              >
                Starter prompt
              </label>
              <Button type="button" variant="outline" onClick={copyPrompt}>
                {copyState === "copied" ? (
                  <Check aria-hidden="true" />
                ) : (
                  <Copy aria-hidden="true" />
                )}
                Copy starter prompt
              </Button>
            </div>
            <textarea
              id="build-partner-starter-prompt"
              className="block min-h-44 w-full resize-y border-0 bg-surface p-4 font-mono text-sm leading-7 text-peat outline-none selection:bg-synthetic focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring"
              value={starterPrompt}
              rows={7}
              readOnly
              spellCheck={false}
            />
            <p
              className="min-h-8 border-t border-structure px-4 py-2 text-sm font-bold"
              aria-live="polite"
            >
              {copyState === "copied" && "Copied"}
              {copyState === "failed" &&
                "Copy failed — select the prompt instead."}
            </p>
          </div>
        </div>

        <aside className="border-l-2 border-peat pl-5">
          <GitFork className="size-8 text-evidence" aria-hidden="true" />
          <h3 className="mt-4 text-xl">Context loaded by the skill</h3>
          <ul className="mt-4 flex list-[square] flex-col gap-2 pl-5 text-peat-muted marker:text-signal">
            <li>The opportunity and its source trail</li>
            <li>The synthetic-data state and its limits</li>
            <li>Known unknowns and decision boundaries</li>
            <li>Questions to test before choosing a direction</li>
          </ul>
          <div className="mt-8 flex flex-col items-start gap-3 font-semibold text-evidence-strong">
            <ExternalLink href={repositoryFileUrl(partner.skillPath)}>
              Open SKILL.md
            </ExternalLink>
            <ExternalLink href={repositoryFileUrl(partner.briefPath)}>
              Open domain brief
            </ExternalLink>
          </div>
        </aside>
      </div>
    </section>
  )
}
