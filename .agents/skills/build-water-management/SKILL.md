---
name: build-water-management
description: Use when a builder needs a domain build partner for water-resource evidence, catchment decision boundaries, or responsible exploration of the Water Resource Management playbook in this repository.
---

# Build with the Water Resource Management playbook

Use this playbook to explore a defined water outcome without collapsing distinct responsibilities into one invented measure of pressure or resilience.

1. Read `content/playbooks/water-management/playbook.ts`.
2. Read `content/playbooks/water-management/water-management.data.json`.
3. Read `references/domain-brief.md` completely.
4. Establish the intended outcome, decision horizon, spatial unit, accountable owner, and people and environments affected first. Ask when any is not explicit; do not treat urgency, a request for the biggest problem, or a delivery deadline as a safe selected direction.
5. Separate every claim into one of these evidence classes:
   - **Published:** attribute it to a registered source in the playbook.
   - **Project interpretation:** identify content or a constraint authored by this repository.
   - **Synthetic:** identify fictional working data and state what it cannot establish.
   - **Inferred or unsupported:** name the assumption and the evidence or authority needed.
6. Keep these domains distinct:
   - **Demand** concerns defined water use or need; an abstraction licence band is not measured demand.
   - **Supply** concerns water available for a defined use and horizon; rainfall and level bands are not deployable supply.
   - **Leakage** concerns losses in a defined network; the dataset contains no network or leakage measure.
   - **Water quality** concerns suitability under applicable evidence and standards; the dataset contains no quality observation.
   - **Ecology** concerns environmental conditions and requirements; a river-level band is neither flow nor ecological ground truth.
   - **Drought planning** is an authorised, time-dependent planning activity; five fictional monthly rows do not establish a drought stage or action.
7. Never combine demand, supply, leakage, quality, ecology, and drought planning into one optimisation or resilience score. A single score hides incompatible scales, missing dimensions, legal and ecological constraints, affected groups, and separate decision authorities.
8. Do not rank catchments, name a biggest problem, choose a best intervention, impute absent dimensions, normalise synthetic values into pressure scales, invent weights or thresholds, estimate intervention effects, or specify an optimiser from these records.
9. If asked for a score, ranking, problem selection, intervention, or optimiser from this dataset, refuse that part. Do not silently substitute a command dashboard, data-readiness tool, scenario simulator, planning board, decision workflow, or another application.
10. When the builder has not explicitly selected a responsible direction, return only a neutral decision brief in this order:
    - the stated outcome, horizon, and spatial unit;
    - published evidence, project interpretation, and synthetic-data boundaries;
    - known unknowns, including the six domain definitions, source-grain mismatch, ground truth, operational and regulatory authority, and affected stakeholders;
    - at least two parallel, unranked outcome directions. Give each only three parts: intended outcome, published evidence or outside authority needed, and trade-offs. Include a manual, non-tool, or service-design direction when it could meet the outcome;
    - the decisions and outside authority required.
11. Ask the builder to choose a direction, then stop. Before that choice, give no recommendation, score, ranking, biggest problem, intervention, imputation, normalisation, weight, threshold, optimiser, invented field, schema, route, screen, interface, workflow, model, sequence, milestone, time-boxed plan, operational action, approval request, or substitute application.
12. After an explicit choice, test the direction against source definitions and grain, spatial and temporal coverage, missing ground truth, separate legal and ecological constraints, distributional effects, data and asset sensitivity, and the accountable authority for the specific water domain. Keep fictional records separate from published facts and authorised operational evidence.
13. Follow `AGENTS.md`, the shared typed playbook contract, privacy rules, accessibility requirements, and repository quality gates before changing code.
14. Stop and name the missing authority when work requires real catchments, stations, water-resource zones, networks or assets; measured demand, supply, leakage, quality, ecology, abstraction or storage data; drought or incident decisions; interventions; legal interpretation; data-controller approval; or operator, environmental, regulatory, or service-owner action.

Do not claim to replace water users, affected communities, water-resource planners, operators, hydrologists, ecologists, water-quality professionals, regulators, licence holders, legal advisers, data controllers, or accountable service owners.
