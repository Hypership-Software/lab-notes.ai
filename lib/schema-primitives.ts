import { z } from "zod"

/**
 * Field-level contracts shared by more than one schema module.
 *
 * A second copy of any of these is the drift this module exists to prevent: a
 * digest, slug, or date validated one way in the playbook schema and another
 * way in a feature's domain schema is two contracts wearing one name.
 */

/** The slug body, unanchored, so a longer pattern can embed it. */
export const kebabSlugSource = "[a-z0-9]+(?:-[a-z0-9]+)*"

export const kebabSlugPattern = new RegExp(`^${kebabSlugSource}$`)

export const kebabSlugSchema = z
  .string()
  .regex(kebabSlugPattern, "Use a lowercase kebab-case slug")

export const sha256Schema = z
  .string()
  .regex(/^[a-f0-9]{64}$/, "Use a lowercase SHA-256 digest")

export const isoDateSchema = z.iso.date()
