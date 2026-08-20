import type { ReactNode } from "react"

import { policyEvidence } from "@/content/playbooks/policy-evidence/playbook"
import { PolicyEvidenceWorkbench } from "@/features/policy-evidence/components/policy-evidence-workbench"
import { getAllPlaybooks } from "@/lib/playbooks/registry"
import type { Playbook } from "@/lib/playbooks/schema"

type HostedDemo = {
  playbook: Playbook
  render: (playbook: Playbook) => ReactNode
}

/**
 * Every hosted demonstration this application can render, paired with the
 * playbook it belongs to.
 *
 * Each entry names the playbook module itself rather than repeating its slug as
 * a string, so a feature folder and the playbook it implements are tied
 * together by a value the compiler follows. Changing the slug in one place and
 * not the other is not expressible here.
 */
const hostedDemos: readonly HostedDemo[] = [
  {
    playbook: policyEvidence,
    render: (playbook) => <PolicyEvidenceWorkbench playbook={playbook} />,
  },
]

/**
 * A playbook promises a hosted page exactly when its demo carries a route.
 * `none` and `partner` explain why there is nothing to open; every other
 * variant has to be backed by an entry above.
 */
function promisesHostedDemo(playbook: Playbook) {
  return "route" in playbook.demo
}

/**
 * Checked at module load, so a mismatch fails the static build rather than
 * reaching a reader.
 *
 * The failure this guards against is silent. Without it, a second playbook
 * marked `baseline-only` would render whichever demonstration the route file
 * happened to reach for first — one playbook's framing over another playbook's
 * data, with nothing on the page admitting it.
 */
function indexHostedDemos() {
  const bySlug = new Map(hostedDemos.map((entry) => [entry.playbook.slug, entry]))

  for (const playbook of getAllPlaybooks()) {
    if (promisesHostedDemo(playbook) && !bySlug.has(playbook.slug)) {
      throw new Error(
        `Playbook "${playbook.slug}" declares a ${playbook.demo.availability} demonstration but no hosted demo is registered for it`,
      )
    }

    if (!promisesHostedDemo(playbook) && bySlug.has(playbook.slug)) {
      throw new Error(
        `Playbook "${playbook.slug}" has a hosted demo registered but its demo availability is "${playbook.demo.availability}"`,
      )
    }
  }

  return bySlug
}

const hostedDemoBySlug = indexHostedDemos()

export function hasHostedDemo(slug: string): boolean {
  return hostedDemoBySlug.has(slug)
}

export function renderHostedDemo(playbook: Playbook): ReactNode | undefined {
  return hostedDemoBySlug.get(playbook.slug)?.render(playbook)
}
