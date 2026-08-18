# AI Public-Service Playbooks MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality, open-source Next.js catalogue of seventeen public-service AI playbooks with one complete, key-free Policy Evidence Workbench recorded exemplar.

**Architecture:** One static-first Next.js 16 App Router application. Typed TypeScript playbook definitions are validated with Zod and rendered through Server Components; small Client Components handle URL-backed catalogue filters and local demonstration state. Policy Evidence Workbench uses versioned official-source excerpts, deterministic synthetic fixtures, a transparent non-AI baseline, checked-in recorded AI-assisted output, and a labelled evaluation set. There is no database, authentication, ingestion pipeline, or hosted model call in the MVP.

**Tech Stack:** Next.js 16.3, React 19.2, TypeScript, Tailwind CSS 4, shadcn/ui with Base UI primitives, Zod, Vitest, React Testing Library, and the accessibility rules included by `eslint-config-next/core-web-vitals`.

**Spec:** [`DESIGN.md`](./DESIGN.md), supported by [`PRODUCT.md`](./PRODUCT.md)

## Global constraints

- Keep one `package.json`, one Next.js application, and one deployment unit.
- Follow `AGENTS.md`; read the relevant installed Next.js guide before using an unfamiliar API.
- Use npm and commit `package-lock.json` changes.
- Use shadcn/ui primitives through `npx shadcn@latest add`; do not hand-create lookalike primitives.
- Prefer Server Components. Place `"use client"` at the narrowest stateful boundary.
- Keep policy-evidence domain functions independent of React and Next.js.
- Write the failing test before the production implementation within each behaviour task.
- Use a small permissible official-source excerpt only to establish realistic structure and method. Run the product on deterministic synthetic fixtures.
- No runtime model call, required key, live departmental integration, user upload, database, or background job.
- No secret, credential, private endpoint, personal name, personal local path, or sensitive person-level record in tracked files, fixtures, examples, snapshots, metadata, or commit messages.
- Never present synthetic fixtures as official data or recorded output as a live service.
- Keep the deterministic non-AI baseline credible and visible.
- Do not declare `partner-ready`, `operational-pilot`, or `evaluated-service` without the external review required by `DESIGN.md`.
- All core explanation and recorded evidence remains readable without client JavaScript.
- Meet WCAG 2.2 AA. Enforce the existing JSX accessibility lint rules, then manually verify keyboard use, focus, reduced motion, forced colours, 200% zoom, 320 CSS pixel reflow, and the no-JavaScript reading path before release.
- Do not add an automated browser-test harness. Keep route-level acceptance review manual and record it in the pull request or release review.
- Use Apache License 2.0 for original repository code and documentation. Preserve and document third-party source terms separately.
- Keep commits small and scoped. Do not include unrelated workspace changes.

## Planned application surface

```text
/
/playbooks
/playbooks/[slug]
/playbooks/[slug]/demo
/method
/contribute
```

## Planned content and feature boundaries

```text
app/                           route composition and metadata
components/ui/                 generated shadcn primitives
components/site/               site-wide semantic presentation
content/playbooks/             typed definitions and versioned fixtures
features/playbooks/            catalogue and shared detail presentation
features/policy-evidence/      exemplar domain logic and interface
lib/playbooks/                 schema, registry, and validation utilities
scripts/                       content-integrity checks and fixture generation
tests/                         unit and focused semantic component checks
```

---

## Task 1: Establish the unit-test and static quality harness

**Files**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.mts`
- Create: `vitest.setup.ts`
- Create: `tests/smoke.test.ts`

### Steps

- [ ] Verify the starting point and record any pre-existing changes without altering them.

  Run:

  ```bash
  git status --short
  npm run lint
  npm run build
  ```

  Expected: the scaffold lints and builds; only known planning documents are untracked or modified.

- [ ] Install the runtime validation dependency and test toolchain.

  Run:

  ```bash
  npm install zod
  npm install -D vitest @vitejs/plugin-react@^5.2.0 jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event tsx
  ```

- [ ] Confirm the existing accessibility lint layer rather than adding a second tool.

  Run:

  ```bash
  npm ls eslint-plugin-jsx-a11y
  npm run lint
  ```

  Expected: `eslint-plugin-jsx-a11y` is present through `eslint-config-next`, and the current codebase passes the ESLint CLI. Add shadcn primitives only in the later UI task that first uses each primitive.

- [ ] Configure Vitest using the installed Next.js guidance.

  `vitest.config.mts`:

  ```ts
  import react from "@vitejs/plugin-react"
  import { defineConfig } from "vitest/config"

  export default defineConfig({
    plugins: [react()],
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      include: ["**/*.test.{ts,tsx}"],
    },
  })
  ```

  `vitest.setup.ts`:

  ```ts
  import "@testing-library/jest-dom/vitest"
  ```

- [ ] Add scripts to `package.json` without removing the scaffold scripts.

  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "eslint .",
      "typecheck": "next typegen && tsc --noEmit",
      "test": "vitest run",
      "test:watch": "vitest",
      "validate:content": "tsx scripts/validate-content.mts",
      "check": "npm run validate:content && npm run typecheck && npm run lint && npm run test && npm run build"
    }
  }
  ```

- [ ] Add a one-assertion unit smoke test, then prove the harness itself works.

  `tests/smoke.test.ts`:

  ```ts
  import { describe, expect, it } from "vitest"

  describe("test harness", () => {
    it("runs TypeScript tests", () => {
      expect(2 + 2).toBe(4)
    })
  })
  ```

  Run:

  ```bash
  npm run test
  npm run build
  ```

- [ ] Commit the harness independently.

  ```bash
  git add package.json package-lock.json vitest.config.mts vitest.setup.ts tests
  git commit -m "test: establish application quality harness"
  ```

---

## Task 2: Define and validate the playbook contract

**Files**

- Create: `lib/playbooks/schema.ts`
- Create: `lib/playbooks/define-playbook.ts`
- Create: `lib/playbooks/schema.test.ts`
- Create: `lib/playbooks/registry.ts`
- Create: `lib/playbooks/registry.test.ts`
- Create: `scripts/validate-content.mts`

### Public interfaces

```ts
export type Playbook = z.infer<typeof playbookSchema>
export type PlaybookSummary = Pick<
  Playbook,
  "slug" | "title" | "summary" | "sector" | "technicalPatterns" |
  "maturity" | "dataAccessibility" | "risk" | "demo" | "lastReviewed"
>

export function definePlaybook(input: Playbook): Playbook
export function getAllPlaybooks(): readonly Playbook[]
export function getPlaybook(slug: string): Playbook | undefined
export function getPlaybookSummaries(): readonly PlaybookSummary[]
export function getPlaybookSlugs(): readonly string[]
```

