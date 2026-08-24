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

function cellText(value: unknown): string {
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
      <ol className="record-stack">
        {dataset.records.map((record, index) => (
          <li key={cellText(record[identifier]) || index}>
            <article className="record-stack__item">
              <h3 data-technical>{cellText(record[identifier])}</h3>
              <dl>
                {rest.map((field) => (
                  <div key={field}>
                    <dt>{fieldLabel(field)}</dt>
                    <dd>{cellText(record[field])}</dd>
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
      className="table-scroll"
      tabIndex={0}
      role="region"
      aria-label="Dataset records, scrollable"
    >
      <table className="data-table data-table--records">
        <caption>
          <ProvenanceLabel kind="synthetic" />
          <span>
            {dataset.records.length} records, {fields.length} fields
          </span>
        </caption>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field} scope="col">
                {fieldLabel(field)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataset.records.map((record, index) => (
            <tr key={cellText(record[identifier]) || index}>
              {fields.map((field) =>
                field === identifier ? (
                  <th key={field} scope="row" data-technical>
                    {cellText(record[field])}
                  </th>
                ) : (
                  <td
                    key={field}
                    data-numeric={typeof record[field] === "number"}
                  >
                    {cellText(record[field])}
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
