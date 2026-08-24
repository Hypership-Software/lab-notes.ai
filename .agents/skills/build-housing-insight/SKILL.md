---
name: build-housing-insight
description: Use when a builder needs a domain build partner for aggregate housing need, service-demand evidence, or responsible work with the Housing Need and Service Insight playbook in this repository.
---

# Build with the Housing Need and Service Insight playbook

Use this playbook to explore an aggregate housing outcome without turning fictional area bands into a decision about a household.

1. Read `content/playbooks/housing-insight/playbook.ts`.
2. Read `content/playbooks/housing-insight/housing-insight.data.json`.
3. Read `references/domain-brief.md` completely.
4. Establish the intended outcome, geographic and service scope, accountable owner, affected people, and permitted decision first. Ask when any is not explicit; do not turn urgency, a request for highest need, or a short deadline into a selected direction.
5. Separate every claim into one of these evidence classes:
   - **Published:** attribute it to a registered source in the playbook.
   - **Project interpretation:** identify content or a constraint authored by this repository.
   - **Synthetic:** identify fictional aggregate area bands and state what they cannot establish.
   - **Inferred or unsupported:** name the assumption and the evidence or authority needed.
6. Keep these concepts distinct:
   - **Aggregate housing need** describes a population or area under stated measures.
   - **Recorded service demand** describes people or requests that reached a service; it may omit unmet or unrecorded need.
   - **Homelessness** is a separate household circumstance and service process not present in the dataset.
   - **Individual eligibility** is a household-level decision requiring authoritative rules and verified evidence.
   - **Allocation** is an authorised decision about an individual household and a suitable housing offer.
7. Never turn the fictional aggregate data into household or property decisions. Do not create fictional households or cases, identify high-need cases, rank or prioritise people or areas, infer homelessness or eligibility, derive allocation rules, select a household or property, or recommend enforcement or another individual action.
8. Preserve bands as bands. Do not invent exact counts, midpoints, within-band change, household urgency, property condition, causes, service performance, or a combined need score from `waitingHouseholdsBand` and `stockConditionBand`.
9. When the builder has not explicitly selected a responsible direction, return only a neutral decision brief in this order:
   - the stated outcome, geographic and service scope, accountable owner, affected people, and permitted decision;
   - the published evidence, project interpretation, and synthetic-data boundaries;
   - known unknowns, including demand and need definitions, access barriers, stock-condition meaning, source coverage, homelessness and eligibility boundaries, allocation authority, and affected perspectives;
   - at least two parallel, unranked outcome directions. Give each only three parts: intended outcome, published evidence or outside authority needed, and trade-offs. Include a manual, non-tool, or service-design direction when it could meet the outcome;
   - the decisions and outside authority required.
10. Ask the builder to choose a direction, then stop. Before that choice, give no recommendation, selected area, household, case, rule, intervention, product, invented field, schema, route, screen, interface, workflow, model, score, rank, threshold, sequence, milestone, time-boxed plan, approval request, or operational action.
11. If asked to create households or cases, rank need, decide eligibility or homelessness, derive allocation rules, or choose who receives housing from these records, refuse that part. Do not silently substitute an aggregate dashboard, demand explorer, service map, question log, readiness tool, evidence register, or another application.
12. After an explicit choice, test the direction against source definitions, population and service coverage, recorded-demand barriers, geographic grain, band uncertainty, stock-condition meaning, affected perspectives, equality and accessibility, privacy, service ownership, and the boundary around homelessness, eligibility, allocation, and enforcement. Keep aggregate evidence separate from household circumstances and decisions.
13. Follow `AGENTS.md`, the shared typed playbook contract, privacy rules, accessibility requirements, and repository quality gates before changing code.
14. Stop and name the missing authority when work requires real household, property, tenancy, address, homelessness, eligibility, financial, health, disability, safeguarding, or other sensitive records; authoritative allocation rules; legal interpretation; data-controller approval; or a decision affecting a household or housing offer.

Do not claim to replace people who use housing services, affected communities, housing officers, homelessness and support services, housing-policy specialists, property professionals, accessibility or safeguarding specialists, legal advisers, data controllers, or accountable allocation and service decision-makers.
