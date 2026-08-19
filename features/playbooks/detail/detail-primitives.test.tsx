import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { getPlaybook } from "@/lib/playbooks/registry"
import type { Playbook } from "@/lib/playbooks/schema"

import { DemoReadiness } from "./demo-readiness"
import { EvaluationEvidence } from "./evaluation-evidence"
import { ImplementationIndex } from "./implementation-index"
import { MaturityLadder } from "./maturity-ladder"
import { MetadataRail } from "./metadata-rail"
import { SourceRegister } from "./source-register"
import { SyntheticDataMethod } from "./synthetic-data-method"

const playbook = getPlaybook("policy-evidence")
if (!playbook) {
  throw new Error("The policy-evidence playbook must stay registered")
}
const hash = "0".repeat(64)
const demoRoute = "/playbooks/policy-evidence/demo"

// The narrowed assertions below depend on this fixture staying a not-run evaluation.
const notRunEvaluation = playbook.evaluation
if (notRunEvaluation.status !== "not-run") {
  throw new Error("policy-evidence must remain a not-run evaluation fixture")
}

const reviewStatus = {
  status: "review-needed",
  reviewedAt: playbook.lastReviewed,
  reviewDueAt: "2027-08-18",
} as const

// Reads the value rendered beside a definition-list term.
function definitionValue(container: HTMLElement, term: string) {
  const value = within(container).getByText(term).nextElementSibling
  if (!(value instanceof HTMLElement)) {
    throw new Error(`No value rendered for "${term}"`)
  }
  return value
}

const sourceWithSample = {
  ...playbook.officialSources[0],
  id: "sampled-source",
  localSamplePath:
    "content/playbooks/policy-evidence/fixtures/source/sample.txt",
  sha256: hash,
} satisfies Playbook["officialSources"][number]

const minimalSource = {
  ...playbook.officialSources[0],
  id: "minimal-source",
  transformations: [],
  caveats: [],
  localSamplePath: undefined,
  sha256: undefined,
} satisfies Playbook["officialSources"][number]

const availableSyntheticData = {
  ...playbook.syntheticData,
  status: "available",
  seed: 42,
  generatorVersion: "1",
  fixturePath:
    "content/playbooks/policy-evidence/fixtures/synthetic/corpus.json",
} satisfies Playbook["syntheticData"]

const metric = {
  id: "citation-coverage",
  name: "Citation coverage",
  definition: "The proportion of findings linked to a checked fixture excerpt.",
}

const demoCases = [
  {
    demo: {
      availability: "none",
      reason:
        "Evidence and data gates are not complete enough for a demonstration.",
    },
    heading: "No demonstration yet",
    detail: /evidence and data gates/i,
    action: null,
  },
  {
    demo: {
      availability: "recorded",
      route: demoRoute,
      recordedOutputId: "recorded-output",
      label: "Recorded demonstration",
      recordedAt: "2026-08-18",
      modelLabel: "Documented model",
      modelVersion: "1",
      promptSha256: hash,
      inputSha256: hash,
      limitations: [
        "The recorded fixture cannot establish operational performance.",
      ],
    },
    heading: "Recorded demonstration",
    detail: /documented model/i,
    action: "Try the recorded demonstration",
  },
  {
    demo: {
      availability: "live-local",
      route: demoRoute,
      setupPath: "docs/local-demo.md",
      warning:
        "Local output is unverified and must not inform a public-service decision.",
    },
    heading: "Local demonstration only",
    detail: /local output is unverified/i,
    action: "Open the local demonstration",
  },
  {
    demo: {
      availability: "partner",
      reason:
        "A controlled partner environment is required for this sensitive pattern.",
    },
    heading: "Controlled partner environment required",
    // Narrowed from /controlled partner environment/i: that phrase also
    // appears in the heading text above, so the broader pattern matches two
    // elements (heading and reason) and getByText throws. This still asserts
    // the reason sentence renders, just via a substring unique to it.
    detail: /required for this sensitive pattern/i,
    action: null,
  },
] satisfies {
  demo: Playbook["demo"]
  heading: string
  detail: RegExp
  action: string | null
}[]

