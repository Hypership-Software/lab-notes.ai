# Farm Advisory Support — domain brief

## Domain vocabulary

- **General guidance:** information about published evidence, common considerations, missing context, questions, and professional boundaries that does not interpret an identified farm or field or say what action should be taken.
- **Farm-specific professional advice:** an accountable interpretation for an identified farm or field using current evidence, season and conditions, the farming system, applicable guidance, constraints, local knowledge, and qualified professional judgement. The synthetic file cannot support it.
- **Nutrient management plan:** the registered Department of Agriculture, Environment and Rural Affairs source describes field-by-field records including valid soil nutrient analysis with phosphorus and pH and a soil nitrogen supply index used in fertiliser and manure decisions. The source does not turn this repository's fictional values into a recommendation.
- **Seasonality:** the crop, sampling, weather, soil, livestock, application, and decision timing that changes whether information is current and relevant. The synthetic rows contain no date or season.
- **Farm context:** the identified holding and field, farming system, crop and livestock situation, soil, maps, measurements, input history, constraints, costs, environmental setting, and farmer observations relevant to a real decision. Most are absent here.
- **Accessibility:** whether people can understand and use a service across language, literacy, disability, connectivity, device, assisted, adviser-mediated, phone, paper, and other non-digital routes. The registered sources do not establish user access needs or a preferred channel.
- **Local knowledge:** the farmer's and adviser's situated understanding of a field, conditions, practical constraints, and previous decisions. A generic model or fictional table does not replace it.

## Organisations and people affected

The Department of Agriculture, Environment and Rural Affairs publishes both registered sources. The Nutrient Management Plan page describes field-level evidence for nutrient planning. The Agricultural Census describes crop areas, livestock numbers, farm labour, and farm counts at regional and sub-regional grain. These sources provide public context; they do not identify farms needing advice, assign responsibility for a future build, or authorise a field recommendation.

Farmers and family members, farm workers, qualified advisers and agronomists, people responsible for animal welfare, soil, water, biodiversity and emissions, agricultural regulators, farm businesses with different records and connectivity, and data controllers could all be affected by future work. This is a project stakeholder map, not evidence that any role has agreed to participate. The registered sources do not establish who the user is, who may advise, which channels are accessible, or how a farmer can question or decline a suggestion.

## Source map and access

