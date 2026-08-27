import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

import { HypershipMark } from "@/components/site/hypership-mark"

export function SiteFooter() {
  return (
    <footer
      className="mt-auto border-t-2 border-peat bg-peat text-paper"
      data-site-footer
    >
      <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-[minmax(0,3fr)_minmax(16rem,1fr)]">
        <div className="border-b-2 border-paper/40 px-4 py-12 sm:px-6 lg:border-r-2 lg:border-b-0 lg:px-8 lg:py-16">
          <div className="flex max-w-3xl flex-col gap-5">
            <p className="font-display text-3xl leading-[0.95] font-extrabold tracking-[-0.045em] text-surface sm:text-5xl">
              Independent open-source accelerator
            </p>
            <p className="max-w-[62ch] text-base leading-relaxed text-paper/80">
              Made to be checked, adapted and reused. These playbooks are not
              live services and carry no government endorsement.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <p className="font-mono text-[0.6875rem] font-bold tracking-[0.12em] text-structure uppercase">
            Continue the work
          </p>
          <nav aria-label="Footer">
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              <li className="border-t border-paper/40">
                <Link
                  className="flex min-h-12 items-center justify-between gap-4 py-2 font-bold no-underline transition-colors hover:text-synthetic"
                  href="/method"
                >
                  How this works
                  <span className="font-mono text-xs" aria-hidden="true">
                    01
                  </span>
                </Link>
              </li>
              <li className="border-y border-paper/40">
                <Link
                  className="flex min-h-12 items-center justify-between gap-4 py-2 font-bold no-underline transition-colors hover:text-synthetic"
                  href="/contribute"
                >
                  How to contribute
                  <span className="font-mono text-xs" aria-hidden="true">
                    02
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t-2 border-paper/40">
        <div className="mx-auto flex w-full max-w-[96rem] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.6875rem] font-semibold tracking-[0.12em] text-paper/80 uppercase no-underline transition-colors hover:text-synthetic"
            href="https://hypership.tech"
            target="_blank"
            rel="noreferrer noopener"
          >
            <HypershipMark className="size-4 shrink-0" />
            Built by Hypership
            <ExternalLinkIcon className="size-3" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="m-0 font-mono text-[0.6875rem] tracking-[0.12em] text-paper/60 uppercase">
            Apache-2.0
          </p>
        </div>
      </div>
    </footer>
  )
}
