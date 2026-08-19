import type { ReactNode } from "react"

// A `<dt>`/`<dd>` pair listing `items` as a `<ul>`, omitted entirely when
// `items` is empty so an optional list never renders a bare, valueless term.
export function DefinitionListRow({
  term,
  items,
}: {
  term: string
  items: readonly string[]
}): ReactNode {
  if (items.length === 0) {
    return null
  }

  return (
    <div>
      <dt>{term}</dt>
      <dd>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  )
}
