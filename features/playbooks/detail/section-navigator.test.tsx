import { act, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { SectionNavigator } from "./section-navigator"

const sections = [
  { id: "opportunity", label: "Opportunity" },
  { id: "research", label: "Research already done" },
  { id: "starter-dataset", label: "Starter dataset" },
  { id: "build-partner", label: "Domain build partner" },
  { id: "before-you-build", label: "Before you build" },
] as const

let observerCallback: IntersectionObserverCallback
const observe = vi.fn()
const disconnect = vi.fn()

function entry(id: string, top: number): IntersectionObserverEntry {
  const target = document.getElementById(id)
  if (!target) throw new Error(`Missing test section ${id}`)

  return {
    boundingClientRect: { top } as DOMRectReadOnly,
    intersectionRatio: 1,
    intersectionRect: {} as DOMRectReadOnly,
    isIntersecting: true,
    rootBounds: null,
    target,
    time: 0,
  }
}

describe("SectionNavigator", () => {
  beforeEach(() => {
    observe.mockReset()
    disconnect.mockReset()
    vi.stubGlobal(
      "IntersectionObserver",
      class MockIntersectionObserver {
        constructor(callback: IntersectionObserverCallback) {
          observerCallback = callback
        }

        observe = observe
        disconnect = disconnect
        unobserve = vi.fn()
        takeRecords = vi.fn()
      },
    )
  })

  afterEach(() => vi.unstubAllGlobals())

  it("links every section fragment and marks the nearest intersecting section", () => {
    const { unmount } = render(
      <>
        <SectionNavigator sections={sections} />
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            {section.label}
          </section>
        ))}
      </>,
    )

    expect(screen.getByRole("link", { name: "Starter dataset" })).toHaveAttribute(
      "href",
      "#starter-dataset",
    )
    expect(
      screen.getByRole("link", { name: "Starter dataset" }),
    ).not.toHaveClass("transition-colors")
    expect(observe).toHaveBeenCalledTimes(sections.length)

    act(() => {
      observerCallback(
        [entry("research", 140), entry("starter-dataset", 24)],
        {} as IntersectionObserver,
      )
    })

    expect(screen.getByRole("link", { name: "Starter dataset" })).toHaveAttribute(
      "aria-current",
      "location",
    )
    expect(screen.getByRole("link", { name: "Research already done" })).not.toHaveAttribute(
      "aria-current",
    )

    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  })
})
