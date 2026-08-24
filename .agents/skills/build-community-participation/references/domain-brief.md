# Community Participation Analysis — domain brief

## Domain vocabulary

- **Participation volume:** use this project term for the number of responses or comments received through a route. The playbook treats that count as different from evidence about what a community thinks.
- **Representativeness:** use this project term for whether the people and organisations participating reflect the communities relevant to the decision. Neither registered source establishes representativeness for participation in general.
- **Citizen Space:** the open nidirect portal lists open, forthcoming, and closed consultations from several Northern Ireland departments and public bodies. The playbook records that remaining departments use a separate portal.
- **Supplementary response:** the Department for the Economy report uses this term for responses and addenda received by email rather than through its Citizen Space form.
- **Theme:** the report describes subject-matter specialists reviewing replies, identifying commonality, developing themes, and recording findings, with AI tools used to aid topic and theme grouping. A theme organises submitted material; it does not establish public opinion.
- **Aggregation:** use this project term for combining comments into counts, weights, themes, or summaries. The report says it treated each response as one opinion or comment even when the response represented an organisation rather than an individual.
- **Feedback loop:** use this project term for how organisers explain what was heard, what changed, what did not change, and why. The report says consultation evidence will inform a final strategy, but the registered sources do not define a participant-facing feedback process.

## Organisations and people affected

The nidirect portal serves consultations from several Northern Ireland departments and public bodies. The Department for the Economy report distinguishes individual and organisational responses and says its respondents included public- and private-sector organisations, special-interest groups, industries, and individuals. These are examples from one consultation, not a complete map of who should participate in another decision. The registered sources do not identify which communities were missing, which channels excluded people, or who had authority to speak for a group.

## Source map and access

- **Northern Ireland consultations portal** — open access at <https://consultations.nidirect.gov.uk/>. It lists open, forthcoming, and closed consultations. The playbook records the split across this and a separate portal as relevant to uneven participation; the source does not measure that unevenness.
- **Draft Circular Economy Strategy for Northern Ireland — Public Consultation Response Report** — open access from <https://www.economy-ni.gov.uk/publications/draft-circular-economy-strategy-northern-ireland-public-consultation-response-report>. It documents one consultation's response routes, response counts, qualitative and quantitative analysis, thematic grouping, confidentiality treatment, and next steps. It reports the responses received; it does not claim that they represent Northern Ireland public opinion.

Treat both as real published sources. Treat the playbook's participation caveats as project interpretation. Treat the committed JSON as synthetic working data, never as an additional published source.

## Synthetic fields

- `id` is a fictional record key.
- `topic` is one of five project-authored local-topic labels, checked against no official framework.
- `stance` is one of four project-authored labels: `critical`, `supportive`, `uncertain`, or `mixed`.
- `text` is an AI-authored fictional comment. No real submission was copied and no respondent is imitated.

The 18 records contain no evidence about recruitment, channel, location, demographic coverage, consent, who did not participate, or the prevalence of any view. Do not use topic or stance counts to infer public opinion, representation, demand, or priority.

## Known unknowns

- The decision or service outcome a builder intends to support is unknown until they state it.
- Which communities are affected, who is missing, and who may speak for an organisation or group are unknown.
- The invitation, reach, non-response, accessibility, language, assisted, telephone, postal, face-to-face, and other non-digital routes are not measured by the registered sources.
- The degree to which any set of responses is representative is unknown.
- Consent, confidentiality, permitted reuse, retention, and withdrawal arrangements for any future real submissions are not specified by these sources. The report notes confidentiality for quoted comments but does not establish a reusable consent model.
- The effect of weighting an individual and an organisation as one response each depends on the consultation purpose and is not resolved by the example report.
- How participants can inspect or contest themes, how sharp objections remain visible after aggregation, and how findings are checked are not specified.
- What is reported back to participants, by whom, through which channels, and how decisions are linked to contributions are not specified.

## Assumptions to challenge

- More comments do not by themselves mean more representative participation.
- An online submission route does not establish that affected communities knew about it or could use it.
- A theme count does not establish prevalence outside the responses received.
- A group label or organisational response does not establish how many people it represents or whether members consented to that representation.
- Aggregation can obscure disagreement or a single important objection; a tidy category set is not neutral merely because it is consistent.
- Publishing a summary does not by itself close the feedback loop.
- The registered sources do not establish that AI is needed or that the former grouping example is the preferred approach.

## Questions before building

- What outcome or decision should participation inform, and who owns that decision?
- Which communities are affected, which are missing from current channels, and how will that absence remain visible?
- Which online and non-digital routes already exist, and which routes are excluded from the available evidence?
- What does participation volume measure here, and what separate evidence would support any statement about representativeness?
- What did participants consent to, and who can authorise collection, reuse, grouping, quotation, retention, or publication?
- How will original comments, disagreement, minority views, and uncertainty remain inspectable after aggregation?
- How can participants contest a category or summary?
- What will be reported back, through which channels, and who is accountable for explaining the decision?
- Could outreach, facilitation, accessible materials, manual synthesis, or another non-AI service-design approach meet the outcome?

## Safety and service constraints

Treat participation bias and channel exclusion as constraints at the start of the work. Keep volume separate from representativeness and describe unknown coverage as unknown. Preserve the distinction between individual and organisational contributions when aggregation could change their apparent weight. Do not infer public opinion from the synthetic corpus or use its project-authored topics and stances as an official classification.

Establish authority and consent before handling real submissions. Minimise access to submitted words, protect confidentiality, and retain a route to inspect source comments where authorised. Keep categories contestable, preserve sharp objections and uncertainty, and design the feedback loop so any claim about what changed is traceable to an accountable decision-maker. The registered sources do not specify these controls; obtain them from the responsible source owner rather than inventing them.
