import goldJson from "@/content/playbooks/policy-evidence/policy-evidence.gold.json"
import dataJson from "@/content/playbooks/policy-evidence/policy-evidence.data.json"

import { corpusSchema, evaluationGoldSchema } from "./domain/types"

/**
 * The committed dataset and expectation set, parsed once at module load.
 *
 * These are JSON imports rather than filesystem reads so the bundler resolves
 * them at build time and the demo route can prerender without touching disk.
 * Both are parsed through their schema here rather than cast: a hand-edited
 * dataset that no longer satisfies its contract must fail the build, not reach
 * a page.
 */
export const policyEvidenceCorpus = corpusSchema.parse(dataJson)

export const policyEvidenceGold = evaluationGoldSchema.parse(goldJson)
