# Week 2 — The Supplier-Compliance Ecosystem (CSD · SARS · SBD/MBD · B-BBEE)

> **Assignment volume:** build **5 compliance matrices** from real tenders.
> **Running total target:** 10 tenders.

---

## 1. Why this week matters

Most bids die in Layer 2. The documents are boring, which is exactly why nobody masters them — and why mastery is commercially valuable. Your promise to a client is: *"you will never again be disqualified for an administrative reason."*

---

## 2. Learning objectives

By Friday you can:
- Explain what each common supplier document **proves**, not merely what it is called.
- Read a CSD report and list its defects.
- Explain SARS Tax Compliance Status and the PIN-based third-party verification.
- Identify which SBD/MBD forms a given tender requires and what each establishes.
- Distinguish valid B-BBEE evidence types and spot mismatches against what a tender asks for.
- Produce a compliance matrix that survives hostile review.

---

## 3. Core concepts

### 3.1 The "what does it prove" discipline

For every document, answer three questions:

| Question | Example: Letter of Good Standing |
|---|---|
| What does it **prove**? | Employer is registered with the Compensation Fund and assessments are paid up to date |
| Who **issues** it, and how long does it take? | Department of Employment and Labour; lead time varies — never assume same-day |
| When does it **expire**, and does the tender require currency at closing or at award? | Has an expiry date — check the tender's wording |

Build this three-column table for every document in your Tender Bible.

### 3.2 Central Supplier Database (CSD) — study deeply

The CSD is government's central source of supplier information. A supplier record can carry:

- company identification (registration number, legal entity type, trading name)
- directors / members / owners
- tax information
- banking details (subject to verification)
- commodities the supplier offers
- contact information
- B-BBEE information
- relevant accreditations

**Open the official registration guide and learn every field.** You are not learning to register a company once; you are learning to audit a record.

Defects to hunt for in a client's CSD report:
- **Wrong or missing commodities** — buyers filter and communicate by commodity code
- **Outdated information** — old addresses, old contacts, stale supplier number printouts
- **Directors not matching CIPC** — flags fraud checks and delays
- **Missing accreditations** — e.g. CIDB or professional registrations not reflected
- **Bank verification problems** — unverified or mismatched account holder name
- **Tax status not reflected as compliant**
- **Restricted / prohibited supplier flags**
- **Date of the report** — many tenders require a *recent* CSD summary

> **Deliverable habit:** every client engagement starts with a CSD report review, in writing, before anything else.

**Source:** https://secure.csd.gov.za/Account/_RegistrationProcess · portal: https://secure.csd.gov.za/

### 3.3 SARS Tax Compliance Status (TCS)

Key current detail: SARS **removed the separate "Tender" TCS application option**. The relevant option is now **Good Standing**, and the taxpayer receives a **PIN** that third parties (including organs of state) use to verify the taxpayer's *current* status.

Implications you must internalise:
- Status is **live**, not a snapshot: a client compliant today can be non-compliant at verification.
- Your job is to check compliance **early**, again **before submission**, and to warn the client that it will be verified again at award.
- Do not tell a client "the TCS certificate is fine" — the concept is a status and a PIN, not a certificate that freezes a moment in time.
- Non-compliance often comes from unrelated small issues: outstanding returns, unpaid penalties, an unregistered entity for a tax type.

**Source:** https://www.sars.gov.za/individuals/manage-your-tax-compliance-status/

### 3.4 SBD and MBD forms

National Treasury publishes **SBD forms** (national/provincial) and **MBD forms** (municipal). Common members of the family include SBD/MBD **1**, **4**, **6.1** and various contract forms.

Learn each by its *purpose*, not its number:

| Form | What it establishes (conceptually) |
|---|---|
| **1** | Invitation to bid / bidder's core identifying and contact particulars, tax and CSD details |
| **4** | Declaration of interest — connections to state employees, conflicts, directorships |
| **6.1** | Preference points claim — specific goals and B-BBEE/preference claims |
| Contract forms | The offer-and-acceptance mechanics and contract particulars |

**Rules to live by:**
- The tender's own list of returnables is authoritative — not your memory of "the usual forms."
- Unsigned, undated, partially completed or wrongly witnessed forms are a classic Layer-2 death.
- Some forms require the *authorised* signatory; check the resolution/power of attorney requirement.
- Never pre-fill a declaration with facts you have not been given. Use `MISSING — CLIENT TO PROVIDE`.

**Source:** https://ocpo.treasury.gov.za/Buyers_Area/Standard-Bidding-Forms/

### 3.5 B-BBEE evidence

The B-BBEE Commission publishes official **sworn-affidavit templates**, including **sector-specific forms** (construction among them).

