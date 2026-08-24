import type { DataAccess, SyntheticData } from "./schema"

export const dataAccessLabels: Record<DataAccess, string> = {
  open: "Open data",
  "registration-or-key": "Registration or key required",
  restricted: "Restricted",
}

export const syntheticDataBadgeLabels: Record<SyntheticData["status"], string> = {
  available: "Synthetic dataset available",
  "not-responsible": "No synthetic dataset",
}
