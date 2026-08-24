import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const lifeEventServices = definePlaybook({
  schemaVersion: 3,
  slug: "life-event-services",
  title: "Joined-up Support after a Life Event",
  summary:
    "Explore the fragmented steps people face after a bereavement and where a joined-up service would need stronger evidence.",
  sector: "Citizen services",
  strategyExample: {
    proposal:
      "The draft strategy names linked citizen services after a bereavement as a potential public-service application, notifying the relevant services so that someone has less to do at a hard time, without saying who authorises each notification, what gets shared, or how a mistake is put right.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "nidirect-who-to-tell-about-a-death",
      publisher: "nidirect",
      title: "Who to tell about a death",
      url: "https://www.nidirect.gov.uk/articles/who-tell-about-death",
      covers:
        "The published guidance on what has to be done after a death in Northern Ireland: telling the family doctor, registering the death with the district registrar, finding the will, arranging the funeral, reporting the death to the Bereavement Service, and then the long list of tax, rates, vehicle, council, bank, pension, and utility contacts a person makes themselves.",
      access: "open",
      relevance:
        "It is where this playbook's journey steps come from, in the order the guidance gives them, and the fact that most of them are separate contacts is the problem the strategy's example is pointing at.",
    },
    {
      id: "nisra-registrar-general-quarterly-report",
      publisher: "Northern Ireland Statistics and Research Agency",
      title: "Registrar General Quarterly Report",
      url: "https://www.nisra.gov.uk/statistics/births-deaths-and-marriages/registrar-general-quarterly-report",
      covers:
        "Provisional counts of life event registrations in Northern Ireland — births, deaths, stillbirths, marriages, and civil partnerships — for each three-month period.",
      access: "open",
      relevance:
        "It is the only published measure of how many people are going through this journey, and it counts registrations rather than journeys, which is why nothing published says where anyone gets stuck.",
    },
  ],
  syntheticData: {
    status: "available",
    dataPath: "content/playbooks/life-event-services/life-event-services.data.json",
    purpose:
      "Use 16 synthetic journey steps to explore where delays or drop-off might occur after a bereavement.",
    preparation:
      "AI authored fictional timings and completion bands around the sequence described in published nidirect guidance.",
    limitations: [
      "The days and drop-off bands are invented because no published source measures either figure.",
      "A tidy sequence cannot represent grief, disputed authority, complicated estates, or accessibility needs.",
      "A named step does not establish that anyone has authority to complete it.",
    ],
  },
  caveats: [
    {
      title: "Joining records creates risk",
      detail:
        "Bereavement can connect identity, family, money, health, property, and legal circumstances across services.",
    },
    {
      title: "Authority comes first",
      detail:
        "A notification sent too early or without authority can cause distress, loss, or fraud exposure.",
    },
    {
      title: "Matching errors disclose private information",
      detail: "A wrong match can reveal a death or private circumstances to the wrong party.",
    },
    {
      title: "Service design may be the real intervention",
      detail:
        "Consent, accessible journeys, and systems working together matter before any model is considered.",
    },
  ],
  lastReviewed: "2026-08-21",
})