### Steps

- [ ] Write schema tests before `schema.ts`. Cover one complete valid object and failures for a malformed slug, missing official sources, missing non-AI baseline, missing risk reasons, a demo route on `demo.availability: "none"`, and a recorded demo without recorded-output metadata.

  The contract assertions must include:

  ```ts
  expect(validPlaybook.schemaVersion).toBe(1)
  expect(validPlaybook.officialSources).toHaveLength(1)
  expect(validPlaybook.syntheticData.label).toBe("Synthetic working data")
  expect(validPlaybook.demo.availability).toBe("recorded")
  ```

- [ ] Run the tests and confirm failure because the schema module does not exist.

  ```bash
  npm run test -- lib/playbooks/schema.test.ts
  ```

- [ ] Implement controlled vocabularies and nested schemas in `lib/playbooks/schema.ts`.

  Use these exported values exactly:

  ```ts
  import { z } from "zod"

  export const maturityValues = [
    "assessed",
    "recorded-demo",
    "partner-ready",
    "operational-pilot",
    "evaluated-service",
  ] as const

  export const dataAccessibilityValues = [
    "open",
    "public-readonly",
    "partial",
    "restricted",
    "unknown",
  ] as const

  export const riskValues = ["low", "moderate", "high", "very-high"] as const
  export const demoAvailabilityValues = ["none", "recorded", "live-local", "partner"] as const

  export const sourceSchema = z.object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    publisher: z.string().min(2),
    jurisdiction: z.string().min(2),
    title: z.string().min(4),
    canonicalUrl: z.string().url(),
    sourceType: z.enum(["strategy", "consultation-report", "dataset", "guidance", "research"]),
    coveredPeriod: z.string().min(1),
    accessedAt: z.string().date(),
    reuseStatus: z.string().min(4),
    localSamplePath: z.string().optional(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(),
    purpose: z.string().min(10),
    transformations: z.array(z.string().min(4)),
    caveats: z.array(z.string().min(4)),
  }).superRefine((source, context) => {
    if (Boolean(source.localSamplePath) !== Boolean(source.sha256)) {
      context.addIssue({
        code: "custom",
        message: "A local sample path and SHA-256 must be supplied together",
      })
    }
  })
  ```

  Compose the complete `playbookSchema` from named nested schemas for classification, risk, synthetic data, non-AI baseline, evaluation, human oversight, implementation, references, and demo. Keep the field set and meanings in `DESIGN.md` section 9. Use discriminated unions for demo availability so `recorded` requires `route`, `recordedOutputId`, and `label`, while `none` requires `reason` and permits no route.

- [ ] Implement `definePlaybook` as the only content-definition entry point.

  ```ts
  import { playbookSchema, type PlaybookInput } from "./schema"

  export function definePlaybook(input: PlaybookInput) {
    return playbookSchema.parse(input)
  }
  ```

  Export an input type and parsed `Playbook` type from `schema.ts`; do not use type assertions to bypass validation.

- [ ] Write registry tests before `registry.ts`. Assert stable alphabetical fallback order, unique slugs, immutable returned arrays, successful lookup, `undefined` for an unknown slug, and summary projection without full narrative or fixtures.

- [ ] Implement an explicit registry import list. Avoid filesystem discovery inside runtime application code.

  ```ts
  const playbooks = Object.freeze([
    policyEvidence,
    diagnosticImagingSupport,
    healthOperations,
    lessonPlanningFeedback,
    adaptiveTutoring,
    wastewaterMonitoring,
    trafficFlow,
    roadMaintenance,
    justiceResearch,
    offenderLearning,
    violenceRiskResearch,
    earthObservation,
    farmAdvisory,
    waterManagement,
    communityParticipation,
    housingInsight,
    lifeEventServices,
  ])
  ```

  The imports may fail until Task 3 creates content. Use a temporary schema-valid fixture local to the registry test, not an incomplete production playbook.

- [ ] Create `scripts/validate-content.mts` to parse all registered definitions, detect duplicate slugs and source IDs, verify local sample SHA-256 values, and exit non-zero with source-specific messages. Extend this validator in Task 5 to verify recorded findings and citations after their fixture schemas exist.

  Expose testable functions and keep only the CLI entry point responsible for process exit:

  ```ts
  export async function validateContent(rootDirectory = process.cwd()): Promise<string[]>

  const errors = await validateContent()
  if (errors.length > 0) {
    for (const error of errors) console.error(error)
    process.exitCode = 1
  }
  ```

- [ ] Run focused and full tests.

  ```bash
  npm run test -- lib/playbooks
  npm run typecheck
  ```

- [ ] Commit the contract.

  ```bash
  git add lib/playbooks scripts/validate-content.mts
  git commit -m "feat: define the playbook content contract"
  ```

---

## Task 3: Add all seventeen assessed playbooks

**Files**

- Create: `content/playbooks/policy-evidence/playbook.ts`
- Create: `content/playbooks/diagnostic-imaging-support/playbook.ts`
- Create: `content/playbooks/health-operations/playbook.ts`
- Create: `content/playbooks/lesson-planning-feedback/playbook.ts`
- Create: `content/playbooks/adaptive-tutoring/playbook.ts`
- Create: `content/playbooks/wastewater-monitoring/playbook.ts`
- Create: `content/playbooks/traffic-flow/playbook.ts`
- Create: `content/playbooks/road-maintenance/playbook.ts`
- Create: `content/playbooks/justice-research/playbook.ts`
- Create: `content/playbooks/offender-learning/playbook.ts`
- Create: `content/playbooks/violence-risk-research/playbook.ts`
- Create: `content/playbooks/earth-observation/playbook.ts`
- Create: `content/playbooks/farm-advisory/playbook.ts`
- Create: `content/playbooks/water-management/playbook.ts`
- Create: `content/playbooks/community-participation/playbook.ts`
- Create: `content/playbooks/housing-insight/playbook.ts`
- Create: `content/playbooks/life-event-services/playbook.ts`
- Modify: `lib/playbooks/registry.ts`
- Create: `content/playbooks/content.test.ts`

### Steps

- [ ] Write the inventory test first. Assert the exact slug set, count of seventeen, seventeen honest `assessed` entries, no public demo yet, and `very-high` risk plus `demo.availability: "none"` for `violence-risk-research`. Task 10 promotes Policy Evidence to the single `recorded-demo` only after its fixtures, output, citations, and hashes exist.

  ```ts
  const expectedSlugs = [
    "adaptive-tutoring",
    "community-participation",
    "diagnostic-imaging-support",
    "earth-observation",
    "farm-advisory",
    "health-operations",
    "housing-insight",
    "justice-research",
    "lesson-planning-feedback",
    "life-event-services",
    "offender-learning",
    "policy-evidence",
    "road-maintenance",
    "traffic-flow",
    "violence-risk-research",
    "wastewater-monitoring",
    "water-management",
  ]
  ```

