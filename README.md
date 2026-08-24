# Public-Service AI Playbooks

Northern Ireland's draft AI strategy calls out example projects for public
services. This is an open-source starting point for engaging with them: each
example becomes a playbook you can explore, validate, and contribute to, with
the real data sources behind it, a synthetic dataset you can try the idea
with, and — where one has been built — a working demo whose method you can
read in this repository.

## What every playbook answers

- **A — the strategy example.** What the draft proposed for this public
  service, in plain English, with a link to the draft itself.
- **B — the data sources investigated.** The real published sources for that
  example: who publishes them, what they cover, how open they are, and why
  they fit.
- **C — a synthetic dataset.** A small AI-authored dataset shaped by what
  those real sources publish, so anyone can try the idea without an API key,
  an account, or a data-sharing agreement. Where a stand-in would not be
  responsible, the playbook says so and says what a contributor would need
  instead.
- **D — a demo.** A working example built on A, B, and C. Where none exists,
  the playbook says so rather than implying one is coming.

Each playbook closes with one short caveats block: the honest limits of what
is on the page.

## Independence

This is an independent open-source project. It does not represent a deployed
service, it does not imply government endorsement, and it must not be
presented as an official government service.

## Quickstart

```bash
npm ci
npm run dev     # http://localhost:3000
npm run check   # typecheck, lint, tests, production build
```

**No API key is required — that is the point.** There is no runtime model
call, no database, and no credential of any kind. A demo recomputes its
result from a committed data file on every render, so the whole method is
readable in the source and reproducible by anyone who clones the repository.

## Data honesty

Every dataset in `content/playbooks/` is an AI-authored stand-in, shaped by
the structure and vocabulary that real, published sources make public. Each
one carries the literal disclosure `Synthetic working data` and is labelled
as synthetic everywhere it appears on the site.

Synthetic data is never official data, and never evidence that a system would
work — accurately, fairly, or lawfully — on real records. Linked sources are
real and belong to their publishers; the site keeps real sources, synthetic
working data, and computed demo output visibly apart.

No person-level data is committed. Every dataset is walked against the
patterns in `lib/privacy-patterns.ts`, and a match fails the test suite.

## Contributing

Four tracks, in rough order of how much they ask of you:

1. **Improve a playbook's plain English** — no dataset or demo required.
2. **Add or verify a data source** — a real, current, public URL with an
   honest access classification.
3. **Contribute a synthetic dataset** — for a playbook that has none, using
   the shared envelope and passing the dataset tests.
4. **Build a demo** — for a playbook that already has a dataset, server
   rendered, with no model call and no key.

See [CONTRIBUTING.md](CONTRIBUTING.md) for what each track requires, and
[SECURITY.md](SECURITY.md) to report a vulnerability.

## Licence

Apache-2.0 — see [LICENSE](LICENSE). This covers the code and the content in
this repository, including the synthetic datasets. Sources linked from a
playbook are not covered: they remain under their publishers' own terms.
