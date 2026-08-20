import Link from "next/link"
import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"
import { assertNever } from "@/lib/assert-never"
import { formatUtcDate } from "@/lib/format-date"
import type { Playbook } from "@/lib/playbooks/schema"

export function DemoReadiness({
  demo,
  nextValidationSteps,
}: {
  demo: Playbook["demo"]
  nextValidationSteps: Playbook["nextValidationSteps"]
}): ReactNode {
  switch (demo.availability) {
    case "none":
      return (
        <div className="demo-readiness" data-demo-availability="none">
          <h3>No demonstration yet</h3>
          <p>{demo.reason}</p>
          <p>What still needs to happen before a demonstration can exist:</p>
          <ul>
            {nextValidationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      )
    case "baseline-only":
      return (
        <div className="demo-readiness" data-demo-availability="baseline-only">
          <ProvenanceLabel kind="baseline" />
          <h3>Baseline demonstration</h3>
          <p>{demo.method}</p>
          <p>
            No model is involved. The page computes this result from committed
            synthetic data using controlled vocabulary{" "}
            <span data-technical>{demo.vocabularyVersion}</span>.
          </p>
          <p>Known limitations of this demonstration:</p>
          <ul>
            {demo.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
          <Link href={demo.route}>Open the baseline demonstration</Link>
        </div>
      )
    case "recorded":
      return (
        <div className="demo-readiness" data-demo-availability="recorded">
          <ProvenanceLabel kind="recorded" />
          <h3>Recorded demonstration</h3>
          <p>
            Recorded on{" "}
            <time dateTime={demo.recordedAt}>
              {formatUtcDate(demo.recordedAt)}
            </time>{" "}
            using {demo.modelLabel}, version {demo.modelVersion}.
          </p>
          <p>Known limitations of this recording:</p>
          <ul>
            {demo.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
          <Link href={demo.route}>Try the recorded demonstration</Link>
        </div>
      )
    case "live-local":
      return (
        <div className="demo-readiness" data-demo-availability="live-local">
          <h3>Local demonstration only</h3>
          <p>{demo.warning}</p>
          <p>
            Local setup guidance: <code>{demo.setupPath}</code>
          </p>
          <Link href={demo.route}>Open the local demonstration</Link>
        </div>
      )
    case "partner":
      return (
        <div className="demo-readiness" data-demo-availability="partner">
          <h3>Controlled partner environment required</h3>
          <p>{demo.reason}</p>
        </div>
      )
    default:
      return assertNever(demo)
  }
}