- [ ] Run the focused test and confirm it fails because the inventory is incomplete.

  ```bash
  npm run test -- content/playbooks/content.test.ts
  ```

- [ ] Write `policy-evidence/playbook.ts` as the complete assessed reference definition. Use `maturity: "assessed"`, `dataAccessibility: "public-readonly"`, `risk: "moderate"`, and `demo.availability: "none"` until Task 10 records and verifies the exemplar. The public benefit must be qualitative. The supported decision is whether a theme deserves further policy-team investigation, not what policy to adopt.

- [ ] Add the two initial official references to the policy-evidence source register:

  1. Northern Ireland Department for the Economy, **AI Strategic Direction**, canonical page `https://www.economy-ni.gov.uk/publications/ai-strategic-direction`, used as public-service strategy context.
  2. Northern Ireland Department for the Economy, **Draft Circular Economy Strategy for Northern Ireland — Public Consultation Response Report**, canonical page `https://www.economy-ni.gov.uk/publications/draft-circular-economy-strategy-northern-ireland-public-consultation-response-report`, used only to establish an official consultation-analysis method and vocabulary.

  Record exact access dates during implementation. Do not copy real consultation responses. Task 8 will add the small permitted methodology excerpt and its computed hash.

- [ ] Write the other sixteen definitions as honest assessed concepts. Each must contain substantive plain-English content for all required fields, at least one official source, a feasible non-AI baseline, and explicit next validation questions. Set `demo.availability: "none"` and make the reason name the material data, risk, domain-validation, or evidence barrier.

- [ ] Apply these minimum classifications:

  | Playbook | Data accessibility | Risk |
  | --- | --- | --- |
  | Diagnostic imaging support | `restricted` | `high` |
  | Health operations | `restricted` | `high` |
  | Lesson planning and feedback | `partial` | `moderate` |
  | Adaptive tutoring | `restricted` | `high` |
  | Wastewater monitoring | `partial` | `moderate` |
  | Traffic flow | `partial` | `moderate` |
  | Road maintenance | `partial` | `moderate` |
  | Justice research | `restricted` | `high` |
  | Offender learning | `restricted` | `high` |
  | Violence risk research | `restricted` | `very-high` |
  | Earth observation | `open` | `moderate` |
  | Farm advisory | `partial` | `moderate` |
  | Water management | `partial` | `moderate` |
  | Community participation | `public-readonly` | `moderate` |
  | Housing insight | `restricted` | `high` |
  | Life-event services | `restricted` | `high` |

  If source research supports a different classification, update the definition and add a short rationale to the commit. Do not improve a status merely to make the catalogue look balanced.

- [ ] Complete the explicit registry import list and freeze the array.

- [ ] Add tests that reject marketing claims and sensitive fixture shapes. Keep the check narrow and deterministic: disallow the repository's banned claim phrases in `publicBenefit`, and disallow metadata keys matching `fullName`, `email`, `phone`, `address`, `nationalInsuranceNumber`, `healthAndCareNumber`, or `dateOfBirth`.

- [ ] Validate the complete inventory.

  ```bash
  npm run validate:content
  npm run test -- content/playbooks lib/playbooks
  npm run typecheck
  ```

- [ ] Commit the assessed catalogue content.

  ```bash
  git add content/playbooks lib/playbooks/registry.ts
  git commit -m "content: add assessed public-service playbooks"
  ```

---

## Task 4: Build the Evidence Desk foundation and site shell

**Files**

- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `components/site/site-header.tsx`
- Create: `components/site/site-footer.tsx`
- Create: `components/site/provenance-label.tsx`
- Create: `components/site/status-badge.tsx`
- Create: `components/site/risk-badge.tsx`
- Create: `components/site/external-link.tsx`
- Create: `components/site/site-shell.test.tsx`

### Steps

- [ ] Write component tests first for a skip link, labelled primary navigation, current-page state, descriptive status text, risk reason access, safe external-link attributes, and the absence of an official-government claim.

- [ ] Run the focused test and confirm failure.

  ```bash
  npm run test -- components/site/site-shell.test.tsx
  ```

- [ ] Replace the default Geist setup with Archivo and Fragment Mono using `next/font/google` in `app/layout.tsx`.

  ```ts
  import { Archivo, Fragment_Mono } from "next/font/google"

  const archivo = Archivo({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
  })

  const fragmentMono = Fragment_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: "400",
    display: "swap",
  })
  ```

  Keep root metadata factual: independent open-source playbooks, no government endorsement, no adoption or outcome claim.

- [ ] Implement the `DESIGN.md` colour, typography, spacing, radius, focus, motion, and maximum-width tokens in `app/globals.css`. Map the required shadcn semantic variables onto the Evidence Desk palette instead of styling each primitive separately.

- [ ] Add base rules for:

  - 16px or larger body copy with a 1.6 line height;
  - 65–72 character long-form measure;
  - visible `:focus-visible` rings with an offset;
  - 44px minimum interactive targets;
  - `prefers-reduced-motion: reduce`;
  - `forced-colors: active`;
  - print-visible URLs and provenance labels;
  - a visually hidden utility compatible with focus reveal.

- [ ] Implement the site shell. Use plain text identity such as **Public-Service AI Playbooks** with a small **Independent open-source project** qualifier. Navigation contains Playbooks, Method, and Contribute. The GitHub link belongs in the footer and contribution page unless a repository URL is already configured.

- [ ] Implement shared badges with text plus icon or symbol. `StatusBadge` maps all five maturity states; `RiskBadge` accepts both tier and plain-English reasons. Never return only a coloured dot.

- [ ] Run component tests, lint, and typecheck.

  ```bash
  npm run test -- components/site
  npm run lint
  npm run typecheck
  ```

- [ ] Commit the visual foundation.

  ```bash
  git add app/layout.tsx app/globals.css components/site
  git commit -m "feat: establish the Evidence Desk design system"
  ```

---

## Task 5: Implement pure catalogue search, filters, and ordering

**Files**

- Create: `features/playbooks/catalogue/catalogue-query.ts`
- Create: `features/playbooks/catalogue/filter-playbooks.ts`
- Create: `features/playbooks/catalogue/filter-options.ts`
- Create: `features/playbooks/catalogue/filter-playbooks.test.ts`

