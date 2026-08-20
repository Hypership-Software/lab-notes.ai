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

- [ ] Write the inventory test first. Assert the exact slug set, count of seventeen, seventeen honest `assessed` entries, no public demo yet, and `very-high` risk plus `demo.availability: "none"` for `violence-risk-research`. Task 10 promotes Policy Evidence to the single `recorded-demo` only after its dataset, output, citations, and evaluation exist.

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

  Record exact access dates during implementation. Do not copy real consultation responses. Task 8 will add the authored structure note describing the method it observed.

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

- [ ] Write component tests first. Cover the home-page evidence chain order, the primary catalogue action, the Policy Evidence assessment label and recording barrier, all seventeen catalogue items without active filters, result-count announcement, filter clearing, accessible dossier-row names, and the method page's five evidence-maturity rungs.

- [ ] Run the tests and confirm failure.

  ```bash
  npm run test -- features/playbooks/catalogue components/site/evidence-chain.test.tsx
  ```

- [ ] Implement `EvidenceChain` as five numbered stages: public problem, official source sample, synthetic working data, bounded demonstration, evidence and code. At small widths it is a vertical ordered list; at wide widths it may use a restrained horizontal rule. Preserve the same DOM order.

- [ ] Implement the home page as a Server Component with this sequence:

  1. proposition and independence qualifier;
  2. evidence chain;
  3. Policy Evidence Workbench feature with its current **Assessed concept** label and a plain recording-readiness barrier until Task 10;
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
- Create: `app/not-found.tsx`
- Create: `features/playbooks/detail/playbook-detail.tsx`
- Create: `features/playbooks/detail/metadata-rail.tsx`
- Create: `features/playbooks/detail/source-register.tsx`
- Create: `features/playbooks/detail/maturity-ladder.tsx`
- Create: `features/playbooks/detail/demo-readiness.tsx`
- Create: `features/playbooks/detail/synthetic-data-method.tsx`
- Create: `features/playbooks/detail/evaluation-evidence.tsx`
- Create: `features/playbooks/detail/implementation-index.tsx`
- Create: `features/playbooks/detail/review-status.ts`
- Create: `features/playbooks/detail/review-status.test.ts`
- Create: `features/playbooks/detail/detail-primitives.test.tsx`
- Create: `features/playbooks/detail/playbook-detail.test.tsx`
- Create: `lib/playbooks/vocabulary.ts`
- Create: `lib/playbooks/vocabulary.test.ts`
- Create: `lib/format-date.ts`
- Create: `lib/format-date.test.ts`
- Create: `lib/assert-never.ts`
- Modify: `app/globals.css`
- Modify: `lib/playbooks/schema.ts`, `components/site/status-badge.tsx`, `components/site/risk-badge.tsx`, `features/playbooks/catalogue/filter-options.ts`, `features/playbooks/catalogue/playbook-dossier-row.tsx`, `app/method/page.tsx` (adopt the shared vocabulary and date helper)

### Interfaces

Derive component inputs from `Playbook`; do not define a second detail-page content model.

```ts
export type ReviewStatus =
  | { status: "current"; reviewedAt: string; reviewDueAt: string }
  | { status: "review-needed"; reviewedAt: string; reviewDueAt: string }

export function getReviewStatus(
  lastReviewed: string,
  now: Date,
): ReviewStatus

export function MetadataRail(props: {
  playbook: Playbook
  reviewStatus: ReviewStatus
}): ReactNode

export function SourceRegister(props: {
  sources: Playbook["officialSources"]
}): ReactNode

export function MaturityLadder(props: {
  maturity: Playbook["maturity"]
  nextValidationSteps: Playbook["nextValidationSteps"]
}): ReactNode

export function DemoReadiness(props: {
  demo: Playbook["demo"]
  nextValidationSteps: Playbook["nextValidationSteps"]
}): ReactNode

export function SyntheticDataMethod(props: {
  syntheticData: Playbook["syntheticData"]
}): ReactNode

export function EvaluationEvidence(props: {
  evaluation: Playbook["evaluation"]
}): ReactNode

export function ImplementationIndex(props: {
  implementation: Playbook["implementation"]
  references: Playbook["references"]
}): ReactNode

export function PlaybookDetail(props: {
  playbook: Playbook
  reviewStatus: ReviewStatus
}): ReactNode
```

### 7.1 Centralise the shared vocabulary and date presentation

