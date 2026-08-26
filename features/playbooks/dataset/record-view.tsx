import type { SyntheticDataset } from "@/lib/playbooks/dataset"
import { getDatasetFields } from "@/lib/playbooks/dataset-registry"

import { datasetValueText, fieldLabel } from "./dataset-viewer"

export function RecordView({ dataset }: { dataset: SyntheticDataset }) {
  const fields = getDatasetFields(dataset)
  const identifier = fields[0]

  return (
    <ol className="border-x-2 border-b-2 border-peat bg-surface">
      {dataset.records.map((record, index) => {
        const recordName = datasetValueText(record[identifier]) || `Record ${index + 1}`
        const headingId = `dataset-record-${index + 1}`

        return (
          <li className="border-t-2 border-peat first:border-t-0" key={`${recordName}-${index}`}>
            <article aria-labelledby={headingId}>
              <details open={index === 0 ? true : undefined}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 marker:hidden hover:bg-synthetic focus-visible:bg-synthetic [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">
                    <span className="mr-3 font-mono text-xs text-signal-strong">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="break-words font-mono text-sm font-bold text-evidence-strong"
                      id={headingId}
                    >
                      {recordName}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-peat-muted">
                    Record details
                  </span>
                </summary>
                <dl className="grid border-t border-structure sm:grid-cols-2 xl:grid-cols-3">
                  {fields.map((field) => (
                    <div
                      className="min-w-0 border-b border-structure p-4 sm:odd:border-r xl:border-r xl:[&:nth-child(3n)]:border-r-0"
                      key={field}
                    >
                      <dt className="break-words font-mono text-xs uppercase tracking-[0.11em] text-peat-muted">
                        {fieldLabel(field)}
                      </dt>
                      <dd
                        className="mt-2 break-words whitespace-pre-wrap [overflow-wrap:anywhere]"
                        data-numeric={typeof record[field] === "number"}
                      >
                        {datasetValueText(record[field])}
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            </article>
          </li>
        )
      })}
    </ol>
  )
}
