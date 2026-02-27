import { Note, NoteTag, UserProfile } from "./types";

// ─── Tags ─────────────────────────────────────────────────────────────────────

export const TAGS: NoteTag[] = [
  { id: "t1", label: "Patient Care",  color: "#0F7F8E" },
  { id: "t2", label: "Research",      color: "#47B7C2" },
  { id: "t3", label: "Workflow",      color: "#2A9AA8" },
  { id: "t4", label: "Meeting",       color: "#5FAFB8" },
  { id: "t5", label: "Follow-up",     color: "#7CC3CA" },
  { id: "t6", label: "Billing",       color: "#3E6770" },
  { id: "t7", label: "Clinical",      color: "#0C6A78" },
  { id: "t8", label: "Hygiene",       color: "#1A9BAA" },
  { id: "t9", label: "Orthodontics",  color: "#2A7A8A" },
  { id: "t10", label: "Scheduling",   color: "#4EACB5" },
];

// ─── Users ────────────────────────────────────────────────────────────────────

export const USERS: UserProfile[] = [
  {
    id: "u1",
    name: "Dr. Sarah Chen",
    role: "Dentist",
    specialty: "General Practice",
    initials: "SC",
    gradient: ["#0E5663", "#0F7F8E"],
  },
  {
    id: "u2",
    name: "Maria Rodriguez",
    role: "Dental Hygienist",
    specialty: "Periodontal Care",
    initials: "MR",
    gradient: ["#0F7F8E", "#47B7C2"],
  },
  {
    id: "u3",
    name: "James Park",
    role: "Office Manager",
    specialty: "Billing & Scheduling",
    initials: "JP",
    gradient: ["#2A6B78", "#3E9EAD"],
  },
  {
    id: "u4",
    name: "Dr. Michael Torres",
    role: "Orthodontist",
    specialty: "Braces & Aligners",
    initials: "MT",
    gradient: ["#0C5C68", "#1A8A9A"],
  },
];

// ─── Notes per user ───────────────────────────────────────────────────────────

