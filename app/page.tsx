import { ArrowRight, FileSearch, Scale } from "lucide-react"
import Link from "next/link"

import { AvailabilityBadge } from "@/components/site/availability-badge"
import { EvidenceChain } from "@/components/site/evidence-chain"
import { filterPlaybooks } from "@/features/playbooks/catalogue/filter-playbooks"
import { PlaybookDossierRow } from "@/features/playbooks/catalogue/playbook-dossier-row"
import { getPlaybook, getPlaybookSummaries } from "@/lib/playbooks/registry"

const previewCount = 4

export default function HomePage() {
  const exemplar = getPlaybook("policy-evidence")
  if (!exemplar) throw new Error("Policy Evidence playbook is not registered")
  if (exemplar.demo.status !== "available") {
    throw new Error("Policy Evidence must keep the one available demo")
  }

  const summaries = getPlaybookSummaries()
  // Every count on this page is derived from the registry, so the page cannot
  // claim more coverage than the content actually has.
  const withDataset = summaries.filter(
    (playbook) => playbook.syntheticData.status === "available",
  ).length
  const withDemo = summaries.filter(
    (playbook) => playbook.demo.status === "available",
  ).length

  // The catalogue's own default order, minus the playbook featured above it,
  // so the preview is a genuine window onto the catalogue rather than a
  // hand-picked shortlist.
  const preview = filterPlaybooks(summaries, { query: "", sectors: [] })
    .filter((playbook) => playbook.slug !== exemplar.slug)
    .slice(0, previewCount)

  return (
    <div className="page-shell home-page">
      <section className="home-intro" aria-labelledby="home-title">
        <div className="home-intro__copy">
          <h1 id="home-title">
            Northern Ireland&rsquo;s draft AI strategy, made explorable.
          </h1>
          <p className="home-intro__lede">
            The draft strategy calls out example projects for public services.
            This site turns them into playbooks you can explore, validate, and
            contribute to. It is an independent open-source project, not a
            government service.
          </p>
          <div className="action-row">
            <Link className="primary-action" href="/playbooks">
              Explore the playbooks
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="secondary-action" href="/method">
              How this works
            </Link>
          </div>
        </div>
        <aside className="inventory-note" aria-label="What is in the catalogue">
          <p className="inventory-note__title">What is here today</p>
          <dl>
            <div>
              <dt>Playbooks</dt>
              <dd>{summaries.length}</dd>
            </div>
            <div>
              <dt>With a synthetic dataset</dt>
              <dd>{withDataset}</dd>
            </div>
            <div>
              <dt>With a working demo</dt>
              <dd>{withDemo}</dd>
            </div>
          </dl>
          <p>
            Nothing here is a deployed service. Where a playbook has no dataset
            or no demo, it says so on its own page.
          </p>
        </aside>
      </section>

      <EvidenceChain />

      <section className="exemplar-section" aria-labelledby="exemplar-title">
        <div className="section-heading">
          <div>
            <h2 id="exemplar-title">One of them runs</h2>
            <p>
              Policy Evidence Workbench answers all four questions end to end,
              with no live model, no private data, and no API key.
            </p>
          </div>
          <AvailabilityBadge kind="demo" available />
        </div>

        <div className="exemplar-dossier">
          <div className="exemplar-dossier__main">
            <FileSearch aria-hidden="true" />
            <h3>{exemplar.title}</h3>
            <p>{exemplar.summary}</p>
          </div>
          <div className="exemplar-dossier__evidence">
            <p>{exemplar.demo.howItWorks}</p>
            <Link href={exemplar.demo.route}>
              Try the demo
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href={`/playbooks/${exemplar.slug}`}>
              Read the playbook behind it
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="exemplar-section" aria-labelledby="preview-title">
        <div className="section-heading section-heading--compact">
          <div>
            <h2 id="preview-title">The rest of the catalogue</h2>
            <p>
              {summaries.length} playbooks in all, from the ones with a dataset
              you can download to the ones that explain why inventing data would
              not be responsible.
            </p>
          </div>
          <Link href="/playbooks">
            See all {summaries.length}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="dossier-list">
          {preview.map((playbook) => (
            <PlaybookDossierRow
              key={playbook.slug}
              playbook={playbook}
              headingLevel={3}
            />
          ))}
        </div>
      </section>

      <section className="home-close" aria-labelledby="home-close-title">
        <Scale aria-hidden="true" />
        <div>
          <h2 id="home-close-title">A playbook is useful before it has a demo.</h2>
          <p>
            Improving the plain English, verifying a source, or contributing a
            dataset all move a playbook forward. So does concluding that better
            data or service design should come before any AI at all.
          </p>
        </div>
        <div className="home-close__actions">
          <Link href="/method">How this works</Link>
          <Link href="/contribute">How to contribute</Link>
        </div>
      </section>
    </div>
  )
}
