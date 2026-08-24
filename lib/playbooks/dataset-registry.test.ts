import { describe, expect, it } from "vitest"

import {
  getDatasetSummary,
  getDatasetFields,
  getDatasetSlugs,
  getSyntheticDataset,
  hasLongFormFields,
  summarizeDataset,
} from "./dataset-registry"
import type { SyntheticDataset } from "./dataset"
import { getAllPlaybooks } from "./registry"

const playbooks = getAllPlaybooks()

describe("dataset registry", () => {
  it("registers a dataset for exactly the playbooks that declare one", () => {
    const declared = playbooks
      .filter((playbook) => playbook.syntheticData.status === "available")
      .map((playbook) => playbook.slug)

    expect([...getDatasetSlugs()].sort()).toEqual([...declared].sort())
  })

  it("registers no dataset for a playbook that withholds one", () => {
    for (const playbook of playbooks) {
      if (playbook.syntheticData.status === "not-responsible") {
        expect(getSyntheticDataset(playbook.slug)).toBeUndefined()
      }
    }
  })

  it("resolves the file each playbook names in its own dataPath", () => {
    for (const playbook of playbooks) {
      if (playbook.syntheticData.status !== "available") continue

      const dataset = getSyntheticDataset(playbook.slug)
      expect(dataset, playbook.slug).toBeDefined()
      // The registered file must be the one the playbook page points a reader
      // at, so the path and the rendered records cannot describe two files.
      expect(playbook.syntheticData.dataPath).toContain(playbook.slug)
      expect(dataset!.disclosure).toBe("Synthetic working data")
      expect(dataset!.records.length).toBeGreaterThan(0)
    }
  })

  it("gives every dataset a stable, complete field order", () => {
    for (const slug of getDatasetSlugs()) {
      const dataset = getSyntheticDataset(slug)!
      const fields = getDatasetFields(dataset)

      expect(fields.length).toBeGreaterThan(0)
      expect(new Set(fields).size).toBe(fields.length)
      for (const record of dataset.records) {
        for (const field of Object.keys(record)) {
          expect(fields, `${slug}.${field}`).toContain(field)
        }
      }
    }
  })

  it("flags the written-response datasets as long form", () => {
    expect(hasLongFormFields(getSyntheticDataset("policy-evidence")!)).toBe(true)
    expect(
      hasLongFormFields(getSyntheticDataset("community-participation")!),
    ).toBe(true)
    expect(hasLongFormFields(getSyntheticDataset("traffic-flow")!)).toBe(false)
  })

  it("describes record count, fields, and the default view", () => {
    expect(getDatasetSummary("life-event-services")).toMatchObject({
      recordCount: 16,
      defaultView: "table",
    })
    expect(
      getDatasetSummary("life-event-services")?.fields.map((field) => field.name),
    ).toEqual(["id", "lifeEvent", "journeyStep", "medianDays", "dropOffShareBand"])
  })

  it("summarises primitive fields without treating null as missing", () => {
    const dataset: SyntheticDataset = {
      disclosure: "Synthetic working data",
      description: "A synthetic fixture for dataset-summary behaviour.",
      records: [
        {
          id: "record-1",
          response: null,
          rank: 1,
          ready: false,
          notes:
            "This deliberately long synthetic response exceeds one hundred and twenty characters so the summary must choose the records view rather than a dense table.",
        },
        { id: "record-2", response: "alpha", rank: 2, ready: true },
        { id: "record-3", response: "bravo", rank: 2, ready: false },
        { id: "record-4", response: "charlie", rank: 3, ready: true },
        { id: "record-5", response: "delta", rank: 4, ready: true },
        { id: "record-6", rank: 4, ready: false },
        { id: "comparison", rank: 5, ready: false, comparison: null },
        { id: "comparison", rank: 5, ready: false },
      ],
    }
    const originalRecords = structuredClone(dataset.records)

    expect(summarizeDataset(dataset)).toEqual({
      recordCount: 8,
      defaultView: "records",
      fields: [
        {
          name: "id",
          types: ["string"],
          populatedCount: 8,
          sampleValues: ["record-1", "record-2", "record-3"],
        },
        {
          name: "response",
          types: ["null", "string"],
          populatedCount: 5,
          sampleValues: ["alpha", "bravo", "charlie"],
        },
        {
          name: "rank",
          types: ["number"],
          populatedCount: 8,
          sampleValues: [1, 2, 3],
        },
        {
          name: "ready",
          types: ["boolean"],
          populatedCount: 8,
          sampleValues: [false, true],
        },
        {
          name: "notes",
          types: ["string"],
          populatedCount: 1,
          sampleValues: [
            "This deliberately long synthetic response exceeds one hundred and twenty characters so the summary must choose the records view rather than a dense table.",
          ],
        },
        {
          name: "comparison",
          types: ["null"],
          populatedCount: 1,
          sampleValues: [],
        },
      ],
    })
    expect(dataset.records).toEqual(originalRecords)
  })

  it("returns nothing for a slug that is not a playbook at all", () => {
    expect(getSyntheticDataset("not-a-playbook")).toBeUndefined()
  })

  it("returns no summary for an unknown slug", () => {
    expect(getDatasetSummary("not-a-playbook")).toBeUndefined()
  })
})
