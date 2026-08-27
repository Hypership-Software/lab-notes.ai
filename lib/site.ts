import type { Metadata } from "next"

/**
 * Where the site lives, plus the metadata every page shares.
 *
 * Next.js replaces a page's nested `openGraph` object instead of deep-merging
 * it with the layout's, so pages build their metadata through `pageMetadata`
 * rather than restating the site name, locale, and canonical URL each time.
 */
export const siteUrl = new URL("https://lab-notes.ai")
export const siteName = "lab-notes.ai"
export const siteTagline = "Public-service AI playbooks"
export const siteDescription =
  "An independent open-source accelerator for the 17 public-service opportunities named in Northern Ireland's draft AI strategy: published sources, safe synthetic starter data, honest constraints, and a domain build partner for your coding agent."

/** A site-relative route path, resolved against `siteUrl` by Next.js. */
export type SitePath = `/${string}`

type PageMetadataInput = {
  path: SitePath
  title?: string
  description?: string
}

/**
 * Metadata for one page: its canonical URL, matching Open Graph URL, and the
 * shared Open Graph fields, with title and description only when the page
 * supplies them so the layout defaults still apply otherwise.
 */
export function pageMetadata({
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  return {
    ...(title === undefined ? {} : { title }),
    ...(description === undefined ? {} : { description }),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      locale: "en_GB",
      url: path,
    },
  }
}
