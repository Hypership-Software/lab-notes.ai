# Traffic Flow Management — domain brief

## Domain vocabulary

- **Traffic monitoring:** use this project term for observing a defined transport measure at a stated place and time. The annual traffic census publishes vehicle counts and variation; a count does not by itself establish congestion, delay, cause, capacity, or a suitable intervention.
- **Travel pattern:** the Travel Survey for Northern Ireland reports how and why people travel across modes at a broad regional and multi-year grain. It does not supply junction-level behaviour or signal-control evidence.
- **Modelling:** use this project term for estimating a future or counterfactual outcome under explicit assumptions. The registered sources and synthetic table contain no validated traffic model or outcome ground truth.
- **Control:** use this project term for changing a signal or another approved operating plan. Counts are not controller state, and this repository has no control authority, safety timings, or approved signal plan.
- **Displacement:** use this project term for moving traffic, delay, risk, emissions, or another burden to a different time, street, junction, mode, or group. Four fictional junctions without network relationships cannot show displacement.
- **Public-realm outcome:** use this project term for how a transport decision affects people's ability to cross, move through, use, or spend time in a place. The synthetic file contains no pedestrian, accessibility, place, noise, safety, or lived-experience measure.
- **Optimisation objective:** the outcome and trade-offs an accountable body chooses to value. The registered sources do not authorise a weighting among vehicle flow, buses, cycling, walking, safety, accessibility, displacement, emissions, or public-realm effects.

## Organisations and people affected

The Department for Infrastructure publishes both registered sources. The annual traffic report describes automatic and manual vehicle counts and variation in traffic flow. The Travel Survey describes how and why people travel at a broader regional and multi-year grain. These sources provide public context; they do not assign responsibility for a future build, define an optimisation objective, or authorise a junction, model, control plan, or signal change.

People walking or wheeling, cyclists, bus passengers and drivers, people in private vehicles, freight and servicing workers, emergency services, residents and businesses on nearby streets, people with accessibility needs, transport-control operators, signal engineers, road-safety professionals, equality specialists, and public-realm decision-makers could all be affected by future work. This is a project stakeholder map, not evidence that any group has agreed to participate. The registered sources do not establish whose outcomes count, who may accept a trade-off, or how affected people can challenge an optimisation.

## Source map and access

