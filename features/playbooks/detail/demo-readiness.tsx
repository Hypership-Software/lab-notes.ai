import Link from "next/link"
import type { ReactNode } from "react"

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
          <p>Work still required to reach a more credible maturity state:</p>
          <ul>
            {nextValidationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      )
    case "recorded":
      return (
        <div className="demo-readiness" data-demo-availability="recorded">
          <h3>Recorded demonstration</h3>
          <p>
            Recorded on{" "}
            <time dateTime={demo.recordedAt}>
              {formatUtcDate(demo.recordedAt)}
            </time>{" "}
            using {demo.modelLabel}.
          </p>
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
