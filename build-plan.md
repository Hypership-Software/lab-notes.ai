# Agent-native Opportunity Atlas — Execution Index

**Goal:** Rebuild the site as a bold builder accelerator with researched opportunities, interactive synthetic datasets, and one repository-scoped domain build-partner skill per playbook, while removing demos entirely.

The detailed working plan lives in `docs/superpowers/plans/2026-08-24-agent-native-opportunity-atlas.md`. It is intentionally ignored; this tracked index preserves the product contract, execution order, and constraints for a clean checkout.

**Spec:** `docs/superpowers/specs/2026-08-24-agent-native-opportunity-atlas-design.md`

## Global Constraints

- Preserve the current dirty worktree. Never reset, checkout, overwrite, or delete an overlapping change without inspecting its diff first.
- Stage only the files named by the current task. Existing unrelated modifications remain the user's work.
- Work in the current application: one `package.json`, one Next.js app, one deployment unit.
- Before Task 11, read `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`, `11-css.md`, `13-fonts.md`, and `03-api-reference/04-functions/generate-static-params.md`.
- The final playbook schema is version 3. It has no `demo` field and no A/B/C/D presentation contract.
- Every playbook retains a strategy opportunity, at least one investigated source, a synthetic-data answer, titled caveats, and one derived repository skill.
- The site contains no demo route, demo output, analysis workbench, chart dependency, or unavailable-demo state.
- Synthetic data is visibly labelled `Synthetic working data`; published evidence is labelled `Real published source`.
- The website performs no runtime model calls and needs no API key, account, database, upload, or production data integration.
- JavaScript is assumed available. Add client boundaries only around meaningful interaction.
- WCAG 2.2 AA, keyboard operation, visible focus, reduced motion, forced colours, and 200% zoom are release requirements.
- Add shadcn primitives through the CLI; do not hand-create or modify generated primitive internals.
- Page-specific styling belongs in Tailwind utilities and component variants, not `app/globals.css`.
- Do not add Playwright or another browser-test harness.
- Use the published source links already registered by each playbook. New factual domain claims require adding a published source to the playbook first.
- Use British English and plain, direct public copy. Do not describe a build partner as an accredited domain expert.

## Ordered tasks

- [x] **Task 1:** Replace the tracked product contract
- [x] **Task 2:** Introduce the accelerator schema v3
- [x] **Task 3:** Migrate all seventeen playbooks to concise builder copy
- [x] **Task 4:** Delete the obsolete showcase subsystem and restore a green application shell
- [x] **Task 5:** Derive dataset summaries and build-partner descriptors
- [x] **Task 6:** Establish the skill contract with Life Event Services
- [x] **Task 7:** Author citizen, community, and policy build partners
- [x] **Task 8:** Author health and education build partners
- [x] **Task 9:** Author environment, land, water, and transport build partners
- [x] **Task 10:** Author justice, community-safety, and housing build partners
- [x] **Task 11:** Install the bold Tailwind and shadcn foundation
- [x] **Task 12:** Build the homepage and Opportunity Atlas
- [x] **Task 13:** Rebuild the playbook page as a builder handoff
- [x] **Task 14:** Turn dataset pages into interactive working surfaces
- [x] **Task 15:** Complete supporting routes and remove legacy CSS
- [x] **Task 16:** Complete accessibility, production, and content verification

## Completion

Complete. The site is a builder accelerator rather than a prototype gallery; all 17 playbooks use schema version 3 and have a validated repository skill; the Opportunity Atlas, playbook, dataset, method, contribution, and not-found routes use the approved field-manual design; obsolete catalogue filtering, showcase, chart, and page-specific global styling machinery is gone; and the automated and manual accessibility quality gates pass.