- [ ] Write `lib/playbooks/vocabulary.test.ts` and `lib/format-date.test.ts` first. Assert that the maturity ladder covers `maturityValues` in order, that the maturity, data-accessibility, risk, and source-type records are keyed exactly by the schema's exported values, and that one shared UTC formatter renders `2026-08-18` as `18 August 2026`.

- [ ] Run the focused tests and confirm failure.

  ```bash
  npm run test -- lib/playbooks/vocabulary.test.ts lib/format-date.test.ts
  ```

- [ ] Implement `lib/playbooks/vocabulary.ts` (schema-keyed text only, no JSX), `lib/format-date.ts` (one `Intl.DateTimeFormat` at UTC), and `lib/assert-never.ts`. Export `isoDateSchema` from `lib/playbooks/schema.ts` and use it for `accessedAt`, `recordedAt`, and `lastReviewed`.

- [ ] Migrate every existing consumer: `status-badge.tsx`, `risk-badge.tsx`, `filter-options.ts`, `playbook-dossier-row.tsx`, and `app/method/page.tsx`. Maturity labels are currently defined three times and data-accessibility labels twice with divergent wording (**Open** against **Open data**); resolve that in favour of **Open data** so a filter chip and a dossier row describe the same value identically. Keep the method page's existing `.maturity-ladder` markup and `aria-label="Evidence maturity"` unchanged.

- [ ] Run the full test suite, typecheck, and lint. Every existing test must still pass unchanged, because the catalogue, site-shell, and evidence-chain tests already assert these labels.

  ```bash
  npm run test
  npm run typecheck
  npm run lint
  git add lib components/site features/playbooks/catalogue app/method/page.tsx
  git commit -m "refactor: centralise playbook vocabulary and date presentation"
  ```

### 7.2 Make review status deterministic

- [ ] Write `review-status.test.ts` first. Cover the day before, exact twelve-month anniversary, first day after the anniversary, and a leap-day review. The exact anniversary remains current; only a later UTC date is review-needed. Pass `now` explicitly instead of mocking global time.

- [ ] Run the focused test and confirm failure.

  ```bash
  npm run test -- features/playbooks/detail/review-status.test.ts
  ```

- [ ] Implement `getReviewStatus`. Validate the input with the exported `isoDateSchema` rather than a second hand-rolled date parser; Zod's ISO date check is calendar-aware, so `2026-02-31` and `2100-02-29` are already rejected. Calculate the calendar anniversary in UTC and clamp 29 February to the last valid day of February in a non-leap year. Return the recorded and due dates as ISO dates so presentation code can format them without losing provenance. Both dates are always shown in text, because this status is computed from the build clock.

- [ ] Run the focused test and commit the pure date rule.

  ```bash
  npm run test -- features/playbooks/detail/review-status.test.ts
  git add features/playbooks/detail/review-status.ts features/playbooks/detail/review-status.test.ts
  git commit -m "feat: define playbook review status"
  ```

### 7.3 Build the reusable dossier primitives

- [ ] Write `detail-primitives.test.tsx` first. Assert that:

  - metadata exposes maturity, data accessibility, the risk badge, sector, technical patterns, both review dates, and review-needed text when applicable, while risk *reasons* stay in the risks section so they are neither duplicated nor announced twice;
  - every source dossier exposes publisher, jurisdiction, title, canonical link, type, covered period, access date, reuse status, purpose, transformations, caveats, and optional local sample/hash together;
  - the maturity ladder marks exactly one current rung and presents `nextValidationSteps` as work still required;
  - `DemoReadiness` handles `none`, `recorded`, `live-local`, and `partner` exhaustively, including warnings and limitations;
  - synthetic-data and evaluation components render every discriminated-union variant without implying unavailable evidence;
  - the implementation index exposes architecture, inputs, outputs, reusable parts, partner requirements, and references.

- [ ] Run the focused test and confirm failure.

  ```bash
  npm run test -- features/playbooks/detail/detail-primitives.test.tsx
  ```

- [ ] Implement the primitives as Server Components. Reuse `StatusBadge`, `RiskBadge`, `ExternalLink`, `ProvenanceLabel`, the shared vocabulary, `formatUtcDate`, and `assertNever`; define no local label map, date formatter, or exhaustiveness helper. Render sources once as an ordered list of `<article>` dossiers containing definition lists; use CSS Grid to make them compact on wide layouts and stack the same markup on narrow layouts. Assert on roles, accessible names, and visible text — the repository uses no `data-testid` and should not start here.