- **Department of Agriculture, Environment and Rural Affairs — [Nutrient Management Plan](https://www.daera-ni.gov.uk/articles/nutrient-management-plan):** open published information about field-by-field nutrient planning records, including valid soil nutrient analysis with phosphorus and pH and the soil nitrogen supply index against which fertiliser and manure decisions are set. It does not provide a crop-specific recommendation table for the synthetic rows or authorise a product, rate, timing, location, or method.
- **Department of Agriculture, Environment and Rural Affairs — [Agricultural Census in Northern Ireland](https://www.daera-ni.gov.uk/articles/agricultural-census-northern-ireland):** open annual reporting about farm counts, crop areas, livestock numbers, and farm labour, with regional and sub-regional data. This aggregate picture does not identify a field, explain its soil or season, show who needs advice, or support a field-level action.

Treat both as **Real published source** material. Treat the strategy proposal, playbook summary, purpose, preparation, limitations, and caveats as project interpretation. Treat the committed JSON as **Synthetic working data**, never as a farm record, soil or crop measurement, yield result, professional assessment, priority, deficiency, treatment need, or evidence of benefit.

## Synthetic fields

- `id` is a fictional record identifier.
- `fieldGroup` is one of six lettered project groupings. It is not a holding, farm, field, parcel, location, map, or official identifier.
- `crop` is a project-authored crop label without a crop year, current or previous status, variety, intended use, growth stage, management history, or confirmation that one field group represents one crop context.
- `soilPh` is an invented value without a field identity, sample date, sampling method, laboratory provenance, soil type, phosphorus result, or applicable interpretation.
- `nitrogenBand` is an invented soil nitrogen supply index label without field evidence, date, method, crop-specific interpretation, or professional judgement.
- `yieldBand` is an invented range. Some rows use tonnes of dry matter per hectare and others tonnes per hectare, with no measurement period, method, crop-specific basis, or comparable midpoint.

The 18 rows cover six fictional field groups but no real place, holding, field, area, soil map, waterway, or farm type, so they have no spatial coverage. They contain no dates at all, so they have no temporal or seasonal coverage. The file has no full soil nutrient analysis, phosphorus, sample provenance, previous crop, soil type, weather, ground condition, livestock context, input or manure history, maps, environmental constraints, costs, farmer observations, professional review, action, outcome, or ground truth.

## Known unknowns

- The intended outcome, season or decision time, farm context, accountable owner, intended user, affected groups, and permitted advice boundary are unknown until stated.
- The strategy proposal names yield, livestock, water, and fertiliser use without identifying one farmer decision or the evidence and authority it requires.
- No row identifies a farm or field or can be related to the aggregate Agricultural Census.
- The crop, pH, nitrogen, and yield labels have no observation date, source provenance, field map, soil context, crop history, weather, ground condition, or local interpretation.
- The synthetic yield bands use different units and crop contexts and cannot establish comparable performance, potential, or a reason for action.
- The appropriate general guidance and the boundary of qualified farm-specific advice are not defined for a future service owner or user group.
- Accessibility needs, connectivity, digital confidence, language, literacy, disability, device, assisted use, adviser-mediated access, phone, paper, and non-digital routes are not evidenced.
- Farms with fuller digital records may be easier for a tool to represent, while missing records do not establish lower need or lower priority.
- No qualified adviser, agronomist, environmental, welfare, regulatory, legal, farmer, or data-controller authority for an intervention is supplied.
- The registered sources do not establish that a records checker, review queue, planning tool, calculator, chatbot, advice-preparation journey, software product, or AI is needed.

## Assumptions to challenge

- A lower fictional pH or nitrogen index does not identify a field needing advice, a deficiency, urgency, or an input requirement.
- A crop label does not provide the season, growth stage, intended use, field history, current conditions, or applicable recommendation basis.
- Yield bands with different crops and units cannot be ranked, averaged, assigned midpoints, or used as evidence of performance or need.
- A field group's repeated values do not make it a farm, a real spatial unit, or a higher-priority case.
- The absence of an invented trigger does not mean a field is complete, suitable, performing well, or in no need of professional attention.
- A completeness check or adviser handoff can still steer a farm decision and is not automatically neutral or needed.
- Labelling a threshold as illustrative does not make it authoritative or harmless when it orders people or fields.
- Digital self-service is not automatically more accessible than adviser-mediated, assisted, phone, paper, or other non-digital routes.
- Human review cannot supply missing evidence, a safe process, or professional authority unless the responsible people and standards are actually established.
- Manual information provision, adviser-led support, accessibility research, service design, or deciding not to build may meet the outcome without software or AI.

## Questions before building

- What outcome is intended, for which season or decision time, which farm context, who owns it, and who is expected to use it?
- Is the need general information, service access, record support, farm-specific professional advice, or another outcome, and who may define that boundary?
- What holding and field identity, area, map, current and previous crop, soil type, complete soil evidence, sample provenance, input history, livestock context, and environmental constraints are authoritative?
- Which season, crop stage, weather, ground condition, planned-action date, costs, practical limits, and farmer observations are relevant?
- Which guidance, evidence version, crop-specific interpretation, qualified professional judgement, and review process would be required before advice?
- What effects on livelihood, animal welfare, soil, water, biodiversity, emissions, neighbours, and future farm choices must remain visible?
- Who has less complete digital records, limited connectivity or devices, different language or literacy needs, disabilities, or a preference for assisted, adviser-mediated, phone, paper, or other non-digital routes?
- Who may see or change farm records, provide advice, approve or decline an action, resolve disagreement, and correct a harmful suggestion?
- Could manual information provision, adviser-led support, accessibility research, service design, or another non-tool direction meet the outcome?
- Where must repository work stop because farm evidence, qualified professional judgement, farmer authority, environmental or welfare expertise, legal interpretation, or data-controller approval is unavailable?

## Safety and service constraints

Keep all 18 records visibly labelled **Synthetic working data** and separate from the two real published sources. Do not identify a fictional group as a farm or field, invent a location or season, infer a current measurement, or compare unlike yield bands. Treat absent dates, maps, field evidence, context, and accessibility research as unknown rather than filling them with defaults.

Do not rank or select farms, fields, or field groups; invent pH, nitrogen, or yield thresholds; or recommend a nutrient, product, amount, rate, timing, location, method, treatment, or other intervention from these records. Keep general guidance distinct from farm-specific professional advice and ask about seasonality, farm context, and accessibility before choosing a direction. Only farmers, qualified professionals, affected stakeholders, regulators, and accountable service owners can define and act on those decisions; stop and name the missing authority when requested work crosses that boundary.
