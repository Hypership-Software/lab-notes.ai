# lab-notes.ai — Design

## 1. Purpose

lab-notes.ai is the fastest credible starting point for builders exploring the public-service opportunities named in Northern Ireland's draft AI strategy. The website helps a builder choose an opportunity, understand the completed research, and inspect safe starter data. The cloned repository supplies a dedicated repository skill so a coding agent can work as a domain-aware build partner.

> Choose a playbook → inspect the evidence → clone the repository → invoke the domain build partner → decide what is worth building.

The project does not recommend a product, claim that AI is required, provide a deployed service, imply government endorsement, or imitate an official government service.

## 2. Product promise

> 17 public-service opportunities. The desk research is already done.

> Start with published sources, safe sample data, and a domain build partner that ships with the repository.

Every playbook must expose a strategy opportunity, investigated published sources, synthetic starter data or a responsible refusal, titled caveats, and one derived domain build partner. A visitor can understand the opportunity and its constraints without reading code; a builder can locate the typed definition, dataset, skill, and validation rules in the repository.

## 3. Audience and primary job

The primary audience is builders in Northern Ireland's technology, public-service, civic-tech, research, and delivery ecosystem. They are likely to use an AI coding agent, clone the repository, and adapt an open-source reference rather than follow a prescribed product brief.

The primary job is: help me decide whether a strategy opportunity is credible enough to explore, then give my coding agent the sources, sample data, constraints, and domain context needed to start responsibly. Public and policy readers remain supported through plain English and visible evidence.

## 4. Design principles

- **Builder first.** Repository files, dataset actions, and skill commands are primary product actions.
- **Evidence before invention.** Show the path from strategy proposal to published sources to synthetic working data; do not publish a ranked or fixed solution set.
- **Agent-ready by design.** Each cloned playbook includes a focused repository skill that supplies domain context and working boundaries without claiming professional authority.
- **Synthetic but useful.** Purpose, shape, preparation, and limitations are independently visible.
- **Bold, not generic.** The interface is an annotated open-source field manual, not a government service, generic AI surface, or dashboard.
- **Accessible interaction.** JavaScript is assumed available and may power meaningful exploration. WCAG 2.2 AA, keyboard operation, screen-reader semantics, visible focus, reduced motion, forced colours, and 200% zoom remain acceptance requirements.

## 5. Information architecture

Routes remain within one Next.js application:

| Route | Target purpose |
| --- | --- |
| `/` | Establish the builder proposition, show the repository workflow, and open the atlas |
| `/playbooks` | Present all 17 opportunities as one interactive Opportunity Atlas |
| `/playbooks/[slug]` | Deliver the opportunity, research, starter data, domain build partner, and constraints |
| `/playbooks/[slug]/dataset` | Provide an interactive view of every synthetic record and its schema |
| `/method` | Explain research provenance, synthetic-data preparation, domain skills, and what none of them proves |
| `/contribute` | Explain how to improve research, data, domain briefs, and skills |

The visible builder journey is:

1. Opportunity
2. Research already done
3. Starter dataset
4. Domain build partner
5. Before you build

The underlying strategy-opportunity, investigated-source, synthetic-data, and titled-caveat contract remains typed and mandatory. The matching domain skill is derived from the playbook slug and validated as part of the contract.

## 6. Homepage

Use a full-bleed asymmetric 70/30 hero. Its headline is:

> 17 public-service opportunities.<br>
> The desk research is already done.

The lede says that each playbook includes published sources, safe starter data, honest constraints, and a domain build partner for a coding agent. The primary action is **Open the opportunity atlas** and the secondary action is **Clone the reference**.

The signature visual is a layered composition of real product artefacts: a published-source excerpt, a synthetic dataset row, a repository path, the `build-<slug>` skill name, and a constraint annotation. Each artefact carries a numbered one-line plain-English gloss so a first-time visitor can read the trail top to bottom. The exemplar playbook is chosen for how easily a cold reader can follow it (currently Traffic Flow Management) and is configured once in `lib/playbooks/exemplar.ts`, which the hero and the worked example both read. It assembles once with transform, opacity, and clip animations; reduced-motion mode shows the completed composition immediately. Follow with the builder workflow, one real accelerator handoff, and a compact atlas preview.

