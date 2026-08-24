# Water Resource Management — domain brief

## Domain vocabulary

- **Demand:** use this project term for water use or need defined by user group, place, and time. The synthetic `abstractionBand` is shaped by licensing thresholds; it is not measured abstraction, consumption, demand, or a need that should be reduced.
- **Supply:** use this project term for water available for a defined use and planning horizon. Rainfall and river level contribute context but do not establish deployable yield, storage, treatment capacity, transfers, or available supply.
- **Leakage:** use this project term for losses in a defined water network. The registered sources and synthetic file provide no network, input, consumption, pressure, loss, or repair evidence.
- **Water quality:** use this project term for suitability under applicable observations, standards, and authority. The strategy proposal mentions pollution control, but the dataset contains no parameter, sample, source, limit, status, treatment evidence, or incident ground truth.
- **Ecology:** use this project term for environmental conditions and requirements affected by water decisions. A level band against an unspecified normal is not a river flow, ecological limit, protected feature, impact, or permission to trade ecology against another outcome.
- **Drought planning:** use this project term for an authorised plan over stated indicators, horizons, triggers, responsibilities, and affected users. Five fictional monthly rows do not establish drought, a drought stage, or a response.
- **Catchment:** the synthetic file uses four lettered fictional groupings. It supplies no geometry, hydrological connection, station, river reach, water-resource zone, network, source, user, or downstream relationship.

## Organisations and people affected

The Department for Infrastructure publishes river and lough level records. The Met Office publishes regional climate series. The Department of Agriculture, Environment and Rural Affairs publishes abstraction and impoundment licensing requirements. These registered sources have different purposes, spatial units, and time grains; they do not create one operational water dataset, assign responsibility for a future build, or authorise a score, intervention, or action.

Households and communities, public services, agricultural, commercial and industrial water users, abstraction licence holders, water-resource planners, network and treatment operators, hydrologists, ecologists, water-quality professionals, regulators, emergency planners, downstream users, and people responsible for sensitive assets and data could all be affected by future work. This is a project stakeholder map, not evidence that any group has agreed to participate. The registered sources do not establish whose need has priority, who bears restrictions or environmental effects, or who may choose among competing water decisions.

## Source map and access

