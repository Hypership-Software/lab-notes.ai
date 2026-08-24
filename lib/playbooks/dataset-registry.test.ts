import { describe, expect, it } from "vitest"

import {
  getDatasetSummary,
  getDatasetFields,
  getDatasetSlugs,
  getSyntheticDataset,
  hasLongFormFields,
} from "./dataset-registry"
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

  it("returns nothing for a slug that is not a playbook at all", () => {
    expect(getSyntheticDataset("not-a-playbook")).toBeUndefined()
  })
})
