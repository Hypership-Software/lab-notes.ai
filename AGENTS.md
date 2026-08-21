<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

- Read `PRODUCT.md`, `DESIGN.md`, and `build-plan.md` before changing product behaviour, content structure, or visual design.
- Keep this repository as one Next.js application with one package manifest and one deployment unit. Feature and content folders are internal module boundaries, not separate apps or packages.
- Public-facing content must use plain English. Technical implementation detail should be available through progressive disclosure and repository links.
- Every playbook must use the shared typed schema and retain the strategy-example, data-source, synthetic-data, demo, and caveats sections.
- Synthetic datasets are AI-authored stand-ins shaped by what the real, published sources make public. Do not add production data pipelines, runtime model calls, or required API keys without an approved design change.
- Visibly distinguish real published sources, synthetic working data, and demo output.
- Never commit secrets, credentials, private endpoints, personal names, personal local paths, or sensitive person-level data.
- Add shadcn/ui primitives through the CLI and keep generated primitives separate from project-specific components.
- Prefer Server Components. Add `"use client"` only at the smallest interactive boundary.
- Domain logic must remain framework-agnostic and receive unit tests. Synchronous components may receive focused semantic component tests; async Server Components are verified through typecheck, production builds, and manual route review.
- Do not add Playwright or another automated browser-test harness. Accessibility automation comes from the existing Next.js ESLint configuration, including `eslint-plugin-jsx-a11y`; complete flows, no-JavaScript readability, keyboard use, zoom, reduced motion, and forced colours are release-review checks.
- WCAG 2.2 AA, keyboard operation, visible focus, reduced motion, forced colours, 200% zoom, and a no-JavaScript core explanation are acceptance requirements.
- Keep local Superpowers working specifications in `docs/superpowers/`; that directory is intentionally ignored. Product, design, and build-plan documents at the repository root are tracked project artefacts.
