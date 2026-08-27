import type { MetadataRoute } from "next"

import { getAllPlaybooks } from "@/lib/playbooks/registry"
import { siteUrl } from "@/lib/site"

/**
 * Every public route, with playbook pages dated by their last content review.
 * Site-wide pages take the most recent review date so the sitemap changes only
 * when the content does, not on every build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const playbooks = getAllPlaybooks()
  const latestReview = playbooks
    .map((playbook) => playbook.lastReviewed)
    .sort()
    .at(-1)
  const absolute = (path: string) => new URL(path, siteUrl).href

  const sitePages: MetadataRoute.Sitemap = [
    { url: absolute("/"), lastModified: latestReview, priority: 1 },
    { url: absolute("/playbooks"), lastModified: latestReview, priority: 0.9 },
    { url: absolute("/method"), lastModified: latestReview, priority: 0.6 },
    { url: absolute("/contribute"), lastModified: latestReview, priority: 0.5 },
  ]

  const playbookPages: MetadataRoute.Sitemap = playbooks.flatMap((playbook) => [
    {
      url: absolute(`/playbooks/${playbook.slug}`),
      lastModified: playbook.lastReviewed,
      priority: 0.8,
    },
    {
      url: absolute(`/playbooks/${playbook.slug}/dataset`),
      lastModified: playbook.lastReviewed,
      priority: 0.6,
    },
  ])

  return [...sitePages, ...playbookPages]
}
