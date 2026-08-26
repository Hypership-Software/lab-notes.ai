/** Turn `successRateBand` into `Success rate band` for a field label. */
export function fieldLabel(field: string): string {
  const spaced = field
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()

  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase()
}

/** Preserve complete values while giving empty and boolean cells plain labels. */
export function datasetValueText(value: unknown): string {
  if (value === null || value === undefined) return "—"
  if (typeof value === "number") return String(value)
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (typeof value === "string") return value
  return JSON.stringify(value)
}