- [ ] Render every genuinely optional field honestly. `localSamplePath` and `sha256` appear only together; empty `transformations`, `caveats`, `references`, `partnerRequirements`, and `not-run` metrics omit their own label and list. The eleven sections themselves are unconditional, and no placeholder, dash, or zero stands in for missing evidence.

- [ ] Keep schema variants exhaustive. Use `never` assertions in `DemoReadiness`, `SyntheticDataMethod`, and `EvaluationEvidence` so a new variant fails typecheck until its public explanation is designed.

- [ ] Run the focused test and commit the primitives.

  ```bash
  npm run test -- features/playbooks/detail/detail-primitives.test.tsx
  git add features/playbooks/detail
  git commit -m "feat: add playbook dossier primitives"
  ```

### 7.4 Compose the fixed evidence sequence

- [ ] Write `playbook-detail.test.tsx` first using a registered playbook fixture. Assert one `h1`; the exact eleven `h2` headings in the order specified by `DESIGN.md`; the summary before technical detail; and visible problem, intended users, supported decision, public benefit, synthetic method, non-AI baseline, evaluation state, limitations, failure modes, human-review point, escalation, and redress.

- [ ] Run the focused test and confirm failure.

  ```bash
  npm run test -- features/playbooks/detail/playbook-detail.test.tsx
  ```

- [ ] Implement `PlaybookDetail` as one semantic document. Define the eleven sections once, as data, and render both the contents list and the document body from that definition so they cannot drift. Give each numbered section a stable fragment ID. Preserve the document order at every breakpoint; the desktop metadata rail, narrative column, and evidence notes are visual CSS-grid placements rather than duplicate markup.

- [ ] Add the JavaScript-free contents block between the title and the first section: a labelled `nav` with an ordered list of the eleven fragment links, its label a paragraph rather than a heading so the document keeps exactly eleven `h2` elements.

- [ ] Extend `app/globals.css` only with selectors required by the dossier layout, using the existing design tokens. Reuse the shipped composition rather than restating it: the route wraps content in `.page-shell` as `/playbooks` and `/method` do, the header reuses `.page-intro`, prose reuses `.reading-width`, and the ladder reuses `.maturity-ladder` with added current-rung and future-rung rules. Extend the existing `@media print`, `(forced-colors: active)`, and `(prefers-reduced-motion: reduce)` blocks instead of adding a second set, and do not name a class that no stylesheet defines. Include visible focus states, print-safe borders, readable measures, and responsive stacking without horizontal overflow.

- [ ] Run the focused detail tests and commit the composition.

  ```bash
  npm run test -- features/playbooks/detail
  git add features/playbooks/detail app/globals.css
  git commit -m "feat: compose comparable playbook dossiers"
  ```

### 7.5 Add the static route, metadata, and 404

- [ ] Implement the parameterised route with build-time slugs and generated metadata. Use Next.js's generated route helper so the route parameter stays coupled to the file-system route.

  ```tsx
  import type { Metadata } from "next"
  import { notFound } from "next/navigation"

  import { PlaybookDetail } from "@/features/playbooks/detail/playbook-detail"
  import { getReviewStatus } from "@/features/playbooks/detail/review-status"
  import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks/registry"

  export const dynamicParams = false

  export function generateStaticParams() {
    return getPlaybookSlugs().map((slug) => ({ slug }))
  }

  export async function generateMetadata({
    params,
  }: PageProps<"/playbooks/[slug]">): Promise<Metadata> {
    const { slug } = await params
    const playbook = getPlaybook(slug)
    if (!playbook) return {}
    return { title: playbook.title, description: playbook.summary }
  }

  export default async function PlaybookPage({
    params,
  }: PageProps<"/playbooks/[slug]">) {
    const { slug } = await params
    const playbook = getPlaybook(slug)
    if (!playbook) notFound()

    return (
      <PlaybookDetail
        playbook={playbook}
        reviewStatus={getReviewStatus(playbook.lastReviewed, new Date())}
      />
    )
  }
  ```

- [ ] Build `app/not-found.tsx` with a plain-English sentence and one catalogue link. Keep the copy generic, because this file also serves every unmatched URL in the application, and export no `metadata`: Next.js documents metadata exports only for the experimental `global-not-found.js`, and 404 responses already receive `noindex`.

- [ ] Do not add `app/playbooks/[slug]/loading.tsx`: every dossier is local, validated, and statically rendered, and the absent Suspense boundary is also what keeps an unknown slug a real HTTP 404. Next.js returns 404 for a non-streamed not-found response and 200 with `noindex` once streaming has begun.