- **Department for Infrastructure — [DfI Rivers water level network](https://www.infrastructure-ni.gov.uk/articles/dfi-rivers-water-level-network):** open records from a network of river and lough level stations, available through a map viewer and downloads. A recorded level is not river flow, available supply, flood ground truth, ecological condition, or an operating instruction.
- **Met Office — [UK and regional climate series](https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-and-regional-series):** open monthly, seasonal, and annual rainfall, temperature, and sunshine series, including a long-running Northern Ireland rainfall series. Regional monthly rainfall is much coarser than a fictional catchment decision and does not validate the committed values.
- **Department of Agriculture, Environment and Rural Affairs — [Abstraction and impoundment licensing requirements](https://www.daera-ni.gov.uk/articles/abstraction-and-impoundment-licensing-requirements):** open information about when taking water from a river, lough, or borehole must be notified or licensed, including daily volume thresholds and sectors that abstract. A licensing band is not evidence of measured abstraction, demand, available supply, ecological effect, or permission to alter use.

Treat all three as **Real published source** material. Treat the strategy proposal, playbook summary, purpose, preparation, limitations, and caveats as project interpretation. Treat the committed JSON as **Synthetic working data**, never as a real catchment, climate observation, river state, abstraction, water-pressure measure, drought indicator, intervention case, or evidence of impact.

## Synthetic fields

- `id` is a fictional record identifier.
- `catchment` is one of four lettered fictional groupings without geometry, stations, water bodies, networks, users, licences, assets, or upstream and downstream relationships.
- `month` is one of five fictional periods from `2025-03` to `2025-07`. It is too coarse for an hourly event such as flooding and does not provide a historical baseline, seasonality, forecast, or current state.
- `rainfallMm` is an invented monthly total assigned to a fictional catchment, while the registered published rainfall series is regional. It is not observed catchment rainfall or a measure of supply, drought, flooding, or soil condition.
- `riverLevelBand` is an invented category relative to an unspecified normal. It is not a station observation, exact level, flow, supply volume, flood threshold, ecological condition, or quality result.
- `abstractionBand` is an invented daily-volume category shaped by published notification and licensing thresholds. It is not a licence record, measured abstraction, user demand, permitted operating change, or intervention target.

The 20 rows cover four fictional catchments across five spring and summer months, so they have no real spatial coverage and only a short monthly sequence. The file contains no measured demand, deployable supply, storage, transfers, treatment, network, leakage, water quality, ecology, flow, soil condition, forecast, sensor quality, licence identity or status, actual abstraction, affected-user distribution, drought stage, flood or pollution event, intervention effect, or decision ground truth.

## Known unknowns

- The intended outcome, horizon, spatial unit, accountable owner, affected users and environments, and permitted decision are unknown until stated.
- The strategy proposal names flooding, pollution control, and sharing water among users without defining one decision, evidence standard, or planning horizon.
- River levels, regional rainfall, and licensing rules have different meanings, owners, spatial units, and time grains; the registered sources do not establish how they should be joined.
- The fictional catchments have no geometry or relation to published stations, rainfall regions, licences, networks, supply zones, users, ecosystems, or one another.
- Five monthly rows do not establish climatology, seasonality, trend, drought, flood, forecast performance, sensor behaviour, or a current condition.
- Demand, supply, leakage, quality, ecology, and drought planning are undefined for a future direction and cannot be inferred from the three synthetic fields.
- No operational, environmental, regulatory, legal, service-owner, licence-holder, or affected-user authority for an intervention is supplied.
- No intervention catalogue, measured effects, costs, lead times, reversibility, constraints, distributional impacts, or ground truth exists.
- The registered sources do not establish that a score, optimiser, dashboard, data-readiness tool, scenario simulator, planning board, software product, or AI is needed.

## Assumptions to challenge

- A higher synthetic abstraction band is not higher demand, greater water stress, misuse, a regulatory issue, or a reason to curtail anyone.
- Lower fictional rainfall or river-level bands do not identify the biggest problem, a drought stage, unavailable supply, ecological harm, water-quality risk, or an intervention.
- A river level is not a flow, deployable yield, flood impact, ecological requirement, or water-quality measure.
- Regional monthly rainfall cannot be treated as catchment rainfall or normalised against the minimum and maximum in 20 invented rows to create operational meaning.
- Missing leakage or quality evidence cannot be imputed into a score; a visible placeholder is still invented evidence when it affects the result.
- Demand, supply, leakage, quality, ecology, and drought planning have different definitions, constraints, affected groups, and decision authorities and must not become weighted dimensions of one total.
- A transparent score, hard constraint, human review, or fictional intervention effect cannot supply missing authority or evidence.
- A mathematical optimiser can only formalise chosen objectives and assumptions; it cannot choose what should matter or authorise an action.
- Manual source alignment, data-definition work, facilitated decision framing, affected-user research, or deciding not to build may meet the outcome without software or AI.

## Questions before building

- What water outcome is intended, over what horizon and spatial unit, who owns it, and which people and environments are affected?
- Is the work about demand, supply, leakage, quality, ecology, drought planning, flooding, pollution, water sharing, or another decision, and who has authority for that domain?
- How do the responsible source owners define each measure, geography, time grain, freshness, completeness, revision, quality state, and permitted use?
- Which station, rainfall region, catchment, river reach, licence, water-resource zone, supply network, user group, or ecological feature may legitimately be related?
- What evidence establishes measured demand, available supply, losses, quality, ecological requirements, drought conditions, flood or pollution impacts, and intervention ground truth?
- Which outcomes are non-negotiable legal, health, service, or ecological constraints rather than weighted trade-offs?
- Which households, services, licence holders, sectors, communities, downstream users, and ecosystems could bear the cost or benefit of a decision, and how can they participate or challenge it?
- Who may restrict abstraction, change network operation, allocate resources, declare a drought or incident, communicate publicly, or approve another action?
- Could manual source alignment, clearer definitions, facilitated decision framing, monitoring review, affected-user research, or another non-tool direction meet the outcome?
- Where must repository work stop because operational, environmental, regulatory, legal, licence-holder, service-owner, or affected-user authority is unavailable?

## Safety and service constraints

Keep all 20 records visibly labelled **Synthetic working data** and separate from the three real published sources. Preserve the mismatch between station levels, regional monthly rainfall, licensing thresholds, and fictional catchments instead of joining them as though they share a valid operating grain. Do not turn a level into flow, a licensing band into demand, or a monthly value into an event or forecast.

Do not rank catchments, identify a biggest problem, impute absent dimensions, create a composite score, normalise values into pressure, invent weights or thresholds, choose an intervention, estimate its effect, or specify an optimiser from these records. Keep demand, supply, leakage, water quality, ecology, and drought planning distinct. Only accountable operational, environmental, regulatory, legal, service-owner, licence-holder, and affected-user authorities can define those decisions and actions; stop and name the missing authority when requested work crosses that boundary.
