# Earth Observation for Public Services — domain brief

## Domain vocabulary

- **Observation:** a source measurement or image with a stated place, time, method, resolution, quality, and provenance. The synthetic file contains already-summarised fictional rows, not observations or imagery.
- **Classification:** an assigned land-cover or habitat class under a defined taxonomy and method. The synthetic `landCoverClass` is a project-authored label for a fictional tile, not a field-survey finding or imagery-model output.
- **Ground truth or validation evidence:** use this project term for authorised independent reference evidence suitable for checking a claim at the required class, place, and time. Repeated field survey and an imagery-derived land-cover inventory are valuable published evidence, but neither automatically validates a different model, taxonomy, scale, or period.
- **Revisit frequency:** how often comparable observations of the same place are available. The two broad synthetic periods are comparison windows, not acquisition dates or revisit cadence.
- **Cloud cover:** imagery obscured by cloud, with related quality concerns such as shadow, season, tide, and alignment named by the playbook. These conditions do not survive in the synthetic summary table.
- **Land-cover change:** a difference established between comparable observations or classifications under a stated method. A signed fictional hectares value with undefined semantics does not establish what changed from one class to another.
- **Operational decision:** a decision such as inspection, planning, enforcement, or intervention taken by an accountable body. Observation or classification does not supply cause, ownership, legality, importance, or authority to act.

## Organisations and people affected

The Department of Agriculture, Environment and Rural Affairs publishes the Northern Ireland Countryside Survey. The Copernicus Land Monitoring Service publishes CORINE Land Cover. The former provides repeated field-survey evidence from sampled squares; the latter provides an openly usable, imagery-derived European land-cover and change inventory. These sources provide public evidence but do not assign responsibility for a future build, align their taxonomies and scales, or authorise a classification or operational response.

Field surveyors, environmental analysts, ecologists, land managers and owners, imagery and data owners, planning and enforcement professionals, communities affected by land decisions, and people responsible for sensitive habitats and sites could all be affected by future work. This is a project stakeholder map, not evidence that any role has agreed to participate. The registered sources do not establish who may define a class, validate a change, see detailed locations, decide importance, or authorise follow-up.

## Source map and access

