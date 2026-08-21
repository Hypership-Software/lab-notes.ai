import { describe, expect, it } from "vitest"

import { playbookSchema, type PlaybookInput } from "./schema"

function validPlaybook(): PlaybookInput {
  return {
    schemaVersion: 2,
    slug: "policy-evidence",
    title: "Policy Evidence Workbench",
    summary: "Group synthetic consultation responses into themes a policy team could investigate further.",
    sector: "Cross-government",
    strategyExample: {
      proposal: "The draft strategy names AI-assisted analysis of consultation responses as a potential public-service application.",
      draftReference: "Table 2 — potential public-service applications",
      url: "https://consultations.nidirect.gov.uk/teo/artificial-intelligence-public-consultation",
    },
    dataSources: [
      {
        id: "ni-ai-strategy-consultation",
        publisher: "The Executive Office",
        title: "Northern Ireland Artificial Intelligence Strategy consultation",
        url: "https://consultations.nidirect.gov.uk/teo/artificial-intelligence-public-consultation",
        covers: "The draft strategy text and its consultation questions.",
        access: "open",
        relevance: "It is the document whose example projects these playbooks explore.",
      },
    ],
    syntheticData: {
      status: "available",
      dataPath: "content/playbooks/policy-evidence/policy-evidence.data.json",
      method: "Twenty synthetic consultation responses authored by AI, shaped by the structure of a published consultation response report.",
      limitations: ["The dataset is far smaller and tidier than a real consultation mailbox."],
    },
    demo: {
      status: "available",
      route: "/playbooks/policy-evidence/demo",
      howItWorks: "A transparent keyword analysis groups the synthetic responses into themes and cites the exact passages it matched.",
    },
    caveats: ["Nothing here is evidence that an AI system would work operationally."],
    lastReviewed: "2026-08-21",
  }
}

describe("playbookSchema", () => {
  it("parses a complete v2 playbook", () => {
    const parsed = playbookSchema.parse(validPlaybook())
    expect(parsed.schemaVersion).toBe(2)
    expect(parsed.demo.status).toBe("available")
  })

  it("rejects schema version 1", () => {
    expect(playbookSchema.safeParse({ ...validPlaybook(), schemaVersion: 1 }).success).toBe(false)
  })

  it("rejects a malformed slug", () => {
    expect(playbookSchema.safeParse({ ...validPlaybook(), slug: "Policy Evidence" }).success).toBe(false)
  })

  it("rejects an empty data-source list", () => {
    expect(playbookSchema.safeParse({ ...validPlaybook(), dataSources: [] }).success).toBe(false)
  })

  it("rejects duplicate data-source ids", () => {
    const playbook = validPlaybook()
    playbook.dataSources = [playbook.dataSources[0], { ...playbook.dataSources[0] }]
    expect(playbookSchema.safeParse(playbook).success).toBe(false)
  })

  it("rejects an available demo without an available dataset", () => {
    const playbook = validPlaybook()
    playbook.syntheticData = {
      status: "not-responsible",
      reason: "A useful stand-in would be person-shaped.",
      whatContributorsNeed: "Formal research access under ethics governance.",
    }
    expect(playbookSchema.safeParse(playbook).success).toBe(false)
  })

  it("rejects a demo route that does not match the slug", () => {
    const playbook = validPlaybook()
    playbook.demo = { status: "available", route: "/playbooks/other/demo", howItWorks: "A transparent keyword analysis over the dataset." }
    expect(playbookSchema.safeParse(playbook).success).toBe(false)
  })

  it("rejects an empty caveats list", () => {
    expect(playbookSchema.safeParse({ ...validPlaybook(), caveats: [] }).success).toBe(false)
  })

  it("rejects unknown fields such as maturity", () => {
    expect(playbookSchema.safeParse({ ...validPlaybook(), maturity: "assessed" }).success).toBe(false)
  })
})