## 7. Opportunity Atlas

`/playbooks` shows all 17 opportunities without search, sector refinement, query parsing, result counts, inventory counts, or filtered states.

On desktop, use a full-width 42/58 split explorer: the left pane holds all indexed opportunity rows grouped under compact service-area labels; the sticky right pane previews the selected opportunity. The first row is selected on arrival. Hovering or focusing previews it, and its explicit primary affordance opens the playbook. The preview includes title, builder summary, sector, service area, source count, starter-data state and record count, the build-partner command, and **Open playbook**.

On mobile, use expandable indexed rows; opening one closes the previous row and reveals the equivalent preview content. The playbook link remains an explicit link. `OpportunityAtlas` is a focused client component: server-render the complete list and summaries as initial data, and keep selection state local. Selection transitions use transform and opacity rather than animated dimensions.

## 8. Playbook detail page

The full-width header includes the playbook index, sector and service area, oversized title, concise opportunity statement, builder-pack ledger, and the most useful action. The ledger states published sources investigated, starter-data status and record count, domain-build-partner availability, and last-reviewed date. Dataset inspection is primary where starter data exists; building with the domain partner is primary where it does not. The build-partner action is always visible.

Use a sticky `SectionNavigator` client component backed by `IntersectionObserver`. It supports direct fragment navigation, marks the current section, does not obscure focused content, and is never the only way to reach a section.

### Opportunity

Keep the strategy proposal concise and distinct from project interpretation. Show the draft reference and source link without turning the section into a policy quotation.

### Research already done

Open with: “We reviewed these published sources so you do not have to start from zero. Each source shows what it covers, how it can be accessed, and why it matters.” Render an editorial register with a large index, publisher, title, literal `Open`, `Registration or key`, or `Restricted` access badge, coverage, relevance, and external-source action. Access is a fact, not a score.

### Starter dataset

This is a major working surface: persistent **Synthetic working data** provenance, purpose, record count, inferred fields, representative interactive preview, **Inspect all records**, **Download JSON**, and **View repository file** actions, plus separate preparation and limitation disclosures.

Use this shared transparency copy:

> AI-assisted research helped identify and interpret the published sources. We then created a small, non-sensitive synthetic dataset shaped by the information those sources expose. It is for exploration—not evidence, training, or operational decisions.

### Domain build partner

This section is the handoff from website to repository. Its headline is **Build with a domain-aware coding agent**. Explain that the checked-in skill supplies the playbook, sources, dataset, known unknowns, and constraints to the builder's coding agent. Call it a **domain build partner**, never a domain expert, accredited adviser, or source of professional assurance.

Render a clone command, the skill invocation for each supported agent (Claude Code and Codex), a copyable starter prompt that asks for the skill by name, copy feedback, links to `SKILL.md` and the domain brief, and a concise list of loaded context. JavaScript may support clipboard feedback and instruction switching where instructions genuinely differ.

### Before you build

Retain titled caveats but show them under **Before you build**. Open with: “These are not footnotes. They are conditions that any responsible prototype would need to address.” Render a full-bleed high-contrast closing band. Caveats are unranked and have no risk score, severity, traffic-light state, maturity level, or approval state.

## 9. Dataset route

`/playbooks/[slug]/dataset` is a focused `DatasetExplorer` client component with **Records**, **Table**, and **Schema** views. The server reads and validates the committed dataset. The client receives the validated envelope and handles view state, column selection, record expansion, copy actions, and lightweight sorting. Do not add search merely because the surface is interactive.

Long documents default to Records; short-field datasets default to Table. Schema shows inferred field names, primitive types, populated counts, and sample values. The full dataset, disclosure, description, actions, and limitations remain available in every view.