- **Department of Agriculture, Environment and Rural Affairs — [Northern Ireland Countryside Survey](https://www.daera-ni.gov.uk/articles/northern-ireland-countryside-survey):** open information about repeated field surveys of a random sample of 288 squares measuring 500 by 500 metres, covering about half a percent of Northern Ireland, mapping land cover and habitat by type and comparing survey rounds. It is field evidence, not satellite imagery or automatic pixel-level ground truth for another taxonomy, scale, or time.
- **Copernicus Land Monitoring Service — [CORINE Land Cover](https://land.copernicus.eu/en/products/corine-land-cover):** free-to-use and downloadable Europe-wide land-cover and change inventories built from satellite imagery against a fixed class list. Its taxonomy and smallest mapped area determine what it can represent; it does not validate the fictional rows or choose an operational use.

Treat both as **Real published source** material. Treat the strategy proposal, playbook summary, purpose, preparation, limitations, and caveats as project interpretation. Treat the committed JSON as **Synthetic working data**, never as an image, field observation, real place, validated classification, detected change, model output, priority, or evidence for action.

## Synthetic fields

- `id` is a fictional record identifier.
- `tile` is one of ten numbered fictional labels described as survey-sized. It has no coordinates, geometry, grid, coordinate reference system, land ownership, habitat sensitivity, or relation to a real survey square.
- `period` is one of two unequal aggregate windows, `1998-2007` and `2007-2024`. It supplies no acquisition or survey dates, observation count, revisit frequency, seasonal match, or temporal alignment.
- `landCoverClass` is one broad project-authored label assigned to the whole fictional tile. It supplies no taxonomy version, class definition, source method, mixed-cover representation, transition from or to another class, probability, or uncertainty.
- `changedHectares` is an invented signed area. The file does not define the sign as gain or loss, show how the area was calculated, state a minimum mapping unit, or link the value to an observation or validation label.

The 20 rows cover ten fictional tiles and two unequal multi-year periods, so they have no real spatial coverage and no observation-level time series. The file contains no image, pixel, sensor or product, acquisition time, processing level, licence record, cloud or shadow flag, season, tide, alignment quality, spatial resolution, class transition, confidence, reference label, field check, review authority, cause, ownership, legality, intervention outcome, or ground truth.

## Known unknowns

- The intended outcome, place, horizon, accountable owner, affected groups and environments, and permitted operational decision are unknown until stated.
- The strategy proposal names deforestation, land use, and coastal erosion without choosing imagery, scale, taxonomy, validation evidence, or what should happen after mapping.
- The Countryside Survey and CORINE use different evidence methods and geographic scales; the registered sources do not establish that their classifications or periods can be treated as interchangeable.
- The fictional tiles have no location, geometry, relation to the 288 sampled squares, or relation to CORINE features.
- The signed area semantics, class definitions, mapping method, observation dates, and unequal-period comparison are not supplied.
- Revisit frequency, missing observations, cloud and shadow, season, tide, alignment, sensor and processing variation, and other image-quality conditions are unknown.
- No authorised independent reference labels, field-validation design, class-specific error evidence, acceptable-error definition, or ground truth exists.
- The causes, ownership, legality, ecological importance, public sensitivity, and appropriate response to any apparent surface change are unknown.
- The registered sources do not establish that an imagery viewer, change queue, classifier, model card, schematic map, software product, or AI is needed.

## Assumptions to challenge

- A positive or negative `changedHectares` value is not a gain or loss until the source semantics are defined.
- A project-authored class label is not an observation, an imagery classification, field-survey ground truth, or evidence that the whole tile contains one cover type.
- The absolute size of a fictional change does not establish importance, urgency, risk, legality, ecological effect, or inspection priority.
- Two unequal aggregate periods cannot be compared as though they show the same rate, a trend, acceleration, or revisit frequency.
- A table that omits cloud, shadow, season, tide, and alignment does not mean those quality problems were absent.
- A field survey is not automatically pixel-level ground truth for imagery, and an imagery-derived inventory is not automatically ground truth for a different taxonomy or resolution.
- A detected surface change cannot explain cause, ownership, legality, or what action should follow.
- Transparent thresholds, a review state, model card, or human check cannot supply missing observations, validation evidence, semantics, or operational authority.
- Manual evidence comparison, taxonomy alignment, field-survey review, service design, or deciding not to build may meet the outcome without a classifier or AI.

## Questions before building

- What outcome is intended, for which place and horizon, who owns it, and what operational decision—if any—could follow?
- Is the work about acquiring observations, classifying cover, detecting change, validating a claim, understanding revisit and cloud limits, or supporting a separate decision?
- Which imagery or field observations, licences, acquisition dates, processing methods, spatial resolutions, quality flags, and provenance are authorised?
- Which taxonomy, class definitions, minimum mapping unit, mixed-cover treatment, and change semantics fit the intended outcome?
- What revisit cadence, seasonal window, cloud and shadow tolerance, tide state, and spatial and temporal alignment are required?
- Which independent reference evidence is authorised, current, representative, and sufficiently aligned to test each class and change claim?
- Which false positives and false negatives matter for the intended use, who bears their effects, and who may decide the acceptable trade-off?
- Which locations, habitats, land interests, communities, planning or enforcement roles, and publication sensitivities need to shape or stop the work?
- Could manual source comparison, taxonomy work, field-survey review, service design, or another non-tool direction meet the outcome?
- Where must repository work stop because imagery, field evidence, sensitive-location access, professional judgement, legal authority, or service ownership is unavailable?

## Safety and service constraints

Keep all 20 records visibly labelled **Synthetic working data** and separate from the two real published sources. Do not invent imagery, thumbnail evidence, coordinates, class transitions, sign semantics, confidence, cloud status, revisit cadence, field labels, or a location for a fictional tile. Preserve the unequal period lengths and the absence of observation provenance.

Do not select a use case, classify or label a change, rank tiles, invent thresholds or review states, assign importance, or recommend inspection, planning, enforcement, or intervention from these records. Keep observation, classification, ground truth, revisit frequency, cloud cover, and operational decisions distinct. Only accountable data owners, field and environmental professionals, affected stakeholders, and public-service authorities can define and act on those claims and decisions; stop and name the missing authority when requested work crosses that boundary.
