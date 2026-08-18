import { ArrowRight, FileSearch, Scale } from "lucide-react"
import Link from "next/link"

import { EvidenceChain } from "@/components/site/evidence-chain"
import { RiskBadge } from "@/components/site/risk-badge"
import { StatusBadge } from "@/components/site/status-badge"
import { getPlaybook } from "@/lib/playbooks/registry"

export default function HomePage() {
  const exemplar = getPlaybook("policy-evidence")

  if (!exemplar) throw new Error("Policy Evidence playbook is not registered")

  return (
    <div className="page-shell home-page">
      <section className="home-intro" aria-labelledby="home-title">
        <div className="home-intro__copy">
          <h1 id="home-title">Public-service AI ideas, made inspectable.</h1>
          <p className="home-intro__lede">
            Seventeen proposals from Northern Ireland&apos;s draft AI strategy,
            translated into plain-English playbooks with sources, data reality,
            safer baselines, risks, and a practical route to validation.
          </p>
          <div className="action-row">
            <Link className="primary-action" href="/playbooks">
              Explore the playbooks
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="secondary-action" href="/method">
              Read the method
            </Link>
          </div>
        </div>
        <aside className="inventory-note" aria-label="Current catalogue state">
          <p className="inventory-note__title">Current evidence state</p>
          <dl>
            <div>
              <dt>Strategy proposals</dt>
              <dd>17</dd>
            </div>
            <div>
              <dt>Assessed concepts</dt>
              <dd>17</dd>
            </div>
            <div>
              <dt>Recorded demonstrations</dt>
              <dd>0</dd>
            </div>
          </dl>
          <p>
            Nothing here is presented as a deployed service. Maturity changes only
            when the supporting artefacts exist.
          </p>
        </aside>
      </section>

      <EvidenceChain />

      <section className="exemplar-section" aria-labelledby="exemplar-title">
        <div className="section-heading">
          <div>
            <h2 id="exemplar-title">The first full exemplar</h2>
            <p>
              Policy Evidence Workbench will prove the complete pattern without a
              live model, private data, or required API key.
            </p>
          </div>
          <StatusBadge maturity={exemplar.maturity} />
        </div>

        <div className="exemplar-dossier">
          <div className="exemplar-dossier__main">
            <FileSearch aria-hidden="true" />
            <h3>{exemplar.title}</h3>
            <p>{exemplar.summary}</p>
            <p className="decision-statement">
              <strong>Supports review:</strong> {exemplar.supportedDecision}
            </p>
          </div>
          <div className="exemplar-dossier__evidence">
            <RiskBadge
              level={exemplar.risk.level}
              reasons={exemplar.risk.reasons}
              descriptionId="home-exemplar-risk-reasons"
            />
            <p>{exemplar.demo.availability === "none" && exemplar.demo.reason}</p>
            <Link href={`/playbooks/${exemplar.slug}`}>
              Inspect the assessed playbook
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-close" aria-labelledby="home-close-title">
        <Scale aria-hidden="true" />
        <div>
          <h2 id="home-close-title">AI is optional. Evidence is not.</h2>
          <p>
            Every future example must retain a deterministic non-AI baseline and
            may conclude that data, service design, or human coordination should
            come first.
          </p>
        </div>
        <Link href="/contribute">See how to contribute</Link>
      </section>
    </div>
  )
}