## 10. Method and contribution routes

`/method` explains how strategy examples became playbooks, how AI-assisted research identified and interpreted public sources, how synthetic datasets were authored and labelled, and how repository skills turn that context into a domain build partner. Source links let builders verify the research; do not imply formal human verification where it did not occur.

`/contribute` presents a pipeline to improve an opportunity explanation, verify or add a source, improve a synthetic dataset, or improve a domain brief or build-partner skill. Each step links to the exact repository location and validation command.

## 11. Repository-scoped domain skills

Skills follow the open Agent Skills standard and are agent-agnostic. Each lives once at `$REPO_ROOT/.agents/skills/build-<playbook-slug>/`, where Codex discovers it, with `SKILL.md`, `agents/openai.yaml` (Codex-only display metadata), and `references/domain-brief.md`. `$REPO_ROOT/.claude/skills/build-<playbook-slug>` is a relative symlink to that folder so Claude Code discovers the same skill; never copy skill content into `.claude/skills`. Do not add duplicated playbook content, a README, installation guide, or changelog inside a skill. Public copy names no single agent as required: show the skill name, and where an invocation is shown, show it for every supported agent.

The skill reads its matching typed playbook, available dataset, and domain brief; establishes the builder's intended outcome; distinguishes published facts, project interpretation, synthetic data, and unsupported assumptions; explains constraints before implementation choices; explores multiple approaches without recommending a prewritten application; and stops where professional review, restricted data, or outside authority is needed.

Each domain brief covers vocabulary, affected organisations and stakeholder groups, source map and access boundaries, synthetic fields, known unknowns, assumptions to challenge, questions before building, and service-design and safety constraints. Detailed facts cite the playbook's published sources.

## 12. Content model

The shared contract is `schemaVersion: 3`, and all 17 definitions use it.

`summary` is a concise builder-oriented opportunity statement that neither claims an outcome nor asserts that AI is necessarily the answer. An available synthetic-data answer has `dataPath`, `purpose`, `preparation`, and `limitations`; record count and fields are derived from the committed dataset. A refusal retains its explanation and what contributors would need.

Caveats are titled explanations:

```ts
caveats: Array<{
  title: string
  detail: string
}>
```

Derive build-partner values instead of authoring them repeatedly:

```ts
skillName = `build-${playbook.slug}`
skillPath = `.agents/skills/${skillName}/SKILL.md`
```

Content validation asserts the derived folder, `SKILL.md`, metadata, and domain brief exist. The visible provenance vocabulary is **Real published source** and **Synthetic working data**.

## 13. Visual direction

The design language is an **annotated open-source field manual**: editorial, industrial, exact, and energetic. Use an asymmetric composition, 2px structural rules, large indexes, margin annotations, brackets, connector lines, highlighted source fragments, dataset cells, and command blocks derived from real content. Avoid stock AI imagery, glowing networks, glass panels, repetitive icon cards, uniform card walls, decorative shadows, government imitation, gradients, pure black, and pure white.

Use Paper `#F4F1E8`, Surface `#FFFDF5`, Peat `#15211B`, Muted peat `#4F5B54`, Ultramarine `#2746D7`, Dark ultramarine `#1931A8`, Acid `#C8E84A`, Acid ink `#1B2600`, Signal orange `#E7502C`, Dark orange `#8F2A17`, and Structural line `#A8A79F`, defined as theme tokens in `app/globals.css`. Verify every text/background pairing; hue roles remain fixed. There is one palette: no dark theme, and no colour that changes with the operating system's preference.

Use Bricolage Grotesque for display headings, Spline Sans for body and controls, and Fragment Mono only for identifiers, commands, fields, records, and repository paths. Important display text is three to five times nearby metadata. Motion is restrained: hero assembly, atlas previews, active-section tracking, dataset view changes, copy confirmation, and instruction switching; reduced motion makes changes immediate.