export const notesByUser: Record<string, Note[]> = {
  // Dr. Sarah Chen — Dentist
  u1: [
    {
      id: "u1-n1",
      title: "Treatment Plan",
      patientName: "M. Lawson",
      visitDate: new Date("2026-02-26T09:00:00"),
      content:
        "Patient: M. Lawson, 42F\n\nPresenting concerns:\n• Sensitivity upper-left quadrant (tooth #14)\n• Cosmetic whitening interest\n\nDiagnosis:\n• Moderate caries #14, watch #15\n• Mild generalized gingivitis\n\nProposed treatment:\n1. Composite restoration #14\n2. Scaling & root planing (full mouth)\n3. Whitening tray impressions at follow-up\n\nNext appointment: March 6 – restorations",
      tags: [TAGS[6], TAGS[0]],
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2026-02-20T09:00:00"),
      updatedAt: new Date("2026-02-26T10:15:00"),
    },
    {
      id: "u1-n2",
      title: "Post-Op Notes – Extraction #19",
      patientName: "R. Thompson",
      visitDate: new Date("2026-02-24T14:30:00"),
      content:
        "Patient: R. Thompson, 55M\nProcedure: Surgical extraction, lower-left first molar (#19)\n\nComplications: None. Socket irrigated, collagen plug placed.\n\nPost-op instructions given verbally and via Marea automated letter.\n\nFollow-up: 7 days for socket check. Monitor for dry socket signs.\nPrescribed: Amoxicillin 500mg x7d, Ibuprofen 600mg PRN",
      tags: [TAGS[6], TAGS[4]],
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2026-02-24T14:30:00"),
      updatedAt: new Date("2026-02-24T15:45:00"),
      color: "#E2F7F8",
    },
    {
      id: "u1-n3",
      title: "CE Course Notes – Adhesive Dentistry",
      content:
        "AGD Webinar – Feb 18, 2026\n\nKey takeaways:\n• Universal adhesives outperform multi-step systems in 5-year trials\n• Self-etch protocol preferred for MDP-containing primers\n• Bulk-fill composites viable up to 4mm in Class I/II restorations\n• Light-curing tip distance: keep under 2mm for adequate polymerization\n\nProducts to evaluate: Scotchbond Universal Plus, Filtek One Bulk Fill",
      tags: [TAGS[1]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-18T20:00:00"),
      updatedAt: new Date("2026-02-19T08:00:00"),
    },
    {
      id: "u1-n4",
      title: "Staff Huddle – Feb 25 Action Items",
      content:
        "From today's team huddle:\n\n• Sarah: review new consent form template before Friday\n• All: update Dentrix profiles to include emergency contact fields\n• James handling scheduling overflow for March spring break week\n• Maria to pilot the new prophy protocol on 5 patients next week\n\nNext huddle: March 4, 8:00 AM",
      tags: [TAGS[3]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-25T09:30:00"),
      updatedAt: new Date("2026-02-25T09:45:00"),
    },
    {
      id: "u1-n5",
      title: "Implant Referral Protocol",
      content:
        "Updated referral steps for implant cases:\n\n1. Confirm bone density via CBCT (order through Imaging Center on 5th)\n2. Refer to Dr. Nguyen (oral surgeon) – fax: 604-555-0192\n3. Send Marea automated pre-referral letter to patient\n4. Schedule 3-month post-implant crown prep in Dentrix\n\nNote: insurance pre-auth must be obtained before referral for Delta and Sunlife patients.",
      tags: [TAGS[2], TAGS[6]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-10T11:00:00"),
      updatedAt: new Date("2026-02-21T16:00:00"),
    },
    {
      id: "u1-n6",
      title: "Archive: Old Consent Form v2",
      content: "Superseded by v3 signed off Feb 2026. Kept for audit trail only.",
      tags: [],
      isPinned: false,
      isArchived: true,
      createdAt: new Date("2025-06-01T00:00:00"),
      updatedAt: new Date("2026-02-01T00:00:00"),
    },
  ],

  // Maria Rodriguez — Dental Hygienist
  u2: [
    {
      id: "u2-n1",
      title: "Periodontal Protocol – High-Risk Patients",
      content:
        "Updated prophy protocol for patients with 4mm+ pockets:\n\n• Use Gracey 11/12, 13/14 curettes for posterior interproximal\n• Irrigate with 0.12% chlorhexidine post-scaling\n• Document BOP % and recession measurements at each visit\n• Recall interval: 3 months (not 6) – confirm with Dr. Chen\n\nPatients currently on 3-month recall: Lawson, Thompson, Patel, Kim",
      tags: [TAGS[7], TAGS[0]],
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2026-02-15T08:00:00"),
      updatedAt: new Date("2026-02-26T09:00:00"),
    },
    {
      id: "u2-n2",
      title: "Patient Ed – Flossing Technique Reminders",
      content:
        "Talking points I use during appointments:\n\n• C-shape around each tooth, not just snapping down\n• 18\" of floss, fresh section per tooth\n• Floss threaders for bridges and implants\n• Consider water flosser for patients with limited dexterity\n\nFor kids: colored floss picks work well, build habit before technique perfection\n\nMarea letter template #7 covers this – attach to post-visit summary.",
      tags: [TAGS[0], TAGS[7]],
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2026-02-12T10:00:00"),
      updatedAt: new Date("2026-02-23T14:00:00"),
      color: "#E2F7F8",
    },
    {
      id: "u2-n3",
      title: "Instrument Sterilization Checklist",
      content:
        "End-of-day sterilization protocol:\n\n□ Ultrasonic cleaner: 10 min cycle, check solution turbidity\n□ Cassettes sealed and labeled with date + cycle #\n□ Autoclave: 134°C, 18 min, spore test every Monday\n□ Log autoclave readings in binder (shelf in back room)\n□ Handpieces: lubricate before bagging\n\nBiological indicator results submitted to Dr. Chen monthly.",
      tags: [TAGS[2], TAGS[7]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-01-20T08:00:00"),
      updatedAt: new Date("2026-02-10T08:30:00"),
    },
    {
      id: "u2-n4",
      title: "Tobacco Cessation Resources",
      content:
        "Resources to share with patients who smoke:\n\n• Health Canada Quit Line: 1-866-366-3667\n• SmokersHelpline.ca – online chat support\n• Nicotine replacement: patch, gum, lozenge (OTC)\n\nBrief intervention script:\n'Your gum health is significantly affected by smoking. Have you ever thought about quitting? There are some great free resources I can share with you today.'\n\nDocument counseling in chart notes.",
      tags: [TAGS[0], TAGS[1]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-05T09:00:00"),
      updatedAt: new Date("2026-02-05T09:30:00"),
    },
    {
      id: "u2-n5",
      title: "CE Notes – Oral-Systemic Link Seminar",
      content:
        "BC Dental Hygienists Association – Feb 14 Seminar\n\nKey points:\n• Periodontal bacteria (P. gingivalis) linked to cardiovascular inflammation markers\n• Diabetic patients: HbA1c improves with consistent perio treatment\n• Preterm birth risk elevated with untreated periodontitis – flag OB patients\n• New evidence: Alzheimer's association with chronic oral infection\n\nAction: update medical history intake form to flag diabetes, CVD, pregnancy.",
      tags: [TAGS[1], TAGS[7]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-14T17:00:00"),
      updatedAt: new Date("2026-02-15T08:00:00"),
    },
  ],

  // James Park — Office Manager
  u3: [
    {
      id: "u3-n1",
      title: "Insurance Pre-Auth Tracker – March",
      content:
        "Outstanding pre-authorizations to follow up on:\n\n• Lawson – implant crown (Delta Dental) – submitted Feb 10, no response\n• Kim – orthodontic consult (Sunlife) – approved, forwarded to Dr. Torres\n• Patel – full mouth X-rays (Great-West) – pending, call if no response by Mar 3\n• Thompson – bone graft (Manulife) – rejected, appeal drafted\n\nMarea auto-sends patient notifications when auth status changes.",
      tags: [TAGS[5], TAGS[2]],
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2026-02-26T08:00:00"),
      updatedAt: new Date("2026-02-26T11:00:00"),
    },
    {
      id: "u3-n2",
      title: "March Scheduling – Spring Break Coverage",
      content:
        "Spring break week: March 16–21\n\nDr. Chen: available Mon–Wed, off Thu–Fri\nMaria: full week available\nDr. Torres: out all week (conference)\n\nActions:\n• Block Torres' chair for that week in Dentrix\n• Offer rescheduling to 12 affected ortho patients via Marea recall\n• James to cover front desk Mon + Tue, temp staff Wed–Fri\n\nConfirm temp agency booking by March 1.",
      tags: [TAGS[9], TAGS[3]],
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2026-02-22T09:00:00"),
      updatedAt: new Date("2026-02-25T10:30:00"),
      color: "#E2F7F8",
    },
    {
      id: "u3-n3",
      title: "Billing: Month-End Reconciliation Checklist",
      content:
        "Month-end process (run last business day):\n\n1. Export day sheets from Dentrix – verify against POS totals\n2. Submit outstanding claims via CDAnet (check for stuck batches)\n3. Run aging report – follow up on 90+ day balances\n4. Print EOB summary for Dr. Chen's review\n5. Reconcile Visa/Mastercard terminal with bookkeeper\n6. Archive in Google Drive: Billing > 2026 > [Month]\n\nMarea billing module generates draft letters for 60-day overdue accounts automatically.",
      tags: [TAGS[5], TAGS[2]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-01-31T16:00:00"),
      updatedAt: new Date("2026-02-24T09:00:00"),
    },
    {
      id: "u3-n4",
      title: "New Patient Intake Workflow",
      content:
        "Updated process as of Feb 2026 (Marea integration):\n\n1. AI receptionist collects: name, DOB, insurance ID, chief complaint\n2. Auto-creates patient record in Dentrix via sync\n3. Sends digital intake form link 24h before appointment\n4. Front desk reviews completed form on arrival\n5. Manual step: verify insurance eligibility in carrier portal\n\nAverage intake time reduced from 18 min → 6 min since rollout.",
      tags: [TAGS[2], TAGS[0]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-03T10:00:00"),
      updatedAt: new Date("2026-02-20T14:00:00"),
    },
    {
      id: "u3-n5",
      title: "Staff Meeting – Feb 25",
      content:
        "Attendees: Dr. Chen, Maria, James, Dr. Torres (remote)\n\nDiscussed:\n• Q1 revenue tracking – on target (+4% vs Q1 2025)\n• Marea AI receptionist handling ~82% of inbound calls without human handoff\n• Phone tag complaints down significantly per patient survey\n• New parking validation process starts March 1\n\nAction items for James:\n– Order supplies: prophy paste, disposable bibs (running low)\n– Send updated fee guide to patients' insurance on file",
      tags: [TAGS[3]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-25T09:30:00"),
      updatedAt: new Date("2026-02-25T10:00:00"),
    },
  ],

  // Dr. Michael Torres — Orthodontist
  u4: [
    {
      id: "u4-n1",
      title: "Active Cases – Aligner Progress Review",
      content:
        "Reviewing progress as of Feb 2026:\n\n• Kim, J. (14F) – Invisalign, tray 18/32. On track. Mild attachment detachment #7, rebonded.\n• Singh, P. (22M) – Invisalign, tray 6/28. Wearing compliance concern – discuss at next visit.\n• Walker, T. (35F) – Spark aligners, tray 12/20. Excellent progress, space closure complete.\n• Pham, L. (11M) – Phase 1, expander. Suture opening confirmed on CBCT. On to Phase 2 planning.\n\nAll progress photos uploaded to chart.",
      tags: [TAGS[8], TAGS[0]],
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2026-02-24T10:00:00"),
      updatedAt: new Date("2026-02-26T09:30:00"),
    },
    {
      id: "u4-n2",
      title: "Lab Order Tracking – March",
      content:
        "Outstanding lab orders:\n\n• Singh retainer (upper Hawley) – ordered Feb 21, expected Mar 3 via OrthoCast\n• Walker final refinement trays – submitted STL Feb 24, Align ETA 10 business days\n• Pham Phase 2 study models – impressions taken, sending to Ortholab West tomorrow\n\nReminder: lab turnaround times are running 2–3 days longer than usual – build buffer into scheduling.",
      tags: [TAGS[8], TAGS[2]],
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2026-02-25T11:00:00"),
      updatedAt: new Date("2026-02-26T08:45:00"),
      color: "#E2F7F8",
    },
    {
      id: "u4-n3",
      title: "AAO Conference Notes – Feb 2026",
      content:
        "American Association of Orthodontists – Interim Meeting\n\nSessions attended:\n• Digital workflow: iTero integration with treatment software (takeaway: Element 5D worth trialing)\n• TAD placement update: palatal TADs show better stability than buccal in vertical cases\n• AI case planning tools: demo of Dolphin AI – promising but needs more validation data\n• Retention protocols: research favors fixed lower retainer + clear overlay for most cases\n\nWill bring full summary to March team meeting.",
      tags: [TAGS[1], TAGS[8]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-17T20:00:00"),
      updatedAt: new Date("2026-02-18T09:00:00"),
    },
    {
      id: "u4-n4",
      title: "Phase 1 Treatment Criteria – Reference",
      content:
        "When to recommend Phase 1 (interceptive) treatment:\n\n✓ Posterior crossbite with functional shift\n✓ Anterior crossbite affecting growth pattern\n✓ Severe crowding with arch length discrepancy >8mm\n✓ Class III skeletal tendency (early facemask candidate)\n✓ Habit correction (thumb, tongue thrust) requiring appliance\n\nNot indicated for:\n✗ Mild crowding in deciduous/mixed dentition\n✗ Purely aesthetic concerns before permanent dentition\n\nDiscuss timing with Dr. Chen for referred patients.",
      tags: [TAGS[8], TAGS[6]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-01-15T00:00:00"),
      updatedAt: new Date("2026-02-10T00:00:00"),
    },
    {
      id: "u4-n5",
      title: "Aligner Compliance Follow-up",
      patientName: "P. Singh",
      visitDate: new Date("2026-02-20T15:00:00"),
      content:
        "P. Singh, 22M – Invisalign compliance issue\n\nContext: At tray 6 check, noticeable tracking lag on lower anteriors. Patient admitted wearing 12–14 hrs/day instead of 22.\n\nActions taken:\n• Discussed importance of wear time and consequences for treatment length\n• Showed tracking comparison photos – patient seemed motivated\n• Set Marea automated 2-week check-in SMS to encourage compliance\n• If no improvement by tray 9, may need refinements\n\nFollow-up appointment: March 12",
      tags: [TAGS[4], TAGS[0]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2026-02-20T15:00:00"),
      updatedAt: new Date("2026-02-20T15:30:00"),
    },
  ],
};
