# Housing Need and Service Insight — domain brief

## Domain vocabulary

- **Aggregate housing need:** a population- or area-level description under stated measures. It cannot establish the circumstances or urgency of an individual household.
- **Recorded service demand:** requests or households counted by a service or publication. The playbook warns that a low count may reflect barriers to being recorded rather than less underlying need.
- **Homelessness:** a distinct household circumstance and service process covered by the quarterly bulletin. The synthetic dataset contains no homelessness field, household, assessment, or outcome.
- **Individual eligibility:** whether a household meets authoritative requirements for a particular service or housing route. Aggregate waiting and stock bands contain neither the rules nor verified household evidence.
- **Allocation:** an authorised household-level decision about priority, suitability, and a housing offer. It cannot be derived from area counts or stock-condition bands.
- **Stock condition:** a description of dwellings under a defined assessment. The synthetic `stockConditionBand` is an invented area-level label, not evidence about a property, hazard, occupant, repair, or suitability.
- **Household decision:** any conclusion, recommendation, prioritisation, offer, denial, enforcement action, or service outcome concerning a household. Nothing in the committed file supports one.

## Organisations and people affected

The Department for Communities publishes both registered sources: an annual compendium of housing statistics and a quarterly bulletin. Their public coverage includes supply, energy, renting and owner-occupier demand, household characteristics, social housing development, social housing demand, homelessness, and house sales and prices. The sources do not define an operational allocation process for this project or authorise household-level decisions from aggregate data.

People who use or cannot access housing services, affected communities, housing officers, homelessness and support services, policy teams, property professionals, accessibility and safeguarding specialists, legal and information-governance roles, data controllers, and accountable allocation owners could all be affected by future work. This is a project stakeholder map, not evidence that any role has agreed to participate or that a particular application is needed.

## Source map and access

- **Department for Communities — [Northern Ireland Housing Statistics](https://www.communities-ni.gov.uk/articles/northern-ireland-housing-statistics):** an open annual compendium covering supply, energy, social and private renting demand, owner-occupier demand, and household characteristics. Its grouped demand and energy evidence shapes the fictional aggregate rows; it does not provide household allocation authority.
- **Department for Communities — [Northern Ireland Housing Bulletin](https://www.communities-ni.gov.uk/articles/northern-ireland-housing-bulletin):** an open quarterly bulletin covering social housing development, social housing demand, homelessness, and house sales and prices. Its coverage of homelessness does not put a homelessness assessment or household circumstance into the synthetic file.

Treat both as **Real published source** material. Treat the strategy proposal, playbook summary, purpose, preparation, limitations, and caveats as project interpretation. Treat the committed JSON as **Synthetic working data**, never as official statistics, a real area, a household or property record, current service evidence, allocation policy, or authority for action.

## Synthetic fields

- `id` is a fictional record identifier.
- `areaBand` is one of five lettered project-authored area labels. It has no real geography, population, service boundary, deprivation measure, or planning context.
- `quarter` is one of four fictional 2025 quarters. It is not an official reporting period.
- `waitingHouseholdsBand` is an invented aggregate count range. It is not an exact count, an urgency measure, complete need, eligibility evidence, homelessness status, or allocation priority.
- `stockConditionBand` is an invented broad area-level label. It does not describe a dwelling, household, inspection, hazard, repair need, accessibility, or suitable offer.

The 20 rows contain no household, person, property, address, tenancy, application, homelessness assessment, eligibility evidence, priority, suitable-property requirement, offer, decision, review, appeal, service capacity, supply, access barrier, or outcome. Do not invent exact values or households to bridge these gaps, combine the two bands into a score, rank areas, or choose where or for whom housing action should occur.

## Known unknowns

- The intended outcome, geographic and service scope, accountable owner, affected people, and permitted decision are unknown until stated.
- The definitions and relationship of aggregate need, recorded demand, waiting-list registration, service requests, unmet need, and access barriers are not established.
- The real geography, population, service boundary, coverage, inclusion rules, revisions, and comparability behind a future measure are not supplied.
- The meaning, method, age, coverage, and limitations of a real stock-condition measure would require source-owner confirmation.
- Household urgency, circumstances, accessibility, preferences, safety, finances, evidence, and suitable housing requirements are absent.
- Homelessness coverage in a publication does not define a household assessment or process for this project.
- No authoritative eligibility, priority, suitability, offer, review, appeal, or allocation rules are registered.
- No purpose, lawful basis, minimisation rule, access model, retention period, correction route, data-controller decision, or protection for real household records exists here.
- The registered sources do not establish that an aggregate dashboard, demand explorer, service map, readiness tool, evidence register, software product, or AI is required.

## Assumptions to challenge

- A larger fictional waiting band does not identify a high-need household, greater individual urgency, complete unmet need, or allocation priority.
- A lower recorded band does not establish lower underlying need; access, awareness, trust, or registration barriers may affect what is recorded.
- A stock-condition band does not establish the condition, safety, repair need, or suitability of any home.
- The bulletin's homelessness coverage does not make homelessness inferable from waiting or stock bands.
- Waiting-list presence does not establish individual eligibility, priority, entitlement, or a suitable offer.
- An area pattern cannot become a household rule, and a ranked area cannot stand in for ranked people or a real build location.
- Transparent rules, human review, or sensitive fields cannot create allocation authority where policy and verified household evidence are absent.
- Manual source review, access-barrier inquiry, participatory service design, publication improvement, or deciding not to build may meet the outcome without household data or AI.

## Questions before building

- What outcome is intended, for which geography and service, who owns it, who is affected, and what decision—if any—is permitted?
- Is the question about aggregate need, recorded service demand, homelessness, stock condition, eligibility, allocation, service access, or another distinct concept?
- How does the responsible source owner define population, geography, inclusion, waiting, stock condition, time period, revision, and comparability?
- Who and what may be absent from recorded demand, and how will barriers to awareness, registration, trust, accessibility, or reporting be investigated?
- Which affected people, communities, housing services, and professional roles must shape the outcome and challenge assumptions?
- Could manual source review, service mapping, access-barrier inquiry, participatory design, or another non-tool direction meet the outcome?
- If a future direction genuinely requires household records, who can establish purpose, lawful basis, necessity, access, correction, retention, safeguarding, and protection from secondary use?
- Which authoritative service and policy owners can define homelessness, eligibility, priority, suitability, allocation, review, and appeal decisions?
- Where must repository work stop because household evidence, professional judgement, policy, law, data-controller approval, or allocation authority is unavailable?

## Safety and service constraints

Keep all 20 rows visibly labelled **Synthetic working data** and separate from the two real published sources. Preserve literal bands, fictional area labels, and aggregate grain. Do not create households, cases, properties, exact counts, priorities, scores, rules, allocations, offers, homelessness or eligibility decisions, or enforcement actions from them.

Keep aggregate housing need, recorded service demand, homelessness, stock condition, individual eligibility, and allocation distinct. Never turn a fictional area pattern into a household decision or real geographic investment recommendation. Do not prescribe an aggregate dashboard, demand explorer, service map, readiness tool, evidence register, or other substitute before the builder chooses a responsible direction. Stop when work requires household or property data, authoritative policy, professional judgement, legal interpretation, data-controller approval, or accountable allocation authority.
