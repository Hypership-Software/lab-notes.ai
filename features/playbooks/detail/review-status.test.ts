import { describe, expect, it } from "vitest"

import { getReviewStatus } from "./review-status"

describe("getReviewStatus", () => {
  it("stays current before and throughout the twelve-month anniversary", () => {
    expect(
      getReviewStatus("2025-08-18", new Date("2026-08-17T23:59:59Z")),
    ).toEqual({
      status: "current",
      reviewedAt: "2025-08-18",
      reviewDueAt: "2026-08-18",
    })

    expect(
      getReviewStatus("2025-08-18", new Date("2026-08-18T23:59:59Z")),
    ).toMatchObject({ status: "current" })
  })

  it("needs review on the first UTC date after the anniversary", () => {
    expect(
      getReviewStatus("2025-08-18", new Date("2026-08-19T00:00:00Z")),
    ).toEqual({
      status: "review-needed",
      reviewedAt: "2025-08-18",
      reviewDueAt: "2026-08-18",
    })
  })

  it("clamps a leap-day review to the last valid February day", () => {
    expect(
      getReviewStatus("2024-02-29", new Date("2025-02-28T18:00:00Z")),
    ).toEqual({
      status: "current",
      reviewedAt: "2024-02-29",
      reviewDueAt: "2025-02-28",
    })

    expect(
      getReviewStatus("2024-02-29", new Date("2025-03-01T00:00:00Z")),
    ).toMatchObject({ status: "review-needed" })
  })

  it("fails fast for a date outside the schema contract", () => {
    expect(() => getReviewStatus("not-a-date", new Date())).toThrow(
      "lastReviewed must be an ISO calendar date",
    )
  })

  it("uses UTC date, not local time, for anniversary cutoff", () => {
    // Test suite TZ is pinned to Pacific/Auckland (UTC+12/+13).
    // 2026-08-18T23:59:59Z is 2026-08-19 locally, but the UTC calendar
    // date is still 2026-08-18 — which is the anniversary. Without UTC guards,
    // any swap of getUTC* → get* would wrongly report review-needed here.
    expect(
      getReviewStatus("2025-08-18", new Date("2026-08-18T23:59:59Z")),
    ).toMatchObject({ status: "current" })
  })
})
