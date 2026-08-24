---
name: build-health-operations
description: Use when a builder needs a domain build partner for aggregate health-service demand, capacity, waiting-time, or operational-planning work with the Health Service Demand and Operations playbook in this repository.
---

# Build with the Health Service Demand and Operations playbook

Use this playbook to explore an operational outcome at aggregate service and capacity level. Waiting bands describe pressure; they do not explain its causes or support decisions about an individual.

1. Read `content/playbooks/health-operations/playbook.ts`.
2. Read `content/playbooks/health-operations/health-operations.data.json`.
3. Read `references/domain-brief.md` completely.
4. Establish the intended operational outcome, service scope, and planning horizon first. Ask when any is not explicit; do not treat urgency, a request for a first application, or a delivery deadline as a selected direction.
5. Separate every claim into one of these evidence classes:
   - **Published:** attribute it to a registered source in the playbook.
   - **Project interpretation:** identify content or a constraint authored by this repository.
   - **Synthetic:** identify fictional aggregate waiting bands and state what they cannot establish.
   - **Inferred or unsupported:** name the assumption and the evidence or authority needed.
6. Keep all work at aggregate service and capacity level. Do not turn operational demand records into patient-level predictions, cases, risk bands, support offers, or inferred clinical decisions. Do not introduce direct or pseudonymous appointment, referral, attendance, bed, discharge, or patient records.
7. Treat demand, capacity, flow, waiting, and discharge as separate concepts until the responsible source owner supplies definitions and relationships. Never imply that a published or synthetic waiting band explains the cause of delay, demand change, capacity constraint, or discharge outcome.
8. When the builder has not explicitly selected a direction, return only a neutral decision brief in this order:
   - the stated operational outcome, service scope, and planning horizon;
   - published evidence, project interpretation, and synthetic-data boundaries;
   - known unknowns, including demand and capacity definitions, data coverage, causes, operational authority, and the clinical-decision boundary;
   - at least two parallel, unranked outcome directions. Give each only three parts: intended outcome, published evidence or outside authority needed, and trade-offs. Include a manual, non-tool, or service-design direction when it could meet the outcome;
   - the decisions and outside authority required.
9. Ask the builder to choose a direction, then stop. Before that choice, give no recommendation, selected product, invented fields, data contract, model, schema, routes, screens, interface, workflow, sequence, implementation mechanism, milestones, time-boxed plan, or approval request.
10. If asked what to build first without a selected direction, do not substitute an access-and-capacity board, review queue, no-show model, demand forecast, or another application. Return the neutral decision brief.
11. After an explicit choice, test the direction against aggregate definitions, source coverage, time grain, completeness, operational ownership, accessibility, equity, target distortion, and the boundary around clinical decisions. Treat unresolved points as unknown and keep every output aggregate.
12. Follow `AGENTS.md`, the shared typed playbook contract, privacy rules, accessibility requirements, and repository quality gates before changing code.
13. Stop and name the missing authority when work requires person-level or restricted health records, clinical interpretation, discharge readiness, prioritisation of care, contact with a patient, legal interpretation, data-controller approval, or service-owner action.

Do not claim to replace patients, clinicians, service planners, operational teams, information-governance specialists, data controllers, or accountable health-service decision-makers.
