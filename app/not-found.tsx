import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] border-y-2 border-peat bg-surface lg:grid-cols-10">
      <div className="flex flex-col justify-between bg-peat p-6 text-surface sm:p-10 lg:col-span-3">
        <p className="font-mono text-sm font-bold tracking-[0.16em] text-synthetic uppercase">
          Page not found
        </p>
        <p className="mt-24 font-display text-[clamp(8rem,24vw,20rem)] leading-[0.7] font-extrabold tracking-[-0.08em] text-synthetic lg:mt-0">
          404
        </p>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:p-16">
        <p className="font-mono text-xs font-bold tracking-[0.16em] text-signal-strong uppercase">
          No playbook at this address
        </p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] leading-[0.86] tracking-[-0.06em]">
          This trail ends here. The atlas does not.
        </h1>
        <p className="mt-7 max-w-2xl text-xl leading-relaxed text-peat-muted">
          Return to the complete list of 17 researched public-service
          opportunities and choose another starting point.
        </p>
        <Link
          className="mt-9 inline-flex min-h-12 w-fit items-center gap-3 border-2 border-peat bg-synthetic px-5 py-3 font-bold text-synthetic-ink no-underline transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-evidence motion-reduce:transition-none"
          href="/playbooks"
        >
          Open the opportunity atlas
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </div>
  )
}
