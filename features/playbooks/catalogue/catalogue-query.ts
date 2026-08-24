import { z } from "zod"

import { sectorValues } from "@/lib/playbooks/schema"

/**
 * The whole catalogue view state: free-text search and a sector filter.
 * Both live in the URL so a view can be linked and restored, and both are
 * parsed permissively — an unrecognised value is dropped, never thrown, so
 * a stale or hand-edited link still renders a catalogue.
 */
export type CatalogueQuery = {
  query: string
  sectors: string[]
}

const queryCharacterLimit = 120
const sectorSchema = z.enum(sectorValues)

function toValues(value: string | string[] | undefined) {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

function parseSectors(value: string | string[] | undefined) {
  return [
    ...new Set(
      toValues(value).flatMap((candidate) => {
        const result = sectorSchema.safeParse(candidate)
        return result.success ? [result.data] : []
      }),
    ),
  ]
}

export function parseCatalogueQuery(
  searchParams: Record<string, string | string[] | undefined>,
): CatalogueQuery {
  const rawQuery = toValues(searchParams.q)[0] ?? ""

  return {
    query: rawQuery.trim().slice(0, queryCharacterLimit),
    sectors: parseSectors(searchParams.sector),
  }
}

export function serializeCatalogueQuery(query: CatalogueQuery) {
  const searchParams = new URLSearchParams()

  const textQuery = query.query.trim().slice(0, queryCharacterLimit)
  if (textQuery) searchParams.set("q", textQuery)
  for (const sector of query.sectors) searchParams.append("sector", sector)

  return searchParams
}