The identity is the lab-notes mark in `public/lab-notes-mark.png`: a peat notebook page with an acid corner and a plotted point. It sits in the header beside the `lab-notes.ai` wordmark set in Bricolage Grotesque, supplies the favicon and app icons in `app/`, and anchors every social-preview image. Keep the mark on Paper or Surface; on peat or any dark ground its ink disappears. Do not reintroduce a text badge, index code, or reference number in its place.

## 14. Styling, rendering, and interaction

`app/globals.css` contains only Tailwind imports, the class-scoped `dark` variant that keeps generated shadcn primitives on the single palette whatever the operating system prefers, theme and shadcn semantic tokens, minimal base rules, font variables, and print and forced-colours overrides. Page styling belongs to the owning component's Tailwind utilities; repeated variants use `cva` and `cn`. Add shadcn primitives through the CLI and keep generated primitives unmodified in `components/ui/`.

Server Components load validated content, metadata, and initial HTML. Focused client components own the atlas, dataset explorer, section navigator, and clipboard feedback. They receive serializable validated data and do not perform domain computation, fetch production services, or call a model.

## 15. Metadata and sharing

Every route sets its title, description, canonical URL, and Open Graph URL through `pageMetadata` in `lib/site.ts`, which also holds the site origin and description. `app/robots.ts`, `app/sitemap.ts`, and `app/manifest.ts` derive from the same constants and the playbook registry, so a new playbook appears in the sitemap without a separate edit. Social-preview images are generated at build time by `app/opengraph-image.tsx` and `app/playbooks/[slug]/opengraph-image.tsx` through `lib/open-graph/card.tsx`, using the mark and the tracked fonts in `assets/fonts/`; nothing is fetched at request time.

## 16. States and failure handling

For a missing synthetic dataset, render the responsible-refusal explanation and contributor requirements; never show controls or imply a safe stand-in exists. An invalid or missing skill fails content validation and the production build. Keep an unavailable external source record with its last-reviewed context, without claiming live availability. Clipboard failures leave commands selectable and show concise feedback. Interactive failures retain equivalent labels, values, links, and source material in the document.

## 17. Accessibility and responsive behaviour

Keep one `h1`, logical heading order, labelled landmarks, and a working skip link. Use buttons for atlas selection and links for navigation. Expose selected, expanded, copied, and current-section states semantically. Support keyboard traversal without hover, prevent sticky elements from obscuring focus, meet 44px touch targets, pair provenance colours with literal text, honour reduced motion and forced colours, and retain all core content and actions at 200% zoom and 320 CSS pixels.

## 18. Privacy, security, and integrity

No runtime model calls, production data pipeline, API key, account, upload, database, or private departmental integration is in scope. Do not commit person-level synthetic records where a responsible stand-in is not possible. Published sources and synthetic working data remain visibly distinct. Build partners stop when professional review, safeguarding, legal authority, restricted data, or data-controller decisions are required.

## 19. Testing and validation

- Parse all 17 playbooks through the shared schema, validate every available dataset envelope and privacy walk, validate unique source IDs, and validate titled caveats and split synthetic-data copy.
- Assert every registered slug resolves to a skill folder, `SKILL.md`, `agents/openai.yaml`, and domain brief, and that no orphan playbook skill exists.
- Run the official skill validator and test direct, implicit, incomplete, negative, and unsafe activation examples.
- Test atlas selection and keyboard navigation, builder-pack states, dataset views and full-record availability, build-partner copy feedback, and semantic source access labels and constraints.
- Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`, followed by desktop/mobile, keyboard, reduced-motion, forced-colours, and 200% zoom review. Do not add Playwright or another browser-test harness.

## 20. Explicit non-goals

No published recommended or ranked applications, hosted reference implementations, professional-authority claims for skills, autonomous production deployment workflows inside skills, runtime model calls, production integrations, person-level stand-ins where irresponsible, risk scores, maturity ladders, approval workflows, governance dashboards, dark theme, plugin packaging, or broad unrelated refactor.
