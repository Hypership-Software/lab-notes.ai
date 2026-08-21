import { z } from "zod"

/**
 * The one envelope every committed synthetic dataset uses. Record shape is
 * per-domain and deliberately untyped here: the disclosure literal, the
 * privacy walk in content validation, and per-consumer contracts (the
 * policy-evidence corpus) are the guarantees. No generator, no seed, no hash —
 * an authored dataset is its own original.
 */
export const syntheticDatasetSchema = z.strictObject({
  disclosure: z.literal("Synthetic working data"),
  description: z.string().trim().min(10),
  records: z.array(z.record(z.string(), z.unknown())).min(1),
})

export type SyntheticDataset = z.infer<typeof syntheticDatasetSchema>
