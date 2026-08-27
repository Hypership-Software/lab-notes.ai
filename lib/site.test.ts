import { describe, expect, it } from "vitest"

import { pageMetadata, siteName, siteUrl } from "./site"

describe("siteUrl", () => {
  it("is an https origin with no path", () => {
    expect(siteUrl.protocol).toBe("https:")
    expect(siteUrl.pathname).toBe("/")
  })
})

describe("pageMetadata", () => {
  it("sets the canonical and Open Graph URL to the page path", () => {
    const metadata = pageMetadata({ path: "/playbooks" })

    expect(metadata.alternates).toEqual({ canonical: "/playbooks" })
    expect(metadata.openGraph).toMatchObject({
      url: "/playbooks",
      siteName,
      type: "website",
    })
  })

  it("leaves title and description to the layout when a page gives none", () => {
    const metadata = pageMetadata({ path: "/" })

    expect(metadata).not.toHaveProperty("title")
    expect(metadata).not.toHaveProperty("description")
  })

  it("passes a page's title and description through", () => {
    const metadata = pageMetadata({
      path: "/method",
      title: "How this works",
      description: "Plain English.",
    })

    expect(metadata.title).toBe("How this works")
    expect(metadata.description).toBe("Plain English.")
  })
})
