import { describe, expect, it } from "vitest"

import { playbookSchema, type PlaybookInput } from "./schema"

function validPlaybook(): PlaybookInput {
  return {
    schemaVersion: 3,
    slug: "policy-evidence",
    title: "Policy Evidence",
    summary: "Explore how published consultation material could support transparent policy research.",
    sector: "Cross-government",
    strategyExample: {
      proposal: "The draft strategy names AI-assisted analysis of consultation responses as a potential public-service application.",
      draftReference: "Table 2 — potential public-service applications",
      url: "https://consultations.nidirect.gov.uk/teo/artificial-intelligence-public-consultation",
    },
    dataSources: [{
      id: "ni-ai-strategy-consultation",
      publisher: "The Executive Office",
      title: "Northern Ireland Artificial Intelligence Strategy consultation",
      url: "https://consultations.nidirect.gov.uk/teo/artificial-intelligence-public-consultation",
      covers: "The draft strategy text and its consultation questions.",
      access: "open",
      relevance: "It is the document whose public-service opportunities these playbooks explore.",
    }],
    syntheticData: {
      status: "available",
      dataPath: "content/playbooks/policy-evidence/policy-evidence.data.json",
      purpose: "Explore transparent methods for organizing a small consultation corpus.",
      preparation: "AI authored twenty fictional responses shaped by the structure of published consultation reporting.",
      limitations: ["The dataset is far smaller and tidier than a real consultation mailbox."],
    },
    caveats: [{
      title: "Not operational evidence",
      detail: "Nothing here demonstrates that an AI system would work in a live policy process.",
    }],
    lastReviewed: "2026-08-21",
  }
}

describe("playbookSchema", () => {
  it("parses a complete v3 playbook", () => {
    const parsed = playbookSchema.parse(validPlaybook())
    expect(parsed.schemaVersion).toBe(3)
    expect(parsed.syntheticData.status).toBe("available")
  })

  it("rejects schema version 2", () => {
    expect(playbookSchema.safeParse({ ...validPlaybook(), schemaVersion: 2 }).success).toBe(false)
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

  it("rejects the removed showcase field", () => {
    const removedShowcaseField = ["de", "mo"].join("")

    expect(playbookSchema.safeParse({
      ...validPlaybook(),
      [removedShowcaseField]: { status: "not-yet" },
    }).success).toBe(false)
  })

  it("rejects an empty caveats list", () => {
    expect(playbookSchema.safeParse({ ...validPlaybook(), caveats: [] }).success).toBe(false)
  })

  it("rejects unknown fields such as maturity", () => {
    expect(playbookSchema.safeParse({ ...validPlaybook(), maturity: "assessed" }).success).toBe(false)
  })

  it("rejects an available dataset purpose longer than 240 characters", () => {
    const playbook = validPlaybook()
    if (playbook.syntheticData.status !== "available") {
      throw new Error("The valid fixture must contain an available dataset")
    }
    playbook.syntheticData = {
      ...playbook.syntheticData,
      purpose: "a".repeat(241),
    }
    expect(playbookSchema.safeParse(playbook).success).toBe(false)
  })

  it("rejects an available dataset preparation longer than 240 characters", () => {
    const playbook = validPlaybook()
    if (playbook.syntheticData.status !== "available") {
      throw new Error("The valid fixture must contain an available dataset")
    }
    playbook.syntheticData = {
      ...playbook.syntheticData,
      preparation: "a".repeat(241),
    }
    expect(playbookSchema.safeParse(playbook).success).toBe(false)
  })

  it("rejects caveat titles longer than 80 characters", () => {
    const playbook = validPlaybook()
    playbook.caveats = [{
      title: "a".repeat(81),
      detail: "Nothing here demonstrates that an AI system would work in a live policy process.",
    }]
    expect(playbookSchema.safeParse(playbook).success).toBe(false)
  })
})
