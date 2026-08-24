import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PolicyEvidenceWorkbench } from "@/features/policy-evidence/components/policy-evidence-workbench"
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks/registry"

export const dynamicParams = false

/**
 * Every playbook gets a demo route, including the sixteen with no demo. A slug
 * that resolves on `/playbooks/[slug]` but 404s on `/playbooks/[slug]/demo` is a
 * worse answer than a page saying what is missing, so the params cover the whole
 * registry and the page branches on the demo's own status instead.
 */
export function generateStaticParams() {
  return getPlaybookSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/playbooks/[slug]/demo">): Promise<Metadata> {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) return {}

  const hasDemo = playbook.demo.status === "available"

  return {
    title: hasDemo ? `${playbook.title}: demo` : `${playbook.title}: no demo yet`,
    description: hasDemo
      ? `A server-rendered demo for ${playbook.title}, computed from committed synthetic data with no model and no key.`
      : `Why ${playbook.title} has no demo yet.`,
  }
}

export default async function PlaybookDemoPage({
  params,
}: PageProps<"/playbooks/[slug]/demo">) {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) notFound()

  if (playbook.demo.status === "available") {
    // One playbook has a demo, and this is it. The guard is here so that a
    // second playbook declaring `available` fails the static build rather than
    // silently rendering policy-evidence's data under another title.
    if (playbook.slug !== "policy-evidence") {
      throw new Error(
        `Playbook "${playbook.slug}" declares an available demo but no demo is implemented for it`,
      )
    }

    return <PolicyEvidenceWorkbench playbook={playbook} />
  }

  return (
    <div className="page-shell demo-unavailable-page">
      <header className="page-intro reading-width">
        <p className="workbench-page__breadcrumb">
          <Link href={`/playbooks/${playbook.slug}`}>
            Back to the {playbook.title} playbook
          </Link>
        </p>
        <h1>{playbook.title}: no demo yet</h1>
        <p>{playbook.demo.note}</p>
      </header>
    </div>
  )
}
