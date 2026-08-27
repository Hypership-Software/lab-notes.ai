import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { formatUtcDate } from "@/lib/format-date"
import {
  OpenGraphCard,
  openGraphContentType,
  openGraphFonts,
  openGraphSize,
} from "@/lib/open-graph/card"
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks/registry"
import { siteName } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return getPlaybookSlugs().map((slug) => ({ slug }))
}

export const alt = `A public-service AI playbook on ${siteName}`
export const size = openGraphSize
export const contentType = openGraphContentType

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) notFound()

  const hasDataset = playbook.syntheticData.status === "available"

  return new ImageResponse(
    (
      <OpenGraphCard
        eyebrow={siteName}
        title={playbook.title}
        titleSize={playbook.title.length > 40 ? 64 : 80}
        description={playbook.summary}
        tag={hasDataset ? "Synthetic working data" : "No synthetic dataset"}
        note={`Reviewed ${formatUtcDate(playbook.lastReviewed)}`}
      />
    ),
    { ...size, fonts: [...openGraphFonts] },
  )
}
