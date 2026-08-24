# Policy Evidence Workbench — domain brief

## Domain vocabulary

- **Consultation purpose:** use this project term for the proposal or decision on which views are sought and how the responsible body says responses will inform its work. The Northern Ireland Artificial Intelligence Strategy consultation seeks views to shape a final strategy.
- **Corpus:** use this project term for all response material authorised for a particular analysis. Treat corpus completeness as unknown until every included route, response, addendum, exclusion, and unreadable item can be accounted for.
- **Response:** the Department for the Economy report distinguishes responses from individuals and organisations and also describes supplementary responses and addenda received by email.
- **Theme:** the report describes subject-matter specialists reviewing replies, identifying commonality, developing themes, and recording findings, with AI tools used to aid topic and theme grouping. Treat a theme as a revisable organising aid for submitted material, not a policy conclusion or evidence of prevalence beyond the responses received.
- **Traceable passage:** use this project term for the exact authorised words or stable source location that supports a summary or classification. The published report contains unattributed quotations for confidentiality, so it does not let an external reader trace every published theme back to a response.
- **Disagreement and uncertainty:** keep material that supports, criticises, qualifies, questions, or cannot resolve a proposition visible rather than averaging it into one position. The report says it captured perspectives from respondents who agreed and disagreed.
- **Missed language:** use this project term for relevant wording, paraphrase, context, negation, or ambiguity that a keyword or theme definition does not capture. The playbook states that keyword matching does not establish meaning and that real analysis needs human reading.
- **Policy response:** use this project term for the accountable body's explanation of what it will do after considering consultation analysis. Keep it distinct from a summary of what respondents submitted.

## Organisations and people affected

The Executive Office publishes the Northern Ireland Artificial Intelligence Strategy consultation. The Department for the Economy published the Circular Economy Strategy consultation response report. That report distinguishes individual and organisational respondents, supplementary email material, subject-matter specialists who reviewed responses, and the Department whose final strategy and delivery plans the evidence would inform. These roles come from specific consultations and do not establish the participants, analysts, policy owners, or decision-makers for another exercise. The registered sources do not identify who is accountable for every future classification, summary, policy response, or decision.

## Source map and access

- **Northern Ireland Artificial Intelligence Strategy consultation** — open access at <https://consultations.nidirect.gov.uk/teo/artificial-intelligence-public-consultation/>. It sets out the draft strategy consultation's purpose, asks for views, says responses will be analysed and inform the final strategy, and offers alternative formats on request. It does not validate this project's synthetic themes or a preferred analysis application.
- **Draft Circular Economy Strategy for Northern Ireland — Public Consultation Response Report** — open access from <https://www.economy-ni.gov.uk/publications/draft-circular-economy-strategy-northern-ireland-public-consultation-response-report>. It documents one consultation's channels, response counts, supplementary material, qualitative and quantitative methods, specialist review, theme development, confidentiality treatment, reporting, and next steps. It reports the responses received rather than public opinion and does not establish a reusable data model or workflow for another consultation.

Treat both as real published sources. Treat `consultation-analysis-structure.md`, the playbook caveats, and any description of the former workbench as project interpretation. Treat the committed JSON as synthetic working data, never as published evidence.

## Synthetic fields

- `id` is a fictional record key.
- `theme` is one of six project-authored labels checked against no official framework.
- `stance` is one of four project-authored labels: `critical`, `supportive`, `uncertain`, or `mixed`.
- `text` is an AI-authored fictional response. It is not respondent testimony.

The 20 records are smaller and tidier than a real consultation corpus. They do not contain consultation-question links, source-passage pointers, channel records, addenda, exclusions, redaction history, language coverage, analyst decisions, or accountable policy responses. Theme and stance counts cannot establish policy priority, prevalence, representativeness, analytical quality, or what should be built first.

## Known unknowns

- The consultation purpose, decision to be informed, and accountable owner are unknown until the builder identifies them.
- Corpus completeness is unknown without an authorised inventory of every response route, response, addendum, exclusion, duplicate, unreadable item, and redaction.
- Theme definitions, inclusion and exclusion criteria, overlap rules, and revision authority are not supplied by the registered sources for a future analysis.
- Each synthetic record keeps its full text beside one theme, but no separate passage mapping exists for a later summary or classification.
- The appropriate treatment of disagreement, minority views, mixed positions, and unresolved uncertainty depends on the consultation purpose and remains undecided.
- Missed language, including paraphrase, context, negation, ambiguity, and material in languages or formats not reviewed, is not measured.
- Confidentiality, access, retention, redaction, quotation, and permitted reuse arrangements for future real responses are not established by these sources.
- Responsibility for checking analysis, writing the policy response, making the decision, and explaining it publicly is not established for a future exercise.

## Assumptions to challenge

- A frequently occurring synthetic theme is not a policy priority or a representative view.
- A theme label does not establish what a passage means, and a keyword match does not establish a theme.
- A traceable passage makes a claim inspectable; it does not by itself make the classification correct or the policy response justified.
- Four project-authored stance labels cannot be assumed to capture all disagreement or uncertainty.
- A complete count of the supplied JSON does not establish completeness of any real consultation corpus.
- Analysis of what responses raise is not the accountable body's response, decision, or recommendation.
- The shape of one published report and this project's adjacent interpretation do not establish a preferred product, workbench, data model, ranking, or workflow.
- The registered sources do not establish that AI is needed; manual reading, facilitation, editorial review, or another service-design approach may meet the outcome.

## Questions before building

- What was the consultation asking, which decision should it inform, and who is accountable for that decision?
- Which response routes and materials define the authorised corpus, and how will completeness, duplicates, addenda, exclusions, unreadable items, and redactions be recorded?
- Who defines, reviews, contests, and changes a theme, and what are its inclusion and exclusion criteria?
- Which exact authorised passage supports each summary or classification, and what should happen when traceability is unavailable?
- How will disagreement, minority views, mixed positions, and uncertainty remain visible?
- How will analysts look for missed language, paraphrases, negation, ambiguity, and content in other languages or formats?
- Where does analysis stop and the accountable policy response begin?
- Who may access, quote, retain, reuse, publish, or send real response material to another tool?
- Could manual reading, a traceability checklist, facilitated review, clearer editorial practice, or another non-tool approach meet the outcome?

## Safety and service constraints

Start with the consultation purpose, authorised corpus, and accountable owner. Keep corpus gaps visible and do not fill missing responses, passages, theme definitions, or decision ownership with synthetic or inferred detail. Require a traceable authorised passage for every summary or classification while respecting confidentiality and redaction; when those constraints prevent traceability, narrow the claim instead of inventing support.

Keep theme definitions transparent and contestable. Preserve disagreement, minority views, uncertainty, and missed language in review and reporting. Never convert synthetic coverage into a ranked policy agenda or chosen build. Separate analysis from the policy response so only the responsible decision-maker states what the evidence means for policy and what action follows. The registered sources do not specify a reusable control model for these duties; obtain it from the responsible source owner before handling real responses or publishing findings.