### Public interfaces

```ts
export type CatalogueQuery = {
  query: string
  sectors: string[]
  patterns: string[]
  dataAccessibility: DataAccessibility[]
  maturity: Maturity[]
  risk: Risk[]
}

export function parseCatalogueQuery(
  searchParams: Record<string, string | string[] | undefined>,
): CatalogueQuery

export function serializeCatalogueQuery(query: CatalogueQuery): URLSearchParams

export function filterPlaybooks(
  playbooks: readonly PlaybookSummary[],
  query: CatalogueQuery,
): PlaybookSummary[]

export function getCatalogueFilterOptions(
  playbooks: readonly PlaybookSummary[],
): CatalogueFilterOptions
```

### Steps

- [ ] Write tests first for case-insensitive text matching, AND-across filter groups, OR-within a group, repeated query parameters, invalid enum values, stable default ordering, diacritic normalisation, zero results, serialization round trips, and non-mutation of input arrays.

  Use query keys `q`, `sector`, `pattern`, `data`, `maturity`, and `risk`.

- [ ] Run the focused test and confirm failure.

  ```bash
  npm run test -- features/playbooks/catalogue/filter-playbooks.test.ts
  ```

- [ ] Implement query parsing with Zod-backed enum checks. Ignore invalid values and keep valid repeated values. Trim search text and cap it at 120 characters.

- [ ] Implement pure filtering. Match search text against title, summary, problem, sector, technical patterns, and tags. Default order is:

  1. maturity rank: recorded demo before assessed;
  2. data accessibility rank: open, public-readonly, partial, restricted, unknown;
  3. title using `Intl.Collator("en-GB", { sensitivity: "base" })`.

- [ ] Derive filter options from content rather than maintaining a second list. Return label, value, and total inventory count for each option.

- [ ] Run focused tests and typecheck.

  ```bash
  npm run test -- features/playbooks/catalogue
  npm run typecheck
  ```

- [ ] Commit catalogue domain logic.

  ```bash
  git add features/playbooks/catalogue
  git commit -m "feat: add catalogue query and filtering logic"
  ```

---

## Task 6: Build the public home, catalogue, method, and contribution pages

**Files**

- Modify: `app/page.tsx`
- Create: `app/playbooks/page.tsx`
- Create: `app/method/page.tsx`
- Create: `app/contribute/page.tsx`
- Create: `features/playbooks/catalogue/playbook-catalogue.tsx`
- Create: `features/playbooks/catalogue/catalogue-filters.tsx`
- Create: `features/playbooks/catalogue/playbook-dossier-row.tsx`
- Create: `features/playbooks/catalogue/filter-summary.tsx`
- Create: `features/playbooks/catalogue/playbook-catalogue.test.tsx`
- Create: `components/site/evidence-chain.tsx`

### Steps

- [ ] Write component tests first. Cover the home-page evidence chain order, the primary catalogue action, the recorded-demo label, all seventeen catalogue items without active filters, result-count announcement, filter clearing, accessible dossier-row names, and the method page's five evidence-maturity rungs.

- [ ] Run the tests and confirm failure.

  ```bash
  npm run test -- features/playbooks/catalogue components/site/evidence-chain.test.tsx
  ```

- [ ] Implement `EvidenceChain` as five numbered stages: public problem, official source sample, synthetic working data, bounded demonstration, evidence and code. At small widths it is a vertical ordered list; at wide widths it may use a restrained horizontal rule. Preserve the same DOM order.

- [ ] Implement the home page as a Server Component with this sequence:

  1. proposition and independence qualifier;
  2. evidence chain;
  3. Policy Evidence Workbench feature with a **Recorded demonstration** label;
  4. a short catalogue preview representing different maturity, risk, and data-access conditions;
  5. method and contribution prompts.

  Do not add a chatbot input, abstract AI art, model logo cloud, invented impact statistic, or generic feature-icon row.

- [ ] Implement `PlaybookDossierRow` as semantic article content containing title, summary, sector, technical pattern, maturity, data access, risk label, last-reviewed date, and a descriptive detail link. Use a 12-column dossier layout on desktop and a linear sheet on mobile.

- [ ] Implement `CatalogueFilters` as the narrow Client Component. Initialise from the server-parsed query, update the URL with `router.replace`, preserve keyboard focus, and use native form semantics plus shadcn Select/Command only where they improve accessibility. The full unfiltered catalogue is present in server HTML.

- [ ] Implement `/playbooks` as a Server Component that receives `searchParams` as a Promise under Next.js 16, parses them, filters the registry, and passes serializable summaries to the client filter control.

  ```ts
  type Props = {
    searchParams: Promise<Record<string, string | string[] | undefined>>
  }

  export default async function PlaybooksPage({ searchParams }: Props) {
    const query = parseCatalogueQuery(await searchParams)
    const playbooks = filterPlaybooks(getPlaybookSummaries(), query)
    return <PlaybookCatalogue playbooks={playbooks} query={query} />
  }
  ```

- [ ] Implement the zero-result state with the active-filter summary and one **Clear all filters** action. Announce the result count in a polite live region after client-side changes.

- [ ] Implement `/method` from `DESIGN.md`: evidence ladder, source register, one-off sourcing, synthetic-data contract, recorded-output contract, non-AI baseline, risk and human review, and how to interpret evaluation. Include links to the schema and exemplar source tree once repository URLs are configured.

- [ ] Implement `/contribute` as three contribution tracks:

  - improve an assessed playbook;
  - add or verify an official source;
  - build a recorded exemplar after meeting the complete gate.

  State the privacy rules and link to `CONTRIBUTING.md`, `SECURITY.md`, and the repository issue tracker through a central site configuration object rather than duplicating URLs.

- [ ] Run focused tests and verify server rendering. During the release review, disable JavaScript in the browser and confirm the server-rendered catalogue and method content remain readable.

  ```bash
  npm run test -- features/playbooks/catalogue components/site
  npm run build
  ```

- [ ] Commit the public discovery routes.

  ```bash
  git add app/page.tsx app/playbooks app/method app/contribute features/playbooks/catalogue components/site/evidence-chain.tsx
  git commit -m "feat: build the public playbook catalogue"
  ```

---

## Task 7: Build the reusable playbook detail route

**Files**

- Create: `app/playbooks/[slug]/page.tsx`
- Create: `app/playbooks/[slug]/loading.tsx`
- Create: `app/not-found.tsx`
- Create: `features/playbooks/detail/playbook-detail.tsx`
- Create: `features/playbooks/detail/metadata-rail.tsx`
- Create: `features/playbooks/detail/source-register.tsx`
- Create: `features/playbooks/detail/maturity-ladder.tsx`
- Create: `features/playbooks/detail/demo-readiness.tsx`
- Create: `features/playbooks/detail/implementation-index.tsx`
- Create: `features/playbooks/detail/playbook-detail.test.tsx`

