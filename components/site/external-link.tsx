import { ExternalLinkIcon } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function ExternalLink({
  children,
  className,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      className={cn("external-link", className)}
      {...props}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span>{children}</span>
      <ExternalLinkIcon aria-hidden="true" data-icon="inline-end" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
