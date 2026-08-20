import type { CorpusTheme } from "@/features/policy-evidence/domain/types"

/**
 * Generator configuration for the policy-evidence corpus. The seed is recorded
 * rather than meaningful, and must not change once the fixture is committed:
 * every downstream hash in Tasks 9 and 10 is taken over its output. Bump
 * `generatorVersion` whenever generation logic changes the output.
 *
 * A type-only import from `features/` is deliberate. The alternative is a
 * second theme list living in content, which is the drift this avoids.
 */
export const policyEvidenceCorpusConfig = {
  seed: 20260820,
  size: 48,
  themeWeights: {
    "access-to-services": 1,
    "workforce-capability": 1,
    "data-governance": 1,
    accountability: 1,
    "procurement-and-reuse": 1,
    "environmental-cost": 1,
  } satisfies Record<CorpusTheme, number>,
  generatorVersion: "1.0.0",
} as const

export const policyEvidenceCorpusManifest = {
  seed: policyEvidenceCorpusConfig.seed,
  generatorVersion: policyEvidenceCorpusConfig.generatorVersion,
  fixturePath: "content/playbooks/policy-evidence/fixtures/synthetic/corpus.json",
  fixtureSha256: "6aa7d6d2ad30a073c0df1e995978c069acb5078628bb60d8d0500783c9a98805",
  structureNotePath:
    "content/playbooks/policy-evidence/fixtures/synthetic/consultation-analysis-structure.md",
  structureNoteSha256: "4600a61b42e986d0244dcf640bd04b1165a143672fa1f93d0ddf323dbdad75b2",
} as const

export type SyntheticCorpusManifest = typeof policyEvidenceCorpusManifest