### Steps

- [ ] Write tests first for the fixed eleven-section order, plain-English summary before technical detail, source publisher/title/access/reuse/caveat display, current maturity and missing-next-rung evidence, non-AI baseline, risk reasons, oversight and redress, recorded-demo action, no-demo reason, and last-reviewed date.

- [ ] Run the focused test and confirm failure.

  ```bash
  npm run test -- features/playbooks/detail
  ```

- [ ] Implement the detail primitives as Server Components. Use a semantic definition list for metadata, a table on wide layouts with a stacked representation at narrow widths for sources, and ordered headings matching `DESIGN.md` section 7.

- [ ] Implement the dynamic page with build-time slugs and generated metadata.

  ```ts
  export const dynamicParams = false

  export function generateStaticParams() {
    return getPlaybookSlugs().map((slug) => ({ slug }))
  }

  export async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>
  }): Promise<Metadata> {
    const { slug } = await params
    const playbook = getPlaybook(slug)
    if (!playbook) return {}
    return { title: playbook.title, description: playbook.summary }
  }

  export default async function PlaybookPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    const playbook = getPlaybook(slug)
    if (!playbook) notFound()
    return <PlaybookDetail playbook={playbook} />
  }
  ```

- [ ] Build the designed `app/not-found.tsx` with one sentence, a catalogue link, and no search-engine jargon. The loading route may use a static dossier skeleton but must not conceal content that is already local at build time.

- [ ] Make source entries address staleness. If `lastReviewed` is more than twelve months before the build's UTC date, display **Review needed** with the exact recorded date. Unit-test the date function using a passed `now` value rather than mocking global time.

- [ ] Run focused tests, content validation, typecheck, and production build. Confirm all seventeen paths appear in build output and an unknown slug returns 404.

  ```bash
  npm run test -- features/playbooks/detail
  npm run validate:content
  npm run typecheck
  npm run build
  ```

- [ ] Commit the detail route.

  ```bash
  git add app/playbooks/[slug] app/not-found.tsx features/playbooks/detail
  git commit -m "feat: add comparable playbook dossiers"
  ```

---

## Task 8: Create the policy-evidence source sample and synthetic corpus

**Files**

- Create: `content/playbooks/policy-evidence/fixtures/source/consultation-methodology-excerpt.txt`
- Create: `content/playbooks/policy-evidence/fixtures/source/source-manifest.ts`
- Create: `content/playbooks/policy-evidence/fixtures/synthetic/corpus.json`
- Create: `content/playbooks/policy-evidence/fixtures/synthetic/synthetic-manifest.ts`
- Create: `features/policy-evidence/domain/types.ts`
- Create: `features/policy-evidence/domain/generate-synthetic-corpus.ts`
- Create: `features/policy-evidence/domain/generate-synthetic-corpus.test.ts`
- Create: `scripts/generate-policy-evidence-fixtures.mts`
- Modify: `content/playbooks/policy-evidence/playbook.ts`

### Public interfaces

```ts
export type CorpusDocument = {
  id: `SYN-${string}`
  synthetic: true
  text: string
  tags: string[]
  disclosure: "Synthetic working data"
}

export type SyntheticCorpusConfig = {
  seed: number
  size: number
  topicWeights: Record<string, number>
}

export function generateSyntheticCorpus(
  config: SyntheticCorpusConfig,
): CorpusDocument[]
```

### Steps

- [ ] Verify the official response-report page and PDF are accessible on the implementation date. Record the canonical publication page, document URL, publisher, publication date, access date, and visible reuse statement. If redistribution of the PDF text is not clearly permitted, paraphrase only the minimal methodology structure and set `reuseStatus` to explain why no verbatim source text is committed.

- [ ] Create `consultation-methodology-excerpt.txt` containing only the smallest permissible excerpt needed to establish that consultation responses may be manually reviewed and grouped into topics or themes. It must contain no real respondent text, contact information, signature, or local path.

- [ ] Compute the excerpt hash from repository root and record it in both `source-manifest.ts` and the playbook source entry.

  PowerShell:

  ```powershell
  (Get-FileHash -Algorithm SHA256 content/playbooks/policy-evidence/fixtures/source/consultation-methodology-excerpt.txt).Hash.ToLowerInvariant()
  ```

- [ ] Write the generator tests before the generator. Assert:

  - the fixed seed produces byte-for-byte stable output;
  - changing the seed changes at least one document;
  - IDs are unique and begin `SYN-`;
  - every record has `synthetic: true` and the exact disclosure label;
  - the corpus contains no key resembling a person identifier;
  - text contains no email, phone number, URL, exact address, National Insurance number pattern, or Health and Care number pattern;
  - configured topic weights stay within a documented tolerance;
  - invalid size, negative weights, or an empty topic set throws a descriptive error.

- [ ] Run the focused test and confirm failure.

  ```bash
  npm run test -- features/policy-evidence/domain/generate-synthetic-corpus.test.ts
  ```

- [ ] Implement a local deterministic pseudo-random generator, such as `mulberry32`, so fixture generation does not depend on library version behaviour. Keep sentence fragments authored in the repository and combine them by stable topic templates. Do not generate human names or simulated biographies.

  ```ts
  function mulberry32(seed: number) {
    return () => {
      let value = (seed += 0x6d2b79f5)
      value = Math.imul(value ^ (value >>> 15), value | 1)
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
      return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296
    }
  }
  ```

- [ ] Use a corpus size of 48 with a recorded integer seed. Cover six themes relevant to a strategy consultation: access to services, workforce capability, data governance, accountability, procurement and reuse, and environmental cost. Include supportive, critical, mixed, and uncertain statements. The corpus must not imitate a named real respondent.

- [ ] Create `scripts/generate-policy-evidence-fixtures.mts` to call the pure generator, stable-sort records, write formatted JSON with a final newline, and report its SHA-256. The script is an explicit development utility, not a live data pipeline.

- [ ] Run the generator twice and prove the second run produces no diff.

  ```bash
  npm run test -- features/policy-evidence/domain/generate-synthetic-corpus.test.ts
  npx tsx scripts/generate-policy-evidence-fixtures.mts
  git diff -- content/playbooks/policy-evidence/fixtures/synthetic/corpus.json
  npx tsx scripts/generate-policy-evidence-fixtures.mts
  git diff --exit-code -- content/playbooks/policy-evidence/fixtures/synthetic/corpus.json
  ```

