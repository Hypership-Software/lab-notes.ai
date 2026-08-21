import dataJson from "@/content/playbooks/policy-evidence/policy-evidence.data.json"

import { syntheticDatasetSchema } from "@/lib/playbooks/dataset"

import { corpusSchema } from "./domain/types"

/**
 * The committed dataset, parsed once at module load: envelope first, then the
 * records through the corpus contract. A hand-edited dataset that no longer
 * satisfies either must fail the build, not reach a page.
 */
export const policyEvidenceDataset = syntheticDatasetSchema.parse(dataJson)

export const policyEvidenceCorpus = corpusSchema.parse(policyEvidenceDataset.records)
