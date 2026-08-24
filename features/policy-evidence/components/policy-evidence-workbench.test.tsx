import { render, screen, within } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { getPlaybook } from "@/lib/playbooks/registry"

import { runAnalysis } from "../domain/run-analysis"
import { policyEvidenceCorpus, policyEvidenceDataset } from "../fixtures"

import { documentElementId } from "./element-ids"
import { PolicyEvidenceWorkbench } from "./policy-evidence-workbench"

const playbook = getPlaybook("policy-evidence")
if (!playbook) {
  throw new Error("The policy-evidence playbook must stay registered")
}

// The page recomputes this on every render, so the test compares against the
// real engine's output rather than a recorded copy of it.
const analysis = runAnalysis(policyEvidenceCorpus)

function isBefore(earlier: Element, later: Element) {
  return Boolean(
    earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING,
  )
}

describe("PolicyEvidenceWorkbench", () => {
  beforeEach(() => {
    render(<PolicyEvidenceWorkbench playbook={playbook} />)
  })

  it("says what the page is not before it says what it is", () => {
    const notThis = screen.getByText(/No model is involved/)
    const butThis = screen.getByText(/no account or key/)

    expect(notThis).toBeVisible()
    expect(butThis).toBeVisible()
    expect(isBefore(notThis, butThis)).toBe(true)
    expect(screen.getAllByText("Synthetic working data").length).toBeGreaterThan(
      0,
    )
  })

  it("shows the envelope description and every record in full", () => {
    expect(screen.getByText(policyEvidenceDataset.description)).toBeVisible()

    const records = screen.getAllByRole("article")
    expect(records).toHaveLength(20)
    expect(records).toHaveLength(policyEvidenceCorpus.length)

    policyEvidenceCorpus.forEach((record, index) => {
      const rendered = records[index]
      // The anchor a citation links to is the record's own element.
      expect(rendered.id).toBe(documentElementId(record.id))
      expect(within(rendered).getByText(record.id)).toBeVisible()
      expect(within(rendered).getByText(record.text)).toBeVisible()
    })

    // Theme and stance are shown as words, not as the raw union values.
    const [first] = records
    expect(within(first).getByText("Access to services")).toBeVisible()
    expect(within(first).getByText("Critical")).toBeVisible()
  })

  it("labels the input as synthetic and the findings as computed output", () => {
    // The three provenance words DESIGN.md fixes, so a reader never has to
    // work out whether what they are looking at is real, invented, or derived.
    const synthetic = screen.getAllByText("Synthetic working data")[0]
    const computed = screen.getByText("Demo output")

    expect(synthetic).toBeVisible()
    expect(computed).toBeVisible()
    expect(isBefore(synthetic, computed)).toBe(true)
  })

  it("renders one section per finding, with its summary and every limitation", () => {
    expect(analysis.findings.length).toBeGreaterThan(0)

    for (const finding of analysis.findings) {
      const section = screen.getByRole("region", { name: finding.label })
      expect(within(section).getByText(finding.summary)).toBeVisible()
      for (const limitation of finding.limitations) {
        expect(within(section).getByText(limitation)).toBeVisible()
      }
    }
  })

  it("links every citation to the record it quotes", () => {
    for (const finding of analysis.findings) {
      const section = screen.getByRole("region", { name: finding.label })

      for (const citation of finding.evidence) {
        const link = within(section).getByRole("link", {
          name: new RegExp(
            citation.quote.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          ),
        })
        expect(link).toHaveAttribute(
          "href",
          `#${documentElementId(citation.documentId)}`,
        )
        // The anchor it points at must actually be on this page.
        expect(
          document.getElementById(documentElementId(citation.documentId)),
        ).not.toBeNull()
      }
    }
  })

  it("has nothing to interact with", () => {
    // No client boundary anywhere in the feature: every state on this page is
    // text, so the page reads identically with JavaScript switched off.
    for (const role of ["radio", "button", "combobox", "checkbox"] as const) {
      expect(screen.queryAllByRole(role)).toHaveLength(0)
    }
  })
})
