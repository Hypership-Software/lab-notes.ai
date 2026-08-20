import type { ReactNode } from "react"

import { ProvenanceLabel } from "@/components/site/provenance-label"

/**
 * The standing disclosure above every result on this page.
 *
 * It states what the page is *not* before describing what it is, because the
 * failure mode this project guards against is a reader assuming a demonstration
 * proves something. It is deliberately not dismissible and not collapsible.
 */
export function BaselineDemoBanner(): ReactNode {
  return (
    <aside
      className="demo-banner"
      role="note"
      aria-labelledby="demo-banner-title"
      data-demo-kind="baseline-only"
    >
      <ProvenanceLabel kind="baseline" />
      <h2 id="demo-banner-title">Baseline demonstration</h2>
      <p>
        This page groups synthetic consultation responses using a reviewed list
        of words and phrases. No model is involved: nothing here is AI output,
        recorded or live, and no part of it has been operationally validated.
      </p>
      <p>
        It exists to show the comparison an AI-assisted analysis would have to
        beat, and to make the limits of a keyword method visible before anything
        cleverer is introduced.
      </p>
    </aside>
  )
}
