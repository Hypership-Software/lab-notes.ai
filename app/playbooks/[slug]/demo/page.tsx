import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { DemoReadiness } from "@/features/playbooks/detail/demo-readiness"
import { PolicyEvidenceWorkbench } from "@/features/policy-evidence/components/policy-evidence-workbench"
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks/registry"

export const dynamicParams = false

/**
 * Every playbook gets a demo route, including the sixteen with no demonstration.
 * A slug that resolves on `/playbooks/[slug]` but 404s on `/playbooks/[slug]/demo`
 * is a worse answer than a page explaining what is missing, so the params cover
 * the whole registry and the page branches on availability instead.
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

  const hasDemo = playbook.demo.availability !== "none"

  return {
    title: hasDemo ? `${playbook.title} demonstration` : `${playbook.title}: no demonstration`,
    description: hasDemo
      ? `A bounded example for ${playbook.title}, running on synthetic working data.`
      : `Why ${playbook.title} has no demonstration yet, and what would need to exist first.`,
  }
}

export default async function PlaybookDemoPage({
  params,
}: PageProps<"/playbooks/[slug]/demo">) {
  const { slug } = await params
  const playbook = getPlaybook(slug)
  if (!playbook) notFound()

  if (playbook.demo.availability === "baseline-only") {
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
        <h1>{playbook.title}</h1>
        <p className="home-intro__lede">
          There is no demonstration to try here yet. This page says why, rather
          than leaving you at a dead link.
        </p>
      </header>
      <div className="reading-width">
        <DemoReadiness
          demo={playbook.demo}
          nextValidationSteps={playbook.nextValidationSteps}
        />
      </div>
    </div>
  )
}
