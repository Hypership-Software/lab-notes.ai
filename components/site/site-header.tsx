"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const navigation = [
  { href: "/playbooks", label: "Playbooks" },
  { href: "/method", label: "How this works" },
  { href: "/contribute", label: "Contribute" },
]

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header
      className="border-b-2 border-peat bg-surface text-peat"
      data-site-header
    >
      <a
        className="fixed top-3 left-3 z-50 -translate-y-[180%] rounded-[4px] border-2 border-peat bg-synthetic px-4 py-3 font-bold text-synthetic-ink transition-transform duration-150 focus:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-evidence focus-visible:ring-offset-2"
        data-skip-link
        href="#main-content"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex w-full max-w-[96rem] flex-col px-4 sm:flex-row sm:items-stretch sm:px-6 lg:px-8">
        <Link
          className="group flex min-h-24 items-center gap-3 py-4 no-underline sm:mr-auto sm:pr-8"
          href="/"
        >
          <span
            className="grid size-12 shrink-0 place-items-center border-2 border-peat bg-synthetic font-mono text-[0.6875rem] leading-none font-bold tracking-[-0.04em] text-synthetic-ink transition-transform duration-150 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            NI/17
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="font-display text-lg leading-none font-extrabold tracking-[-0.035em] sm:text-xl">
              Public-Service AI Playbooks
            </span>
            <span className="font-mono text-[0.625rem] leading-tight font-semibold tracking-[0.1em] text-peat-muted uppercase">
              Open-source builder reference
            </span>
          </span>
        </Link>
        <nav
          className="border-t-2 border-peat sm:border-t-0"
          data-primary-navigation
          aria-label="Primary"
        >
          <ul className="grid h-full list-none grid-cols-3 p-0 sm:flex">
            {navigation.map((item) => {
              const current = isCurrentPath(pathname, item.href)

              return (
                <li
                  className="flex min-w-0 border-l-2 border-peat first:border-l-0 sm:first:border-l-2"
                  key={item.href}
                >
                  <Link
                    className={cn(
                      "relative flex min-h-14 flex-1 items-center justify-center px-2 text-center text-xs leading-tight font-bold no-underline transition-colors duration-150 sm:min-w-28 sm:px-4 sm:text-sm",
                      "after:absolute after:inset-x-2 after:bottom-0 after:h-1 after:origin-left after:transition-transform after:duration-150",
                      current
                        ? "bg-evidence text-surface after:scale-x-100 after:bg-synthetic hover:bg-evidence-strong hover:text-surface"
                        : "after:scale-x-0 after:bg-signal hover:bg-paper hover:text-evidence-strong hover:after:scale-x-100",
                    )}
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
