import { sectorValues, type Sector } from "./schema"

/**
 * The catalogue's grouping layer. Seventeen playbooks spread across thirteen
 * sectors leaves most sectors holding one entry, which reads as noise rather
 * than structure, so the catalogue groups by the broader service area a
 * reader is likely to be looking for and keeps the sector visible on the row.
 *
 * Areas are derived from `sector` rather than stored on the playbook: the
 * sector is already authored, checked, and filterable, and a second authored
 * field could disagree with it.
 */
export const serviceAreaValues = [
  "Citizen services and government",
  "Education and learning",
  "Environment, land and water",
  "Health and care",
  "Housing and communities",
  "Justice and community safety",
  "Transport",
] as const

export type ServiceArea = (typeof serviceAreaValues)[number]

const sectorToArea: Record<Sector, ServiceArea> = {
  Agriculture: "Environment, land and water",
  "Citizen services": "Citizen services and government",
  Communities: "Housing and communities",
  "Community safety": "Justice and community safety",
  "Cross-government": "Citizen services and government",
  Education: "Education and learning",
  Environment: "Environment, land and water",
  Health: "Health and care",
  Housing: "Housing and communities",
  // Both Infrastructure playbooks are water and wastewater, not roads.
  Infrastructure: "Environment, land and water",
  Justice: "Justice and community safety",
  "Justice and education": "Justice and community safety",
  Transport: "Transport",
}

/** One short sentence per area, so a group heading explains itself. */
export const serviceAreaDescriptions: Record<ServiceArea, string> = {
  "Citizen services and government":
    "Services people reach directly, and the cross-government work behind them.",
  "Education and learning": "Schools, classrooms, and the people teaching in them.",
  "Environment, land and water":
    "Land use, farming, river catchments, and treatment networks.",
  "Health and care": "Hospital operations and clinical support.",
  "Housing and communities":
    "Housing need and stock condition, and how communities are consulted.",
  "Justice and community safety":
    "Courts, prisons, and the research that informs community safety.",
  Transport: "Roads, junctions, and the networks that carry them.",
}

export function getServiceArea(sector: Sector): ServiceArea {
  return sectorToArea[sector]
}

/** Every sector maps to exactly one area — the test that keeps the two in step. */
export const mappedSectors: readonly Sector[] = sectorValues
