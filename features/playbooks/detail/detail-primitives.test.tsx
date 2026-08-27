import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import type { Playbook } from "@/lib/playbooks/schema"

import { DataSourcesSection } from "./data-sources-section"
import { StrategyExampleSection } from "./strategy-example-section"
import { SyntheticDataSection } from "./synthetic-data-section"

// Hand-built fixtures rather than a registered playbook: each section owns
// one slice of the contract, and the states a section must render honestly
// (`not-responsible`) are the ones the worked example does not have. Every
// fixture is typed against the schema's own output type, so a
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
  {
    id: "case-records",
    publisher: "Local planning authorities",
    title: "Live planning case records",
    url: "https://example.gov.uk/restricted-planning-records",
    covers: "Person-level case records held inside operational planning systems.",
    access: "restricted",
    relevance: "They show the operational context that public statistics omit.",
  },
] satisfies Playbook["dataSources"]

const availableDataset = {
  status: "available",
  dataPath: "content/playbooks/policy-evidence/policy-evidence.data.json",
  purpose:
    "A small corpus for exploring how policy consultation themes could be organised.",
  preparation:
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

const datasetSummary = {
  recordCount: 20,
  defaultView: "records",
  fields: [
    {
      name: "response_id",
      types: ["string"],
      populatedCount: 20,
      sampleValues: ["response-01", "response-02"],
    },
    {
      name: "theme",
      types: ["string"],
      populatedCount: 20,
      sampleValues: ["skills", "investment"],
    },
  ],
} as const

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

    const section = screen.getByRole("region", { name: "Opportunity" })
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

    const section = screen.getByRole("region", { name: "Research already done" })
    // These are the one kind of material on the page that is not invented.
    expect(within(section).getByText("Real published source")).toBeVisible()

    const articles = within(section).getAllByRole("article")
    expect(articles).toHaveLength(dataSources.length)

    const accessLabels = ["Open", "Registration or key", "Restricted"]
    dataSources.forEach((source, index) => {
      const article = articles[index]
      expect(
        within(article).getByRole("link", {
          name: /^Open the source/,
        }),
      ).toHaveAttribute("href", source.url)
      // Publisher and access are the source's identity, not two more rows of a
      // definition list, so they are asserted as rendered text.
      expect(within(article).getByText(source.publisher)).toBeVisible()
      expect(within(article).getByText(accessLabels[index])).toBeVisible()
      expect(definitionValue(article, "What it covers")).toHaveTextContent(
        source.covers,
      )
      expect(definitionValue(article, "Why it matters here")).toHaveTextContent(
        source.relevance,
      )
    })
  })

  it("counts the sources, so the section states its own scope", () => {
    render(
      <DataSourcesSection dataSources={dataSources} headingId="data-sources" />,
    )

    expect(screen.getByText(/^3 sources/)).toBeVisible()
  })

  it("states access as a literal fact rather than a score or scale", () => {
    render(
      <DataSourcesSection dataSources={dataSources} headingId="data-sources" />,
    )

    const [open, keyed, restricted] = within(
      screen.getByRole("region", { name: "Research already done" }),
    ).getAllByRole("article")

    expect(within(open).getByText("Open")).toBeVisible()
    expect(within(keyed).getByText("Registration or key")).toBeVisible()
    expect(within(restricted).getByText("Restricted")).toBeVisible()
    expect(document.querySelector(".access-scale")).toBeNull()
  })
})

describe("SyntheticDataSection", () => {
  it("labels an available dataset and states its purpose, preparation, and limits", () => {
    render(
      <SyntheticDataSection
        syntheticData={availableDataset}
        slug="policy-evidence"
        headingId="starter-dataset"
        dataset={datasetSummary}
      />,
    )

    const section = screen.getByRole("region", { name: "Starter dataset" })
    expect(within(section).getByText("Synthetic working data")).toBeVisible()
    expect(within(section).getByText(availableDataset.purpose)).toBeVisible()
    expect(within(section).getByText(availableDataset.preparation)).toBeVisible()
    expect(
      within(section).getByText(availableDataset.purpose).compareDocumentPosition(
        within(section).getByText(availableDataset.preparation),
      ) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    for (const limitation of availableDataset.limitations) {
      expect(within(section).getByText(limitation)).toBeVisible()
    }
  })

  it("sends a reader to the records, the file, and the raw download", () => {
    render(
      <SyntheticDataSection
        syntheticData={availableDataset}
        slug="policy-evidence"
        headingId="starter-dataset"
        dataset={datasetSummary}
      />,
    )

    const section = screen.getByRole("region", { name: "Starter dataset" })

    // The path used to be inert text. It is now three real destinations, and
    // the on-site one names the number of records it will show.
    expect(
      within(section).getByRole("link", { name: /^Inspect all 20 records/ }),
    ).toHaveAttribute("href", "/playbooks/policy-evidence/dataset")
    expect(
      within(section).getByRole("link", { name: /^Inspect all 20 records/ }),
    ).not.toHaveClass("transition-colors")
    expect(
      within(section).getByRole("link", {
        name: /^View repository file/,
      }),
    ).toHaveAttribute(
      "href",
      `https://github.com/Hypership-Software/lab-notes.ai/blob/main/${availableDataset.dataPath}`,
    )
    expect(
      within(section).getByRole("link", { name: /^Download JSON/ }),
    ).toHaveAttribute(
      "href",
      `https://github.com/Hypership-Software/lab-notes.ai/raw/main/${availableDataset.dataPath}`,
    )
  })

  it("still offers the records link when summary metadata is unavailable", () => {
    render(
      <SyntheticDataSection
        syntheticData={availableDataset}
        slug="not-a-playbook"
        headingId="starter-dataset"
        dataset={undefined}
      />,
    )

    expect(
      screen.getByRole("link", { name: /^Inspect all records/ }),
    ).toHaveAttribute("href", "/playbooks/not-a-playbook/dataset")
  })

  it("explains a withheld dataset and offers nowhere to get one", () => {
    render(
      <SyntheticDataSection
        syntheticData={withheldDataset}
        slug="violence-risk-research"
        headingId="starter-dataset"
        dataset={undefined}
      />,
    )

    const section = screen.getByRole("region", { name: "Starter dataset" })
    expect(within(section).getByText(withheldDataset.reason)).toBeVisible()
    expect(
      within(section).getByText(withheldDataset.whatContributorsNeed),
    ).toBeVisible()
    expect(within(section).queryByRole("link")).toBeNull()
    expect(within(section).queryByText("Synthetic working data")).toBeNull()
    expect(
      within(section).getByText("No synthetic dataset — by design"),
    ).toHaveClass("bg-signal-strong", "text-paper")
    expect(
      within(section).getByText("No synthetic dataset — by design"),
    ).not.toHaveClass("bg-signal")
  })
})
