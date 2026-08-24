# Road Maintenance Planning — domain brief

## Domain vocabulary

- **Defect report:** use this project term for a recorded observation or concern that may come from a public report or another route. The pothole release distinguishes reports from the public and defects found through inspection; a report is not itself an authorised inspection finding.
- **Inspection:** the technical report describes surface defects recorded during routine safety inspections. The playbook states the key evidence limit: a defect enters those figures only once an inspection has recorded it.
- **Road condition:** the technical report describes machine condition surveys that produce a Road Condition Index. Do not collapse a network-condition measure, a reported concern, an inspected surface defect, or the synthetic severity field into one judgement.
- **Prioritisation:** the technical report says the Road Maintenance Client System ranks recorded repairs. The registered sources do not supply the decision rules, weights, thresholds, current competing needs, or authority for this repository to rank work.
- **Works scheduling:** use this project term for allocating authorised repair work against real capacity, cost, access, and other constraints. The synthetic file supplies no schedule, crew, method, cost, or capacity evidence.
- **Completion and verification:** a synthetic `repaired` status is a fictional queue label. The file supplies no repair evidence, follow-up inspection, or authority to confirm that work is complete or a road condition has changed.
- **Safety judgement:** a decision about whether a real road condition presents a safety concern. The fictional severity codes, road classes, statuses, and dates cannot establish that judgement.

## Organisations and people affected

The Department for Infrastructure publishes both registered sources. The technical report describes network and condition measurement, routine safety-inspection records, and ranked repairs. The pothole release describes public and inspection reporting and repaired or waiting records. These sources provide public context; they do not assign responsibility for a future build, supply operational records, or authorise this repository to inspect, prioritise, instruct, schedule, verify, or close work.

People reporting concerns, road users, inspectors, road-safety professionals, maintenance planners, works teams, contractors, people responsible for budgets and traffic management, data controllers, and communities with different reporting or inspection coverage could all be affected by future work. This is a project stakeholder map, not evidence that any role has agreed to participate. The registered sources do not establish decision rights, repair standards, response commitments, accessibility needs, or a route to challenge a future judgement.

## Source map and access

