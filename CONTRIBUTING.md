# Contributing

Improve the researched starting point without turning a playbook into a product
recommendation. Choose the layer you can strengthen and run its focused check
before the complete gate.

## The five contribution points

1. **Opportunity copy** — edit the `summary`, `strategyExample` or titled
   `caveats` in `content/playbooks/<slug>/playbook.ts`. Keep the opportunity
   bounded and product choices open.
2. **Source verification** — check or improve the `dataSources` in the same
   playbook file. A source needs a stable ID, publisher, title, public URL,
   coverage, literal access condition and relevance.
3. **Synthetic working data** — edit
   `content/playbooks/<slug>/<slug>.data.json` and the matching `syntheticData`
   purpose, preparation and limitations. Use only non-sensitive structures
   supported by published sources and preserve the exact disclosure
   `Synthetic working data` in the JSON envelope.
4. **Domain brief** — edit
   `.agents/skills/build-<slug>/references/domain-brief.md`. Improve vocabulary,
   stakeholder context, source boundaries, known unknowns and pre-build questions.
5. **Build-partner instructions** — edit
   `.agents/skills/build-<slug>/SKILL.md`. Keep facts, project interpretation,
   synthetic data and unsupported assumptions distinct. Explore multiple
   unranked directions and stop where outside authority is required.

Use the focused content and skill checks while working:

```bash
npm run test -- content/playbooks/content.test.ts
npm run validate:skills
```

Then run the complete gate before opening a pull request:

```bash
npm run check
```

## Non-negotiable boundaries

- Never commit real or invented person-level records, names, contact details,
  identifiers, exact addresses, or sensitive health, justice, education,
  housing, benefits or consultation records.
- Never commit credentials, keys, private endpoints or personal local paths.
- Do not add runtime model calls, required accounts, databases or production
  data integrations without an approved design change.
- Keep public-facing content in plain English.
- Keep published sources and synthetic working data visibly distinct.
- Do not imply that synthetic data proves accuracy, fairness, legality or
  operational value.

Dataset tests walk committed values against `lib/privacy-patterns.ts`. If a
responsible stand-in cannot be made, retain the refusal and state what authorised
work would need instead.

Page changes must meet WCAG 2.2 AA and remain usable by keyboard, at 200% zoom,
with reduced motion and in forced-colour modes.
