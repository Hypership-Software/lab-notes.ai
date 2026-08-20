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
  fixtureSha256: "7077d7f44ab8fcdce7262c16df04377e62b028bfa10e223d51d6db7acfc6f64e",
  structureNotePath:
    "content/playbooks/policy-evidence/fixtures/synthetic/consultation-analysis-structure.md",
  structureNoteSha256: "0e26b790feb8e107a56b0497945ec8ed444878330e3091a12cb43ff795d99915",
} as const

export type SyntheticCorpusManifest = typeof policyEvidenceCorpusManifest