- [ ] Write `synthetic-manifest.ts` with seed, generator version, corpus hash, source characteristics used, approximations, deliberate alterations, exclusions, limitations, and the statement that the fixture cannot establish efficacy, fairness, or operational readiness.

- [ ] Extend `scripts/validate-content.mts` to check source and synthetic hashes, exact disclosure labels, and forbidden field names.

- [ ] Commit the source and synthetic fixtures without the downloaded full PDF.

  ```bash
  git add content/playbooks/policy-evidence features/policy-evidence/domain scripts
  git commit -m "feat: add reproducible policy evidence fixtures"
  ```

---

## Task 9: Implement the baseline, recorded analysis, citations, and evaluation

**Files**

- Modify: `features/policy-evidence/domain/types.ts`
- Create: `features/policy-evidence/domain/run-baseline.ts`
- Create: `features/policy-evidence/domain/run-baseline.test.ts`
- Create: `features/policy-evidence/domain/recorded-analysis.ts`
- Create: `features/policy-evidence/domain/recorded-analysis.test.ts`
- Create: `features/policy-evidence/domain/evaluate-analysis.ts`
- Create: `features/policy-evidence/domain/evaluate-analysis.test.ts`
- Create: `content/playbooks/policy-evidence/fixtures/recorded/analysis.json`
- Create: `content/playbooks/policy-evidence/fixtures/recorded/manifest.ts`
- Create: `content/playbooks/policy-evidence/fixtures/evaluation/gold.json`
- Create: `content/playbooks/policy-evidence/fixtures/evaluation/manifest.ts`

### Public interfaces

```ts
export type Citation = {
  documentId: CorpusDocument["id"]
  start: number
  end: number
  quote: string
}

export type Finding = {
  id: `F-${string}`
  label: string
  summary: string
  evidence: Citation[]
  limitations: string[]
}

export type AnalysisResult = {
  kind: "baseline" | "recorded-ai-assisted"
  findings: Finding[]
  inputSha256: string
}

export type EvaluationResult = {
  citationPrecision: { numerator: number; denominator: number; value: number | null }
  evidenceCoverage: { numerator: number; denominator: number; value: number | null }
  unsupportedFindingCount: number
  brokenReferenceCount: number
  cases: EvaluationCaseResult[]
  limitations: string[]
}

export function runBaseline(corpus: readonly CorpusDocument[]): AnalysisResult
export function loadRecordedAnalysis(): AnalysisResult
export function evaluateAnalysis(
  analysis: AnalysisResult,
  gold: readonly EvaluationCase[],
  corpus: readonly CorpusDocument[],
): EvaluationResult
```

### Steps

- [ ] Write baseline tests first. Cover phrase matching, normalised punctuation and case, matched-excerpt citations, stable finding order, no duplicate document citation per finding, empty corpus, and byte-for-byte identical results for identical input.

- [ ] Implement the baseline with a visible, versioned controlled vocabulary for the six themes. Score exact phrases and tokens, retain the highest-scoring cited excerpts, and break ties by theme order then document ID. Do not use embeddings, fuzzy model calls, or hidden heuristics.

- [ ] Write evaluation tests first. Cover all-correct, unsupported finding, missing expected evidence, broken document ID, mismatched quote offsets, no predicted citations, no gold citations, and explicit `null` metric values for zero denominators.

- [ ] Implement citation-integrity validation before computing metrics. A citation is valid only if the document exists and `document.text.slice(start, end) === quote`.

- [ ] Create `gold.json` as a small labelled set with rationales. Labels refer only to synthetic document IDs. The file must contain enough positive and negative cases to exercise every metric branch.

- [ ] Produce one recorded AI-assisted result outside the hosted runtime using the exact committed synthetic corpus and an openly licensed model running locally. Keep the one-off runner and any downloaded weights outside the repository; they are recording tools, not application dependencies. Remove machine details, operator identity, request identifiers, and any credential material. The recorded output must be structured to the `AnalysisResult` contract and must include at least one known, visible weakness so the human-review path is meaningful.

- [ ] Create `manifest.ts` for the recorded result. Set `label` to `Recorded AI-assisted output`, `procedureVersion` to `policy-evidence-v1`, and `liveService` to `false`. Record the actual UTC recording date, exact open-model identifier and version, input corpus SHA-256, versioned procedure SHA-256, and output SHA-256 as literals from the completed local recording. Validate each value with a schema; do not commit an incomplete manifest or relabel hand-authored output as model-generated.

- [ ] Add tests that load and validate the recorded result, assert every citation, assert manifest hashes, ensure the label is exact, and ensure the UI-facing limitations contain **Not operationally validated**.

- [ ] Run all policy-evidence domain tests and content integrity validation.

  ```bash
  npm run test -- features/policy-evidence/domain
  npm run validate:content
  npm run typecheck
  ```

- [ ] Commit domain behaviour and recorded evidence separately from UI.

  ```bash
  git add features/policy-evidence/domain content/playbooks/policy-evidence/fixtures
  git commit -m "feat: add policy evidence analysis and evaluation"
  ```

---

## Task 10: Build the Policy Evidence Workbench interaction

**Files**

- Create: `app/playbooks/[slug]/demo/page.tsx`
- Create: `features/policy-evidence/components/policy-evidence-workbench.tsx`
- Create: `features/policy-evidence/components/workbench-client.tsx`
- Create: `features/policy-evidence/components/recorded-demo-banner.tsx`
- Create: `features/policy-evidence/components/source-inspector.tsx`
- Create: `features/policy-evidence/components/synthetic-corpus-inspector.tsx`
- Create: `features/policy-evidence/components/finding-list.tsx`
- Create: `features/policy-evidence/components/evidence-thread.tsx`
- Create: `features/policy-evidence/components/finding-review-controls.tsx`
- Create: `features/policy-evidence/components/baseline-comparison.tsx`
- Create: `features/policy-evidence/components/evaluation-summary.tsx`
- Create: `features/policy-evidence/components/policy-evidence-workbench.test.tsx`

### Client-state contract

```ts
export type ReviewDisposition =
  | "unreviewed"
  | "investigate"
  | "unsupported"
  | "specialist-review"

export type WorkbenchState = {
  activeFindingId: string
  dispositions: Record<string, ReviewDisposition>
  comparisonMode: "recorded" | "baseline" | "side-by-side"
}
```

### Steps

- [ ] Write component tests first for all nine hosted-flow stages: orientation, source label, synthetic label, baseline, recorded-output label, complete evidence thread, four disposition values, comparison, and reuse guidance.

