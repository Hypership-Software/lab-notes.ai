import Link from "next/link"

export default function NotFound() {
  return (
    <div className="page-shell not-found-page">
      <header className="page-intro reading-width">
        <h1>We cannot find that page</h1>
        <p>
          The address you followed does not match anything on this site.
        </p>
      </header>
      <Link className="primary-action" href="/playbooks">
        Explore the playbooks
      </Link>
    </div>
  )
}
