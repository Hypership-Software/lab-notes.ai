import type { ReactNode } from "react"

import type { Caveat } from "@/lib/playbooks/schema"

export function BuildConstraintList({
  caveats,
  headingId,
}: {
  caveats: readonly Caveat[]
  headingId: string
}): ReactNode {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 scroll-mt-28 bg-peat py-16 text-paper sm:py-24"
      aria-labelledby={headingId}
    >
      <div className="mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-synthetic">
          Conditions, not a checklist
        </p>
        <h2
          id={headingId}
          className="mt-3 scroll-mt-28 max-w-4xl text-4xl text-paper sm:text-6xl lg:text-7xl"
        >
          Before you build
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-paper/80">
          These are not footnotes. They are conditions that any responsible
          prototype would need to address.
        </p>

        <ul className="mt-12 grid border-t border-paper/40 md:grid-cols-2">
          {caveats.map((caveat, index) => (
            <li
              key={caveat.title}
              className="border-b border-paper/40 py-7 md:odd:pr-8 md:even:border-l md:even:pl-8"
            >
              <p className="font-mono text-xs text-synthetic" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl text-paper">{caveat.title}</h3>
              <p className="mt-3 text-paper/80">{caveat.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
