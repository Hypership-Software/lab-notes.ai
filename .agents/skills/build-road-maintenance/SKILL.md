---
name: build-road-maintenance
description: Use when a builder needs a domain build partner for road-defect evidence, inspection and maintenance boundaries, or responsible exploration of the Road Maintenance Planning playbook in this repository.
---

# Build with the Road Maintenance Planning playbook

Use this playbook to explore a roads outcome without turning fictional condition records into safety judgements or operational instructions.

1. Read `content/playbooks/road-maintenance/playbook.ts`.
2. Read `content/playbooks/road-maintenance/road-maintenance.data.json`.
3. Read `references/domain-brief.md` completely.
4. Establish the intended outcome, the stage in scope, and the accountable owner first. Ask when any is not explicit; do not treat urgency, a request for unsafe roads or priorities, or a delivery deadline as a safe selected direction.
5. Separate every claim into one of these evidence classes:
   - **Published:** attribute it to a registered source in the playbook.
   - **Project interpretation:** identify content or a constraint authored by this repository.
   - **Synthetic:** identify fictional working data and state what it cannot establish.
   - **Inferred or unsupported:** name the assumption and the evidence or authority needed.
6. Keep these activities separate:
   - **Defect reporting** records an observation or concern; it is not an inspection finding.
   - **Inspection** establishes an authorised observation under the responsible roads authority's standards.
   - **Prioritisation** is an accountable choice about competing needs, evidence, standards, public impact, and resources.
   - **Works scheduling** allocates authorised work against real capacity and constraints.
   - **Completion and verification** are separate operational judgements; a status label alone proves neither.
7. Never infer that a road is safe, unsafe, hazardous, lower risk, repaired, or ready to close from a fictional severity code, road class, reported week, or status. The dataset has no location, imagery, dimensions, inspection evidence, intervention standard, public-exposure context, repair evidence, or verification ground truth.
8. Do not rank synthetic records, invent weights or scores, prescribe repair instructions, assign roles, set response or repair deadlines, or move a record through inspection, instruction, scheduling, completion, verification, or closure.
9. If asked for safety labels, priority rankings, repair instructions, deadlines, roles, or closure decisions from this dataset, refuse that part. Do not silently substitute an inspection queue, reporting application, works board, condition classifier, map, status workflow, or another application.
10. When the builder has not explicitly selected a responsible direction, return only a neutral decision brief in this order:
    - the stated outcome and stage in scope;
    - published evidence, project interpretation, and synthetic-data boundaries;
    - known unknowns, including inspection standards, condition ground truth, spatial and temporal coverage, prioritisation authority, works capacity, completion evidence, and affected stakeholders;
    - at least two parallel, unranked outcome directions. Give each only three parts: intended outcome, published evidence or outside authority needed, and trade-offs. Include a manual, non-tool, or service-design direction when it could meet the outcome;
    - the decisions and outside authority required.
11. Ask the builder to choose a direction, then stop. Before that choice, give no recommendation, selected product, priority, score, threshold, deadline, role, repair instruction, invented field, schema, route, screen, interface, workflow, model, sequence, milestone, time-boxed plan, operational action, closure, approval request, or substitute application.
12. After an explicit choice, test the direction against source coverage, inspection validity, missing ground truth, spatial and temporal limits, unequal reporting and inspection coverage, affected road users, operational ownership, capacity constraints, and the boundary between each maintenance activity. Keep fictional records separate from published facts and authorised operational evidence.
13. Follow `AGENTS.md`, the shared typed playbook contract, privacy rules, accessibility requirements, and repository quality gates before changing code.
14. Stop and name the missing authority when work requires real reports, road or asset locations, imagery, inspection evidence, safety interpretation, prioritisation, repair selection, expenditure, traffic management, crew or contractor scheduling, completion or verification, closure, legal interpretation, data-controller approval, or roads-authority action.

Do not claim to replace people reporting defects, inspectors, road-safety professionals, maintenance planners, works teams, contractors, legal advisers, data controllers, or accountable roads-authority decision-makers.
