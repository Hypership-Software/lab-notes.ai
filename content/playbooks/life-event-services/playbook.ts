import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const lifeEventServices = definePlaybook({
  schemaVersion: 2,
  slug: "life-event-services",
  title: "Joined-up Support after a Life Event",
  summary:
    "Follow the steps someone actually has to take after a death, and show that nothing published says where in that sequence people get stuck.",
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
    method:
      "Sixteen invented rows written by hand, following the one journey the published guidance sets out, each step carrying an invented median number of days and an invented band for how many people do not complete it; the file covers a single life event because that is the journey the cited guidance describes.",
    limitations: [
      "The days and the drop-off bands are invented and no published source measures either, so the most interesting numbers in this file are the least trustworthy.",
      "A tidy sequence is not what a bereavement is: grief, disputes about who has authority, complicated estates, and accessibility needs all decide the real order.",
      "Naming a step says nothing about whether anyone had the authority to take it, which is the part that would matter most.",
    ],
  },
  demo: {
    status: "not-yet",
    note: "A demo could lay out the published steps as a checklist a person ticks off themselves, with no notification sent anywhere, but nobody has built that here yet.",
  },
  caveats: [
    "A bereavement record ties together identity, family, money, health, property, and legal circumstances across services, so joining them up is the risk as much as the benefit.",
    "Notifying a service too early, or without the authority to do it, causes distress, loss, or exposure to fraud at the worst possible time.",
    "A wrong match can disclose a death, or someone's private circumstances, to the wrong party.",
    "Most of the difficulty here is service design, consent, and systems talking to each other rather than anything a model does, and a checklist a person can follow would have to work first.",
  ],
  lastReviewed: "2026-08-21",
})
