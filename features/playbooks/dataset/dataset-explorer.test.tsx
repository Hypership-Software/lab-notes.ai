import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import type { SyntheticDataset } from "@/lib/playbooks/dataset"
import {
  getDatasetSummary,
  getSyntheticDataset,
  summarizeDataset,
} from "@/lib/playbooks/dataset-registry"

import { DatasetExplorer } from "./dataset-explorer"

function registeredDataset(slug: string) {
  const dataset = getSyntheticDataset(slug)
  const summary = getDatasetSummary(slug)

  if (!dataset || !summary) {
    throw new Error(`The ${slug} dataset and summary must stay registered`)
  }

  return { dataset, summary }
}

function rowIdentifiers(): string[] {
  const body = screen.getAllByRole("rowgroup")[1]
  return within(body)
    .getAllByRole("row")
    .map((row) => within(row).getByRole("rowheader").textContent ?? "")
}

describe("DatasetExplorer", () => {
  it("defaults short-field data to the table and exposes all three views", () => {
    const { dataset, summary } = registeredDataset("life-event-services")

    render(<DatasetExplorer dataset={dataset} summary={summary} />)

    expect(screen.getByRole("tab", { name: "Table" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(screen.getAllByRole("tab")).toHaveLength(3)
    expect(screen.getByRole("tab", { name: "Records" })).toBeVisible()
    expect(screen.getByRole("tab", { name: "Schema" })).toBeVisible()
  })

  it("draws the selected tab focus indicator outside the tab on peat", () => {
    const { dataset, summary } = registeredDataset("life-event-services")

    render(<DatasetExplorer dataset={dataset} summary={summary} />)

    const tableTab = screen.getByRole("tab", { name: "Table" })
    expect(tableTab).toHaveAttribute("aria-selected", "true")
    expect(tableTab).toHaveClass(
      "relative",
      "focus-visible:z-10",
      "focus-visible:border-surface",
      "focus-visible:ring-0",
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-surface",
    )
    expect(tableTab.className).not.toContain("focus-visible:ring-ring")
    expect(tableTab.className).not.toContain("outline-offset-[-")

    const toolbar = screen.getByText("Choose a working view").parentElement
    expect(toolbar).toHaveClass("overflow-visible")
    expect(toolbar).not.toHaveClass("overflow-hidden")
  })

  it("shows exact field types, populated counts, and sample values", async () => {
    const user = userEvent.setup()
    const { dataset, summary } = registeredDataset("life-event-services")

    render(<DatasetExplorer dataset={dataset} summary={summary} />)
    await user.click(screen.getByRole("tab", { name: "Schema" }))

    const field = screen.getByRole("article", { name: "medianDays" })
    expect(within(field).getByText("number")).toBeVisible()
    expect(within(field).getByText("16 of 16 populated")).toBeVisible()
    expect(within(field).getByText("1")).toBeVisible()
    expect(within(field).getByText("3")).toBeVisible()
    expect(within(field).getByText("5")).toBeVisible()
  })

  it("does not relabel boolean values in the schema", async () => {
    const user = userEvent.setup()
    const dataset: SyntheticDataset = {
      disclosure: "Synthetic working data",
      description: "A boolean dataset for exact schema-value behaviour.",
      records: [
        { id: "one", ready: false },
        { id: "two", ready: true },
      ],
    }

    render(
      <DatasetExplorer dataset={dataset} summary={summarizeDataset(dataset)} />,
    )
    await user.click(screen.getByRole("tab", { name: "Schema" }))

    const field = screen.getByRole("article", { name: "ready" })
    expect(within(field).getByText("false")).toBeVisible()
    expect(within(field).getByText("true")).toBeVisible()
    expect(within(field).queryByText("Yes")).toBeNull()
    expect(within(field).queryByText("No")).toBeNull()
  })

  it("defaults long-form data to records and keeps every full record available", () => {
    const { dataset, summary } = registeredDataset("policy-evidence")
    const lastRecord = dataset.records.at(-1)

    render(<DatasetExplorer dataset={dataset} summary={summary} />)

    expect(screen.getByRole("tab", { name: "Records" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(screen.getAllByRole("article")).toHaveLength(dataset.records.length)
    expect(screen.getByText(String(lastRecord?.text))).toBeInTheDocument()

    const firstRecord = screen.getAllByRole("article")[0]
    expect(within(firstRecord).getByText("Record details")).toBeVisible()
    expect(within(firstRecord).queryByText("Open record")).toBeNull()
  })

  it("sorts numbers ascending and descending without mutating the input", async () => {
    const user = userEvent.setup()
    const dataset: SyntheticDataset = {
      disclosure: "Synthetic working data",
      description: "A deliberately unsorted numeric dataset for interaction tests.",
      records: [
        { id: "third", medianDays: 30 },
        { id: "first", medianDays: 2 },
        { id: "second", medianDays: 12 },
      ],
    }
    const original = structuredClone(dataset.records)

    render(
      <DatasetExplorer dataset={dataset} summary={summarizeDataset(dataset)} />,
    )

    const sort = screen.getByRole("button", { name: "Sort by Median days" })
    await user.click(sort)
    expect(rowIdentifiers()).toEqual(["first", "second", "third"])
    expect(sort.closest("th")).toHaveAttribute("aria-sort", "ascending")

    await user.click(sort)
    expect(rowIdentifiers()).toEqual(["third", "second", "first"])
    expect(sort.closest("th")).toHaveAttribute("aria-sort", "descending")
    expect(dataset.records).toEqual(original)
  })

  it("sorts strings ascending and descending without mutating the input", async () => {
    const user = userEvent.setup()
    const dataset: SyntheticDataset = {
      disclosure: "Synthetic working data",
      description: "A deliberately unsorted string dataset for interaction tests.",
      records: [
        { id: "record-3", place: "Zebra" },
        { id: "record-1", place: "Armagh" },
        { id: "record-2", place: "Belfast" },
      ],
    }
    const original = structuredClone(dataset.records)

    render(
      <DatasetExplorer dataset={dataset} summary={summarizeDataset(dataset)} />,
    )

    const sort = screen.getByRole("button", { name: "Sort by Place" })
    await user.click(sort)
    expect(rowIdentifiers()).toEqual(["record-1", "record-2", "record-3"])

    await user.click(sort)
    expect(rowIdentifiers()).toEqual(["record-3", "record-2", "record-1"])
    expect(dataset.records).toEqual(original)
  })
})
