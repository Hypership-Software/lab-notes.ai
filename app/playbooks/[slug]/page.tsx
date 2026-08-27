import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PlaybookDetail } from "@/features/playbooks/detail/playbook-detail"
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks/registry"
import { pageMetadata } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return getPlaybookSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/playbooks/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) return {}

  return pageMetadata({
    path: `/playbooks/${slug}`,
    title: playbook.title,
    description: playbook.summary,
  })
}

export default async function PlaybookPage({
  params,
}: PageProps<"/playbooks/[slug]">) {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) notFound()

  return (
    <div className="w-full overflow-x-clip">
      <PlaybookDetail playbook={playbook} />
    </div>
  )
}
