"use client"

import { useMemo, useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import type { SyntheticDataset } from "@/lib/playbooks/dataset"
import type { DatasetSummary } from "@/lib/playbooks/dataset-registry"

import { RecordView } from "./record-view"
import { SchemaView } from "./schema-view"
import { type SortDirection, TableView } from "./table-view"

type DatasetView = "records" | "table" | "schema"

function compareValues(left: unknown, right: unknown): number {
  if (left === right) return 0
  if (left === null || left === undefined) return 1
  if (right === null || right === undefined) return -1
  if (typeof left === "number" && typeof right === "number") return left - right
  if (typeof left === "boolean" && typeof right === "boolean") {
    return Number(left) - Number(right)
  }

  return String(left).localeCompare(String(right), "en-GB", {
    numeric: true,
    sensitivity: "base",
  })
}

export function DatasetExplorer({
  dataset,
  summary,
}: {
  dataset: SyntheticDataset
  summary: DatasetSummary
}) {
  const [view, setView] = useState<DatasetView>(summary.defaultView)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [direction, setDirection] = useState<SortDirection>("ascending")

  const sortedRecords = useMemo(() => {
    if (!activeField) return [...dataset.records]

    const multiplier = direction === "ascending" ? 1 : -1
    return [...dataset.records].sort(
      (left, right) =>
        compareValues(left[activeField], right[activeField]) * multiplier,
    )
  }, [dataset.records, activeField, direction])

  function sortBy(field: string) {
    if (field === activeField) {
      setDirection((current) =>
        current === "ascending" ? "descending" : "ascending",
      )
      return
    }

    setActiveField(field)
    setDirection("ascending")
  }

  return (
    <Tabs
      className="gap-0"
      onValueChange={(value) => setView(value as DatasetView)}
      value={view}
    >
      <div className="overflow-visible border-2 border-peat bg-peat p-2 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-3">
        <p className="hidden font-mono text-xs uppercase tracking-[0.13em] text-surface sm:block">
          Choose a working view
        </p>
        <TabsList
          aria-label="Dataset views"
          className="grid min-h-11 w-full grid-cols-3 gap-0 rounded-none bg-transparent p-0 sm:w-auto"
        >
          {(
            [
              ["records", "Records"],
              ["table", "Table"],
              ["schema", "Schema"],
            ] as const
          ).map(([item, label]) => (
            <TabsTrigger
              className="relative min-h-11 rounded-none border border-surface/60 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] text-surface transition-none after:transition-none hover:bg-surface hover:text-peat focus-visible:z-10 focus-visible:border-surface focus-visible:ring-0 focus-visible:ring-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface data-active:border-synthetic data-active:bg-synthetic data-active:text-synthetic-ink data-active:shadow-none group-data-[variant=default]/tabs-list:data-active:shadow-none sm:min-w-28"
              key={item}
              value={item}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="records">
        <RecordView dataset={dataset} />
      </TabsContent>
      <TabsContent value="table">
        <TableView
          activeField={activeField}
          dataset={dataset}
          direction={direction}
          onSort={sortBy}
          records={sortedRecords}
        />
      </TabsContent>
      <TabsContent value="schema">
        <SchemaView summary={summary} />
      </TabsContent>
    </Tabs>
  )
}
