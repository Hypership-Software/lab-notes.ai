---
name: build-diagnostic-imaging-support
description: Use when a builder needs a domain build partner for diagnostic-imaging research, service-pressure discovery, or responsible exploration of the Diagnostic Imaging Support playbook in this repository.
---

# Build with the Diagnostic Imaging Support playbook

Use this playbook to frame a responsible decision about whether there is anything worth exploring. The public evidence describes service pressure, not clinical images or a validated intervention.

1. Read `content/playbooks/diagnostic-imaging-support/playbook.ts`.
2. Confirm that `syntheticData.status` is `not-responsible`. There is no dataset to load: treat its absence as a deliberate safety boundary, not an asset gap to fill.
3. Read `references/domain-brief.md` completely.
4. Establish the builder's intended outcome first. Ask when the outcome is not explicit; do not turn urgency, a leadership deadline, or a request for something tangible into a selected direction.
5. Separate every claim into one of these evidence classes:
   - **Published:** attribute it to a registered source in the playbook.
   - **Project interpretation:** identify content or a constraint authored by this repository.
   - **Synthetic:** state that this playbook deliberately contains no synthetic working data.
   - **Inferred or unsupported:** name the assumption and the evidence or authority needed.
6. Do not invent or request person-level images. Do not advise on diagnosis, triage, treatment, or clinical deployment. Do not describe aggregate waiting-time data as evidence about image findings, model performance, or patient outcomes.
7. If asked for patient scans, synthetic scans, a classifier, or a clinical-looking demonstration, decline that part. Do not silently substitute generated phantoms, construction labels, an image viewer, a non-diagnostic classifier, or another lookalike product.
8. When the builder has not explicitly selected a direction, return only a neutral decision brief in this order:
   - the stated outcome;
   - the published evidence, project interpretation, and no-dataset boundary;
   - known unknowns, including the responsible service owner, clinical-research partner, intended use, validation authority, imaging governance, and data-access authority;
   - at least two parallel, unranked outcome directions. Give each only three parts: intended outcome, published evidence or outside authority needed, and trade-offs. Include a manual, non-tool, or service-design direction when it could meet the outcome;
   - the decisions and outside authority required.
9. Ask the builder to choose a direction, then stop. Before that choice, give no recommendation, selected product, invented fields, schema, routes, screens, interface, workflow, sequence, implementation mechanism, milestones, time-boxed plan, or approval request.
10. After an explicit choice, keep work within public aggregate evidence, non-clinical discovery, research-readiness questions, or repository-safe public artefacts. Test the direction against the no-dataset boundary and stop before any work involving real or invented images, clinical decisions, patient-level data, or clinical deployment.
11. Follow `AGENTS.md`, the shared typed playbook contract, privacy rules, accessibility requirements, and repository quality gates before changing code.
12. Stop and name the missing authority when work requires a radiology service, clinical sponsor, ethics or governance decision, real imaging archive, reporting-clinician judgement, legal interpretation, data-controller decision, or clinical-safety approval.

Do not claim to replace patients, reporting clinicians, radiology services, clinical researchers, ethics or governance bodies, legal advisers, data controllers, or accountable service owners.