- [ ] Run focused tests, content validation, type generation/typecheck, lint, and the production build. Confirm the build emits the static playbook route and the registry still contains seventeen unique slugs.

  ```bash
  npm run test -- features/playbooks/detail
  npm run validate:content
  npm run typecheck
  npm run lint
  npm run build
  ```

- [ ] Start the production server and perform a bounded manual verification: one assessed dossier at desktop and mobile widths, print preview, keyboard focus order, forced colours, JavaScript disabled, every external-source accessible name, and an unknown slug returning HTTP 404. This is a manual acceptance pass, not an automated browser-test suite.

- [ ] Run the Impeccable interface detector once against the completed route, resolve real findings, then run the full repository check.

  ```bash
  npm run check
  ```

- [ ] Commit the route and final presentation changes.

  ```bash
  git add app/playbooks/[slug]/page.tsx app/not-found.tsx app/globals.css features/playbooks/detail
  git commit -m "feat: publish static playbook dossiers"
  ```

---

## Task 8: Create the policy-evidence synthetic dataset

**Files**

- Create: `content/playbooks/policy-evidence/consultation-analysis-structure.md`
- Create: `content/playbooks/policy-evidence/policy-evidence.data.json`
- Create: `features/policy-evidence/domain/types.ts`
- Create: `features/policy-evidence/domain/types.test.ts`
- Create: `lib/privacy-patterns.ts`
- Create: `lib/privacy-patterns.test.ts`
- Create: `scripts/validate-content-core.ts`
- Create: `scripts/validate-content.test.ts`
- Modify: `scripts/validate-content.mts` (reduced to a thin CLI shim over `validate-content-core.ts`)
- Modify: `content/playbooks/policy-evidence/playbook.ts`
- Modify: `content/playbooks/define-assessed-playbook.ts`
- Modify: `lib/playbooks/schema.ts`
- Create: `.gitattributes`

The dataset is written by hand and committed as a single readable file. There is
no generator, no seed, and no build step between the file and the page: the
example imports `policy-evidence.data.json` directly. A generator would make the
twenty documents reproducible, which nothing needs, at the cost of machinery
that has to be understood before the data can be read or corrected.

For the same reason the dataset carries no recorded hash. A hash asserts that a
file is an unaltered copy of something derived elsewhere; an authored dataset is
its own original, editing it is legitimate work, and a recorded hash over it
would only ever fire as a false alarm. Hashing stays where the claim is real:
`officialSources[].localSamplePath` with its `sha256`.

There is no `fixtures/source/` directory. Nothing here is a downloaded excerpt:
the consultation-analysis structure note is authored prose describing the
headings, stages, and vocabulary observed in a public report, not a verbatim
extract, so it is attached to the synthetic provenance
(`syntheticData.structureNotePath`) rather than filed as an `officialSources`
local sample. The report itself stays an `officialSources` entry with only a
canonical link and a `reuseStatus` explaining that no respondent text is copied.

### Public interfaces

```ts
export const corpusDocumentSchema = z.strictObject({
  id: z.string().regex(/^SYN-\d{4}$/, "Use a zero-padded SYN identifier"),
  synthetic: z.literal(true),
  disclosure: z.literal("Synthetic working data"),
  theme: z.enum(corpusThemeValues),
  stance: z.enum(corpusStanceValues),
  text: corpusTextSchema,
})

export const corpusSchema = z
  .array(corpusDocumentSchema)
  .min(1)
  .superRefine(/* unique identifiers, ascending sort order */)

export type CorpusDocument = z.infer<typeof corpusDocumentSchema>
```

The document contract is schema-first: `corpusSchema` is the one place that
enforces the disclosure literal, the `synthetic: true` literal, the identifier
shape, uniqueness, and sort order, so nothing downstream hand-rolls those
checks. `theme` and `stance` are typed enums, not free-text `tags`. Because the
documents are hand-authored, this parse is the only thing standing between an
author's edit and a published dataset, so content validation runs it over the
committed file rather than trusting it at authoring time.

### Steps

- [ ] Verify the official response-report page is accessible on the implementation date and record the canonical publication page, publisher, publication date, access date, and reuse statement as an `officialSources` entry with no local sample path or hash — the report is used only to study structure, not to supply text.

- [ ] Author `consultation-analysis-structure.md` describing, in this project's own words, the headings, analytical stages, and public-sector consultation vocabulary a policy team's manual method would use. It must contain no respondent text, contact information, signature, or local path, and no sentence copied from the source report. It must state which parts of the shape come from the report and which the project chose for itself: the six themes and four positions are this project's own.

