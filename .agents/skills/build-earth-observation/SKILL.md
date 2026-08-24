---
name: build-earth-observation
description: Use when a builder needs a domain build partner for land-cover evidence, Earth observation boundaries, or responsible exploration of the Earth Observation for Public Services playbook in this repository.
---

# Build with the Earth Observation for Public Services playbook

Use this playbook to explore a defined evidence outcome without turning fictional summary rows into mapped changes, classifications, or operational priorities.

1. Read `content/playbooks/earth-observation/playbook.ts`.
2. Read `content/playbooks/earth-observation/earth-observation.data.json`.
3. Read `references/domain-brief.md` completely.
4. Establish the intended outcome, place, time horizon, accountable owner, and people and environments affected first. Ask when any is not explicit; do not treat urgency, a request for what to inspect first, or a delivery deadline as a safe selected direction.
5. Separate every claim into one of these evidence classes:
   - **Published:** attribute it to a registered source in the playbook.
   - **Project interpretation:** identify content or a constraint authored by this repository.
   - **Synthetic:** identify fictional working data and state what it cannot establish.
   - **Inferred or unsupported:** name the assumption and the evidence or authority needed.
6. Keep these concepts separate:
   - **Observation** is a source measurement or image captured at a stated place and time with quality and provenance. The dataset contains no observation.
   - **Classification** assigns a class using a stated taxonomy and method. A fictional class label is not evidence that imagery or fieldwork produced that classification.
   - **Ground truth or validation evidence** is authorised independent reference evidence suitable for the exact claim, place, and time. Neither registered source automatically validates a future model or synthetic row.
   - **Revisit frequency** describes how often comparable observations are available, not the length of an aggregated change period. The dataset supplies no acquisition dates or cadence.
   - **Cloud cover** and related image-quality conditions affect what imagery can reveal. They have been discarded from this table and cannot be inferred.
   - **Operational decisions** such as inspection, planning, enforcement, or intervention require accountable authority and evidence beyond a detected or classified surface change.
7. Do not interpret the sign of `changedHectares` as gain or loss, treat `landCoverClass` as an observed or modelled classification, compare the unequal periods as a rate or trend, rank tiles, invent thresholds or review states, or prescribe a priority or action from the synthetic records.
8. If asked to select a use case, label or prioritise changes, design a classifier, or say what should be inspected or acted on from this dataset, refuse that part. Do not silently substitute an imagery viewer, change queue, evidence panel, model card, schematic map, or another application.
9. When the builder has not explicitly selected a responsible direction, return only a neutral decision brief in this order:
   - the stated outcome, place, and time horizon;
   - published evidence, project interpretation, and synthetic-data boundaries;
   - known unknowns, including observation provenance, taxonomy, ground truth, revisit frequency, cloud cover, spatial and temporal coverage, operational authority, and affected stakeholders;
   - at least two parallel, unranked outcome directions. Give each only three parts: intended outcome, published evidence or outside authority needed, and trade-offs. Include a manual, non-tool, or service-design direction when it could meet the outcome;
   - the decisions and outside authority required.
10. Ask the builder to choose a direction, then stop. Before that choice, give no recommendation, selected use case, classification, change label, priority, threshold, review state, action, invented field, schema, route, screen, interface, workflow, model, sequence, milestone, time-boxed plan, approval request, or substitute application.
11. After an explicit choice, test the direction against source and licence terms, taxonomy fit, spatial resolution and coverage, temporal alignment and revisit, cloud and image quality, reference-evidence independence, class-specific errors, sensitive locations, affected groups, and the authority for any follow-up decision. Keep fictional summaries separate from observations, classifications, published facts, and authorised ground truth.
12. Follow `AGENTS.md`, the shared typed playbook contract, privacy rules, accessibility requirements, and repository quality gates before changing code.
13. Stop and name the missing authority when work requires real imagery or survey locations, reference labels, field validation, sensitive habitat or site detail, classification claims, inspections, planning or enforcement decisions, interventions, legal interpretation, data-controller approval, or service-owner action.

Do not claim to replace field surveyors, environmental analysts, ecologists, land managers, affected communities, imagery and data owners, planning or enforcement professionals, legal advisers, data controllers, or accountable public-service decision-makers.
