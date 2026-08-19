import type { Playbook, PlaybookSummary } from "@/lib/playbooks/schema"
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
  dataAccessibility: CatalogueFilterOption<Playbook["dataAccessibility"]>[]
  maturity: CatalogueFilterOption<Playbook["maturity"]>[]
  risk: CatalogueFilterOption<Playbook["risk"]["level"]>[]
}

const collator = new Intl.Collator("en-GB", { sensitivity: "base" })

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
