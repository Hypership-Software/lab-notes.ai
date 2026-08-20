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

// A minimal, self-contained "planned" synthetic-data fixture. It is
// deliberately not read off the live policy-evidence registry entry: that
// playbook's corpus is now available (see the policy-evidence-corpus plan),
// so its own syntheticData is no longer a "planned" example, and this
// component test should not depend on which state the real playbook happens
// to be in. The two paths below are inert display strings the component
// never reads from disk — they do not need to name real committed files.
const plannedSyntheticData = {
  status: "planned",
  label: "Synthetic working data",
  method:
    "Combine invented positions, themes, and phrasing derived only from an approved structural sample.",
  sourceCharacteristics: [
    "Only the structure, units, categories, and ranges verified in permissible official sources.",
  ],
  approximations: [
    "Frequencies and relationships would be illustrative unless supported by a cited aggregate statistic.",
  ],
  alterations: [
    "Entity identifiers, events, measurements, and text would be deliberately invented.",
  ],
  exclusions: [
    "Names, contact details, exact addresses, rare personal combinations, and source records about individuals.",
  ],
  limitations: [
    "No synthetic dataset exists at assessed maturity, and future synthetic data could not establish operational effectiveness or fairness.",
  ],
} satisfies Playbook["syntheticData"]

const availableSyntheticData = {
  ...plannedSyntheticData,
  status: "available",
  dataPath: "content/playbooks/policy-evidence/policy-evidence.data.json",
  structureNotePath:
    "content/playbooks/policy-evidence/consultation-analysis-structure.md",
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
      availability: "baseline-only",
      route: demoRoute,
      label: "Baseline demonstration",
      method:
        "Group the synthetic responses under six themes using a reviewed word list.",
      vocabularyVersion: "1.0.0",
      limitations: [
        "No model has been run, so this cannot show what an analysis would add.",
      ],
    },
    heading: "Baseline demonstration",
    detail: /no model is involved/i,
    action: "Open the baseline demonstration",
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

    // Scoped past the RiskBadge's own screen-reader-only description (which
    // legitimately contains every reason, joined, for assistive technology)
    // so this asserts the real invariant — no *visible* duplicate — rather
    // than an accident of this fixture happening to have two reasons.
    expect(
      screen.queryByText(playbook.risk.reasons[0], {
        ignore: "script, style, .sr-only",
      }),
    ).not.toBeInTheDocument()
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

  it("marks a recorded demonstration as AI-assisted and states its model version", () => {
    const recordedDemo = {
      availability: "recorded",
      route: demoRoute,
      recordedOutputId: "recorded-output",
      label: "Recorded demonstration",
      recordedAt: "2026-08-18",
      modelLabel: "Documented model",
      modelVersion: "7",
      promptSha256: hash,
      inputSha256: hash,
      limitations: [
        "The recorded fixture cannot establish operational performance.",
      ],
    } satisfies Playbook["demo"]

    render(
      <DemoReadiness
        demo={recordedDemo}
        nextValidationSteps={playbook.nextValidationSteps}
      />,
    )

    expect(screen.getByText("Recorded AI-assisted output")).toBeVisible()
    expect(screen.getByText(/version 7/)).toBeVisible()
    expect(
      screen.getByText("Known limitations of this recording:"),
    ).toBeVisible()
  })

  it("shows the local setup guidance path for a live-local demonstration", () => {
    const liveLocalDemo = {
      availability: "live-local",
      route: demoRoute,
      setupPath: "docs/local-demo.md",
      warning:
        "Local output is unverified and must not inform a public-service decision.",
    } satisfies Playbook["demo"]

    render(
      <DemoReadiness
        demo={liveLocalDemo}
        nextValidationSteps={playbook.nextValidationSteps}
      />,
    )

    expect(screen.getByText("docs/local-demo.md")).toBeVisible()
  })

  it("gives the none-availability next steps their own wording, distinct from the maturity ladder's", () => {
    const noneDemo = {
      availability: "none",
      reason:
        "Evidence and data gates are not complete enough for a demonstration.",
    } satisfies Playbook["demo"]

    render(
      <DemoReadiness
        demo={noneDemo}
        nextValidationSteps={playbook.nextValidationSteps}
      />,
    )

    expect(screen.getByText(playbook.nextValidationSteps[0])).toBeVisible()
    expect(
      screen.queryByText(
        "Work still required to reach a more credible maturity state:",
      ),
    ).not.toBeInTheDocument()
  })

  it("states that a planned synthetic method has produced no dataset", () => {
    render(<SyntheticDataMethod syntheticData={plannedSyntheticData} />)

    expect(screen.getByText(plannedSyntheticData.method)).toBeVisible()
    expect(
      screen.getByText("No synthetic dataset has been written yet"),
    ).toBeVisible()
    expect(
      screen.getByText(plannedSyntheticData.limitations[0]),
    ).toBeVisible()
    expect(screen.queryByText("Data file")).not.toBeInTheDocument()
    expect(screen.queryByText("Structure note")).not.toBeInTheDocument()
  })

  it("shows the data file and structure note once a dataset exists", () => {
    const { container } = render(
      <SyntheticDataMethod syntheticData={availableSyntheticData} />,
    )

    expect(definitionValue(container, "Data file")).toHaveTextContent(
      availableSyntheticData.dataPath,
    )
    expect(definitionValue(container, "Structure note")).toHaveTextContent(
      availableSyntheticData.structureNotePath,
    )
  })

  it("labels a not-run evaluation without inventing a score", () => {
    render(<EvaluationEvidence evaluation={notRunEvaluation} />)

    expect(screen.getByText("Evaluation not available")).toBeVisible()
    expect(screen.getByText(notRunEvaluation.reason)).toBeVisible()
    expect(screen.getByText(notRunEvaluation.questions[0])).toBeVisible()
    expect(screen.getByText(notRunEvaluation.limitations[0])).toBeVisible()
    // Discriminates against the evaluated variants (queryByText("Metrics")
    // would pass vacuously, since no state ever renders that literal word):
    // a not-run evaluation must not leak a metric name that belongs to a
    // fixture- or partner-evaluated render.
    expect(screen.queryByText(metric.name)).not.toBeInTheDocument()
  })

  it("labels the evaluation questions and limitations lists", () => {
    render(<EvaluationEvidence evaluation={notRunEvaluation} />)

    expect(screen.getByText("Evaluation questions")).toBeVisible()
    expect(screen.getByText("Limitations")).toBeVisible()
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
    render(<ImplementationIndex implementation={playbook.implementation} />)

    expect(screen.getByText(playbook.implementation.summary)).toBeVisible()
    expect(screen.getByText(playbook.implementation.architecture)).toBeVisible()
    expect(
      screen.getByText(playbook.implementation.reusableParts[0]),
    ).toBeVisible()
  })

  it("omits an empty partner-requirement block", () => {
    render(
      <ImplementationIndex
        implementation={{ ...playbook.implementation, partnerRequirements: [] }}
      />,
    )

    expect(screen.queryByText("Partner requirements")).not.toBeInTheDocument()
  })
})
