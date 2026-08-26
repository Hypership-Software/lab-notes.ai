import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { SyntheticDataset } from "@/lib/playbooks/dataset"
import { getDatasetFields } from "@/lib/playbooks/dataset-registry"

import { datasetValueText, fieldLabel } from "./dataset-viewer"

export type SortDirection = "ascending" | "descending"

export function TableView({
  dataset,
  records,
  activeField,
  direction,
  onSort,
}: {
  dataset: SyntheticDataset
  records: SyntheticDataset["records"]
  activeField: string | null
  direction: SortDirection
  onSort: (field: string) => void
}) {
  const fields = getDatasetFields(dataset)
  const identifier = fields[0]

  return (
    <div
      aria-label="Dataset table, horizontally scrollable"
      className="overflow-x-auto border-x-2 border-b-2 border-peat bg-surface [&_[data-slot=table-container]]:overflow-visible"
      role="region"
      tabIndex={0}
    >
      <Table className="min-w-max border-collapse">
        <TableHeader>
          <TableRow className="border-peat transition-none hover:bg-transparent">
            {fields.map((field) => {
              const active = activeField === field
              const ariaSort = active ? direction : "none"
              const Icon = active
                ? direction === "ascending"
                  ? ArrowUp
                  : ArrowDown
                : ChevronsUpDown

              return (
                <TableHead
                  aria-sort={ariaSort}
                  className="h-auto border-r border-structure bg-paper p-0 last:border-r-0"
                  key={field}
                >
                  <button
                    aria-label={`Sort by ${fieldLabel(field)}`}
                    className="flex min-h-11 w-full items-center justify-between gap-3 px-3 py-2 text-left font-mono text-xs font-bold uppercase tracking-[0.09em] hover:bg-synthetic focus-visible:bg-synthetic"
                    onClick={() => onSort(field)}
                    type="button"
                  >
                    {fieldLabel(field)}
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                  </button>
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, index) => {
            const recordName = datasetValueText(record[identifier])

            return (
              <TableRow
                className="border-structure transition-none hover:bg-synthetic/40"
                key={`${recordName}-${index}`}
              >
                {fields.map((field) =>
                  field === identifier ? (
                    <TableHead
                      className="h-auto border-r border-structure px-3 py-3 font-mono text-sm font-bold text-evidence-strong"
                      key={field}
                      scope="row"
                    >
                      {datasetValueText(record[field])}
                    </TableHead>
                  ) : (
                    <TableCell
                      className="max-w-[32rem] border-r border-structure px-3 py-3 whitespace-normal last:border-r-0"
                      data-numeric={typeof record[field] === "number"}
                      key={field}
                    >
                      <span className="block min-w-24 whitespace-pre-wrap">
                        {datasetValueText(record[field])}
                      </span>
                    </TableCell>
                  ),
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
