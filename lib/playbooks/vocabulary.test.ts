import { describe, expect, it } from "vitest"

import { accessValues } from "./schema"
import {
  dataAccessLabels,
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
})
