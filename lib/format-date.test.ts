import { describe, expect, it } from "vitest"

import { formatUtcDate } from "./format-date"

describe("formatUtcDate", () => {
  it("formats an ISO date in plain English at UTC", () => {
    expect(formatUtcDate("2026-08-18")).toBe("18 August 2026")
    expect(formatUtcDate("2026-01-01")).toBe("1 January 2026")
  })
})
