import type { CorpusStance, CorpusTheme } from "./types"

/**
 * How a respondent positions their view. One of these opens each document.
 *
 * Constraint: every framing, for all four stances, must be able to take an
 * interrogative complement ("whether X", "what X", "how X") as its object,
 * because that is how every entry in `themeSubjects` is phrased. A framing
 * that instead demands a declarative complement (e.g. "...because X did
 * happen", "...and said X was true") will read as ungrammatical once
 * concatenated with a `themeSubjects` entry. This has already broken twice:
 * once for `critical` (verbs like "objected... because", "argued") and once
 * for `supportive`/`mixed` (verbs like "said", "added", "noting",
 * "observing" that take a declarative, not interrogative, complement).
 * `generate-synthetic-corpus.test.ts` has a regression test asserting this
 * across the whole generated corpus — keep it passing.
 */
export const stanceFraming: Record<CorpusStance, readonly string[]> = {
  supportive: [
    "Respondents supported the proposal but wanted clarity on",
    "There was broad agreement, though respondents queried",
    "Several responses welcomed the direction and sought detail on",
    "Respondents agreed with the aim, while questioning",
  ],
  critical: [
    "Respondents objected that the proposal never says",
    "A number of responses said the proposal fails to explain",
    "Several responses disagreed, and questioned",
    "Respondents challenged the approach for not addressing",
  ],
  mixed: [
    "Responses were divided over",
    "Respondents supported the aim but were split on",
    "Views differed on",
    "Respondents accepted parts of the proposal while disputing",
  ],
  uncertain: [
    "Respondents were unsure and asked",
    "Several responses said it was not yet clear",
    "Respondents sought clarification about",
    "A number of responses said they could not judge",
  ],
}

/** What each theme is about. Subject matter only, never a position on it. */
export const themeSubjects: Record<CorpusTheme, readonly string[]> = {
  "access-to-services": [
    "how people without reliable internet access would be supported",
    "whether a single point of contact would reduce repeated form filling",
    "how someone would reach a person rather than an automated channel",
    "what happens when an application is refused and needs review",
    "how the change would affect people who need help in another language",
    "whether opening hours match when people can actually seek help",
  ],
  "workforce-capability": [
    "what training frontline staff would receive before any change",
    "whether existing teams have the time to take on new duties",
    "how specialist knowledge would be retained as roles change",
    "who would be accountable when guidance and practice disagree",
    "whether staff can override an automated recommendation",
    "how new processes would be tested with the people who use them",
  ],
  "data-governance": [
    "which information would be kept and for how long",
    "whether the lawful basis for reuse has been established",
    "how people would be told what is held about them",
    "who inside an organisation would be able to see a record",
    "how information would be corrected once an error is found",
    "whether data would be shared beyond the original purpose",
  ],
  accountability: [
    "who is answerable when an outcome is disputed",
    "how a decision could be explained to the person affected",
    "what record would exist of how a conclusion was reached",
    "how a complaint would be escalated and resolved",
    "whether published reporting would show what actually happened",
    "how an independent review could examine the process",
  ],
  "procurement-and-reuse": [
    "whether the work could be reused by other public bodies",
    "how dependence on a single supplier would be avoided",
    "what happens to the service if a contract ends",
    "whether smaller organisations could realistically bid",
    "how much of the work would remain publicly owned",
    "whether existing tools were assessed before new ones were bought",
  ],
  "environmental-cost": [
    "what the running cost would be once the service is in use",
    "whether the environmental impact was assessed alongside the benefit",
    "how the approach compares with a simpler alternative",
    "whether the change would reduce or increase overall demand",
    "how energy use would be reported over time",
    "whether a less resource-intensive option was considered",
  ],
}

/**
 * Sentence shapes per theme. `{framing}` takes a stance opener and `{subject}`
 * takes theme subject matter, so a document reads as one consultation remark.
 */
export const themeTemplates: Record<CorpusTheme, readonly string[]> = {
  "access-to-services": [
    "{framing} {subject}, and asked for this to be set out before any change begins.",
    "{framing} {subject}. They wanted assurance that no one would be left without a route in.",
    "{framing} {subject}, particularly for people who already find the system hard to use.",
    "{framing} {subject}, and suggested the point be tested with people who rely on the service.",
  ],
  "workforce-capability": [
    "{framing} {subject}, and asked that it be resolved before responsibilities move.",
    "{framing} {subject}. They noted that goodwill is not a substitute for capacity.",
    "{framing} {subject}, and asked how success would be judged in practice.",
    "{framing} {subject}, and suggested involving staff in the design rather than the rollout.",
  ],
  "data-governance": [
    "{framing} {subject}, and asked for the position to be published rather than assumed.",
    "{framing} {subject}. They wanted this settled before any information is collected.",
    "{framing} {subject}, and asked who would check that the rule is actually followed.",
    "{framing} {subject}, noting that a privacy notice is not the same as a safeguard.",
  ],
  accountability: [
    "{framing} {subject}, and asked that the answer be written down and made public.",
    "{framing} {subject}. They said responsibility should rest with a named role.",
    "{framing} {subject}, and asked what an affected person could do to challenge it.",
    "{framing} {subject}, and warned that unclear ownership tends to surface only after a failure.",
  ],
  "procurement-and-reuse": [
    "{framing} {subject}, and asked for the reasoning to be published with the decision.",
    "{framing} {subject}. They said lock-in is easier to create than to undo.",
    "{framing} {subject}, and asked whether the same need could be met with existing tools.",
    "{framing} {subject}, and suggested the terms be written to allow reuse from the start.",
  ],
  "environmental-cost": [
    "{framing} {subject}, and asked for the figures to be reported openly.",
    "{framing} {subject}. They said the comparison should include doing less, not only doing more.",
    "{framing} {subject}, and asked how the cost would be reviewed once in service.",
    "{framing} {subject}, and noted that a benefit case should carry its own running cost.",
  ],
}
