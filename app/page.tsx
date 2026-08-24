import { ArrowRight, Scale } from "lucide-react"
import Link from "next/link"

import { filterPlaybooks } from "@/features/playbooks/catalogue/filter-playbooks"
import { PlaybookDossierRow } from "@/features/playbooks/catalogue/playbook-dossier-row"
import { getPlaybookSummaries } from "@/lib/playbooks/registry"

const previewCount = 4

export default function HomePage() {
  const summaries = getPlaybookSummaries()
  // Every count on this page is derived from the registry, so the page cannot
  // claim more coverage than the content actually has.
  const withDataset = summaries.filter(
    (playbook) => playbook.syntheticData.status === "available",
  ).length
  const preview = filterPlaybooks(summaries, { query: "", sectors: [] }).slice(
    0,
    previewCount,
  )

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
          </dl>
          <p>
            Nothing here is a deployed service. Where a responsible starter
            dataset is not available, the playbook says why.
          </p>
        </aside>
      </section>

      <section className="exemplar-section" aria-labelledby="preview-title">
        <div className="section-heading section-heading--compact">
          <div>
            <h2 id="preview-title">Explore the catalogue</h2>
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
          <h2 id="home-close-title">Explore or improve the research</h2>
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
