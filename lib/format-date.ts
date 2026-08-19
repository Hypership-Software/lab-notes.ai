const formatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeZone: "UTC",
})

export function formatUtcDate(isoDate: string) {
  return formatter.format(new Date(`${isoDate}T00:00:00Z`))
}