- [ ] Write the document contract in `types.ts` before the data: `corpusThemeValues`, `corpusStanceValues`, `corpusDocumentSchema`, and `corpusSchema`, with person-shaped text rejected at the contract boundary via the shared `findPersonalDataShape` check rather than re-implemented per caller.

- [ ] Write the contract tests first. Assert that IDs are unique, zero-padded, and sorted ascending; that every record carries `synthetic: true` and the exact disclosure label; that an unknown field is rejected; and that text containing an email, phone number, URL, National Insurance number pattern, or Health and Care number pattern fails to parse.

- [ ] Author twenty documents in `policy-evidence.data.json`, covering six themes relevant to a strategy consultation — access to services, workforce capability, data governance, accountability, procurement and reuse, and environmental cost — across supportive, critical, mixed, and uncertain positions. Each response must read like something a person or organisation would actually write: varied length, varied register, and at least one genuine minority position retained rather than averaged away. No response may imitate a named real respondent, and none may contain a numeral that could read as an identifier.

- [ ] Record the dataset path, structure-note path, source characteristics, approximations, deliberate alterations, exclusions, and limitations on the playbook's `syntheticDataset` spec. The method sentence must say what the dataset stands in for and why it exists — that a visitor can try the task without holding a consultation mailbox — not merely how it was produced. `syntheticData` becomes `"available"` for this playbook, but `maturity` stays `"assessed"` and `demo.availability` stays `"none"`: the schema couples maturity and demo state to the recorded analysis, prompt, and evaluation, which are still outstanding.

- [ ] Pin `content/playbooks/**/*.data.json` and `content/playbooks/**/fixtures/**` to LF in `.gitattributes`. Datasets are pinned so their diffs stay readable across platforms; source samples are pinned because `core.autocrlf` would otherwise rewrite them to CRLF on a Windows checkout and every recorded SHA-256 would mismatch on a fresh clone while still matching on Linux CI.

- [ ] Extend `scripts/validate-content.mts` to resolve the dataset and structure-note paths inside the repository root, confirm the structure note is readable, run a full `corpusSchema` parse of the committed dataset, and scan the parsed keys against `sensitiveKeyPattern`.

- [ ] Prove each validation branch fails before trusting it. Build a temporary root holding a deliberately broken copy of the dataset and confirm `validateContent` names the playbook for invalid JSON, for a document that breaks the contract, and for text carrying a person-shaped value. Resolve the real content against the wrong root and confirm the missing dataset is reported by filename.

- [ ] Commit the work. It lands as multiple commits rather than one, each following its own red-green-refactor cycle: the shared privacy patterns and line-ending pin, the document contract, the authored dataset, the playbook declaration, and finally the content-validation wiring.

---

## Task 9: Implement the baseline, recorded analysis, citations, and evaluation

**Files**

- Modify: `features/policy-evidence/domain/types.ts`
- Create: `features/policy-evidence/domain/run-baseline.ts`
- Create: `features/policy-evidence/domain/run-baseline.test.ts`
- Create: `features/policy-evidence/domain/evaluate-analysis.ts`
- Create: `features/policy-evidence/domain/evaluate-analysis.test.ts`
- Create: `features/policy-evidence/domain/baseline-evaluation.test.ts`
- Create: `features/policy-evidence/domain/recorded-analysis.ts`
- Create: `features/policy-evidence/domain/recorded-analysis.test.ts`
- Create: `content/playbooks/policy-evidence/policy-evidence.gold.json`
- Modify: `content/playbooks/policy-evidence/playbook.ts`
- Modify: `content/playbooks/define-assessed-playbook.ts`

Committed artefacts stay flat and named for the playbook, as the dataset does:
`policy-evidence.gold.json` sits beside `policy-evidence.data.json`. The
expectation set is hand-labelled, so it carries no manifest and no hash for the
same reason the dataset does not; `evaluationGoldSchema` is what guards it, and
`baseline-evaluation.test.ts` parses the committed file through it.

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

// A discriminated union, not a shared shape. Only the recorded branch records
// `inputSha256`: the baseline is computed from the corpus in the same process
// that reads it, so a hash over its input attests to nothing, while a recorded
// output was produced elsewhere and the hash is the only thing tying it to this
// exact dataset.
export type AnalysisResult =
  | { kind: "baseline"; vocabularyVersion: string; findings: Finding[] }
  | { kind: "recorded-ai-assisted"; inputSha256: string; findings: Finding[] }

