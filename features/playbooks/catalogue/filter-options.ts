import type { Playbook, PlaybookSummary } from "@/lib/playbooks/schema"

export type CatalogueFilterOption<Value extends string = string> = {
  value: Value
  label: string
  count: number
}

export type CatalogueFilterOptions = {
  sectors: CatalogueFilterOption[]
  patterns: CatalogueFilterOption[]
  dataAccessibility: CatalogueFilterOption<Playbook["dataAccessibility"]>[]
  maturity: CatalogueFilterOption<Playbook["maturity"]>[]
  risk: CatalogueFilterOption<Playbook["risk"]["level"]>[]
}

const collator = new Intl.Collator("en-GB", { sensitivity: "base" })

const dataLabels: Record<Playbook["dataAccessibility"], string> = {
  open: "Open",
  "public-readonly": "Public, reuse to confirm",
  partial: "Partly accessible",
  restricted: "Partner data required",
  unknown: "Access not yet assessed",
}

const maturityLabels: Record<Playbook["maturity"], string> = {
  assessed: "Assessed concept",
  "recorded-demo": "Recorded demonstration",
  "partner-ready": "Partner-ready",
  "operational-pilot": "Operational pilot",
  "evaluated-service": "Evaluated service",
}

const riskLabels: Record<Playbook["risk"]["level"], string> = {
  low: "Low risk",
  moderate: "Moderate risk",
  high: "High risk",
  "very-high": "Very high risk",
}

function countValues(values: readonly string[]) {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return counts
}

function textOptions(values: readonly string[]) {
  return [...countValues(values)]
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((left, right) => collator.compare(left.label, right.label))
}

function controlledOptions<Value extends string>(
  values: readonly Value[],
  labels: Record<Value, string>,
) {
  return [...countValues(values)]
    .map(([value, count]) => ({
      value: value as Value,
      label: labels[value as Value],
      count,
    }))
    .sort((left, right) => collator.compare(left.label, right.label))
}

export function getCatalogueFilterOptions(
  playbooks: readonly PlaybookSummary[],
): CatalogueFilterOptions {
  return {
    sectors: textOptions(playbooks.map((playbook) => playbook.sector)),
    patterns: textOptions(
      playbooks.flatMap((playbook) => playbook.technicalPatterns),
    ),
    dataAccessibility: controlledOptions(
      playbooks.map((playbook) => playbook.dataAccessibility),
      dataLabels,
    ),
    maturity: controlledOptions(
      playbooks.map((playbook) => playbook.maturity),
      maturityLabels,
    ),
    risk: controlledOptions(
      playbooks.map((playbook) => playbook.risk.level),
      riskLabels,
    ),
  }
}
