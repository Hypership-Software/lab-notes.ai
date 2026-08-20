import type {
  DataAccessibility,
  Maturity,
  PlaybookSummary,
  RiskLevel,
} from "@/lib/playbooks/schema"
import {
  dataAccessibilityLabel,
  maturityLabel,
  riskLabel,
} from "@/lib/playbooks/vocabulary"

export type CatalogueFilterOption<Value extends string = string> = {
  value: Value
  label: string
  count: number
}

export type CatalogueFilterOptions = {
  sectors: CatalogueFilterOption[]
  patterns: CatalogueFilterOption[]
  dataAccessibility: CatalogueFilterOption<DataAccessibility>[]
  maturity: CatalogueFilterOption<Maturity>[]
  risk: CatalogueFilterOption<RiskLevel>[]
}

const collator = new Intl.Collator("en-GB", { sensitivity: "base" })

function countValues<Value extends string>(values: readonly Value[]) {
  const counts = new Map<Value, number>()
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
): CatalogueFilterOption<Value>[] {
  return [...countValues(values)]
    .map(([value, count]) => ({ value, label: labels[value], count }))
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
      dataAccessibilityLabel,
    ),
    maturity: controlledOptions(
      playbooks.map((playbook) => playbook.maturity),
      maturityLabel,
    ),
    risk: controlledOptions(
      playbooks.map((playbook) => playbook.risk.level),
      riskLabel,
    ),
  }
}
