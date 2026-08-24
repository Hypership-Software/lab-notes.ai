import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import type { Playbook } from "@/lib/playbooks/schema"

import { DataSourcesSection } from "./data-sources-section"
import { DemoSection } from "./demo-section"
import { StrategyExampleSection } from "./strategy-example-section"
import { SyntheticDataSection } from "./synthetic-data-section"

// Hand-built fixtures rather than a registered playbook: each section owns
// one slice of the contract, and the states a section must render honestly
// (`not-responsible`, `not-yet`) are the ones the worked example does not
// have. Every fixture is typed against the schema's own output type, so a
// contract change breaks these files at typecheck.

const strategyExample = {
  proposal:
    "The draft strategy names AI-assisted triage of planning applications as a potential public-service application.",
  draftReference: "Table 2 — potential public-service applications",
  url: "https://consultations.nidirect.gov.uk/teo/artificial-intelligence-public-consultation",
} satisfies Playbook["strategyExample"]

const dataSources = [
  {
    id: "planning-statistics",
    publisher: "Department for Infrastructure",
    title: "Planning statistics quarterly bulletin",
    url: "https://www.infrastructure-ni.gov.uk/planning-statistics",
    covers:
      "Quarterly counts of planning applications received and decided, by council area.",
    access: "open",
    relevance: "It shows the volumes any triage tool would have to handle.",
  },
  {
    id: "address-register",
    publisher: "Land and Property Services",
    title: "Pointer address database",
    url: "https://www.finance-ni.gov.uk/services/pointer",
    covers: "The authoritative address list for properties in Northern Ireland.",
    access: "registration-or-key",
    relevance: "Applications are matched to an address before anything else.",
  },
] satisfies Playbook["dataSources"]

const availableDataset = {
  status: "available",
  dataPath: "content/playbooks/policy-evidence/policy-evidence.data.json",
  method:
    "Twenty synthetic applications authored by AI, shaped by the categories a published statistics bulletin reports.",
  limitations: [
    "The dataset is far smaller and tidier than a real case management system.",
    "The categories are this project's own choices, verified in no official source.",
  ],
} satisfies Playbook["syntheticData"]

const withheldDataset = {
  status: "not-responsible",
  reason:
    "Any stand-in useful for this question would be person-shaped by construction, so this project does not author one.",
  whatContributorsNeed:
    "A data-sharing agreement with the holding department and an approved research protocol.",
} satisfies Playbook["syntheticData"]

const availableDemo = {
  status: "available",
  route: "/playbooks/policy-evidence/demo",
  howItWorks:
    "A transparent keyword analysis over the committed dataset — no model, no key — recomputed on every render.",
} satisfies Playbook["demo"]

const pendingDemo = {
  status: "not-yet",
  note: "No demo exists yet; the dataset is committed and a contributor could build one.",
} satisfies Playbook["demo"]

// Reads the value rendered beside a definition-list term.
function definitionValue(container: HTMLElement, term: string) {
  const value = within(container).getByText(term).nextElementSibling
  if (!(value instanceof HTMLElement)) {
    throw new Error(`No value rendered for "${term}"`)
  }
  return value
}

describe("StrategyExampleSection", () => {
  it("shows the proposal, the draft reference, and a link to the draft", () => {
    render(
      <StrategyExampleSection
        strategyExample={strategyExample}
        headingId="strategy-example"
      />,
    )

    const section = screen.getByRole("region", {
      name: "What the strategy draft proposed",
    })
    expect(within(section).getByText(strategyExample.proposal)).toBeVisible()
    expect(
      within(section).getByText(strategyExample.draftReference),
    ).toBeVisible()

    // ExternalLink appends a screen-reader-only "(opens in a new tab)"
    // suffix, so match the visible words as a prefix of the accessible name.
    expect(
      within(section).getByRole("link", { name: /^Read the draft strategy/ }),
    ).toHaveAttribute("href", strategyExample.url)
  })
})

describe("DataSourcesSection", () => {
  it("lists every source with its publisher, link, coverage, access, and relevance", () => {
    render(
      <DataSourcesSection dataSources={dataSources} headingId="data-sources" />,
    )

    const section = screen.getByRole("region", {
      name: "Data sources investigated",
    })
    // These are the one kind of material on the page that is not invented.
    expect(within(section).getByText("Real published source")).toBeVisible()

    const articles = within(section).getAllByRole("article")
    expect(articles).toHaveLength(dataSources.length)

    const accessLabels = ["Open data", "Registration or key required"]
    dataSources.forEach((source, index) => {
      const article = articles[index]
      const escapedTitle = source.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      expect(
        within(article).getByRole("link", {
          name: new RegExp(`^${escapedTitle}`),
        }),
      ).toHaveAttribute("href", source.url)
      expect(definitionValue(article, "Publisher")).toHaveTextContent(
        source.publisher,
      )
      expect(definitionValue(article, "What it covers")).toHaveTextContent(
        source.covers,
      )
      expect(definitionValue(article, "Access")).toHaveTextContent(
        accessLabels[index],
      )
      expect(definitionValue(article, "Why it is relevant")).toHaveTextContent(
        source.relevance,
      )
    })
  })
})

describe("SyntheticDataSection", () => {
  it("labels an available dataset, states its method and limits, and names its file", () => {
    render(
      <SyntheticDataSection
        syntheticData={availableDataset}
        headingId="synthetic-dataset"
      />,
    )

    const section = screen.getByRole("region", { name: "Synthetic dataset" })
    expect(within(section).getByText("Synthetic working data")).toBeVisible()
    expect(within(section).getByText(availableDataset.method)).toBeVisible()
    for (const limitation of availableDataset.limitations) {
      expect(within(section).getByText(limitation)).toBeVisible()
    }
    expect(definitionValue(section, "Dataset file")).toHaveTextContent(
      availableDataset.dataPath,
    )
  })

  it("explains a withheld dataset and names no file", () => {
    render(
      <SyntheticDataSection
        syntheticData={withheldDataset}
        headingId="synthetic-dataset"
      />,
    )

    const section = screen.getByRole("region", { name: "Synthetic dataset" })
    expect(within(section).getByText(withheldDataset.reason)).toBeVisible()
    expect(
      definitionValue(section, "What a contributor would need instead"),
    ).toHaveTextContent(withheldDataset.whatContributorsNeed)
    expect(within(section).queryByText("Dataset file")).toBeNull()
    expect(within(section).queryByText("Synthetic working data")).toBeNull()
  })
})

describe("DemoSection", () => {
  it("explains an available demo and links to its route", () => {
    render(<DemoSection demo={availableDemo} headingId="demo" />)

    const section = screen.getByRole("region", { name: "Demo" })
    expect(within(section).getByText(availableDemo.howItWorks)).toBeVisible()
    expect(within(section).getByRole("link")).toHaveAttribute(
      "href",
      availableDemo.route,
    )
  })

  it("states the honest note when no demo exists, and offers no link", () => {
    render(<DemoSection demo={pendingDemo} headingId="demo" />)

    const section = screen.getByRole("region", { name: "Demo" })
    expect(within(section).getByText(pendingDemo.note)).toBeVisible()
    expect(within(section).queryByRole("link")).toBeNull()
  })
})
