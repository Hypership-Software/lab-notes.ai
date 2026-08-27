import { ImageResponse } from "next/og"

import {
  OpenGraphCard,
  openGraphContentType,
  openGraphFonts,
  openGraphSize,
} from "@/lib/open-graph/card"
import { siteName, siteTagline } from "@/lib/site"

export const alt = `${siteName} — ${siteTagline} for Northern Ireland`
export const size = openGraphSize
export const contentType = openGraphContentType

export default function Image() {
  return new ImageResponse(
    (
      <OpenGraphCard
        eyebrow={siteName}
        title="17 public-service opportunities. The desk research is already done."
        titleSize={72}
        description="Published sources, safe synthetic starter data, honest constraints, and a domain build partner for your coding agent — for every opportunity named in Northern Ireland's draft AI strategy."
        tag="Open source"
        note="Independent. No government endorsement."
      />
    ),
    { ...size, fonts: [...openGraphFonts] },
  )
}
