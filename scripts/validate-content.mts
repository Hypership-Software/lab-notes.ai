import path from "node:path"
import { fileURLToPath } from "node:url"

import { getAllPlaybooks } from "../lib/playbooks/registry"
import { validateContent } from "./validate-content-core"

export { validateContent }

async function run() {
  const errors = await validateContent()

  if (errors.length === 0) {
    console.log(`Validated ${getAllPlaybooks().length} playbooks.`)
    return
  }

  for (const error of errors) console.error(error)
  process.exitCode = 1
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : undefined
const currentPath = fileURLToPath(import.meta.url)

if (invokedPath === currentPath) {
  await run()
}
