import Link from "next/link"
import type { ReactNode } from "react"

import { SourceRegister } from "@/features/playbooks/detail/source-register"
import { SyntheticDataMethod } from "@/features/playbooks/detail/synthetic-data-method"
import type { Playbook } from "@/lib/playbooks/schema"

import { buildEvidenceThreads } from "../domain/build-evidence-threads"
import { evaluateAnalysis } from "../domain/evaluate-analysis"
import { runBaseline } from "../domain/run-baseline"
import { policyEvidenceCorpus, policyEvidenceGold } from "../fixtures"

import { BaselineDemoBanner } from "./baseline-demo-banner"
import { EvaluationSummary } from "./evaluation-summary"
import { SyntheticCorpusInspector } from "./synthetic-corpus-inspector"
import { documentElementId } from "./element-ids"
import { WorkbenchClient } from "./workbench-client"

/**
 * The workbench, assembled on the server.
 *
 * Everything expensive or trust-bearing happens here: both fixtures are parsed
 * through their schemas at module load, the baseline runs, the evaluation
 * scores it, and the evidence threads are joined. The browser receives the
 * finished threads and nothing that produced them.
 *
 * The page is ordered as the design's hosted flow: orient, read the source,
 * read the synthetic data, see the method, follow the findings, then see the
 * evaluation and how to reuse it.
 */
export function PolicyEvidenceWorkbench({
  playbook,
}: {
  playbook: Playbook
}): ReactNode {
  const analysis = runBaseline(policyEvidenceCorpus)
  const evaluation = evaluateAnalysis(analysis, policyEvidenceGold, policyEvidenceCorpus)
  const threads = buildEvidenceThreads(
    analysis,
    policyEvidenceGold,
    evaluation,
    policyEvidenceCorpus,
  )

  return (
    <div className="page-shell workbench-page">
      <header className="page-intro reading-width">
        <p className="workbench-page__breadcrumb">
          <Link href={`/playbooks/${playbook.slug}`}>
            Back to the {playbook.title} playbook
          </Link>
        </p>
        <h1>{playbook.title}</h1>
        <p className="home-intro__lede">{playbook.problem}</p>
      </header>

      <BaselineDemoBanner />

      <section className="workbench-section" aria-labelledby="workbench-task-title">
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-task-title">The task</h2>
          <p>What a policy team would be trying to do, and what it must not do.</p>
        </div>
        <div className="reading-width">
          <p>
            <strong>Supports the decision:</strong> {playbook.supportedDecision}
          </p>
          <p>This example does not decide policy, measure public support, or treat how often a theme appears as a measure of how much it matters.</p>
          <ul>
            {playbook.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="workbench-section" aria-labelledby="workbench-source-title">
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-source-title">Where the shape came from</h2>
          <p>
            The real, public sources this example was modelled on. No text from
            any of them is reproduced here.
          </p>
        </div>
        <SourceRegister sources={playbook.officialSources} />
      </section>

      <section className="workbench-section" aria-labelledby="workbench-method-title">
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-method-title">How the data was made</h2>
          <p>What was borrowed from those sources, what was invented, and what was left out.</p>
        </div>
        <SyntheticDataMethod syntheticData={playbook.syntheticData} />
      </section>

      <section className="workbench-section" aria-labelledby="workbench-corpus-title">
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-corpus-title">The responses being analysed</h2>
          <p>Read the whole input before judging any finding over it.</p>
        </div>
        <SyntheticCorpusInspector
          corpus={policyEvidenceCorpus}
          documentElementId={documentElementId}
        />
      </section>

      <section className="workbench-section" aria-labelledby="workbench-baseline-title">
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-baseline-title">What the baseline found</h2>
          <p>
            {playbook.nonAiBaseline.method} Controlled vocabulary{" "}
            <span data-technical>{analysis.vocabularyVersion}</span>.
          </p>
        </div>
        <WorkbenchClient
          threads={threads}
          syntheticMethod={playbook.syntheticData.method}
        />
      </section>

      <section className="workbench-section" aria-labelledby="workbench-evaluation-title">
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-evaluation-title">How well it did</h2>
          <p>
            Measured against a hand-labelled expectation set covering every
            response in the dataset.
          </p>
        </div>
        <EvaluationSummary evaluation={evaluation} />
      </section>

      <section className="workbench-section" aria-labelledby="workbench-reuse-title">
        <div className="section-heading section-heading--compact">
          <h2 id="workbench-reuse-title">Taking this further</h2>
          <p>What exists in the repository, and what a real deployment would still need.</p>
        </div>
        <div className="reading-width">
          <p>{playbook.implementation.summary}</p>
          <p>Reusable parts:</p>
          <ul>
            {playbook.implementation.reusableParts.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </ul>
          <p>Before this pattern could be used with real responses:</p>
          <ul>
            {playbook.nextValidationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p>
            <Link href={`/playbooks/${playbook.slug}`}>
              Read the full assessed playbook, including risk and oversight
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
