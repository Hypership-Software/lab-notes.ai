# Diagnostic Imaging Support — domain brief

## Domain vocabulary

- **Diagnostic waiting time:** the Department of Health's [Diagnostic waiting times](https://www.health-ni.gov.uk/articles/diagnostic-waiting-times) publication reports how many people are waiting for a diagnostic test and how long they have waited. It is aggregate service evidence, not an image collection.
- **Reporting turnaround:** the same publication reports turnaround for diagnostic reporting by health and social care trust. It does not reveal what any image contains or why an individual report took a particular time.
- **Responsible refusal:** the playbook records `syntheticData.status` as `not-responsible` because an invented table cannot honestly stand in for a scan and proposed stand-ins drifted towards person-level records.
- **Person-level image:** use this project term for an image, report, label, or linked record describing an individual. None is published or committed for this playbook.
- **Clinical validation:** use this project term for evidence an authorised clinical-research team would need for a precisely defined use in its intended population and setting. The registered sources provide no such evidence.
- **Imaging governance:** use this project term for the clinical sponsorship, ethics, lawful access, data-controller, safety, and professional decisions that would govern research using real images. The playbook names these as prerequisites; the registered public sources do not define the route.

## Organisations and people affected

The registered publications concern people waiting for diagnostic services and report figures by Northern Ireland health and social care trust. The playbook frames the possible user as a reporting clinician and says any further work would need a partner radiology service, named sponsor, ethics approval, and reporting clinicians from the start. These are project safety boundaries, not proof that a particular organisation has agreed to participate or that an image-support application is needed.

People waiting for tests may be affected by both delay and errors in care, but neither registered source supplies person-level journeys, images, reports, findings, outcomes, accessibility needs, or lived experience. The sources do not assign responsibility for a future research question, validation decision, data access, clinical safety case, or deployment decision.

## Source map and access

- **Department of Health — [Diagnostic waiting times](https://www.health-ni.gov.uk/articles/diagnostic-waiting-times):** open published figures about diagnostic waits and reporting turnaround by trust. It establishes service pressure at aggregate level. It provides no scan, report, finding, label, scanner context, case-level outcome, or model evaluation.
- **Department of Health — [Hospital waiting times statistics](https://www.health-ni.gov.uk/topics/hospital-waiting-times-statistics):** open quarterly outpatient, inpatient, diagnostic, and cancer waiting figures by trust and wait length. It gives wider waiting-time context, not a clinical imaging corpus.

Treat both as **Real published source** material. Treat the playbook summary, responsible refusal, caveats, and research prerequisites as project interpretation. Do not use either source as evidence that image analysis is safe, effective, transferable, or necessary.

## Synthetic fields

There are no synthetic fields and no dataset for this playbook. That absence is deliberate. Do not create invented image identifiers, patient or case attributes, modalities, findings, labels, scores, reports, urgency values, or outcome fields. Do not replace patient-like data with generated phantoms or construction labels: either move the question back to aggregate service evidence or stop for authorised clinical-research governance.

## Known unknowns

- The builder's intended service outcome and the accountable owner are unknown until stated.
- The causes of waiting or reporting delay are not explained by the aggregate publications.
- Whether an image-related intervention is needed is not established.
- A precise intended use, excluded uses, clinical setting, image type, population, and responsible user are not established.
- No authorised image archive, lawful access route, data controller, clinical sponsor, or ethics route is named.
- No reference standard, validation authority, acceptable-error definition, population coverage, scanner or site coverage, or independent evaluation exists in the registered evidence.
- The effects on reporting-clinician attention, workload, disagreement, accessibility, and accountability are unknown.
- The clinical-safety, legal, regulatory, monitoring, incident, change-control, and retirement decisions are outside the registered sources.

## Assumptions to challenge

- Aggregate waiting pressure does not establish that image analysis is the right response.
- The absence of an imaging dataset is a safety decision, not an incomplete content task.
- An invented scan or generated phantom cannot establish clinical validity, transfer, safety, or benefit.
- A visually convincing interface cannot make non-clinical evidence clinically credible.
- Calling a classifier non-diagnostic does not make a clinical-looking demonstration an appropriate substitute.
- A human remaining involved does not, by itself, resolve image errors, misplaced attention, authority, or accountability.
- An external public image collection would not answer whether a use is valid for Northern Ireland services without authorised review and local evidence.
- Manual research, service-design work, operational change, or deciding not to build may meet the outcome without image analysis.

## Questions before building

- What outcome is being sought, who owns it, and what published evidence shows the problem?
- Can the outcome be explored using aggregate waiting and capacity evidence without person-level images?
- Which causes of delay are known, and which are only inferred from waiting-time figures?
- Could manual research, service mapping, staffing or process inquiry, or another non-tool direction address the outcome?
- Who could authorise a clinical-research question, and which radiology service and reporting clinicians would need to shape it?
- What intended and excluded uses would an authorised team need to define before seeking image access?
- Who could determine the ethics, lawful access, data-controller, clinical-safety, and validation requirements?
- What evidence would be required before making any claim about performance, patient safety, transfer, or operational benefit?
- Where must repository work stop because the necessary professional authority or evidence is unavailable?

## Safety and service constraints

Keep this repository at aggregate service-evidence and responsible research-readiness level. Do not request, generate, commit, or process person-level images, reports, labels, or linked records. Do not use generated phantoms, fictional cases, or clinical-looking interfaces to work around the responsible refusal. Do not provide diagnosis, triage, treatment, or clinical-deployment advice.

Describe the public sources narrowly: they show waiting and reporting pressure, not a validated intervention. If a selected direction would require clinical images or affect clinical decisions, stop and name the outside authority required. The playbook's requirement for a partner radiology service, sponsor, ethics approval, real imaging archive under formal clinical-research governance, and reporting-clinician involvement is a project safety boundary. Only the responsible organisations and professionals can establish the actual governance route.