export type EvaluationResult = {
  citationPrecision: Metric
  evidenceCoverage: Metric
  unsupportedFindingCount: number
  brokenReferenceCount: number
  findingsWithoutGoldCase: FindingId[]
  cases: EvaluationCaseResult[]
  limitations: string[]
}

export function runBaseline(corpus: readonly CorpusDocument[]): BaselineAnalysis
export function evaluateAnalysis(
  analysis: AnalysisResult,
  gold: readonly EvaluationCase[],
  corpus: readonly CorpusDocument[],
): EvaluationResult
export function parseRecordedAnalysis(
  rawManifest: unknown,
  rawAnalysis: unknown,
  corpus: readonly CorpusDocument[],
): ParseResult
```

`Metric` always carries its numerator and denominator, and `value` is `null`
rather than `0` for an empty denominator: "could not be measured" and "measured
as nothing" are different claims.

An `EvaluationCase` joins to a finding by `findingId`, which is what forces the
baseline and any recorded analysis to agree on identifiers and so makes them
comparable. A finding the expectation set never labelled is reported in
`findingsWithoutGoldCase` and excluded from precision, because crediting or
penalising unreviewed work would make the metric a claim about a judgement
nobody made.

### Steps

- [ ] Write baseline tests first. Cover phrase matching, normalised punctuation and case, a term refused inside a longer word, matched-excerpt citations at exact offsets, stable finding order, no duplicate document citation per finding, empty corpus, and identical results for identical input.

- [ ] Implement the baseline as a visible, versioned controlled vocabulary for the six themes, and nothing else: no embeddings, no model call, no learned weights. Score exact phrases and tokens by word count, cite the sentence enclosing the strongest match so a citation reads as evidence, and break ties by score then document ID. Return findings in theme declaration order rather than ranked by match count — ranking would read as a claim about which concern matters most, which a word list cannot support and which this playbook explicitly disclaims.

- [ ] Write evaluation tests first. Cover all-correct, an unexpected citation, a missing expected document, an unsupported finding, a broken document ID, mismatched quote offsets, offsets past the end of the document, a finding with no gold case, a gold case whose finding is absent, and explicit `null` metric values for zero denominators.

- [ ] Implement citation-integrity validation before computing metrics. A citation is valid only if the document exists and `document.text.slice(start, end) === quote`. Never re-derive the quote from the offsets: that would make every citation agree with itself. An invalid citation is counted as a broken reference and excluded from both metrics rather than scored.

- [ ] Author `policy-evidence.gold.json` as a labelled expectation per theme, each with a rationale a reader can disagree with. Every document in the dataset is labelled exactly once, and the labels agree with the `theme` recorded on each document. Record in the playbook's evaluation limitations that the labels were written by the same author as the dataset, so they are not an independent judgement.

- [ ] Pin the baseline's published numbers in `baseline-evaluation.test.ts` by running the real baseline over the committed dataset and expectation set. Assert the exact precision and coverage numerators and denominators, the one response missed because it raises its theme in different words, and the three responses attributed to a theme their author did not intend. Editing the vocabulary, the dataset, or the labels is allowed; changing a published result without noticing is not.

- [ ] Keep the playbook's `evaluation.status` at `not-run` and replace its reason with what has actually been measured. The comparison this playbook promises is between the baseline and a recorded AI-assisted analysis; half of it does not exist, so a `fixture-evaluated` status would advertise an evaluation of the exemplar when only its control arm has been measured. Task 10 promotes it once both arms exist.

- [ ] Implement `parseRecordedAnalysis` and its manifest schema before any recording exists, and test it against a hand-built recording. Every manifest field is required with no default: this is the one place the repository makes a claim about a model rather than about its own code, so an incomplete manifest is a refusal. Prove that a wrong label, a `liveService: true` claim, a missing model identifier, an input hash disagreeing with the output, limitations omitting **Not operationally validated**, an unresolvable citation, and an empty finding list are each rejected, and that every problem is reported rather than only the first.

- [ ] Run the domain tests and content integrity validation.

  ```bash
  npm run test -- features/policy-evidence/domain
  npm run validate:content
  npm run typecheck
  ```

### Outstanding: the recording itself

This is the only part of Task 9 that cannot be done inside the repository, and
it blocks Task 10's recorded-output stages.

- [ ] Produce one recorded AI-assisted result outside the hosted runtime, using the exact committed `policy-evidence.data.json` and an openly licensed model running locally. Keep the one-off runner and any downloaded weights outside the repository; they are recording tools, not application dependencies. Remove machine details, operator identity, request identifiers, and any credential material. The output must satisfy `recordedAnalysisSchema`, must use the same `F-<theme>` finding identifiers as the baseline so the two are comparable, and must include at least one known, visible weakness so the human-review path is meaningful.

- [ ] Commit the recording as `policy-evidence.recorded.json` with a `policy-evidence.recorded.manifest.ts` carrying the real UTC recording date, exact open-model identifier and version, `procedureVersion`, input dataset SHA-256, procedure SHA-256, and output SHA-256 as literals from the completed run. Do not commit an incomplete manifest, and do not relabel hand-authored output as model-generated: `parseRecordedAnalysis` is written to refuse both.

- [ ] Add a test that loads the committed recording through `parseRecordedAnalysis` against the committed dataset and asserts it is accepted, then evaluate it with `evaluateAnalysis` and pin its metrics beside the baseline's.

- [ ] Commit domain behaviour and recorded evidence separately from UI.

---

## Task 10: Build the Policy Evidence Workbench interaction

**Files**

- Create: `app/playbooks/[slug]/demo/page.tsx`
- Create: `features/policy-evidence/fixtures.ts`
- Create: `features/policy-evidence/domain/build-evidence-threads.ts`
- Create: `features/policy-evidence/domain/build-evidence-threads.test.ts`
- Create: `features/policy-evidence/domain/review-disposition.ts`
- Create: `features/policy-evidence/components/policy-evidence-workbench.tsx`
- Create: `features/policy-evidence/components/workbench-client.tsx`
- Create: `features/policy-evidence/components/element-ids.ts`
- Create: `features/policy-evidence/components/baseline-demo-banner.tsx`
- Create: `features/policy-evidence/components/synthetic-corpus-inspector.tsx`
- Create: `features/policy-evidence/components/finding-list.tsx`
- Create: `features/policy-evidence/components/evidence-thread.tsx`
- Create: `features/policy-evidence/components/finding-review-controls.tsx`
- Create: `features/policy-evidence/components/evaluation-summary.tsx`
- Create: `features/policy-evidence/components/policy-evidence-workbench.test.tsx`
- Modify: `lib/playbooks/schema.ts` (the `baseline-only` demo state)
- Modify: `features/playbooks/detail/demo-readiness.tsx`
- Modify: `content/playbooks/define-assessed-playbook.ts`
- Modify: `content/playbooks/policy-evidence/playbook.ts`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

There is no `source-inspector.tsx`: the detail route's `SourceRegister` and
`SyntheticDataMethod` already render exactly what this page needs, and a second
component making the same claims in different words is how two parts of a
provenance-focused site start disagreeing.

### The `baseline-only` demo state

The four original demo states could not describe this page. `recorded` requires
a model identifier, prompt hash, and recorded output; `none` publishes nothing;
`live-local` and `partner` are elsewhere. A hosted example that runs only the
deterministic non-AI baseline over committed synthetic data needed its own
state, so `demoAvailabilityValues` gains `baseline-only`.

It is a weaker claim than `recorded`, not a stronger one:

- it carries `label: "Baseline demonstration"`, a distinct literal, so it can
  never be mistaken for `"Recorded demonstration"` in content or in a test;
- it records `vocabularyVersion`, because the result on the page depends on
  which word list produced it;
- it leaves `maturity` at `assessed`, because running no model is not evidence
  of one, and the existing refinement already refuses `recorded-demo` maturity
  without recorded metadata;
- a new refinement refuses it unless `syntheticData.status` is `"available"`,
  since the page reads that dataset on every render.

### Client-state contract

```ts
export type ReviewDisposition =
  | "unreviewed"
  | "investigate"
  | "unsupported"
  | "specialist-review"

