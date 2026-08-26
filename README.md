# Public-Service AI Playbooks

An independent, open-source accelerator for builders exploring the 17
public-service opportunities named in Northern Ireland's draft AI strategy.

Each playbook gives you the strategy opportunity, the published sources already
investigated, safe synthetic working data where responsible, explicit constraints,
and a domain build partner that ships with the repository. It does not recommend
a product or claim that AI is required.

## Start building

1. Clone the repository.
2. Run `npm install` and `npm run dev`.
3. Choose a playbook at `/playbooks`.
4. Invoke its checked-in skill: `/build-life-event-services` in Claude Code,
   `$build-life-event-services` in Codex, or ask any skills-aware agent for
   the `build-life-event-services` skill.
5. Inspect the published sources and synthetic dataset before choosing what to build.

```bash
git clone https://github.com/Hypership-Software/ats-us-nai.git
cd ats-us-nai
npm install
npm run dev
```

Every registered playbook has a matching `build-<slug>` skill plus a domain
brief. The skills follow the open [Agent Skills](https://agentskills.io)
standard and live once, in `.agents/skills`, where Codex discovers them;
`.claude/skills` holds one symlink per skill so Claude Code discovers the same
folders. Run `npm run validate:skills` to verify that contract.

The website makes no runtime model calls and requires no model key, account,
database or private data integration. No hosted example or production service is
included: the repository is a researched starting point for deciding what, if
anything, is worth prototyping.

## What a playbook contains

- **Opportunity** — the strategy example and this project's bounded interpretation.
- **Research already done** — real published sources, their coverage and access.
- **Starter dataset** — a labelled AI-authored stand-in, or a responsible refusal.
- **Domain build partner** — checked-in skill instructions and a domain brief.
- **Before you build** — conditions that responsible work must address.

Synthetic datasets are visibly labelled **Synthetic working data**. They are not
official records, training data, evidence of effectiveness or a basis for
operational decisions. Linked sources remain the work of their publishers.

## Quality gates

```bash
npm run validate:skills
npm run check
```

`npm run check` runs type generation and TypeScript, ESLint, the Vitest suite and
a production build. Manual release review covers keyboard use, 200% zoom,
reduced motion and forced colours.

## Contributing

Contributions can improve opportunity copy, verify published sources, strengthen
synthetic working data, or refine a domain brief or build-partner skill. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the repository paths and validation rules,
and [SECURITY.md](SECURITY.md) to report a vulnerability.

Never commit person-level data, secrets, credentials, private endpoints, personal
names or personal local paths.

## Independence and licence

This project does not represent a deployed service, government endorsement or an
official government service.

Apache-2.0 — see [LICENSE](LICENSE). The licence covers this repository's code,
content and synthetic datasets. Linked sources remain under their publishers'
terms.
