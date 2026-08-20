import { describe, expect, it } from "vitest"

import { getAllPlaybooks } from "@/lib/playbooks/registry"

import { hasHostedDemo } from "./hosted-demos"

describe("hosted demos", () => {
  it("registers a component for every playbook that promises a hosted page", () => {
    const missing = getAllPlaybooks()
      .filter((playbook) => "route" in playbook.demo)
      .filter((playbook) => !hasHostedDemo(playbook.slug))
      .map((playbook) => playbook.slug)

    expect(missing).toEqual([])
  })

  it("registers nothing for a playbook with no demonstration to open", () => {
    const unexpected = getAllPlaybooks()
      .filter((playbook) => !("route" in playbook.demo))
      .filter((playbook) => hasHostedDemo(playbook.slug))
      .map((playbook) => playbook.slug)

    expect(unexpected).toEqual([])
  })

  it("resolves the policy-evidence workbench by its own playbook slug", () => {
    expect(hasHostedDemo("policy-evidence")).toBe(true)
  })
})
