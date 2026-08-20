import { toRecord } from "@/lib/to-record"

import {
  maturityValues,
  type DataAccessibility,
  type Maturity,
  type RiskLevel,
  type SourceType,
} from "./schema"

export const maturityLadder = [
  {
    value: "assessed",
    label: "Assessed concept",
    description:
      "The problem, data reality, risks, baseline, and next checks are documented.",
  },
  {
    value: "recorded-demo",
    label: "Recorded demonstration",
    description:
      "Checked-in output is replayed against a checked-in synthetic dataset.",
  },
  {
    value: "partner-ready",
    label: "Partner-ready",
    description:
      "A data-owning partner has reviewed interfaces and validation protocols.",
  },
  {
    value: "operational-pilot",
    label: "Operational pilot",
    description: "The system has been tested in a governed real-world setting.",
  },
  {
    value: "evaluated-service",
    label: "Evaluated service",
    description:
      "Operational outcomes and harms have received independent evaluation.",
  },
] as const satisfies readonly {
  value: Maturity
  label: string
  description: string
}[]

export type MaturityRung = (typeof maturityLadder)[number]

/**
 * The ladder indexed by rung. Built here rather than in each component that
 * needs a label or a description, so there is one lookup and one place a
 * missing rung is caught.
 */
export const maturityRung = toRecord(maturityValues, (value): MaturityRung => {
  const rung = maturityLadder.find((entry) => entry.value === value)
  if (!rung) throw new Error(`The maturity ladder has no rung for "${value}"`)
  return rung
})

export const maturityLabel = toRecord(
  maturityValues,
  (value) => maturityRung[value].label,
)

export const dataAccessibilityLabel: Record<DataAccessibility, string> = {
  open: "Open data",
  "public-readonly": "Public, reuse to confirm",
  partial: "Partly accessible",
  restricted: "Partner data required",
  unknown: "Access not yet assessed",
}

export const riskLabel: Record<RiskLevel, string> = {
  low: "Low risk",
  moderate: "Moderate risk",
  high: "High risk",
  "very-high": "Very high risk",
}

export const sourceTypeLabel: Record<SourceType, string> = {
  strategy: "Strategy",
  "consultation-report": "Consultation report",
  dataset: "Dataset",
  guidance: "Guidance",
  research: "Research",
}