describe("playbook detail primitives", () => {
  it("exposes comparable metadata and both review dates", () => {
    render(<MetadataRail playbook={playbook} reviewStatus={reviewStatus} />)

    expect(screen.getByText("Assessed concept")).toBeVisible()
    expect(screen.getByText("Public, reuse to confirm")).toBeVisible()
    expect(screen.getByText("Moderate risk")).toBeVisible()
    expect(screen.getByText("Review needed")).toBeVisible()
    expect(screen.getByText("18 August 2026")).toHaveAttribute(
      "datetime",
      "2026-08-18",
    )
    expect(screen.getByText("18 August 2027")).toHaveAttribute(
      "datetime",
      "2027-08-18",
    )
  })

  it("leaves risk reasons to the risks section", () => {
    render(<MetadataRail playbook={playbook} reviewStatus={reviewStatus} />)

    expect(screen.queryByText(playbook.risk.reasons[0])).not.toBeInTheDocument()
  })

  it("renders every source field in one semantic dossier", () => {
    render(<SourceRegister sources={[sourceWithSample]} />)

    const source = screen.getByRole("article")
    expect(
      within(source).getByRole("link", { name: /Northern Ireland/ }),
    ).toHaveAttribute("href", sourceWithSample.canonicalUrl)
    expect(definitionValue(source, "Publisher")).toHaveTextContent(
      sourceWithSample.publisher,
    )
    expect(definitionValue(source, "Jurisdiction")).toHaveTextContent(
      sourceWithSample.jurisdiction,
    )
    expect(definitionValue(source, "Source type")).toHaveTextContent("Strategy")
    expect(definitionValue(source, "Covered period")).toHaveTextContent(
      sourceWithSample.coveredPeriod,
    )
    expect(definitionValue(source, "Accessed")).toHaveTextContent(
      "18 August 2026",
    )
    expect(definitionValue(source, "Reuse status")).toHaveTextContent(
      sourceWithSample.reuseStatus,
    )
    expect(definitionValue(source, "Local sample")).toHaveTextContent(
      sourceWithSample.localSamplePath,
    )
    expect(definitionValue(source, "SHA-256")).toHaveTextContent(hash)
    expect(definitionValue(source, "Purpose")).toHaveTextContent(
      sourceWithSample.purpose,
    )
    expect(source).toHaveTextContent(sourceWithSample.transformations[0])
    expect(source).toHaveTextContent(sourceWithSample.caveats[0])
  })

  it("omits absent optional source fields instead of showing placeholders", () => {
    render(<SourceRegister sources={[minimalSource]} />)

    const source = screen.getByRole("article")
    for (const term of ["Local sample", "SHA-256", "Transformations", "Caveats"]) {
      expect(within(source).queryByText(term)).not.toBeInTheDocument()
    }
    expect(within(source).queryAllByRole("listitem")).toHaveLength(0)
  })

  it("marks one maturity rung and names the work still required", () => {
    render(
      <MaturityLadder
        maturity={playbook.maturity}
        nextValidationSteps={playbook.nextValidationSteps}
      />,
    )

    const ladder = screen.getByRole("list", { name: "Evidence maturity" })
    const rungs = within(ladder).getAllByRole("listitem")
    expect(rungs).toHaveLength(5)
    expect(rungs[0]).toHaveAttribute("aria-current", "step")
    expect(within(ladder).getAllByText("Current maturity")).toHaveLength(1)
    expect(screen.getByText(playbook.nextValidationSteps[0])).toBeVisible()
  })

  it.each(demoCases)(
    "renders the $demo.availability demonstration state",
    ({ demo, heading, detail, action }) => {
      render(
        <DemoReadiness
          demo={demo}
          nextValidationSteps={playbook.nextValidationSteps}
        />,
      )

      expect(screen.getByRole("heading", { name: heading })).toBeVisible()
      expect(screen.getByText(detail)).toBeVisible()

      if (action) {
        expect(screen.getByRole("link", { name: action })).toHaveAttribute(
          "href",
          demoRoute,
        )
      } else {
        expect(screen.queryByRole("link")).not.toBeInTheDocument()
        expect(screen.queryByRole("button")).not.toBeInTheDocument()
      }
    },
  )

  it("states that a planned synthetic method has produced no fixture", () => {
    render(<SyntheticDataMethod syntheticData={playbook.syntheticData} />)

    expect(screen.getByText(playbook.syntheticData.method)).toBeVisible()
    expect(
      screen.getByText("No synthetic fixture has been generated yet"),
    ).toBeVisible()
    expect(screen.getByText(playbook.syntheticData.limitations[0])).toBeVisible()
    expect(screen.queryByText("Seed")).not.toBeInTheDocument()
    expect(screen.queryByText("Fixture")).not.toBeInTheDocument()
  })

  it("shows the seed, generator, and fixture path once a fixture exists", () => {
    const { container } = render(
      <SyntheticDataMethod syntheticData={availableSyntheticData} />,
    )

    expect(definitionValue(container, "Seed")).toHaveTextContent("42")
    expect(definitionValue(container, "Generator version")).toHaveTextContent("1")
    expect(definitionValue(container, "Fixture")).toHaveTextContent(
      availableSyntheticData.fixturePath,
    )
  })

  it("labels a not-run evaluation without inventing a score", () => {
    render(<EvaluationEvidence evaluation={notRunEvaluation} />)

    expect(screen.getByText("Evaluation not available")).toBeVisible()
    expect(screen.getByText(notRunEvaluation.reason)).toBeVisible()
    expect(screen.getByText(notRunEvaluation.questions[0])).toBeVisible()
    expect(screen.getByText(notRunEvaluation.limitations[0])).toBeVisible()
    expect(screen.queryByText("Metrics")).not.toBeInTheDocument()
  })

  it("shows fixture-evaluated metrics and the labelled fixture", () => {
    render(
      <EvaluationEvidence
        evaluation={{
          status: "fixture-evaluated",
          questions: notRunEvaluation.questions,
          metrics: [metric],
          limitations: notRunEvaluation.limitations,
          labelledFixtureId: "labelled-corpus",
        }}
      />,
    )

    expect(screen.getByText(metric.name)).toBeVisible()
    expect(screen.getByText(metric.definition)).toBeVisible()
    expect(screen.getByText("labelled-corpus")).toBeVisible()
  })

  it("links partner-evaluated evidence without claiming a local result", () => {
    render(
      <EvaluationEvidence
        evaluation={{
          status: "partner-evaluated",
          questions: notRunEvaluation.questions,
          metrics: [metric],
          limitations: notRunEvaluation.limitations,
          evidenceUrl: "https://example.gov/evaluation",
        }}
      />,
    )

    expect(
      screen.getByRole("link", { name: /Published evaluation evidence/ }),
    ).toHaveAttribute("href", "https://example.gov/evaluation")
  })

  it("leads the implementation section with its plain-English summary", () => {
    render(
      <ImplementationIndex
        implementation={playbook.implementation}
        references={playbook.references}
      />,
    )

    expect(screen.getByText(playbook.implementation.summary)).toBeVisible()
    expect(screen.getByText(playbook.implementation.architecture)).toBeVisible()
    expect(
      screen.getByText(playbook.implementation.reusableParts[0]),
    ).toBeVisible()
    expect(screen.getByRole("link", { name: /contribute/i })).toHaveAttribute(
      "href",
      "/contribute",
    )
  })

  it("omits empty reference and partner-requirement blocks", () => {
    render(
      <ImplementationIndex
        implementation={{ ...playbook.implementation, partnerRequirements: [] }}
        references={[]}
      />,
    )

    expect(screen.queryByText("References")).not.toBeInTheDocument()
    expect(screen.queryByText("Partner requirements")).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contribute/i })).toBeVisible()
  })
})
