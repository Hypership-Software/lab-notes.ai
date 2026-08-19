import { describe, expect, it } from "vitest"

import {
  dataAccessibilityValues,
  maturityValues,
  riskValues,
  sourceTypeValues,
} from "./schema"
import {
  dataAccessibilityLabel,
  maturityLabel,
  maturityLadder,
  riskLabel,
  sourceTypeLabel,
} from "./vocabulary"

describe("playbook vocabulary", () => {
  it("describes every maturity value in schema order", () => {
    expect(maturityLadder.map((rung) => rung.value)).toEqual([...maturityValues])
    for (const rung of maturityLadder) {
      expect(rung.label).not.toHaveLength(0)
      expect(rung.description).not.toHaveLength(0)
    }
  })

  it("labels every controlled value exactly once", () => {
    expect(Object.keys(maturityLabel)).toEqual([...maturityValues])
    expect(Object.keys(dataAccessibilityLabel)).toEqual([
      ...dataAccessibilityValues,
    ])
    expect(Object.keys(riskLabel)).toEqual([...riskValues])
    expect(Object.keys(sourceTypeLabel)).toEqual([...sourceTypeValues])
  })
})
