# Health Service Demand and Operations — domain brief

## Domain vocabulary

- **Demand:** use this project term for incoming or outstanding need for a defined service over a defined period. The committed dataset contains waiting-count bands only; it does not contain arrivals, referrals, bookings, attendance, or requests for care.
- **Capacity:** use this project term for the service resource available over the same scope and period as demand. The dataset contains no beds, staff, slots, sessions, equipment, or deliverable-capacity measure.
- **Waiting band:** a published or synthetic grouping by how long people have waited. A band describes distribution, not the cause of waiting or an individual's circumstances.
- **Patients-waiting band:** the synthetic file's invented range for the number of people in a specialty, quarter, and waiting band. It is not a point count and cannot be traced to a person.
- **Operational planning:** use this project term for accountable decisions about aggregate service resources and flow. Keep it separate from clinical prioritisation, discharge readiness, diagnosis, treatment, or any other decision about an individual.
- **Discharge:** the strategy example mentions discharge coordination, while the playbook states that whether a particular person is ready to leave remains a clinical decision. The dataset contains no discharge record or evidence about readiness.

## Organisations and people affected

The Department of Health publishes hospital waiting-time statistics, including figures by health and social care trust. NISRA links to a wider collection of health and social care statistics. The playbook concerns planning teams exploring demand, beds, discharge, and limited capacity, but the registered sources do not identify an owner for a future operational direction or define what action any team may take.

People waiting for care, clinicians, service planners, operational teams, trust leadership, information-governance specialists, and data controllers could be affected by future work. The published and synthetic evidence is aggregate and does not describe an individual's health, priority, access needs, attendance, care plan, or readiness for discharge.

## Source map and access

- **Department of Health — [Hospital waiting times statistics](https://www.health-ni.gov.uk/topics/hospital-waiting-times-statistics):** open quarterly outpatient, inpatient and day-case, diagnostic, and cancer waiting figures for Northern Ireland, broken down by trust and length of wait. It provides waiting context, not causes, operational actions, capacity measures, or patient-level evidence.
- **Northern Ireland Statistics and Research Agency — [Health and social care statistics](https://www.nisra.gov.uk/statistics/health-and-social-care):** open access to a wider collection covering hospital activity and waiting lists, primary care, social care, workforce, and health inequalities. The collection shows that relevant evidence is distributed across publications; it does not create one joined operational dataset or prescribe a planning approach.

Treat both as **Real published source** material. Treat the playbook summary and caveats as project interpretation. Treat the committed JSON as **Synthetic working data**, never as a measurement of Northern Ireland services or evidence for a person-level action.

## Synthetic fields

- `id` is a fictional record key.
- `specialty` is a project-authored service label and does not establish organisational ownership, clinical priority, or a comparable service definition.
- `quarter` is a fictional reporting period. The sparse records do not form a complete time series.
- `waitingBand` is an invented length-of-wait category shaped like the published statistics.
- `patientsWaitingBand` is an invented count range, not a rounded observed count or a person-level record.

The 20 records contain no arrivals, referrals, bookings, attendance, cancellations, beds, staffing, sessions, discharge delays, costs, reasons for waiting, patient attributes, or outcomes. Do not use band size or position to infer a cause, forecast demand, estimate capacity, rank a specialty, create a case, or decide what should happen to anyone.

## Known unknowns

- The intended operational outcome, service scope, planning horizon, and accountable owner are unknown until stated.
- Demand is not defined for a future direction: waiting stock, new referrals, attendance, requests, and arrivals are different measures.
- Capacity is not defined: planned, staffed, available, booked, and deliverable capacity may differ, and none appears in the dataset.
- The relationship between demand, capacity, waiting, flow, beds, staffing, and discharge is not supplied by the registered evidence.
- The causes of any published or synthetic waiting band are unknown.
- Source definitions, inclusion rules, revisions, comparability, time grain, freshness, completeness, and whether categories overlap need source-owner confirmation.
- The synthetic records are sparse across specialty and quarter and do not establish trend, seasonality, volatility, or a forecast baseline.
- No operational threshold, target, acceptable trade-off, action owner, or process for challenging an indicator is established.
- Accessibility, unequal access, unusual or complex needs, and the risk of a single target distorting care are not measured.
- The boundary between aggregate planning and clinical decisions about priority, treatment, or discharge requires accountable professional ownership.

## Assumptions to challenge

- A long waiting band does not reveal whether demand rose, capacity fell, flow changed, definitions changed, or another cause applies.
- A larger invented count band does not establish a priority, service failure, or demand spike.
- Waiting stock is not the same as new demand, service capacity, patient flow, or discharge delay.
- Sparse quarterly bands do not establish a trend or a basis for forecasting.
- Specialty labels do not make services comparable and do not establish clinical urgency.
- Aggregate planning evidence cannot identify a person who will miss an appointment, need support, be ready for discharge, or require different care.
- Pseudonymising an appointment does not make patient-level prediction part of this aggregate playbook.
- Improving one operational number does not establish better care and may disadvantage people with complex or unusual needs.
- The registered sources do not establish that a dashboard, prediction, forecast, software product, or AI is required.

## Questions before building

- What operational outcome is intended, for which service and planning horizon, and who owns the decision?
- How does the responsible source owner define demand, capacity, waiting, flow, and any relationship between them?
- Which published figures actually cover the outcome, and what remains distributed, unavailable, or incomparable?
- What is the source grain, refresh cycle, completeness rule, revision policy, and treatment of overlapping categories?
- What evidence, beyond a waiting band, would be needed to investigate possible causes without asserting them?
- Which aggregate decisions may staff take, and where does clinical judgement about an individual begin?
- How will unusual or complex needs, accessibility, unequal access, and target distortion remain visible?
- How can operational teams inspect, challenge, correct, or stop an aggregate measure or planning assumption?
- Could clearer definitions, manual review, service mapping, publication improvement, or another non-tool direction meet the outcome?
- Where must work stop because person-level data, clinical authority, or data-controller approval would be required?

## Safety and service constraints

Keep every input, measure, interpretation, and output at aggregate service and capacity level. Do not introduce direct or pseudonymous patient or appointment records, individual predictions, cases, risk bands, support offers, outreach decisions, or inferred clinical actions. Do not use waiting bands to predict missed appointments, discharge readiness, clinical priority, or a person's future demand.

Define demand and capacity at a matching scope and time grain before comparing them. Keep source coverage, completeness, revisions, assumptions, and uncertainty visible. A planning measure may support an accountable aggregate discussion; it must not determine care for an individual. Stop when a direction crosses into person-level health information, clinical judgement, or action requiring a service owner or data controller.
