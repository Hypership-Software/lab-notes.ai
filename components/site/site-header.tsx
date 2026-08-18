"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { href: "/playbooks", label: "Playbooks" },
  { href: "/method", label: "Method" },
  { href: "/contribute", label: "Contribute" },
]

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="site-header__inner">
        <Link className="site-identity" href="/">
          <span className="site-identity__name">Public-Service AI Playbooks</span>
          <span className="site-identity__qualifier">
            Independent open-source project
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="primary-nav">
            {navigation.map((item) => {
              const current = isCurrentPath(pathname, item.href)

              return (
                <li key={item.href}>
                  <Link
                    className="primary-nav__link"
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
