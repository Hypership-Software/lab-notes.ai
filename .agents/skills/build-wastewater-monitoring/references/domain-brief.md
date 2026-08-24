# Wastewater Monitoring — domain brief

## Domain vocabulary

- **Wastewater monitoring:** use this project term for observing defined readings over a stated place and time. Monitoring does not by itself establish a cause, impact, incident, or response.
- **Environmental signal:** use this project term for a reading or pattern that may warrant authorised interpretation. The synthetic data cannot establish what is in the water, whether the environment was affected, or what should happen.
- **Investigation:** use this project term for accountable work that checks possible explanations using appropriate operational, sampling, laboratory, hydraulic, environmental, and site context. The registered sources do not define a reusable investigation process for this project.
- **Regulatory action:** action taken under applicable standards and authority. The Department of Agriculture, Environment and Rural Affairs source describes permitted and checked sewage discharges, but the repository contains no site consent, compliance result, or authority to act.
- **Ammonia and phosphorus:** the synthetic file contains invented concentrations for these measures. The registered discharge source names ammonia and nutrients such as phosphorus among measures used in the published regulatory context; a fictional value is not a health, ecological, or compliance conclusion.
- **Flow band:** the synthetic file groups daily flow into broad invented ranges. A band is not an exact measurement and does not establish why another reading changed.
- **Ground truth:** use this project term for authorised evidence that establishes what occurred and how a reading should be interpreted. The synthetic file contains no ground truth for an incident, contamination, impact, sensor fault, compliance state, or health outcome.

## Organisations and people affected

The Department of Agriculture, Environment and Rural Affairs publishes information about regulating sewage discharges. Northern Ireland Water publishes an annual account of water and sewerage services, network scale, spending, and environmental and customer measures. These publications provide public context; they do not assign responsibility for a future monitoring direction or authorise this repository to interpret a reading or act on it.

Wastewater operators, environmental investigators, regulators, laboratories, network and security owners, data controllers, public-health professionals, affected communities, and people responsible for receiving waters could all be affected by future work. This is a project stakeholder map, not evidence that any named role has agreed to participate. The registered sources do not identify the accountable owner, decision rights, notification duties, or route for challenging a future result.

## Source map and access

