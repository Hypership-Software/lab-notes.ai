import Link from "next/link"
import type { ReactNode } from "react"

import { ExternalLink } from "@/components/site/external-link"
import { ProvenanceLabel } from "@/components/site/provenance-label"
import type { Playbook } from "@/lib/playbooks/schema"

import { DemoReadiness } from "./demo-readiness"
import { EvaluationEvidence } from "./evaluation-evidence"
import { ImplementationIndex } from "./implementation-index"
import { MaturityLadder } from "./maturity-ladder"
import { MetadataRail } from "./metadata-rail"
import type { ReviewStatus } from "./review-status"
import { SourceRegister } from "./source-register"
import { SyntheticDataMethod } from "./synthetic-data-method"

// Placement lanes for the desktop 12-column grid: a 3-column metadata rail
// (`rail`), a 6-column narrative lane for plain-English sections
// (`narrative`), and the dense, evidence-heavy sections (`evidence`) span
// both the narrative and evidence bands — 9 columns — so hashes, source
// paths, and definition lists never sit alone in a 3-column-wide lane.
// CSS Grid places each section by an explicit column range (no `order`), so
// document order stays the single source of reading order at every
// breakpoint; only the visual column assignment differs.
type SectionPlacement = "rail" | "narrative" | "evidence"

type Section = {
  id: string
  heading: string
  placement: SectionPlacement
  content: ReactNode
}

export function PlaybookDetail({
  playbook,
  reviewStatus,
}: {
  playbook: Playbook
  reviewStatus: ReviewStatus
}): ReactNode {
  // Defined once, as data, so the contents list below and the section
  // bodies render from the same eleven entries and cannot drift apart.
  const sections: Section[] = [
    {
      id: "at-a-glance",
      heading: "At a glance",
      placement: "rail",
      content: <MetadataRail playbook={playbook} reviewStatus={reviewStatus} />,
    },
    {
      id: "public-service-problem",
      heading: "The public-service problem",
      placement: "narrative",
      content: <p className="reading-width">{playbook.problem}</p>,
    },
    {
      id: "users-and-decision",
      heading: "Intended user and supported decision",
      placement: "narrative",
      content: (
        <>
          <p>Who this is intended for:</p>
          <ul>
            {playbook.intendedUsers.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
          <p>Who may be affected:</p>
          <ul>
            {playbook.affectedGroups.map((group) => (
              <li key={group}>{group}</li>
            ))}
          </ul>
          <h3>Supported decision</h3>
          <p className="reading-width">{playbook.supportedDecision}</p>
          <h3>Public benefit</h3>
          <p className="reading-width">{playbook.publicBenefit}</p>
        </>
      ),
    },
    {
      id: "demonstration-readiness",
      heading: "Demonstration or demonstration-readiness assessment",
      placement: "narrative",
      content: (
        <DemoReadiness
          demo={playbook.demo}
          nextValidationSteps={playbook.nextValidationSteps}
        />
      ),
    },
    {
      id: "official-sources",
      heading: "Official sources",
      placement: "evidence",
      content: (
        <>
          <ProvenanceLabel kind="source" />
          <SourceRegister sources={playbook.officialSources} />
        </>
      ),
    },
    {
      id: "synthetic-data-method",
      heading: "Source sample and synthetic-data method",
      placement: "evidence",
      content: <SyntheticDataMethod syntheticData={playbook.syntheticData} />,
    },
    {
      id: "non-ai-baseline",
      heading: "Non-AI baseline",
      placement: "narrative",
      content: (
        <>
          <ProvenanceLabel kind="baseline" />
          <h3>{playbook.nonAiBaseline.name}</h3>
          <p className="reading-width">{playbook.nonAiBaseline.description}</p>
          <p className="reading-width">{playbook.nonAiBaseline.method}</p>
          <p>Known limitations of this baseline:</p>
          <ul>
            {playbook.nonAiBaseline.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "evaluation-and-maturity",
      heading: "Evaluation and evidence maturity",
      placement: "evidence",
      content: (
        <>
          <EvaluationEvidence evaluation={playbook.evaluation} />
          <MaturityLadder
            maturity={playbook.maturity}
            nextValidationSteps={playbook.nextValidationSteps}
          />
        </>
      ),
    },
    {
      id: "risks-and-oversight",
      heading: "Risks, human oversight, contestability, and redress",
      placement: "narrative",
      content: (
        <>
          <p>Reasons for this risk rating:</p>
          <ul>
            {playbook.risk.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          <p>Mitigations:</p>
          <ul>
            {playbook.risk.mitigations.map((mitigation) => (
              <li key={mitigation}>{mitigation}</li>
            ))}
          </ul>
          <p>Known limitations:</p>
          <ul>
            {playbook.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
          <p>Failure modes:</p>
          <ul>
            {playbook.failureModes.map((failureMode) => (
              <li key={failureMode}>{failureMode}</li>
            ))}
          </ul>
          <ProvenanceLabel kind="review" />
          <h3>Human oversight</h3>
          <dl className="human-oversight">
            <div>
              <dt>Responsible role</dt>
              <dd>{playbook.humanOversight.responsibleRole}</dd>
            </div>
            <div>
              <dt>Review point</dt>
              <dd>{playbook.humanOversight.reviewPoint}</dd>
            </div>
            <div>
              <dt>Escalation</dt>
              <dd>{playbook.humanOversight.escalation}</dd>
            </div>
            <div>
              <dt>Redress</dt>
              <dd>{playbook.humanOversight.redress}</dd>
            </div>
          </dl>
        </>
      ),
    },
    {
      id: "technical-implementation",
      heading: "Technical implementation",
      placement: "evidence",
      content: <ImplementationIndex implementation={playbook.implementation} />,
    },
    {
      id: "references-and-contribution",
      heading: "References and contribution path",
      placement: "narrative",
      content: (
        <>
          {playbook.references.length > 0 ? (
            <ul>
              {playbook.references.map((reference) => (
                <li key={reference.url}>
                  <ExternalLink href={reference.url}>
                    {reference.title}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          ) : null}
          <p>
            <Link href="/contribute">
              Contribute an improvement to this playbook
            </Link>
          </p>
        </>
      ),
    },
  ]

  return (
    <article className="playbook-detail">
      <header className="page-intro playbook-detail__header">
        <p className="playbook-detail__sector">{playbook.sector}</p>
        <h1>{playbook.title}</h1>
        <p className="playbook-detail__summary">{playbook.summary}</p>
      </header>

      <nav className="playbook-detail__toc" aria-labelledby="playbook-sections">
        <p id="playbook-sections">On this page</p>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.heading}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="playbook-detail__grid">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`playbook-detail__section playbook-detail__section--${section.placement}`}
            aria-labelledby={`${section.id}-heading`}
          >
            <h2 id={`${section.id}-heading`}>{section.heading}</h2>
            {section.content}
          </section>
        ))}
      </div>
    </article>
  )
}
