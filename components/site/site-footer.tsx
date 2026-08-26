import Link from "next/link"

export function SiteFooter() {
  return (
    <footer
      className="mt-auto border-t-2 border-peat bg-peat text-paper"
      data-site-footer
    >
      <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-[minmax(0,3fr)_minmax(16rem,1fr)]">
        <div className="grid gap-8 border-b-2 border-paper/40 px-4 py-12 sm:grid-cols-[5rem_minmax(0,1fr)] sm:px-6 lg:border-r-2 lg:border-b-0 lg:px-8 lg:py-16">
          <p
            className="font-mono text-xs leading-none font-bold tracking-[0.14em] text-synthetic uppercase"
            aria-hidden="true"
          >
            REF/NI
            <br />
            2026
          </p>
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
    </footer>
  )
}