- **Department for Infrastructure — [Northern Ireland road network and condition statistics: technical report](https://www.infrastructure-ni.gov.uk/articles/northern-ireland-road-network-and-condition-statistics-technical-report):** open published information about road length by motorway, A, B, C, and unclassified class; machine condition surveys and a Road Condition Index; surface defects recorded during routine safety inspections; and a maintenance system that ranks repairs. It does not supply this project's fictional records, an intervention standard, a safety judgement, a live priority order, repair instructions, or works capacity.
- **Department for Infrastructure — [Potholes recorded by DfI Roads on the public road network each year since 2020](https://www.infrastructure-ni.gov.uk/publications/dfi2025-0038-details-potholes-recorded-dfi-roads-northern-ireland-public-road-network-each-year-2020):** open published counts by year, distinguishing public reports from inspection findings and repaired records from those still waiting. Aggregate counts do not provide a report, inspection, road location, safety conclusion, priority, work instruction, or closure decision for an individual record.

Treat both as **Real published source** material. Treat the strategy proposal, playbook summary, purpose, preparation, limitations, and caveats as project interpretation. Treat the committed JSON as **Synthetic working data**, never as a real defect, inspection finding, safety assessment, priority, backlog, repair, or evidence of operational performance.

## Synthetic fields

- `id` is a fictional record identifier.
- `roadClass` is one of the published network class labels. It is not a road identity, location, usage measure, or safety weight.
- `defectType` is a project-authored surface-defect label shaped by the published vocabulary. It is not supported by an image, measurement, or inspection note.
- `severity` is an invented `R1`, `R2`, or `R3` code. The file does not define the codes' order, operational meaning, threshold, or relationship to safety.
- `reportedWeek` is a fictional ISO week from `2025-W09` to `2025-W18`. It is not an exact report, inspection, instruction, repair, or verification time.
- `status` is a fictional queue label: `awaiting inspection`, `inspected`, `repair instructed`, or `repaired`. It supplies no status history, evidence, decision owner, completion record, or verification.

The 20 rows cover road classes rather than real roads or places, so they have no spatial coverage. They span ten fictional report weeks but do not form a complete time series and contain no as-of date, reporting frequency, stage dates, duration, deadline, or history. The file has no location, imagery, measured dimensions, inspection record, intervention standard, traffic or public-exposure context, weather, duplicate-report evidence, repair method, cost, works capacity, completion evidence, follow-up inspection, or safety ground truth.

## Known unknowns

- The intended outcome, maintenance activity in scope, accountable owner, and affected groups are unknown until stated.
- The strategy proposal does not identify the imagery, inspection standard, prioritisation method, or link between a ranking and funding.
- The registered sources do not provide the current operational reporting, inspection, prioritisation, works, completion, or verification rules for a future direction.
- The meaning, ordering, and authorised use of `R1` to `R3` are not defined in the committed file.
- The records have no road, segment, coordinates, carriageway position, surrounding context, or evidence of who reports or is less likely to be represented.
- The fictional report weeks do not establish age, urgency, response time, overdue work, trend, recurrence, or current state.
- No image, measurement, inspection note, intervention threshold, safety decision, repair instruction, or evidence of condition exists behind a row.
- Cost, repair method, budget, crew or contractor capacity, access, traffic management, other network needs, and scheduling authority are absent.
- A `repaired` label has no completion or verification evidence and cannot support closure.
- The registered sources do not establish that a queue, reporting application, works board, classifier, map, software product, or AI is needed.

## Assumptions to challenge

- A fictional severity code does not establish that a road is safe, unsafe, hazardous, urgent, or more important than another road.
- Road class is not an authorised safety or priority weight, and a class label does not describe traffic, exposure, location, or affected people.
- An older fictional report week does not establish urgency, delay, deadline, or unresolved condition.
- `awaiting inspection`, `inspected`, `repair instructed`, and `repaired` are not evidence that the activities occurred or that one reusable workflow connects them.
- A reported concern, inspection finding, priority decision, work instruction, schedule, repair, and verification are separate records and judgements.
- A transparent score or human override cannot supply missing inspection evidence, operational standards, competing needs, or authority.
- More reports or inspections may reflect coverage rather than more defects; fewer records do not establish lower need or safety.
- A condition classifier cannot choose repair method, funding, order, or closure from an image label.
- Manual research, reporting-access review, inspection-coverage inquiry, service design, or deciding not to build may meet the outcome without software or AI.

## Questions before building

- What outcome is intended, which maintenance activity is in scope, and who is accountable for it?
- Is the evidence a public report, inspection finding, condition survey, priority decision, work instruction, schedule, completion record, or verification, and who may create or change it?
- Which inspection standards, measurements, severity definitions, intervention thresholds, and safety vocabulary are authoritative?
- What road or asset identity, location, image, reporting source, time, inspection coverage, and public-exposure context may be used?
- How will unequal reporting and inspection coverage, accessibility, different road users, and missed or false defects remain visible?
- Who may prioritise competing work, which evidence and public impacts matter, and how are budget, capacity, access, and network constraints considered?
- Who may select a repair, authorise expenditure, set a response commitment, instruct or schedule work, and manage traffic impacts?
- What evidence and accountable judgement establish completion, verification, reopening, or closure?
- Could manual source review, clearer reporting routes, inspection-coverage research, process clarification, or another non-tool direction meet the outcome?
- Where must repository work stop because operational, road-safety, legal, budget, traffic-management, contractor, security, or data-controller authority is unavailable?

## Safety and service constraints

Keep all 20 records visibly labelled **Synthetic working data** and separate from the two real published sources. Do not attach a fictional row to a real road, invent an image or measurement, interpret `R1` to `R3`, calculate age against an invented current date, or supply a condition or safety ground truth.

Do not label a road safe, unsafe, hazardous, lower risk, repaired, or closed from these records. Do not create a priority ranking, score, threshold, deadline, repair instruction, assigned role, works schedule, completion decision, or verification. Keep reporting, inspection, prioritisation, work instruction, scheduling, completion, and verification distinct. Only the accountable roads authority and its authorised professionals can define those records, standards, decisions, and actions; stop and name the missing authority when requested work crosses that boundary.
