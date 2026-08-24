# Contributing

A playbook is a complete, useful contribution long before it has a demo.
Pick the track that matches what you can bring.

Whatever you change, one command has to pass before you open a pull request:

```bash
npm run check
```

That runs the typecheck, ESLint (including `eslint-plugin-jsx-a11y`), the
Vitest suite, and a production build. There is no separate content validator:
the dataset checks live in `content/playbooks/content.test.ts`.

## The hard rules

These apply to every track, and none of them is negotiable in a pull request
that also does something else.

- **No person-shaped data.** Never commit a real person's data or anything
  shaped like it: names, email addresses, telephone numbers, National
  Insurance or health and care numbers, exact residential addresses, or real
  person-level health, justice, education, housing, benefits, or
  consultation-response records. `lib/privacy-patterns.ts` is the arbiter and
  is enforced over every committed dataset by the test suite. If you believe
  a pattern is wrong, change it in its own pull request rather than working
  around it.
- **No secrets.** No credentials, API keys, private endpoints, or personal
  local paths in any tracked file.
- **No model calls and no keys.** Nothing in this repository may call a model
  at runtime or require a credential to run. A demo computes from committed
  data.
- **Plain English in public-facing content.** Technical detail belongs inside
  the section it explains, not in place of the explanation.
- **Verified source URLs.** A source you add must resolve, be public, and say
  what the playbook claims it says.
- **Synthetic data is labelled everywhere.** It is never presented as
  official data or as evidence that something works.

## Track 1 — improve a playbook's plain English

**What to change:** the `summary`, `strategyExample.proposal`, `covers`,
`relevance`, `method`, `limitations`, or `caveats` fields in
`content/playbooks/<slug>/playbook.ts`.

Sharpen anything that reads like documentation or claims more than the
evidence supports. This is the contribution most playbooks need most.

**What must pass:** `npm run check`.

## Track 2 — add or verify a data source

**What to change:** the `dataSources` array in
`content/playbooks/<slug>/playbook.ts`.

Each source needs a stable `id`, the `publisher`, the `title` as published,
a public `url`, what it `covers`, its `access`, and why it is relevant.

`access` is one of:

- `open` — anyone can download it, no account;
- `registration-or-key` — public, but you must sign up or hold a key;
- `restricted` — an agreement, approval, or safe setting is required.

Classify by what a reader would actually meet, not by what the publisher
calls it. Verifying an existing source — checking it still resolves and still
supports the claim — is a real contribution on its own.

**What must pass:** `npm run check`.

## Track 3 — contribute a synthetic dataset

**What to change:** add `content/playbooks/<slug>/<slug>.data.json` and set
that playbook's `syntheticData` to `status: "available"` with the `dataPath`,
a `method` sentence, and its `limitations`.

Every dataset uses the same envelope, and the disclosure is an exact literal:

```json
{
  "disclosure": "Synthetic working data",
  "description": "What this dataset stands in for, and why it exists.",
  "records": [{ "…": "one object per record" }]
}
```

Shape the records on what the real sources in section B actually publish —
their fields, units, categories, and vocabulary. Do not copy any real record,
and do not write records at a person's level of detail: aggregate to the
level the published statistics use. There is no generator, no seed, and no
hash. An authored dataset is its own original.

Say plainly, in `limitations`, what the dataset approximates and what it
leaves out. A dataset that hides its own coarseness is worse than none.

**What must pass:** `npm run check`. The dataset tests in
`content/playbooks/content.test.ts` will parse your file through the
envelope, walk every string against the privacy patterns, and fail if the
`dataPath` does not resolve.

## Track 4 — build a demo

**What to change:** add a feature folder under `features/`, and set the
playbook's `demo` to `status: "available"` with its `route` and a
`howItWorks` sentence. A demo requires an available dataset; the schema
enforces that.

A demo must:

- be server rendered, with no `"use client"` boundary anywhere in it;
- compute its result from the committed dataset on every render;
- show the whole input before it shows any conclusion;
- link every citation back to the record it quotes;
- be completely readable and navigable with JavaScript switched off.

`features/policy-evidence/` is the worked example to copy from.

**What must pass:** `npm run check`, plus a manual pass with JavaScript
disabled, keyboard only, and at 320px width.

## Accessibility

WCAG 2.2 AA, keyboard operation, visible focus, reduced motion, forced
colours, 200% zoom, and a no-JavaScript core explanation are acceptance
requirements, not nice-to-haves. Automated coverage comes from the Next.js
ESLint configuration; the rest is a review check on every pull request that
changes a page.
