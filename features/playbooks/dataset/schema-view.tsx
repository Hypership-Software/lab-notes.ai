import type { DatasetSummary } from "@/lib/playbooks/dataset-registry"

export function SchemaView({ summary }: { summary: DatasetSummary }) {
  return (
    <ol className="border-x-2 border-b-2 border-peat bg-surface">
      {summary.fields.map((field, index) => (
        <li className="border-t-2 border-peat first:border-t-0" key={field.name}>
          <article
            aria-label={field.name}
            className="grid min-w-0 gap-4 p-4 sm:grid-cols-[minmax(10rem,0.8fr)_minmax(0,1.2fr)] sm:p-5"
          >
            <div className="min-w-0">
              <span className="mr-3 font-mono text-xs text-signal-strong">
                {String(index + 1).padStart(2, "0")}
              </span>
              <code className="break-words font-mono text-base font-bold text-evidence-strong [overflow-wrap:anywhere]">
                {field.name}
              </code>
            </div>
            <dl className="grid min-w-0 gap-4 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.11em] text-peat-muted">
                  Type
                </dt>
                <dd className="mt-1 break-words font-mono text-sm">
                  {field.types.join(" / ") || "unknown"}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.11em] text-peat-muted">
                  Coverage
                </dt>
                <dd className="mt-1 text-sm" data-numeric>
                  {field.populatedCount} of {summary.recordCount} populated
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="font-mono text-xs uppercase tracking-[0.11em] text-peat-muted">
                  Samples
                </dt>
                <dd className="mt-1 flex min-w-0 flex-wrap gap-x-2 gap-y-1 text-sm">
                  {field.sampleValues.length > 0
                    ? field.sampleValues.map((value, sampleIndex) => (
                        <code
                          className="break-words font-mono [overflow-wrap:anywhere]"
                          key={`${String(value)}-${sampleIndex}`}
                        >
                          {String(value)}
                        </code>
                      ))
                    : "No primitive sample"}
                </dd>
              </div>
            </dl>
          </article>
        </li>
      ))}
    </ol>
  )
}