- **Department of Agriculture, Environment and Rural Affairs — [Regulating sewage discharges](https://www.daera-ni.gov.uk/articles/regulating-sewage-discharges):** open published information about how discharges from Northern Ireland wastewater treatment works are permitted and checked, including measures such as oxygen demand, suspended solids, ammonia, and nutrients such as phosphorus, and how samples count towards annual compliance. It does not supply this project's fictional works, their consents, site readings, incident ground truth, health evidence, or authority to declare compliance.
- **Northern Ireland Water — [Integrated annual report and accounts](https://www.niwater.com/about-us/annual-report):** open annual reporting about running water and sewerage services, performance against environmental and customer measures, network scale, and spending. It gives annual public context rather than the reading-by-reading operational feed imagined by the playbook.

Treat both as **Real published source** material. Treat the strategy proposal, playbook summary, purpose, preparation, limitations, and caveats as project interpretation. Treat the committed JSON as **Synthetic working data**, never as a real observation, event, site comparison, compliance result, or evidence of health or environmental impact.

## Synthetic fields

- `id` is a fictional record identifier.
- `site` is one of six fictional lettered works. It is not a real place and supplies no coordinates, discharge point, catchment, receiving water, or network relationship.
- `week` is one of three fictional weekly periods, from `2025-W18` to `2025-W20`. It is not an exact sampling or result time.
- `flowBand` is an invented broad daily-flow category, not an exact flow measurement.
- `ammoniaMgPerL` is an invented ammonia concentration in milligrams per litre without a site consent, sampling method, quality status, or impact context.
- `phosphorusMgPerL` is an invented phosphorus concentration in milligrams per litre without a site consent, receiving-water context, sampling method, quality status, or impact context.

The 18 records cover six fictional works and three consecutive weekly periods per works. That is neither geographical coverage nor an operational time series. Two weeks were deliberately authored to differ from their fictional site's short pattern; they are not detected incidents or validation cases. The file contains no location, weather, rainfall, hydraulics, sampling or laboratory detail, sensor condition, maintenance event, other contaminant, ecological observation, exposure pathway, response, ground truth, or accountable decision.

## Known unknowns

- The intended outcome, accountable owner, affected groups, and permitted operational decision are unknown until stated.
- The strategy proposal does not define which readings constitute abnormal flow, contamination, or spillovers, or how any of those concepts relate.
- The registered public sources do not provide the operational feed, definitions, quality rules, freshness, completeness, sampling context, or investigation ground truth for a future direction.
- The fictional works have no spatial identity, coordinates, discharge points, catchments, receiving waters, upstream or downstream relationships, or authorised network detail.
- Three weekly readings per works do not establish baseline variation, trend, seasonality, persistence, sampling frequency, or a temporal relationship to another event.
- The file does not distinguish a real environmental change from rainfall, hydraulic context, sampling variation, laboratory variation, sensor drift, maintenance, missing data, or another explanation.
- No site consent, applicable standard, compliance method, threshold, health interpretation, investigation criterion, incident definition, response procedure, or authority to notify is supplied.
- The registered sources do not establish that a dashboard, map, alerting system, anomaly model, software product, or AI is needed.

## Assumptions to challenge

- A value that differs from two neighbouring fictional weeks is not a hotspot, health risk, incident, consent breach, compliance result, or required action.
- A higher fictional concentration does not make one works worse than another; the dataset supplies no standard or evidence that the sites are comparable.
- A changed flow band does not establish that flow caused, diluted, concentrated, or otherwise explains another reading.
- Six lettered works do not support mapping or any claim about geographic coverage, affected area, or receiving water.
- Three weekly observations do not form a reliable baseline or show a trend, recurrence, persistence, or seasonal pattern.
- Two deliberately different synthetic weeks cannot validate a detection rule or threshold.
- A transparent rule, human review, or internal-only label does not create authority to issue an alert or conclude that an event occurred.
- Monitoring, investigation, compliance assessment, regulatory action, and public-health advice are different activities with different evidence and authority.
- Manual research, source clarification, operational inquiry, service design, or deciding not to build may meet the outcome without software or AI.

## Questions before building

- What outcome is intended, who owns it, and which people or environments could be affected?
- Is the work about monitoring a signal, supporting an investigation, assessing regulatory compliance, or informing another decision, and who has authority for that activity?
- Which real readings, definitions, sampling methods, quality controls, timestamps, units, and provenance are authoritative?
- What spatial unit does each observation represent, what location or network detail may be used, and who may access it?
- What temporal coverage, refresh rate, delay, missingness, history, and seasonality would be needed for the stated outcome?
- What authorised evidence could establish ground truth, distinguish sensor or sampling problems from environmental change, and test a future interpretation?
- Which site standards, environmental context, health evidence, escalation procedures, and decision rights would apply, and who can supply them?
- How will affected communities, operators, environmental specialists, accessibility needs, false alarms, missed signals, and challenge routes shape the outcome?
- Could manual review, clearer source definitions, data-quality inquiry, service mapping, or another non-tool direction meet the outcome?
- Where must repository work stop because operational, environmental, regulatory, public-health, legal, security, or data-controller authority is unavailable?

## Safety and service constraints

Keep the six fictional works and 18 readings visibly labelled **Synthetic working data** and separate from the two real published sources. Preserve both spatial uncertainty and the three-week temporal limit in every interpretation. Do not geocode a fictional works, invent receiving-water or network context, interpolate missing context, or describe an absent reading as normal.

Do not infer or issue a health risk, hotspot, incident, contamination diagnosis, compliance result, safe state, alert, notification, or operational action from these readings. Do not invent a threshold, standard, anomaly rule, site ranking, risk score, consent, ground truth, or investigation outcome. Monitoring may identify a question; only authorised evidence and accountable people can determine whether investigation, regulatory action, or public communication is appropriate. Stop and name that missing authority when the requested work crosses this boundary.
