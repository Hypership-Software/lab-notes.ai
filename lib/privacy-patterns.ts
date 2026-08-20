/**
 * Person-shaped-data patterns, defined once and shared by the content
 * inventory test, the synthetic-corpus contract, and content validation. A
 * second copy of these is exactly the drift this module exists to prevent.
 */

/** Object keys that would indicate person-level record structure. */
export const sensitiveKeyPattern =
  /^(fullName|email|phone|address|nationalInsuranceNumber|healthAndCareNumber|dateOfBirth)$/i

/**
 * Text shapes that must never appear in committed synthetic material. Each
 * entry carries its own name so a failure can say which shape matched rather
 * than only that something did.
 *
 * These are deliberately broad. A false positive costs an author one reworded
 * fragment; a false negative puts person-shaped text in a public repository.
 */
export const personalDataTextPatterns = [
  { name: "email address", pattern: /[^\s@]+@[^\s@]+\.[a-z]{2,}/i },
  { name: "telephone number", pattern: /(?:\+44|\b0)\d[\d\s-]{7,}\d/ },
  { name: "URL", pattern: /\bhttps?:\/\/|\bwww\./i },
  // Two letters, six digits, and an A-D suffix. Broader than the real prefix
  // rules on purpose: this must reject anything shaped like the identifier.
  { name: "National Insurance number", pattern: /\b[A-Z]{2}\d{6}[A-D]\b/i },
  { name: "Health and Care number", pattern: /\b\d{10}\b/ },
] as const

/** Returns the name of the first person-shaped pattern found, if any. */
export function findPersonalDataShape(value: string): string | undefined {
  return personalDataTextPatterns.find(({ pattern }) => pattern.test(value))?.name
}
