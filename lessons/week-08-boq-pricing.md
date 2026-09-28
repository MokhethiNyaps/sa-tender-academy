# Week 8 — Bills of Quantities and Pricing Fundamentals

> **Assignment volume:** analyse **5 BOQs — without attempting to set rates**.
> **Running total target:** 48 tenders.

---

## 1. Why this week matters

This is the week with the highest risk of doing harm. There is a service you must never offer:

> ❌ *"Send me your BOQ and ChatGPT will price it."*

That is dangerous. Rates are a commercial and technical judgement owned by the contractor or QS. What you offer instead is **BOQ analysis and quality assurance** — which is genuinely valuable and entirely safe.

---

## 2. Learning objectives

By Friday you can:
- Explain BOQ structure: sections, items, descriptions, units, quantities, rates, amounts.
- Run a full arithmetic and completeness audit over hundreds of rows.
- Detect blank rates, missing cells, unit mismatches, and outlier rates.
- Compare BOQ versions across corrigenda and produce a change list.
- Explain to a contractor exactly what you will and will not do.

---

## 3. Core concepts

### 3.1 Anatomy of a BOQ

| Column | Meaning | Common failure |
|---|---|---|
| Item no. | Reference to the standard method of measurement / spec clause | Renumbered between versions |
| Description | What is being priced | Truncated or ambiguous |
| Unit | m, m², m³, kg, t, no., sum, item, provisional sum | Rate priced against the wrong unit |
| Quantity | Measured amount | Changed by corrigendum, not updated |
| Rate | Contractor's unit price | **Blank** — the classic disqualification |
| Amount | Quantity × Rate | Arithmetic error; hard-typed instead of formula |

Sections usually include preliminaries & general, then trade/work sections, then provisional and prime cost sums, then summary pages and the grand total carried to the form of offer.

### 3.2 What determines a rate (and why it is not yours to set)

The contractor/QS builds a rate from:

**labour + materials + plant + subcontractors + overhead + risk + profit + project circumstances**

"Project circumstances" is the part outsiders always miss: haul distances, access, ground conditions, working hours, community/labour arrangements, weather windows, existing services, security, availability of local suppliers, escalation, and the contractor's current workload and appetite.

No model knows those for a specific site. You do not price.

### 3.3 What you legitimately do — the BOQ QA service

1. **Completeness audit** — every row has a rate and an amount; no blank cells; all sections carried to the summary.
2. **Arithmetic audit** — verify `Quantity × Rate = Amount` across every row; verify section subtotals; verify the summary total equals the sum of sections; verify the total carried to the form of offer matches.
3. **Structural audit** — units consistent with descriptions; provisional and PC sums left at the stated values where the tender says they must not be altered; no rows deleted, inserted or reordered where prohibited.
4. **Outlier detection** — flag rates that are dramatically higher or lower than the item's peers or than the contractor's own prior projects. You are asking a **question**, not correcting a rate: *"Item 4.12 is 8× the rate of item 4.11 for a similar activity — intentional?"*
5. **Version comparison** — diff the corrigendum BOQ against the original; produce a change list of added/removed items and changed quantities; confirm the contractor priced the **latest** version.
6. **Rounding and VAT treatment** — per the tender's pricing instructions, not convention.
7. **Question list** — every ambiguity becomes a written clarification question to the buyer before the deadline for questions.

### 3.4 Unbalanced and risky pricing — recognise, do not advise

Be able to *recognise* front-loading, rate-loading on items likely to increase, and nominal rates on items likely to decrease. Recognise them so you can flag the **risk** (rejection, allegations of unbalanced tendering, cash-flow exposure). Do not coach a client to do it.

### 3.5 Tooling

Build a reusable spreadsheet/script that ingests a BOQ and outputs:
- rows with blank rates
- rows where `|Quantity × Rate − Amount| > 0.01`
- section subtotal mismatches
- unit/description inconsistencies flagged by keyword
- top/bottom 5% rate outliers per section
- a version-diff table

This tool is a genuine commercial asset. Build it once, use it on every job.

### 3.6 The client script

> "I don't price your work — you do, or your QS does. What I do is make sure the bill you hand in is arithmetically correct, complete, priced against the latest version, and free of the errors that get bids rejected. Last thing you want is a perfect price with one blank rate on page 47."

---

## 4. Daily plan

| Day | Study (2h) | Dissect (2h) | Produce (1h) | Review (1h) |
|---|---|---|---|---|
| 1 | BOQ structure & pricing instructions | BOQ 1 | Structure map | Quiz on units & items |
| 2 | Preliminaries, provisional & PC sums | BOQ 2 | Sums audit | Test my classifications |
| 3 | Arithmetic auditing | BOQ 3 | Build the checker tool | Tool validation |
| 4 | Outliers & unbalanced pricing | BOQ 4 | Outlier report + question list | Challenge my flags |
| 5 | Version control & corrigenda | BOQ 5 | Version diff | Audit my diff |
| 6 | Consolidate | Re-audit BOQ 1 with the tool | 5 audit reports | Full exam |

---

## 5. Deliverables

- 5 × BOQ audit reports (completeness, arithmetic, structure, outliers, questions)
- 1 × reusable BOQ checker tool
- 1 × client-facing "what I do / what I don't do with your BOQ" one-pager
- Tender Bible: pricing terminology and audit checklist

---

## 6. Self-test (closed book)

1. List the eight components of a contractor's rate.
2. Why is a blank rate frequently fatal?
3. What must never be altered in a provisional sum line?
4. Give three signs of an unbalanced bid and explain why you flag rather than recommend them.
5. A corrigendum changes 14 quantities. What are your exact steps?
6. State, in one sentence, the boundary of your BOQ service.

---

## 7. AI drill prompts

> Here is a BOQ extract as CSV. Do not suggest any rates. Produce only: blank-rate rows, arithmetic mismatches, subtotal errors, unit inconsistencies and rate outliers per section, plus a list of clarification questions for the buyer.

> Role-play a contractor who insists I price his BOQ. Push hard. Make me practise refusing while still selling the QA service.

---

## 8. Mastery gate

A 400+ row BOQ audited end-to-end in **under 60 minutes**, catching every planted error, with **zero** rate suggestions offered.
