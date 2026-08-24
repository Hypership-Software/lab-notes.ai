import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__title">Independent open-source project</p>
          <p className="site-footer__copy">
            These playbooks interpret the draft strategy&rsquo;s example projects
            for scrutiny and reuse. They do not represent deployed services or
            government endorsement.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="site-footer__links">
            <li>
              <Link href="/method">How this works</Link>
            </li>
            <li>
              <Link href="/contribute">How to contribute</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
