# Adaptive Tutoring — domain brief

## Domain vocabulary

- **Adaptive tutoring:** the strategy example proposes material, tutoring, and interactive learning that could suit different ways of learning. The registered sources do not establish how an adaptive choice should be made or whether AI is required.
- **Learning support:** use this project term for an activity, explanation, teaching practice, or service that helps a learner engage with an intended learning outcome. Keep it distinct from formal assessment, placement, diagnosis, or a profile of the pupil.
- **Pedagogy:** use this project term for the teaching and learning rationale behind an approach. The synthetic file contains no evidence that one pedagogical approach works better than another.
- **Progression:** use this project term for how learning outcomes, concepts, or activities relate over time. The dataset's project-authored `difficulty` labels are not a curriculum sequence or evidence of prerequisite relationships.
- **Accessibility:** the playbook warns that wording, language, or device barriers may affect practice scores. Treat accessible presentation and supported routes as choices to establish with learners and educators, not traits to infer from a score.
- **Pupil profiling:** use this project term for assigning an ability, need, risk, preference, or predicted path to an individual. The committed data is aggregate by topic and cannot support pupil profiling.
- **Meaningful control:** use this project term for the ability of teachers, learners, and, where appropriate, guardians to understand, choose, challenge, change, or stop what happens. The registered sources do not define this control model.

## Organisations and people affected

The Department of Education publications describe Northern Ireland school-leaver outcomes and post-primary examination performance at aggregate level. The playbook concerns learners and the people making choices about learning support. Teachers, learners, guardians, curriculum specialists, accessibility specialists, safeguarding leads, schools, and data controllers could all be affected by a future direction, but the registered sources do not allocate their responsibilities or grant authority for a particular application.

The sources do not describe individual practice, classroom context, teacher workload, learner preferences, accessibility barriers, safeguarding needs, or guardian involvement. Do not infer these from aggregate attainment figures or the fictional topic summaries.

## Source map and access

- **Department of Education — [School leavers](https://www.education-ni.gov.uk/articles/school-leavers):** open annual figures about highest qualifications and destinations, broken down by school type and pupil characteristics. It describes aggregate outcomes, not individual practice, tutoring efficacy, learning need, or the choice of a next activity.
- **Department of Education — [School performance](https://www.education-ni.gov.uk/articles/school-performance):** open annual examination-performance bulletins for pupils in Years 12 and 14 across Northern Ireland post-primary schools. It does not publish practice sequences, pedagogical decisions, accessibility needs, or evidence for an adaptive rule.

Treat both as **Real published source** material. Treat the playbook summary, caveats, and dataset preparation as project interpretation. Treat the committed JSON as **Synthetic working data**, never as evidence about a pupil, curriculum, teaching method, or intervention.

## Synthetic fields

- `id` is a fictional record key.
- `topic` is one of 18 project-authored mathematics topic labels and is not a reviewed curriculum map.
- `difficulty` is a fictional `foundation`, `developing`, `secure`, or `stretch` label. It does not measure difficulty, attainment, progression, or pupil ability.
- `attemptsBand` is an invented aggregate range, not a count from learners or a signal of demand.
- `successRateBand` is an invented aggregate range, not a measure of understanding, teaching quality, or intervention effectiveness.

The records contain no pupil, class, school, teacher, activity, response, sequence, accessibility need, assessment result, or guardian decision. Do not select a topic, identify a learner, prescribe support, derive a progression path, or define a threshold from these bands.

## Known unknowns

- The intended learning outcome, educational setting, age range, and accountable owner are unknown until the builder states them.
- The curriculum framework, concept relationships, progression rationale, and authority to define them are not supplied.
- No pedagogical rationale, reviewed activity bank, content-quality process, or evidence of tutoring effectiveness is registered.
- The meanings of the fictional topic and difficulty labels have not been reviewed by teachers or curriculum specialists.
- Learners' language, device, sensory, cognitive, physical, and supported-access needs are not recorded.
- How teachers exercise judgement and how learners understand, choose, contest, or stop support is not established.
- Whether and how guardians should be informed or involved depends on age, context, safeguarding, and responsible authority and remains unknown.
- No purpose, lawful basis, minimisation rule, access model, retention period, correction route, or data-controller decision exists for real pupil practice data.
- The boundary between informal learning support, formative feedback, assessment, placement, and profiling is not defined for a future direction.
- Measures of learning, wellbeing, fairness, workload, narrowing of opportunity, or unintended exclusion are not established.

## Assumptions to challenge

- A low fictional success band does not identify a difficult topic, a pupil who needs help, or a priority for intervention.
- A high fictional attempt band does not establish demand, importance, curriculum order, or teaching effort.
- Project-authored difficulty labels do not establish progression or prerequisites.
- Practice success does not by itself establish understanding; wording, language, device, support, and context may affect it.
- A next-activity choice can narrow opportunity even when each individual choice appears small.
- Sorting learners by a preferred learning style is not a sound basis for deciding what they see next, as the playbook caveat states.
- Teacher confirmation does not make an unsupported cue, profile, or threshold educationally valid.
- Personalisation does not require pupil profiling, a software product, or AI; teaching practice or service design may meet the outcome.

## Questions before building

- What learning outcome is intended, in which educational context, and who is accountable for it?
- Which pedagogy supports that outcome, and what published or professional evidence supports the approach?
- Who defines and reviews the curriculum concepts, progression, prerequisites, activities, and feedback?
- How will learning support remain separate from formal assessment, placement, diagnosis, or pupil profiling?
- What will teachers decide, override, or stop, and what information supports their professional judgement?
- How will learners understand, choose, challenge, correct, or stop the support they receive?
- When is guardian involvement appropriate, who decides that, and how do guardians retain meaningful control without displacing learner voice?
- Which accessible formats, languages, devices, assisted routes, and non-digital alternatives must be available by default?
- What real pupil data, if any, is necessary, and who can authorise its purpose, collection, access, correction, retention, and deletion?
- Could teacher-authored materials, classroom practice, clearer progression guidance, accessibility improvements, or another non-tool direction meet the outcome?

## Safety and service constraints

Keep the synthetic topic summaries aggregate and fictional. Never turn their bands into a learner-level signal, curriculum judgement, topic ranking, intervention threshold, assessment, or profile. Do not invent pupil events to bridge the gap. Establish the learning outcome, pedagogical rationale, progression authority, and responsible decision owner before implementation choices.

Make teacher judgement, learner voice, accessible alternatives, challenge and correction, and age-appropriate guardian involvement visible from the start. Minimise any future real pupil data and stop until the responsible school and data controller establish purpose and authority. Where a direction could affect assessment, safeguarding, curriculum entitlement, or what an individual learner is offered, require the relevant professional decision rather than filling the gap with fictional data or an automated rule.
