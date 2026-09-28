# Week 11 — Tender QA, Red-Team Review and Thinking Like an Evaluator

> **Assignment volume:** audit **5 completed / publicly available sample responses**.
> **Running total target:** 58 tenders.

---

## 1. Why this week matters

To write better bids, learn **how the other side evaluates them**. CIDB publishes free guidance aimed at procuring entities — that is precisely why it is valuable to you.

---

## 2. Learning objectives

By Friday you can:
- Evaluate a submission the way a bid evaluation committee does.
- Run a structured red-team review that finds failures before the buyer does.
- Operate a final submission QA process that has never let a disqualification through.
- Make a defensible go/no-go recommendation.

---

## 3. Core concepts

### 3.1 Learn the evaluator's guidance

CIDB has free guidance specifically about evaluating tender offers and quality: the **A3 guide** addresses tender evaluation and the **A4 guide** deals with quality/functionality evaluation. Study both and note the language evaluators are trained to use — then write in that language.

**Sources:**
- https://www.cidb.org.za/clients/procurement-guides/evaluating-tenders/
- https://www.cidb.org.za/clients/procurement-prescripts/cidb-prescripts/
- Standard Conditions of Tender context: https://www.cidb.org.za/clients/procurement-guides/expressions-of-interest/

### 3.2 The evaluation sequence you are defending against

1. **Opening/recording** — was it received on time, at the right place, in the right format?
2. **Administrative compliance** — returnables present, signed, complete.
3. **Eligibility/pre-qualification** — CIDB, registrations, pre-qualification criteria.
4. **Functionality** — scored against criteria; threshold applied.
5. **Price and preference** — points calculated.
6. **Due diligence / verification** — CSD, tax status, references, site visits.
7. **Recommendation and adjudication**.

Your QA process must mirror these stages, in this order.

### 3.3 The red-team review

Assign yourself (or a second person) the explicit role of **trying to disqualify the bid**. Separate this from the drafting mindset — do it on a different day, with the tender document open and the draft treated as hostile.

**Red-team checklist:**

**Stage 1 — Kill checks**
- [ ] Closing date/time, correct submission method, correct physical/portal address
- [ ] Compulsory briefing attended and certificate included
- [ ] Bid validity accepted as stated, no qualification of the offer
- [ ] Every mandatory returnable present, signed, dated, witnessed as required
- [ ] Correct legal entity throughout; signatory authorised
- [ ] CIDB designation, class and active status correct
- [ ] Tax status compliant; CSD current; not restricted
- [ ] No blank rate, no unpriced item, totals carried correctly
- [ ] Latest corrigendum version used and acknowledged
- [ ] No alteration of prohibited documents; corrections initialled as required

**Stage 2 — Score checks**
- [ ] Every functionality criterion answered under its own heading, in the tender's order
- [ ] Every claim has cited evidence, attached and paginated
- [ ] Experience genuinely comparable in nature, value and recency
- [ ] Key personnel meet the stated qualification/registration/years exactly
- [ ] Programme consistent with the contract completion date
- [ ] Methodology site-specific, with numbers, names and references throughout
- [ ] Self-score completed against the tender's own scale, with justification

**Stage 3 — Consistency checks**
- [ ] Names, dates, values and quantities identical across all documents
- [ ] Programme ↔ resources ↔ cash flow ↔ BOQ preliminaries agree
- [ ] Team named in the methodology matches the CVs and the org chart
- [ ] No leftover text from another bid (search for previous client names)
- [ ] No `MISSING — CLIENT TO PROVIDE` left in the final document

**Stage 4 — Packaging**
- [ ] Order of documents matches the tender's index
- [ ] Pagination, index, dividers, labelling as instructed
- [ ] Correct number of copies; originals vs copies marked
- [ ] Envelope/packaging labelling exactly as specified; two-envelope separation if required
- [ ] Electronic format, file naming, file size and portal upload confirmation
- [ ] Proof of submission retained (receipt, timestamp, register signature)

### 3.4 Go / no-go discipline

Run this **before** drafting, and again after the compliance matrix is complete:

| Factor | Question | Weight |
|---|---|---|
| Eligibility | Can we legally bid today? | Pass/fail |
| Capability | Can we actually deliver this scope? | Pass/fail |
| Evidence | Do we have the required track record and personnel evidence? | High |
| Time | Is there enough time to assemble everything, including third-party documents? | High |
| Competitiveness | Realistic chance against likely bidders? | Medium |
| Commercial risk | Penalties, retention, guarantees, payment terms, cash flow | High |
| Cost to bid | Document fees, guarantees, our time, travel | Medium |
| Strategic value | Reference value, client relationship, capability growth | Medium |

Output a single line: **BID / NO-BID / BID IF <condition>** with three reasons.

A tender you should not bid is a service to your client, not a lost sale.

### 3.5 Building your error log

Every error you find — in your work or others' — goes into the Tender Bible under **"Errors I have personally made."** This section will eventually be the most valuable pages you own.

---

## 4. Daily plan

| Day | Study (2h) | Dissect (2h) | Produce (1h) | Review (1h) |
|---|---|---|---|---|
| 1 | CIDB A3 evaluation guide | Sample response 1 | Evaluator scoresheet | Compare my scores |
| 2 | CIDB A4 quality/functionality guide | Sample response 2 | Scoresheet | Justify deductions |
| 3 | Build red-team checklist | Sample response 3 | Red-team report | Challenge my findings |
| 4 | Go/no-go framework | Sample response 4 | Go/no-go on 3 live tenders | Debate decisions |
| 5 | Packaging & submission rules | Sample response 5 | Submission QA checklist | Audit my checklist |
| 6 | Consolidate | Re-audit response 1 | 5 audit reports + error log | Full exam |

---

## 5. Deliverables

- 5 × evaluator-perspective audit reports with scores and justifications
- 1 × red-team checklist (in `templates/`)
- 1 × go/no-go checklist (in `templates/`)
- 1 × final submission checklist (in `templates/`)
- Tender Bible: error log started

---

## 6. Self-test (closed book)

1. List the seven stages of evaluation in order.
2. Name ten Stage-1 kill checks.
3. What consistency errors most often appear across documents?
4. What does a two-envelope system require of your packaging?
5. When should a go/no-go be run, and how many times?
6. Why is recommending "no bid" good business?

---

## 7. AI drill prompts

> You are a bid evaluation committee applying the tender's own criteria. Here is a submission. Disqualify it if you can, and justify with clause references. Then score what survives and show your workings.

> Red-team my draft submission. Do not improve it. Produce only a numbered defect list, each with severity (fatal / scoring / cosmetic) and the clause it offends.

---

## 8. Mastery gate

You red-team an unseen submission and find every planted defect, classified correctly by severity, in **under 90 minutes**.
