import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { getSyntheticDataset } from "@/lib/playbooks/dataset-registry"

import { DatasetViewer } from "./dataset-viewer"

describe("DatasetViewer", () => {
  it("keeps every short-form record available in a labelled table", () => {
    const dataset = getSyntheticDataset("traffic-flow")
    if (!dataset) throw new Error("The traffic-flow dataset must stay registered")

    render(<DatasetViewer dataset={dataset} />)

    const region = screen.getByRole("region", {
      name: "Dataset records, scrollable",
    })
    expect(within(region).getByRole("table")).toBeVisible()
    expect(within(region).getAllByRole("row")).toHaveLength(
      dataset.records.length + 1,
    )
    expect(within(region).getByText("Synthetic working data")).toBeVisible()
  })

  it("keeps every long-form record available as a labelled article", () => {
    const dataset = getSyntheticDataset("policy-evidence")
    if (!dataset) {
      throw new Error("The policy-evidence dataset must stay registered")
    }

    render(<DatasetViewer dataset={dataset} />)

    expect(screen.getAllByRole("article")).toHaveLength(dataset.records.length)
    expect(
      screen.queryByRole("region", { name: "Dataset records, scrollable" }),
    ).toBeNull()
  })
})
