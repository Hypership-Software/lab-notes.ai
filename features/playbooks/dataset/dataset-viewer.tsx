import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"
import type { SyntheticDataset } from "@/lib/playbooks/dataset"
import {
  getDatasetFields,
  hasLongFormFields,
} from "@/lib/playbooks/dataset-registry"

/** Turn `successRateBand` into `Success rate band` for a column header. */
export function fieldLabel(field: string): string {
  const spaced = field
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()

  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase()
}

export function datasetValueText(value: unknown): string {
  if (value === null || value === undefined) return "—"
  if (typeof value === "number") return String(value)
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (typeof value === "string") return value
  return JSON.stringify(value)
}

/**
 * Every record in a committed dataset, rendered from the file itself.
 *
 * Two shapes, chosen by the data rather than by the playbook: short-field
 * datasets read as a table, because the whole point of them is comparing rows;
 * datasets holding whole written responses read as stacked labelled records,
 * because a paragraph in a table cell is a column nobody can scan. Neither
 * shape clips or truncates a value — a reader who cannot see the whole record
 * cannot check what was done with it.
 */
export function DatasetViewer({
  dataset,
}: {
  dataset: SyntheticDataset
}): ReactNode {
  const fields = getDatasetFields(dataset)
  const [identifier, ...rest] = fields

  if (hasLongFormFields(dataset)) {
    return (
      <ol className="border-x-2 border-b-2 border-peat bg-surface px-4">
        {dataset.records.map((record, index) => (
          <li key={datasetValueText(record[identifier]) || index}>
            <article className="border-t-2 border-peat py-5 first:border-t-0">
              <h3 className="break-words font-mono text-lg" data-technical>
                {datasetValueText(record[identifier])}
              </h3>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {rest.map((field) => (
                  <div className="min-w-0" key={field}>
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-peat-muted">
                      {fieldLabel(field)}
                    </dt>
                    <dd className="mt-1 break-words whitespace-pre-wrap">
                      {datasetValueText(record[field])}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </li>
        ))}
      </ol>
    )
  }

  return (
    // Focusable so the horizontal scroll is reachable from the keyboard, and
    // named so it is announced as something scrollable rather than as an
    // unlabelled stop.
    <div
      className="overflow-x-auto border-2 border-peat bg-surface [&_[data-table]]:min-w-max"
      tabIndex={0}
      role="region"
      aria-label="Dataset records, scrollable"
    >
      <table className="min-w-full border-collapse text-left text-sm" data-table>
        <caption className="border-b-2 border-peat p-4 text-left">
          <ProvenanceLabel kind="synthetic" className="mr-3" />
          <span className="font-mono text-xs text-peat-muted">
            {dataset.records.length} records, {fields.length} fields
          </span>
        </caption>
        <thead>
          <tr>
            {fields.map((field) => (
              <th
                className="border-r border-structure bg-paper px-3 py-3 font-mono text-xs uppercase tracking-[0.1em] last:border-r-0"
                key={field}
                scope="col"
              >
                {fieldLabel(field)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataset.records.map((record, index) => (
            <tr
              className="border-t border-structure"
              key={datasetValueText(record[identifier]) || index}
            >
              {fields.map((field) =>
                field === identifier ? (
                  <th
                    className="border-r border-structure px-3 py-3 font-mono font-bold whitespace-nowrap"
                    key={field}
                    scope="row"
                    data-technical
                  >
                    {datasetValueText(record[field])}
                  </th>
                ) : (
                  <td
                    className="border-r border-structure px-3 py-3 whitespace-nowrap last:border-r-0"
                    key={field}
                    data-numeric={typeof record[field] === "number"}
                  >
                    {datasetValueText(record[field])}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
