import type { Playbook } from "./schema"

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
      "Checked-in output is replayed against deterministic synthetic fixtures.",
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
  value: Playbook["maturity"]
  label: string
  description: string
}[]

export const maturityLabel = Object.fromEntries(
  maturityLadder.map((rung) => [rung.value, rung.label]),
) as Record<Playbook["maturity"], string>

export const dataAccessibilityLabel: Record<
  Playbook["dataAccessibility"],
  string
> = {
  open: "Open data",
  "public-readonly": "Public, reuse to confirm",
  partial: "Partly accessible",
  restricted: "Partner data required",
  unknown: "Access not yet assessed",
}

export const riskLabel: Record<Playbook["risk"]["level"], string> = {
  low: "Low risk",
  moderate: "Moderate risk",
  high: "High risk",
  "very-high": "Very high risk",
}

export const sourceTypeLabel: Record<
  Playbook["officialSources"][number]["sourceType"],
  string
> = {
  strategy: "Strategy",
  "consultation-report": "Consultation report",
  dataset: "Dataset",
  guidance: "Guidance",
  research: "Research",
}
