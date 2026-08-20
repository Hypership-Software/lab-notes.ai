import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import { policyEvidenceCorpusConfig } from "../content/playbooks/policy-evidence/fixtures/synthetic/manifest"
import { generateSyntheticCorpus } from "../features/policy-evidence/domain/generate-synthetic-corpus"

const fixtureDirectory = "content/playbooks/policy-evidence/fixtures/synthetic"
const fixturePath = path.join(fixtureDirectory, "corpus.json")
const structureNotePath = path.join(fixtureDirectory, "consultation-analysis-structure.md")

/** Hash raw bytes, never decoded text, so no newline translation can enter. */
async function sha256(filePath: string) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex")
}

const { generatorVersion, ...config } = policyEvidenceCorpusConfig

const documents = generateSyntheticCorpus(config)

// LF explicitly, with a trailing newline. `.gitattributes` pins this directory
// to LF so the committed bytes match what was hashed here.
await writeFile(fixturePath, `${JSON.stringify(documents, null, 2)}\n`, "utf8")

console.log(`Wrote ${documents.length} documents to ${fixturePath}`)
console.log(`generatorVersion   ${generatorVersion}`)
console.log(`fixtureSha256      ${await sha256(fixturePath)}`)
console.log(`structureNoteSha256 ${await sha256(structureNotePath)}`)
