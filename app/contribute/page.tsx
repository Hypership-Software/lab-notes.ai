import type { Metadata } from "next"

import { ExternalLink } from "@/components/site/external-link"
import { repositoryFileUrl } from "@/lib/repository"

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Improve an opportunity, its published sources, synthetic data, domain brief or agent skill.",
}

const contributions = [
  {
    index: "01",
    title: "Opportunity copy",
    description:
      "Make the strategy opportunity clearer, more bounded and easier for a builder to understand. Keep product choices open and claims no stronger than the evidence.",
    path: "content/playbooks/life-event-services/playbook.ts",
    action: "Open an example playbook definition",
    command: "npm run test -- content/playbooks/content.test.ts",
  },
  {
    index: "02",
    title: "Source verification",
    description:
      "Check that a registered source still resolves, that its access label is accurate and that the stated coverage and relevance match what it publishes.",
    path: "content/playbooks/life-event-services/playbook.ts",
    action: "Inspect the registered source format",
    command: "npm run test -- content/playbooks/content.test.ts",
  },
  {
    index: "03",
    title: "Synthetic working data",
    description:
      "Improve a safe stand-in using only structures and vocabulary supported by published sources. Preserve the disclosure and state what the file cannot prove.",
    path: "content/playbooks/life-event-services/life-event-services.data.json",
    action: "Inspect an example dataset",
    command: "npm run test -- content/playbooks/content.test.ts",
  },
  {
    index: "04",
    title: "Domain brief",
    description:
      "Strengthen vocabulary, stakeholder context, source boundaries, known unknowns and the questions a builder should answer before choosing an approach.",
    path: ".agents/skills/build-life-event-services/references/domain-brief.md",
    action: "Inspect an example domain brief",
    command: "npm run validate:skills",
  },
  {
    index: "05",
    title: "Build-partner instructions",
    description:
      "Improve how the checked-in skill distinguishes fact, interpretation and synthetic data; explores unranked directions; and stops when outside authority is needed.",
    path: ".agents/skills/build-life-event-services/SKILL.md",
    action: "Inspect an example skill",
    command: "npm run validate:skills",
  },
] as const

export default function ContributePage() {
  return (
    <div className="w-full overflow-x-clip">
      <header className="border-y-2 border-peat bg-evidence text-surface">
        <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-10">
          <div className="px-4 py-12 sm:px-6 sm:py-16 lg:col-span-7 lg:px-8 lg:py-24">
            <p className="font-mono text-xs font-bold tracking-[0.16em] text-synthetic uppercase">
              Contribute / improve the starting point
            </p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,9vw,9rem)] leading-[0.84] tracking-[-0.065em] text-surface">
              Make the research pack more useful.
            </h1>
          </div>
          <aside className="border-t-2 border-surface bg-synthetic p-5 text-synthetic-ink sm:p-8 lg:col-span-3 lg:border-t-0 lg:border-l-2 lg:p-10">
            <p className="font-mono text-xs font-bold tracking-[0.14em] uppercase">
              Contribution gate
            </p>
            <p className="mt-6 text-2xl leading-snug font-semibold">
              Never commit person-level data, secrets, private endpoints or
              claims that cannot be traced to a published source.
            </p>
          </aside>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[96rem] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-8 border-b-2 border-peat pb-12 lg:grid-cols-2 lg:gap-16">
          <h2 className="max-w-4xl text-[clamp(2.75rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.055em]">
            Five useful places to contribute.
          </h2>
          <div className="self-end border-l-8 border-signal pl-5">
            <p className="text-xl leading-relaxed text-peat-muted">
              Choose the layer you can improve. The linked Life Event Services
              files are concrete examples; use the equivalent path for the
              playbook you are changing.
            </p>
            <p className="mt-5 font-mono text-sm font-bold text-evidence-strong">
              Final gate / npm run check
            </p>
          </div>
        </div>

        <ol className="list-none p-0">
          {contributions.map((item) => (
            <li
              className="grid gap-5 border-b-2 border-peat py-8 sm:grid-cols-[4rem_minmax(12rem,0.7fr)_minmax(0,1.3fr)] sm:gap-8 sm:py-10"
              key={item.index}
            >
              <span className="font-mono text-sm font-bold text-signal-strong">
                {item.index}
              </span>
              <h3 className="text-2xl sm:text-3xl">{item.title}</h3>
              <div className="min-w-0">
                <p className="max-w-3xl text-lg leading-relaxed text-peat-muted">
                  {item.description}
                </p>
                <div className="mt-6 grid gap-px border-2 border-peat bg-peat lg:grid-cols-[minmax(0,1fr)_auto]">
                  <ExternalLink
                    className="min-w-0 bg-surface px-4 py-3 [overflow-wrap:anywhere]"
                    href={repositoryFileUrl(item.path)}
                  >
                    {item.action}
                  </ExternalLink>
                  <code className="flex min-h-11 items-center bg-peat px-4 py-3 text-xs text-surface sm:text-sm">
                    {item.command}
                  </code>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-14 grid border-2 border-peat lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" aria-labelledby="privacy-title">
          <div className="bg-signal-strong p-6 text-surface sm:p-10">
            <p className="font-mono text-xs font-bold tracking-[0.14em] uppercase">
              Non-negotiable
            </p>
            <h2 className="mt-4 text-4xl text-surface sm:text-6xl" id="privacy-title">
              Privacy is a build gate.
            </h2>
          </div>
          <div className="bg-surface p-6 sm:p-10">
            <p className="text-lg leading-relaxed text-peat-muted">
              Do not commit names, contact details, identifiers, exact addresses
              or real person-level health, justice, education, housing, benefits
              or consultation records. Dataset tests walk every committed value
              against <code>lib/privacy-patterns.ts</code>.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-peat-muted">
              If a responsible stand-in cannot be made, improve the playbook’s
              refusal and state what authorised work would need instead.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
