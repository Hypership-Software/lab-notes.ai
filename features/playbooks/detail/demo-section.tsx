import Link from "next/link"
import type { ReactNode } from "react"

import { assertNever } from "@/lib/assert-never"
import type { Playbook } from "@/lib/playbooks/schema"

// Exhaustive over the D union: a new status fails typecheck here rather
// than rendering an empty section.
function demoBody(demo: Playbook["demo"]): ReactNode {
  switch (demo.status) {
    case "available":
      return (
        <>
          <p className="reading-width">{demo.howItWorks}</p>
          <p>
            <Link href={demo.route}>Open the demo</Link>
          </p>
        </>
      )
    case "not-yet":
      return <p className="reading-width">{demo.note}</p>
    default:
      return assertNever(demo)
  }
}

/**
 * D — the working demo, or the one honest sentence saying none exists yet.
 * A playbook without a demo offers no link at all rather than a disabled
 * control or a placeholder route.
 */
export function DemoSection({
  demo,
  headingId,
}: {
  demo: Playbook["demo"]
  headingId: string
}): ReactNode {
  return (
    <section className="playbook-detail__section" aria-labelledby={headingId}>
      <h2 id={headingId}>Demo</h2>
      <div className="demo-readiness">{demoBody(demo)}</div>
    </section>
  )
}