What you must be able to distinguish:
- **Sworn affidavit** (typically EMEs, and QSEs in defined circumstances) vs **verification certificate** from an accredited agency.
- **Generic scorecard** vs **sector code** scorecard — the construction sector code exists and matters.
- The **level claimed** vs the **evidence supplied** vs **what the tender asks for**.
- Validity and dating — an affidavit must be properly commissioned.

Your objective is **not** to become a verification professional. It is to be able to say, with a reference:

> "This tender asks for evidence of X (clause 6.3), and what the client gave me is Y. I need to flag that before submission."

**Source:** https://www.bbbeecommission.co.za/b-bbee-sworn-affidavits/

### 3.6 The compliance matrix — the core artefact

One row per requirement. Never merge two requirements into one row.

| # | Requirement | Type | Mandatory? | Tender ref | Evidence needed | Client has it? | Action | Owner | Due |
|---|---|---|---|---|---|---|---|---|---|
| 1 | CSD registration | Admin | Yes | 4.2 | CSD report | Yes | Verify currency | Me | D-10 |
| 2 | Similar experience | Technical | Scored | 7.1 | Completion/reference letters | Partial | Request 2 letters | Client | D-12 |
| 3 | Methodology | Technical | Scored | 7.3 | Written response | No | Draft | Me | D-7 |
| 4 | Pricing | Commercial | Yes | Annexure C | Priced schedule | No | Client to complete | Client/QS | D-5 |
| 5 | Declaration of interest | Admin | Yes | SBD 4 | Signed form | No | Client signature | Client | D-4 |

**Rules:**
- AI may draft version 1. **You verify every line against the tender, clause by clause.**
- `Mandatory?` has exactly three values: **Yes (disqualifying)**, **Scored**, **Informational**.
- Every row has an **owner** and a **due date expressed as D-minus days** from closing.
- A row is only closed when the evidence file is in `04-client-inputs/` — not when someone promised it.

After ~50 tenders you will recognise the patterns instantly. That recognition *is* the expertise.

---

## 4. Official reading (in order)

1. CSD registration guide — every field: https://secure.csd.gov.za/Account/_RegistrationProcess
2. SARS Tax Compliance Status: https://www.sars.gov.za/individuals/manage-your-tax-compliance-status/
3. Treasury standard bidding forms — download SBD 1, 4, 6.1 and the MBD equivalents: https://ocpo.treasury.gov.za/Buyers_Area/Standard-Bidding-Forms/
4. B-BBEE Commission affidavits, including the construction sector form: https://www.bbbeecommission.co.za/b-bbee-sworn-affidavits/

---

## 5. Daily plan

| Day | Study (2h) | Dissect (2h) | Produce (1h) | Review (1h) |
|---|---|---|---|---|
| 1 | CSD guide, all fields | Tender F returnables | CSD audit checklist | Quiz on CSD fields |
| 2 | SARS TCS | Tender G returnables | TCS explainer for clients (1 page) | Correct my TCS explanation |
| 3 | SBD 1 / 4 / 6.1 line by line | Tender H returnables | Form-purpose table | Test me on form purposes |
| 4 | MBD equivalents + municipal differences | Tender I returnables | SBD vs MBD comparison | Challenge differences I claim |
| 5 | B-BBEE evidence types | Tender J returnables | B-BBEE evidence decision tree | Mismatch scenarios drill |
| 6 | Consolidate | Rebuild Tender F matrix from scratch | 5 finished matrices | Hostile audit of all 5 |

---

## 6. Deliverables

- 5 × completed compliance matrices (use `templates/compliance-matrix.csv`)
- 1 × CSD audit checklist
- 1 × client-facing one-pager: "The 8 documents that get you disqualified"
- Tender Bible: document → what it proves → issuer/lead time → validity table

---

## 7. Self-test (closed book)

1. Name eight categories of information a CSD supplier record can contain.
2. Which TCS option replaced the old "Tender" option, and how does a third party verify status?
3. What does SBD 4 establish, and who must sign it?
4. A tender requires a B-BBEE verification certificate; the client hands you a sworn affidavit. What do you do, and in what order?
5. Why is "tax compliant last month" not an answer?
6. What are the only three permitted values in the `Mandatory?` column, and why does that matter?

---

## 8. AI drill prompts

> Here is a client's CSD report and a tender's returnables list. Do not fix anything. List every discrepancy between them, cite the tender clause for each, and mark anything you cannot verify as UNVERIFIABLE.

> Quiz me on the purpose of SBD 1, 4 and 6.1 and their municipal equivalents. For each, ask what happens if it is submitted unsigned, and grade my answer against the official form text.

---

## 9. Mastery gate

On an unseen tender you can produce a complete compliance matrix in **under 90 minutes**, with a clause reference on **every** row and zero invented requirements.
