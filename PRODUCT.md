# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

A single Next.js 16 application using React 19, TypeScript, Tailwind CSS 4, and shadcn/ui with Base UI primitives. The repository uses npm and deploys as one application.

## Users

The public website serves two audiences through progressive disclosure:

- Members of the public, policymakers, service leaders, and subject-matter experts who need a plain-English explanation of a public-service problem, the proposed intervention, its evidence, and its limitations.
- Public-sector delivery teams, civic technologists, and software engineers who need reproducible examples, structured metadata, sample data, evaluation criteria, and implementation guidance they can adapt.

## Product Purpose

The project turns candidate public-sector AI use cases into an open-source catalogue of understandable, inspectable playbooks. Each playbook explains the problem by example, distinguishes demonstrated capability from aspiration, and provides a credible starting point for further discovery or implementation.

The first release will establish the catalogue and playbook contract, then prove it end to end with one interactive exemplar: Policy Evidence Workbench. Other candidate use cases will initially appear as assessed playbook cards rather than incomplete demonstrations.

## Positioning

Most government AI inventories explain systems without making them experiential, while most AI demo galleries expose an interaction without the public-service evidence, data provenance, governance, and reuse guidance around it. This project joins those layers: understand the problem, try a bounded example, inspect the evidence, and follow the implementation path in one place.

## Operating Context

Public visitors browse or filter the catalogue, open a playbook, understand the service problem and data reality, and try an interactive example where one exists. Technical visitors continue into the source register, synthetic-data method, evaluation approach, architecture, and local run instructions.

Contributors add or improve playbooks inside the same Next.js repository using a consistent schema and file layout. They should be able to contribute an assessed playbook before an interactive demonstration exists.

## Capabilities and Constraints

- The project is one Next.js application with one package manifest and one deployment unit.
- Every playbook uses the same metadata structure for its description, intended users, supported decision, public benefit, maturity, evidence, official data sources, licences, limitations, risks, human oversight, evaluation, and technical implementation.
- The MVP contains one complete interactive exemplar: Policy Evidence Workbench.
- Data pipelines, live departmental integrations, and API-key setup are outside the MVP.
- Each exemplar uses a small, versioned source sample to establish realistic structure, then derives clearly labelled synthetic data for repeatable demonstrations and tests.
- Source excerpts and synthetic derivatives must remain visibly distinguishable in both the interface and repository.
- No personal names, personal local paths, secrets, credentials, sensitive records, or real person-level health, justice, education, housing, or benefits data may be committed.
- Synthetic data must not be presented as evidence that a system is operationally effective.
- The product must communicate when AI is not the right tool and retain a non-AI baseline for comparison.

## Evidence on Hand

The founding source is Northern Ireland's 2026 Artificial Intelligence Strategy consultation draft, particularly its current project examples, proposed public-service transformation use cases, responsible-AI principles, and recommendation to create a public-sector AI project repository.

Official public datasets and publications will be recorded per playbook in a source register. The project currently has no verified users, testimonials, production deployments, measured time savings, or operational outcome claims; future work must not invent them.

## Product Principles

1. **Explain by example.** A non-specialist should understand the problem, intervention, evidence, and limitation before encountering implementation detail.
2. **Evidence before spectacle.** Every demonstration exposes its data provenance, baseline, evaluation method, maturity, and failure modes.
3. **Synthetic but honest.** Synthetic data makes examples safe and reproducible, never deceptively realistic or a substitute for partner validation.
4. **One pattern, many playbooks.** Consistent structure makes use cases comparable and contributions maintainable without forcing every domain into the same model.
5. **Public value with human control.** Benefits, accountability, oversight, contestability, accessibility, and redress are part of the product rather than supplementary paperwork.

## Accessibility & Inclusion

The presentation layer is for everyone. Content uses plain English, avoids unexplained AI and government jargon, works across keyboard and assistive-technology navigation, does not rely on colour alone, and preserves access to the core explanation when interactive demonstrations are unavailable.