// No `comparisonMode`. Comparison needs two analyses and only the baseline
// exists; a mode selector over one arm would imply the other was coming back.
export type WorkbenchState = {
  activeFindingId: FindingId | undefined
  dispositions: Record<string, ReviewDisposition>
  resetPending: boolean
}
```

### Steps

- [ ] Write component tests first for the hosted-flow stages this page can honestly show: orientation, the absence of any recorded or live AI label, the task and its disclaimers, the source label, the synthetic label, the whole dataset in the page, one finding per theme, the complete evidence thread in order, the four disposition values, metrics with numerators and denominators, and reuse guidance.

- [ ] Add interaction tests for keyboard finding selection, review-state change reflected in both the legend and the finding list, the two-step reset confirmation including the cancel path, selection preserved when a different finding is reviewed, a citation link resolving to the response anchor, and a group name that includes the finding and its current disposition.

- [ ] Implement `PolicyEvidenceWorkbench` as a Server Component. Both fixtures are parsed through their schemas at module load in `fixtures.ts`; the component runs the baseline, scores the evaluation, and joins the evidence threads. Nothing that produced a thread crosses into the browser.

- [ ] Keep `WorkbenchClient` the only client boundary, holding active finding, dispositions, and reset state. Render *every* thread regardless of selection: hiding the unselected ones would put the page's substance behind hydration, and the page must stay readable with JavaScript off. Selection is emphasis and movement, not disclosure.

- [ ] Put shared anchor helpers in `element-ids.ts` with no `"use client"` directive. Exporting them from the client component makes them client references, and the server can no longer call them while rendering the corpus — which fails the build rather than degrading quietly.

- [ ] Add the persistent banner above every result, stating what the page is not before what it is: no model is involved, nothing is AI output recorded or live, and no part of it has been operationally validated.

- [ ] Implement `EvidenceThread` in this exact order: finding, citation, synthetic response cited, how that response was made, what a reader expected, your review. Every stage is labelled in text; the numbers and the connector rule may reinforce the order but never carry it. A citation that does not resolve stays visible and says so, because hiding it would leave a finding looking fully evidenced while the evaluation counts a broken reference.

- [ ] Implement review controls as native radios in a fieldset whose legend names both the finding and the state currently chosen. No wording may imply approval, and the control says in place that states stay in the browser and reset on reload.

- [ ] Implement the evaluation summary with explicit numerators and denominators, `Not available` for a zero denominator, a case-by-case table naming what was missed and what was cited unexpectedly, and the evaluation's own limitations.

- [ ] Implement the generic demo route. Render the workbench for a `baseline-only` playbook, and `DemoReadiness` with the specific reason and a back link for anything else. Unknown slugs use `notFound()`. Keep `generateStaticParams()` across all registry slugs so a direct `/demo` URL is a page explaining what is missing rather than a 404.

- [ ] Mark selection with a ring inside the existing border, never a thick accent down one edge, matching how the maturity ladder marks its current rung. Every state carried by colour is also written out in text.

- [ ] During the release review, disable JavaScript and confirm the disclosure, task, source register, synthetic method, all twenty responses, all six findings, every evidence thread, and the evaluation remain readable. Interactive review controls may be inert.

- [ ] Run focused tests, typecheck, lint, content validation, and build.

### Outstanding: everything that needs the recording

Blocked on Task 9's recording. Each of these is a real hosted-flow stage that
cannot be built yet, and none is stubbed:

- [ ] Add the recorded-output stage: load the committed recording through `parseRecordedAnalysis`, render it beside the baseline, and label it `Recorded AI-assisted output`.

- [ ] Add `baseline-comparison.tsx` and the `comparisonMode` state (`recorded`, `baseline`, `side-by-side`), keeping the dataset and evaluation definition unchanged across modes and preserving the active finding when the mode changes.

- [ ] Promote the playbook to `recorded-demo` maturity with `demo.availability: "recorded"`, and move `evaluation.status` to `fixture-evaluated` once both arms of the comparison exist.

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

  - reparse the committed dataset against its contract and recompute source, prompt, recorded-output, and evaluation hashes;
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

- [ ] Ask a technical reviewer to find the schema, synthetic dataset, source register, baseline, recorded manifest, evaluation, and tests without guidance. Treat an ambiguous contribution path as a documentation defect.

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
- [ ] Every committed synthetic dataset parses against its contract, and all source-sample and recorded-output hashes verify.
- [ ] Every recorded finding citation points to exact synthetic text.
- [ ] The baseline is transparent and evaluated against the same labelled set.
- [ ] The hosted page says **Recorded demonstration** and **Not operationally validated**.
- [ ] A no-demo playbook explains the barrier rather than showing an empty interactive shell.
- [ ] Core explanation and evidence remain available without JavaScript.
- [ ] JSX accessibility linting passes; keyboard, zoom, reduced-motion, forced-colours, responsive, screen-reader-oriented, and no-JavaScript checks pass manual release review.
- [ ] Content validation, typecheck, lint, unit and focused component tests, and production build pass in CI.
- [ ] Tracked content contains no personal names, personal local paths, credentials, private endpoints, or sensitive person-level records.
- [ ] README, licence, contributing guide, code of conduct, security policy, issue forms, and CI are complete.
