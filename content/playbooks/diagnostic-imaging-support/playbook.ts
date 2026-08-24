import { definePlaybook } from "@/lib/playbooks/define-playbook"

import { strategyDraftReference, strategyDraftUrl } from "../strategy-draft"

export const diagnosticImagingSupport = definePlaybook({
  schemaVersion: 3,
  slug: "diagnostic-imaging-support",
  title: "Diagnostic Imaging Support",
  summary:
    "Explore what it would take to support a reporting clinician deciding which scan to read next, without creating an irresponsible stand-in dataset.",
  sector: "Health",
  strategyExample: {
    proposal:
      "The draft strategy names AI-based analysis of medical images as a potential public-service application: support for spotting fractures, cancers, and strokes in scans, with no clinical dataset or safety work attached to the suggestion.",
    draftReference: strategyDraftReference,
    url: strategyDraftUrl,
  },
  dataSources: [
    {
      id: "doh-diagnostic-waiting-times",
      publisher: "Department of Health",
      title: "Diagnostic waiting times",
      url: "https://www.health-ni.gov.uk/articles/diagnostic-waiting-times",
      covers:
        "How many people are waiting for a diagnostic test in Northern Ireland, how long they have waited, and how long reporting turnaround takes at each health and social care trust.",
      access: "open",
      relevance:
        "It is the closest published figure to the pressure this example is meant to relieve, and it counts people and weeks rather than describing a single image.",
    },
    {
      id: "doh-hospital-waiting-times",
      publisher: "Department of Health",
      title: "Hospital waiting times statistics",
      url: "https://www.health-ni.gov.uk/topics/hospital-waiting-times-statistics",
      covers:
        "Quarterly outpatient, inpatient, diagnostic, and cancer waiting figures broken down by trust and by length of wait.",
      access: "open",
      relevance:
        "It shows what is publicly available around imaging services and, by omission, that no image and no report ever leaves the clinical record.",
    },
  ],
  syntheticData: {
    status: "not-responsible",
    reason:
      "A scan cannot be honestly stood in for by a file of invented numbers, and every tabular stand-in we sketched for this task drifted towards describing individual patients rather than groups.",
    whatContributorsNeed:
      "Anyone taking this further needs a partner radiology service and access to a real imaging archive under formal clinical-research governance, with a named sponsor, ethics approval, and reporting clinicians involved from the start.",
  },
  caveats: [
    {
      title: "Image errors change patient care",
      detail:
        "Missing a finding, or marking one that is not there, changes what happens to a patient, so nothing on this page should be read as a claim that image analysis is safe to use in care.",
    },
    {
      title: "Published collections may not transfer",
      detail:
        "Openly published imaging collections come from other populations, other scanners, and other working practices, so how a system behaved on them says little about how it would behave here.",
    },
    {
      title: "Visual support can misdirect attention",
      detail:
        "A confident outline drawn on a scan can pull a clinician's eye to the wrong place, which makes the support itself a source of harm rather than only a missed benefit.",
    },
  ],
  lastReviewed: "2026-08-21",
})
