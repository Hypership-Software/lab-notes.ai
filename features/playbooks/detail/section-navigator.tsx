"use client"

import { useEffect, useState } from "react"

export type DetailSection = {
  id: string
  label: string
}

export function SectionNavigator({
  sections,
}: {
  sections: readonly DetailSection[]
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return

    const intersecting = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.set(entry.target.id, entry.boundingClientRect.top)
          } else {
            intersecting.delete(entry.target.id)
          }
        }

        const closest = [...intersecting].sort(
          ([, leftTop], [, rightTop]) =>
            Math.abs(leftTop) - Math.abs(rightTop),
        )[0]
        if (closest) setActiveId(closest[0])
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.1, 0.5] },
    )

    for (const { id } of sections) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="On this page" className="border-t-2 border-peat pt-3">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-peat-muted">
        On this page
      </p>
      <ol className="mt-3 flex flex-col gap-1">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              className="group flex min-h-11 items-center gap-3 border-b border-structure py-2 no-underline hover:text-evidence-strong aria-[current=location]:border-evidence aria-[current=location]:font-bold aria-[current=location]:text-evidence-strong"
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "location" : undefined}
            >
              <span
                className="font-mono text-xs text-peat-muted group-aria-[current=location]:text-evidence-strong"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
