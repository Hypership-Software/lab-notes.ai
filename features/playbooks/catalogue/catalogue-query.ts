import { z } from "zod"

import {
  dataAccessibilityValues,
  maturityValues,
  riskValues,
  type DataAccessibility,
  type Maturity,
  type RiskLevel,
} from "@/lib/playbooks/schema"

export type CatalogueQuery = {
  query: string
  sectors: string[]
  patterns: string[]
  dataAccessibility: DataAccessibility[]
  maturity: Maturity[]
  risk: RiskLevel[]
}

const shortTextSchema = z.string().trim().min(1).max(80)
const dataAccessibilitySchema = z.enum(dataAccessibilityValues)
const maturitySchema = z.enum(maturityValues)
const riskSchema = z.enum(riskValues)

function toValues(value: string | string[] | undefined) {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

function unique<T>(values: T[]) {
  return [...new Set(values)]
}

function parseTextValues(value: string | string[] | undefined) {
  return unique(
    toValues(value).flatMap((candidate) => {
      const result = shortTextSchema.safeParse(candidate)
      return result.success ? [result.data] : []
    }),
  )
}

function parseEnumValues<Schema extends z.ZodType<string>>(
  schema: Schema,
  value: string | string[] | undefined,
): Array<z.output<Schema>> {
  return unique(
    toValues(value).flatMap((candidate) => {
      const result = schema.safeParse(candidate)
      return result.success ? [result.data] : []
    }),
  )
}

export function parseCatalogueQuery(
  searchParams: Record<string, string | string[] | undefined>,
): CatalogueQuery {
  const rawQuery = toValues(searchParams.q)[0] ?? ""

  return {
    query: rawQuery.trim().slice(0, 120),
    sectors: parseTextValues(searchParams.sector),
    patterns: parseTextValues(searchParams.pattern),
    dataAccessibility: parseEnumValues(
      dataAccessibilitySchema,
      searchParams.data,
    ),
    maturity: parseEnumValues(maturitySchema, searchParams.maturity),
    risk: parseEnumValues(riskSchema, searchParams.risk),
  }
}

export function serializeCatalogueQuery(query: CatalogueQuery) {
  const searchParams = new URLSearchParams()

  const textQuery = query.query.trim().slice(0, 120)
  if (textQuery) searchParams.set("q", textQuery)

  for (const value of query.sectors) searchParams.append("sector", value)
  for (const value of query.patterns) searchParams.append("pattern", value)
  for (const value of query.dataAccessibility) searchParams.append("data", value)
  for (const value of query.maturity) searchParams.append("maturity", value)
  for (const value of query.risk) searchParams.append("risk", value)

  return searchParams
}
