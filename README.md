# SA Tender Academy — 90-Day Study Programme

A structured, self-paced apprenticeship that turns you into a **tender-response specialist** for South African public procurement, with a strong construction/contractor track.

> 📱 **Study anywhere:** this repository is also a self-contained web app. See [Study app](#0-study-app) below.

---

## 0. Study app

The whole programme is wrapped in a zero-dependency web app you can host for free and use on a phone, tablet or laptop — online or offline.

**Features**
- All 13 lessons, the Tender Bible and the programme overview, rendered and searchable
- Full-text search across every lesson and template (press `/`)
- Progress tracking, per-lesson notes and tickable checklists (saved in your browser)
- A **tender log** with the volume targets built in (40–60 packs; 20 before your first client, 10 of them construction) and CSV/JSON export
- All 10 templates — preview, copy to clipboard or download
- Every AI drill prompt in one place, with the five ground rules pinned
- The complete official resource library with the 2026 regulatory-transition warning
- Dark mode, printable lessons, installable as a PWA, works fully offline

**Run it locally**

```bash
python3 -m http.server 8080      # then open http://localhost:8080
```

Opening `index.html` directly from the file system also works (the offline service worker is simply skipped).

**Host it on GitHub Pages**

**Settings → Pages → Source: *Deploy from a branch* → branch `master`, folder `/ (root)` → Save.**

That is all that is required — the app is plain static files and `.nojekyll` is already committed, so Pages serves everything verbatim.

*Optional:* if you would rather have `content.js` rebuilt automatically on every push, add a GitHub Actions workflow that runs `python3 build.py` and publishes with `actions/upload-pages-artifact`, then switch the Pages source to *GitHub Actions*. (Creating workflow files requires a token with the `workflow` scope, so add it through the GitHub web UI.) It is not needed for normal use — just run `python3 build.py` before you commit.

Your site will be at `https://mokhethinyaps.github.io/sa-tender-academy/`. Open it once on your phone and use **Add to Home Screen** for an offline, app-like copy.

**Editing the material**

The markdown files remain the single source of truth. After editing any lesson, template or the Tender Bible:

```bash
python3 build.py     # regenerates content.js
```

| File | Purpose |
|---|---|
| `index.html` | App shell |
| `styles.css` | Styling, dark mode, print and responsive rules |
| `app.js` | Router, markdown renderer, search, progress, tracker |
| `build.py` | Bundles the markdown/CSV sources into `content.js` |
| `content.js` | Generated — do not edit by hand |
| `sw.js`, `manifest.webmanifest` | Offline support and PWA install |

---

## 1. What this programme is (and is not)

**You are training to own this pipeline:**

> finding opportunities → determining eligibility → extracting requirements → organising evidence → drafting strong responses → checking compliance → packaging the submission

**You are NOT training to become** an engineer, quantity surveyor, attorney or procurement official. Design, professional sign-off and final pricing stay with qualified people. Your value is translating their expertise into an *evaluable* tender response.

---

## 2. The graduation standard (test yourself at Day 90)

Someone hands you a tender pack you have never seen. Within **60–90 minutes** you can answer, with a document reference for every answer:

| # | Question |
|---|---|
| 1 | What is being procured? |
| 2 | Who qualifies? |
| 3 | Does this client qualify? |
| 4 | What will automatically disqualify them? |
| 5 | What is scored? |
| 6 | How is it scored? |
| 7 | Which documents are required? |
| 8 | Which technical responses must be written? |
| 9 | What questions must we ask the client? |
| 10 | What must the contractor price themselves? |
| 11 | What must be completed / signed / initialled? |
| 12 | What is the submission method and deadline? |
| 13 | What risks could make bidding pointless? |

---

## 3. The 2026 regulatory reality — read before Lesson 1

South Africa is in a **procurement transition**:

- The **Public Procurement Act 28 of 2024** is enacted but its commencement is still "to be proclaimed."
- National Treasury has published **draft General Public Procurement Regulations (2026)**.
- Until commencement, the operative framework remains **PFMA / MFMA / PPPFA** plus the **Preferential Procurement Regulations 2022**.

**Your rule:** study the current regime as the working law, monitor the new regime weekly, and *never* quote a requirement from a framework that is not yet in force as if it applies today. Always cite the tender document first, the applicable regulation second.

---

## 4. The Five-Layer Mental Model (use it on every single tender)

| Layer | Name | The question it answers | Failure consequence |
|---|---|---|---|
| **1** | Eligibility | Can this company legally/technically bid at all? | Cannot bid — no-go |
| **2** | Administrative responsiveness | Was every compulsory document, declaration and form submitted correctly? | Disqualified before reading |
| **3** | Technical / functionality | Can it demonstrate it can actually deliver? | Fails threshold or scores low |
| **4** | Price & preference | How do financials and preference points work? | Loses on points |
| **5** | Contract risk | What obligations do we accept if we win? | Wins and loses money |

Two distinct questions to ask of every tender:
1. *What would make this bidder lose before anyone reads their proposal?* (Layers 1–2)
2. *What would make them score badly even though they are compliant?* (Layers 3–4)

---

## 5. Course structure

| Week | Lesson file | Main subject |
|---|---|---|
| 1 | `lessons/week-01-tender-anatomy.md` | Procurement terminology + tender structure |
| 2 | `lessons/week-02-supplier-compliance.md` | CSD, SARS TCS, SBD/MBD forms, B-BBEE |
| 3 | `lessons/week-03-preferential-procurement.md` | PPR 2022, scoring, functionality |
| 4 | `lessons/week-04-proposal-writing.md` | Technical proposal writing |
| 5 | `lessons/week-05-cidb-fundamentals.md` | CIDB fundamentals |
| 6 | `lessons/week-06-cidb-eligibility-jv.md` | Classes, grades, JVs, eligibility checks |
| 7 | `lessons/week-07-construction-doc-anatomy.md` | Construction document anatomy |
| 8 | `lessons/week-08-boq-pricing.md` | BOQs + pricing fundamentals |
| 9 | `lessons/week-09-method-statements.md` | Method statements + programmes |
| 10 | `lessons/week-10-construction-compliance.md` | COIDA, H&S, supporting evidence |
| 11 | `lessons/week-11-qa-red-team.md` | Tender QA + red-team review |
| 12 | `lessons/week-12-simulated-bids.md` | Full simulated live bids |

Supporting files:
- `lessons/week-00-orientation.md` — setup, AI ground rules, how to use the programme
- `templates/` — compliance matrix, go/no-go, intake checklist, method statement, risk register, CV, experience sheet, submission checklist
- `worklog/tender-log.csv` — your running log of every tender analysed
- `TENDER-BIBLE.md` — the knowledge asset you grow daily

---

## 6. Daily routine (6 focused hours)

| Block | Hours | Activity |
|---|---|---|
| A | 2 | Study official material (Treasury, CIDB, SARS, CSD, B-BBEE) |
| B | 2 | Dissect a **real** tender pack — never a hypothetical |
| C | 1 | Produce an artefact (matrix, methodology, checklist, programme narrative) |
| D | 1 | AI review: be quizzed, challenged and corrected |

Approximately **40% of total learning time goes to the construction track** (Weeks 5–10 plus construction packs woven into every other week).

---

## 7. Volume targets

- **40–60 real tenders analysed** by Week 12.
- **20 tender packs analysed before your first full-response paid client**, of which **at least 10 construction tenders**.
- **First 14 days: learning only.** Prospect research is allowed; taking responsibility for a live submission is not — not until you can independently produce an accurate eligibility check and compliance matrix from a real pack.
- **First paid client target profile:** an experienced **2GB / 3GB / 3CE**-type contractor bidding straightforward work. Not a Grade 8 civils mega-pack.

---

## 8. Core free resource library (bookmark all)

| Resource | URL |
|---|---|
| eTenders portal (live tenders, documents, awards, RFB/RFQ/RFI/RFP/EOI filters) | https://www.etenders.gov.za/ |
| eTenders opportunities search | https://www.etenders.gov.za/Home/Opportunities |
| National Treasury OCPO guidelines | https://ocpo.treasury.gov.za/legislation/guidelines/default.aspx |
| Standard bidding forms (SBD / MBD) | https://ocpo.treasury.gov.za/Buyers_Area/Standard-Bidding-Forms/ |
| OCPO supplier training videos (incl. RFQ submission) | https://ocpo.treasury.gov.za/Suppliers_Area/Training%20Videos/default.aspx |
| Central Supplier Database | https://secure.csd.gov.za/ |
| CSD registration guide | https://secure.csd.gov.za/Account/_RegistrationProcess |
| SARS Tax Compliance Status | https://www.sars.gov.za/individuals/manage-your-tax-compliance-status/ |
| Preferential Procurement Regulations 2022 (PDF) | https://www.treasury.gov.za/legislation/regulations/PREFERENTIAL%20PROCUREMENT%20REGULATIONS%2C%202022.pdf |
| PPR 2022 implementation guide | https://ocpo.treasury.gov.za/Legislation/guidelines/IMPLEMENTATION%20GUIDE%20PPR%202022%20-%20MARCH%202023%20VERSION%201.pdf |
| B-BBEE Commission sworn affidavits | https://www.bbbeecommission.co.za/b-bbee-sworn-affidavits/ |
| CIDB Register of Contractors guide (2026) | https://www.cidb.org.za/wp-content/uploads/2026/05/guide-to-the-cidb-register-of-contractors.pdf |
| CIDB — Applying the Register of Contractors | https://www.cidb.org.za/clients/procurement-guides/applying-register-of-contractors/ |
| CIDB — Evaluating tenders (A3 / A4 guides) | https://www.cidb.org.za/clients/procurement-guides/evaluating-tenders/ |
| CIDB — Expressions of interest / Standard Conditions of Tender | https://www.cidb.org.za/clients/procurement-guides/expressions-of-interest/ |
| CIDB prescripts | https://www.cidb.org.za/clients/procurement-prescripts/cidb-prescripts/ |
| CIDB contractor register overview | https://www.cidb.org.za/contractors/register-of-contractors/overview/ |
| CIDB Joint Venture Calculator | https://jointventurecalculator.cidb.org.za/ |
| Compensation Fund — employer obligations / Letter of Good Standing | https://www.labour.gov.za/DocumentCenter/Pages/Compensation-Fund--obligations-of-the-employer-.aspx |
| NHBRC — why register | https://www.nhbrc.org.za/why-register/ |
| Public Procurement Act 28 of 2024 | https://www.gov.za/documents/acts/public-procurement-act-28-2024-english-setswana-23-jul-2024 |

---

## 9. Non-negotiable AI ground rules

Pin these to any AI workspace you use for tender work:

1. **Never invent a tender requirement.** Quote or identify the source section.
2. **Distinguish mandatory/disqualifying requirements from scored requirements.**
3. **Never fabricate** the bidder's projects, staff, qualifications, registrations, certificates, references, turnover or capabilities.
4. **When information is missing, write `MISSING — CLIENT TO PROVIDE`** rather than filling the gap.
5. **Treat the tender document and the applicable official source as authoritative** over prior assumptions.

Working chats to maintain: *Tender Analysis · Procurement Law · CIDB & Contractors · BOQ Training · Technical Writing · Compliance · Mock Tenders.*

---

## 10. How to work a lesson

Each weekly lesson has the same structure:

1. **Why this week matters** — the business consequence of not knowing it
2. **Learning objectives** — measurable
3. **Core concepts** — the teaching content
4. **Official reading** — sources, in order
5. **Practical assignment** — the week's required output volume
6. **Daily plan** — Day 1 to Day 6
7. **Deliverables** — files you must have produced
8. **Self-test** — answer from memory, then verify
9. **AI drill prompts** — copy/paste to be examined
10. **Mastery gate** — do not advance until you pass

Start with `lessons/week-00-orientation.md`.
