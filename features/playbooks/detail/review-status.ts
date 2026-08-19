import { isoDateSchema } from "@/lib/playbooks/schema"

export type ReviewStatus =
  | { status: "current"; reviewedAt: string; reviewDueAt: string }
  | { status: "review-needed"; reviewedAt: string; reviewDueAt: string }

const pad = (value: number) => String(value).padStart(2, "0")

// Day 0 of the following month is the last day of the target month, which is
// how a 29 February review clamps to 28 February in a non-leap due year.
function lastDayOfUtcMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}

export function getReviewStatus(lastReviewed: string, now: Date): ReviewStatus {
  if (!isoDateSchema.safeParse(lastReviewed).success) {
    throw new Error("lastReviewed must be an ISO calendar date")
  }

  const [year, month, day] = lastReviewed.split("-").map(Number)
  const dueYear = year + 1
  const dueDay = Math.min(day, lastDayOfUtcMonth(dueYear, month))
  const reviewDueAt = `${dueYear}-${pad(month)}-${pad(dueDay)}`

  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  )

  return {
    status: today > Date.UTC(dueYear, month - 1, dueDay) ? "review-needed" : "current",
    reviewedAt: lastReviewed,
    reviewDueAt,
  }
}
