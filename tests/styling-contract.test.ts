import { readFile } from "node:fs/promises"

import { expect, it } from "vitest"

it("keeps page components out of the global stylesheet", async () => {
  const css = await readFile("app/globals.css", "utf8")

  for (const selector of [
    ".dossier-row",
    ".catalogue-",
    ".playbook-detail",
    ".dataset-page",
    ".workbench-",
    ".source-dossier",
  ]) {
    expect(css).not.toContain(selector)
  }
})