- **Department for Infrastructure — [Traffic and travel information, incorporating the annual traffic census](https://www.infrastructure-ni.gov.uk/publications/traffic-and-travel-information-incorporating-annual-traffic-census-and-variations-traffic-flow):** open annual reporting that combines automatic and manual traffic counts by vehicle type with figures about how flows vary through the day and year. It provides published count context, not a junction's capacity, queue, delay, crossing demand, network relationship, controller state, signal plan, or evidence of an intervention's effect.
- **Department for Infrastructure — [Travel Survey for Northern Ireland](https://www.infrastructure-ni.gov.uk/articles/travel-survey-northern-ireland-latest-publications):** open household-survey reporting about how and why people travel by car, bus, walking, and cycling, normally combining three years of responses for sample size. Its broad grain cannot validate the synthetic junction-and-hour bus and cycle shares or support a signal decision.

Treat both as **Real published source** material. Treat the strategy proposal, playbook summary, purpose, preparation, limitations, and caveats as project interpretation. Treat the committed JSON as **Synthetic working data**, never as a real count, junction, congestion measure, network comparison, model input, control result, or evidence of benefit.

## Synthetic fields

- `id` is a fictional record identifier.
- `junction` is one of four numbered fictional groups. It is not a real location and supplies no coordinates, approaches, lanes, corridor, neighbouring junctions, crossings, or affected streets.
- `hourBand` is one of five broad time bands. The file supplies no date, day type, year, sampling duration, sequence, recurrence, or relation to an incident or event.
- `vehicleCount` is an invented count for one junction and band. It does not measure capacity, queue, speed, delay, occupancy, journey purpose, passenger numbers, or congestion.
- `busShare` is an invented percentage of counted vehicles, not bus-passenger share, service reliability, occupancy, delay, or priority need.
- `cycleShare` is an invented percentage of counted vehicles, not the number of people who would cycle under different conditions or a measure of safety, delay, comfort, or unmet demand.

The 20 rows cover four fictional numbered junctions and the same five broad time bands, so they have no real spatial coverage and no time series. The file contains no pedestrians, crossings, passenger numbers, accessibility needs, turns, approaches, lanes, speeds, queues, capacity, signal stages, controller state, incidents, roadworks, events, weather, collisions, detector quality, adjacent streets, downstream effects, public-realm evidence, displacement measure, or intervention ground truth.

## Known unknowns

- The intended outcome, spatial and temporal scope, accountable owner, affected groups, and permitted decision are unknown until stated.
- The strategy proposal does not name a network or define what congestion prediction, signal optimisation, or a safety breach means.
- The annual census and travel survey have different spatial and temporal grains; neither registered source supplies this fictional junction-level combination.
- The numbered junctions have no location, geometry, approach, crossing, signal, corridor, neighbouring link, or network relationship.
- Five broad bands without dates do not establish a profile, peak, baseline, trend, seasonality, forecast horizon, or current traffic state.
- Vehicle counts and vehicle shares omit pedestrians and do not measure people moved, delay, capacity, queues, passenger loads, accessibility, journey purpose, safety, or public-realm experience.
- No approved signal plans, controller state, safety timings, fallback state, operator procedure, model, simulation, objective, weight, target, or control authority is supplied.
- Effects on adjacent streets, other junctions, different modes and groups, emissions, emergency access, or the public realm are not measured, so displacement and distributional effects are unknown.
- The registered sources do not establish that a dashboard, forecast, optimiser, recommendation tool, scenario lab, controller interface, software product, or AI is needed.

## Assumptions to challenge

- A larger fictional vehicle count does not identify congestion, delay, capacity pressure, a better optimisation site, or a higher public priority.
- A bus or cycle percentage of vehicles does not measure people, accessibility, unmet demand, safety, comfort, reliability, or who should receive priority.
- Summing five unrelated fictional bands does not create an annual, daily, peak, or representative junction total.
- Four numbered junctions are not a network and cannot reveal queue spillback, route choice, boundary effects, or displaced burden.
- Reducing average vehicle delay would not establish a public benefit if waits, risk, traffic, or loss of place quality move to another mode, group, street, or time.
- An explainable objective or human approval cannot supply missing evidence, safety constraints, public authority, or agreement from affected people.
- A shadow recommendation is still a prescribed control proposition and needs a legitimate objective and authority before it is designed.
- Monitoring, modelling, recommendation, and control are not successive stages that this repository may assume should all be built.
- Manual count review, travel-behaviour research, facilitated objective-setting, public-realm inquiry, or deciding not to build may meet the outcome without software or AI.

## Questions before building

- What outcome is intended, at which place and time, who owns it, and what published evidence shows the need?
- Who travels through, lives near, works in, or is otherwise affected by the place, whose outcomes are absent from existing measures, and who may define or challenge the trade-offs?
- Is the work about monitoring, modelling, recommendation, control, displacement, or public-realm outcomes, and who has authority for that activity?
- Which real counts, modes, people, locations, dates, day types, sampling methods, quality controls, network relationships, and contextual events are authoritative?
- What evidence defines capacity, congestion, delay, safety, accessibility, emissions, public-realm quality, and an acceptable distribution of effects?
- Which adjacent streets, junctions, times, modes, and groups could receive displaced traffic or burden, and how would that be observed?
- Who may define an optimisation objective, weights, constraints, targets, fallback conditions, signal plans, and evaluation criteria?
- Which transport, safety, accessibility, equality, community, legal, security, operator, and infrastructure authorities must shape or stop the work?
- Could manual review, better count coverage, facilitated objective-setting, travel-behaviour research, public-realm inquiry, or another non-tool direction meet the outcome?
- Where must repository work stop because real network evidence, affected-group participation, or accountable control authority is unavailable?

## Safety and service constraints

Keep all 20 records visibly labelled **Synthetic working data** and separate from the two real published sources. Do not attach a fictional junction to a real place, treat the five bands as a time series, fill missing modes or network relationships, or claim that a count shows congestion, capacity, delay, safety, or an opportunity to optimise.

Do not rank or select junctions, invent objectives, weights, targets, constraints, plans, timings, forecasts, simulations, recommendations, signal changes, or rollback rules from the synthetic data. Keep monitoring, modelling, control, displacement, and public-realm outcomes distinct. Ask who is affected before any optimisation direction is explored. Only accountable transport and infrastructure authorities, with affected-group participation and authorised evidence, can define and act on those decisions; stop and name the missing authority when requested work crosses that boundary.
