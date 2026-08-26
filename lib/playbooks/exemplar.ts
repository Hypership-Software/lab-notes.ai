/**
 * The one playbook the homepage walks through end to end: the hero's research
 * trail and the "worked example" section both read from here, so they can
 * never drift apart.
 *
 * Choose the exemplar for how easily a first-time visitor can follow it, not
 * for how important the domain is. A traffic count at a junction needs no
 * explanation; a bereavement journey step does.
 */
export const homepageExemplar = {
  slug: "traffic-flow",
  /**
   * Fields from the first synthetic record that the hero shows, with the
   * plain-English label a cold reader sees instead of the raw field name.
   */
  heroRow: [
    { field: "junction", label: "Junction" },
    { field: "hourBand", label: "Hour" },
    { field: "vehicleCount", label: "Vehicles counted" },
    { field: "busShare", label: "Buses", suffix: "%" },
  ],
  /** The caveat whose title and detail the hero's closing card shows. */
  heroCaveatTitle: "Signal changes have wider effects",
} as const
