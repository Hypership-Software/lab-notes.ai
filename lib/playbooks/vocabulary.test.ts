import { describe, expect, it } from "vitest"

import { accessValues } from "./schema"
import {
  dataAccessLabels,
  demoBadgeLabels,
  syntheticDataBadgeLabels,
} from "./vocabulary"

describe("playbook vocabulary", () => {
  it("labels every data-access value exactly once", () => {
    expect(Object.keys(dataAccessLabels)).toEqual([...accessValues])
  })

  it("labels every synthetic-data status exactly once", () => {
    expect(Object.keys(syntheticDataBadgeLabels)).toEqual([
      "available",
      "not-responsible",
    ])
  })

  it("labels every demo status exactly once", () => {
    expect(Object.keys(demoBadgeLabels)).toEqual(["available", "not-yet"])
  })
})