- [ ] Add interaction tests for keyboard finding selection, citation focus, review-state change, reset confirmation, preserved active selection when comparison mode changes, and an accessible name that includes the finding and current disposition.

- [ ] Run the focused test and confirm failure.

  ```bash
  npm run test -- features/policy-evidence/components
  ```

- [ ] Implement `PolicyEvidenceWorkbench` as a Server Component that loads and validates all fixtures, runs the baseline and evaluation, and renders the complete source, method, findings, and metrics in initial HTML.

- [ ] Implement `WorkbenchClient` as the only broad client boundary. Keep only active finding, comparison mode, dispositions, and reset-dialog state in the browser. Do not send fixture parsing, baseline calculation, or content registry code to the client.

- [ ] Add the persistent banner above every result:

  > Recorded demonstration. This page replays checked-in output against synthetic working data. It is not a live service and has not been operationally validated.

- [ ] Implement `EvidenceThread` in this exact order: finding, citation, synthetic corpus excerpt, synthetic-method note, evaluation case, human disposition. Use linked IDs in text and accessible descriptions. Connector decoration may supplement but never replace the labels.

- [ ] Implement review controls as a radiogroup or single-select control with four text options. Dispositions are for local exploration and reset on refresh; no wording may imply final policy approval.

- [ ] Implement baseline comparison with explicit numerator/denominator metrics and `Not available` when denominator is zero. When switching modes, keep the source corpus and evaluation definition unchanged.

- [ ] Implement the generic demo route. For `policy-evidence`, render the workbench. For any playbook without a recorded demo, render `DemoReadiness` with the specific reason and a back link. Unknown slugs use `notFound()`.

  Keep `generateStaticParams()` aligned with all registry slugs so direct `/demo` URLs never become an unhandled runtime path.

- [ ] During the release review, disable JavaScript in the browser and confirm the recorded-demonstration disclosure, scenario, source, synthetic method, recorded findings, evidence thread, and evaluation remain readable. Interactive review controls may be absent.

- [ ] Run focused tests, typecheck, lint, content validation, and build.

  ```bash
  npm run test -- features/policy-evidence
  npm run validate:content
  npm run typecheck
  npm run lint
  npm run build
  ```

- [ ] Commit the complete exemplar interaction.

  ```bash
  git add app/playbooks/[slug]/demo features/policy-evidence/components
  git commit -m "feat: build the policy evidence workbench"
  ```

---

## Task 11: Complete accessibility, responsive, and route review

**Files**

- Modify only application or component test files implicated by review findings
- Modify: `.github/pull_request_template.md` when the release-review checklist is introduced in Task 12

### Steps

- [ ] Run the automated quality gate first:

  ```bash
  npm run validate:content
  npm run typecheck
  npm run lint
  npm run test
  npm run build
  ```

  The lint step uses the Next.js Core Web Vitals configuration and its bundled `eslint-plugin-jsx-a11y` rules. Focused component tests assert semantic roles, names, states, and keyboard behaviour for synchronous interactive components.

- [ ] Review the complete route flow manually:

  - home → catalogue → Policy Evidence Workbench navigation;
  - combined sector, maturity, data, and risk filters reflected in the URL;
  - search plus filter clearing;
  - no-results recovery;
  - all eleven detail sections;
  - a no-demo explanation for a restricted, high-risk playbook;
  - complete finding → citation → synthetic note → evaluation → disposition flow;
  - baseline versus recorded comparison;
  - review-state reset;
  - unknown slug 404;
  - no-JavaScript readability.

- [ ] Review at 320×800, 768×1024, and 1440×1000. Confirm no horizontal page overflow, 44px minimum primary control bounds, stacked table representation at small width, and the evidence thread following the selected finding in DOM order.

- [ ] Review keyboard-only operation from the skip link through primary navigation, catalogue filters, finding selection, evidence, disposition, and reset. Confirm focus remains visible and unobscured.

- [ ] Review at 200% zoom, with reduced motion, in Windows High Contrast or forced colours, and with JavaScript disabled. Confirm selected and focus states never rely on colour alone.

- [ ] Confirm every route has a unique descriptive title for the Next.js route announcer and that landmarks and heading levels remain coherent.

- [ ] Record the routes, browsers, viewport sizes, accessibility modes, date, and findings in the pull-request description or release review, not in a personal file inside the repository.

- [ ] Commit focused fixes and semantic component coverage introduced by the review.

  ```bash
  git add app components features
  git commit -m "fix: address accessibility and responsive review"
  ```

---

## Task 12: Add metadata, error boundaries, and public repository governance

**Files**

- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/opengraph-image.tsx`
- Create: `app/error.tsx`
- Create: `app/global-error.tsx`
- Create: `lib/site-config.ts`
- Replace: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `SECURITY.md`
- Create: `CODE_OF_CONDUCT.md`
- Create: `LICENSE`
- Create: `.github/ISSUE_TEMPLATE/playbook.yml`
- Create: `.github/ISSUE_TEMPLATE/source-correction.yml`
- Create: `.github/pull_request_template.md`
- Create: `.github/workflows/ci.yml`
- Create: `.github/dependabot.yml`

### Steps

- [ ] Create `lib/site-config.ts` as the single source for site name, description, canonical origin, repository URL, issue URL, and private vulnerability-reporting URL. Read the canonical origin from `NEXT_PUBLIC_SITE_URL` with a documented localhost fallback; do not commit an environment-specific deployment address.

- [ ] Add static root metadata and dynamic playbook metadata. Add a generated Open Graph image using only supported `ImageResponse` flexbox styles. The image includes the independent-project qualifier and no seal, crest, or invented government association.

- [ ] Add `robots.ts` and `sitemap.ts` from the route list and registry slugs. Include only public routes and recorded demo routes. Derive URLs from `siteConfig.origin`.

- [ ] Add designed route and global error boundaries. `app/error.tsx` is a Client Component with one retry action and one safe catalogue link. `app/global-error.tsx` supplies its own `<html>` and `<body>`. Error copy must not expose stack traces, fixture contents, or local paths.

- [ ] Replace the scaffold README with:

  - product purpose and independence statement;
  - screenshot or text-based route overview after the UI exists;
  - `npm ci`, `npm run dev`, and `npm run check` commands;
  - one-app architecture summary;
  - data provenance and synthetic-data policy;
  - exact tracked fixture types;
  - contribution routes;
  - licence and third-party source-material note;
  - security reporting link;
  - a statement that no API key is required for the MVP.

- [ ] Write `CONTRIBUTING.md` around the three contribution tracks in `/contribute`. Require schema validity, official source records, privacy review, deterministic fixtures, baseline, evaluation, accessibility, and tests according to maturity.

- [ ] Add Apache License 2.0 text to `LICENSE`. In repository documentation, state that included official-source samples keep their original reuse terms and are not relicensed by the repository.

- [ ] Add Contributor Covenant 2.1 text to `CODE_OF_CONDUCT.md` with enforcement through repository maintainer channels rather than a personal email address.

- [ ] Configure `SECURITY.md` to use GitHub private vulnerability reporting. Describe supported versions without naming an individual.

- [ ] Add structured issue forms for a new playbook and a source correction. Ask for public URLs and reuse status; warn against entering personal or sensitive data.

- [ ] Add a pull-request checklist covering schema, provenance, source permission, synthetic label, baseline, recorded-output metadata, evaluation, oversight, accessibility, tests, and the absence of personal or sensitive data.

- [ ] Add CI with explicit least-privilege permissions and npm cache:

  ```yaml
  name: CI

  on:
    pull_request:
    push:
      branches: [main]

  permissions:
    contents: read

  jobs:
    quality:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 22
            cache: npm
        - run: npm ci
        - run: npm run validate:content
        - run: npm run typecheck
        - run: npm run lint
        - run: npm run test
        - run: npm run build
  ```

  Pin actions to immutable commit SHAs before merge if repository policy requires supply-chain pinning.

- [ ] Configure Dependabot for monthly npm and GitHub Actions updates with a small open-pull-request limit.

- [ ] Run the full local gate.

  ```bash
  npm run check
  ```

- [ ] Commit repository and release surfaces.

  ```bash
  git add app lib/site-config.ts README.md CONTRIBUTING.md SECURITY.md CODE_OF_CONDUCT.md LICENSE .github
  git commit -m "docs: prepare the project for open-source contribution"
  ```

---

## Task 13: Final content, visual, privacy, and release verification

**Files**

- Modify only files implicated by verification failures
- Create only if the repository uses them: `docs/release-checklist.md`

### Steps

- [ ] Run the complete clean gate with fresh dependency state in CI or a clean checkout.

  ```bash
  npm ci
  npm run validate:content
  npm run typecheck
  npm run lint
  npm run test
  npm run build
  ```

  Expected: every command exits zero. Manual route and accessibility review is recorded separately because the repository intentionally has no automated browser-test harness.

- [ ] Inspect the production build for exactly the intended public routes. Confirm every playbook detail route is statically generated, unknown slugs 404, and only Policy Evidence Workbench presents a recorded demo.

- [ ] Run repository privacy scans from the repository root. Extend the patterns to any organisation-specific secret scanner available in CI.

  ```bash
  git grep -n -I -E "C:\\\\Users\\\\|/Users/|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY|api[_-]?key|client[_-]?secret|national insurance|health and care number"
  git grep -n -I -E "@[A-Za-z0-9.-]+\\.(com|net|org|gov|uk)" -- ':!package-lock.json'
  ```

  Expected: no personal local paths, keys, secrets, real contact details, or sensitive identifiers. Review documentation examples manually rather than blindly deleting legitimate security guidance.

- [ ] Verify fixture integrity independently:

  - recompute source, corpus, prompt, recorded-output, and evaluation hashes;
  - confirm all citations match exact substring offsets;
  - regenerate the synthetic corpus twice with no diff;
  - confirm source samples contain no respondent text or metadata;
  - confirm every synthetic record has the disclosure label;
  - confirm recorded output displays its date, model identifier, and not-live statement.

- [ ] Perform the approved Evidence Desk visual review at 320px, 768px, 1024px, and 1440px widths. Check hierarchy, 65–72ch measure, dossier row alignment, metadata-rail order, evidence-thread legibility, restrained shadow use, print output, and absence of generic AI decoration.

- [ ] Perform manual accessibility review:

  - keyboard-only navigation and workbench operation;
  - visible focus against every surface;
  - 200% zoom and 320px reflow;
  - reduced motion;
  - Windows High Contrast or browser forced colours;
  - screen-reader-oriented landmark, heading, filter-summary, evidence-link, and disposition announcements;
  - no-JavaScript reading path.

- [ ] Ask a non-technical reviewer to use the Policy Evidence Workbench and answer the eight public questions in `DESIGN.md` section 2. Record only anonymised, non-sensitive findings in an issue or pull request. Treat inability to distinguish source, synthetic, baseline, and recorded output as a release blocker.

- [ ] Ask a technical reviewer to find the schema, fixture generator, source register, baseline, recorded manifest, evaluation, and tests without guidance. Treat an ambiguous contribution path as a documentation defect.

- [ ] Review every user-facing claim against the repository evidence. Remove or qualify claims about accuracy, efficiency, savings, adoption, fairness, or outcomes that are not directly supported. Confirm all assessed concepts say what must be validated next.

- [ ] Confirm open-source essentials are present and internally linked: licence, contributing guide, code of conduct, security policy, issue forms, pull-request checklist, CI, and third-party source terms.

- [ ] Inspect the final diff and commit history.

  ```bash
  git diff --check
  git status --short
  git log --oneline --decorate -15
  ```

- [ ] Create a final release commit only for verified corrections, then open a pull request summarising scope, evidence boundaries, test results, manual accessibility checks, privacy scan, and remaining limitations.

## MVP acceptance checklist

- [ ] Seventeen schema-valid playbooks render in the catalogue.
- [ ] Exactly one playbook is a recorded exemplar.
- [ ] Every playbook shows official sources, data accessibility, baseline, evaluation state, risks, human oversight, limitations, and next validation questions.
- [ ] Policy Evidence Workbench runs without a key, live API, database, or private data.
- [ ] Official source sample, synthetic corpus, recorded output, baseline, and human review state are visually and semantically distinct.
- [ ] Synthetic data regenerates deterministically and all fixture hashes verify.
- [ ] Every recorded finding citation points to exact synthetic text.
- [ ] The baseline is transparent and evaluated against the same labelled set.
- [ ] The hosted page says **Recorded demonstration** and **Not operationally validated**.
- [ ] A no-demo playbook explains the barrier rather than showing an empty interactive shell.
- [ ] Core explanation and evidence remain available without JavaScript.
- [ ] JSX accessibility linting passes; keyboard, zoom, reduced-motion, forced-colours, responsive, screen-reader-oriented, and no-JavaScript checks pass manual release review.
- [ ] Content validation, typecheck, lint, unit and focused component tests, and production build pass in CI.
- [ ] Tracked content contains no personal names, personal local paths, credentials, private endpoints, or sensitive person-level records.
- [ ] README, licence, contributing guide, code of conduct, security policy, issue forms, and CI are complete.
