# Week 3 — Preferential Procurement, Scoring and Functionality

> **Assignment volume:** reverse-engineer **5 evaluation criteria** sets.
> **Running total target:** 15 tenders.

---

## 1. Why this week matters

This is where mediocre tender writers become *dangerous*. Advising a client wrongly on preference points or functionality thresholds costs them real money and costs you your reputation. Slow, careful study this week.

---

## 2. Learning objectives

By Friday you can:
- Explain the 80/20 and 90/10 systems and the threshold that separates them.
- Explain what "specific goals" are and that the **procuring institution states them**.
- Compute points for a given set of bids by hand, correctly, including rounding conventions the tender specifies.
- Reverse-engineer any functionality/quality scoring table into a drafting brief.
- Explain the effect of a functionality threshold on responsiveness.

---

## 3. Core concepts

### 3.1 The preference framework as it currently stands

Study the **Preferential Procurement Regulations 2022** together with National Treasury's **implementation guide**.

Core structure you must know cold:
- **80/20** applies to relevant acquisitions **at or below R50 million**; **90/10** applies **above that threshold**.
- The larger number is **price**; the smaller number is **preference points** for the procuring institution's stated **specific goals**.
- Specific goals are **set by the procuring institution** in the tender — they are not a fixed national list you can assume. Read them in the document, every time.
- Points must be **claimed** and **substantiated** with the evidence the tender specifies (commonly via the preference-claim form, e.g. SBD/MBD 6.1).
- Pre-qualification criteria are a different mechanism from preference points: pre-qualification is a **gate** (Layer 1), preference is **points** (Layer 4). Never conflate them.

**Sources (read slowly, take notes, do not skim):**
- PPR 2022: https://www.treasury.gov.za/legislation/regulations/PREFERENTIAL%20PROCUREMENT%20REGULATIONS%2C%202022.pdf
- Implementation guide: https://ocpo.treasury.gov.za/Legislation/guidelines/IMPLEMENTATION%20GUIDE%20PPR%202022%20-%20MARCH%202023%20VERSION%201.pdf

### 3.2 Price scoring mechanics

Price points are formula-driven and relative to the lowest acceptable bid. Two consequences people miss:

1. **You cannot know your price score in advance** — it depends on competitors. Therefore preference points and functionality are the only parts you control.
2. **Small price differences can be worth fewer points than a single functionality sub-criterion.** Quantify this for the client before they discount their price out of profitability.

**Drill:** build a spreadsheet. Enter four hypothetical bids. Compute price points, add preference points, rank. Then change one bid's price by 5% and watch the ranking. Do this until the arithmetic is automatic.

### 3.3 Functionality / quality evaluation

Functionality is usually a **gate before price**: bids below the stated minimum threshold are not evaluated further, i.e. they become non-responsive.

Anatomy of a functionality table:

| Criterion | Weight | Sub-criteria | Scoring scale | Evidence source |
|---|---|---|---|---|
| Experience of the firm | 30 | # of similar projects, value, sector | 0–5 scale × weight | Reference letters |
| Key personnel | 25 | Qualification, registration, years, role | Per person | CVs + certificates |
| Methodology | 25 | Understanding, approach, work plan | Descriptive scale | Written response |
| Programme | 10 | Realism, logic, resourcing | Descriptive scale | Gantt + narrative |
| Risk & quality | 10 | Identification, mitigation, QC plan | Descriptive scale | Risk register, QC plan |

**Reverse-engineering method (the week's core skill):**

1. Copy the scoring table **verbatim** into a working sheet.
2. For each criterion, write the *literal* wording of what earns full marks.
3. Convert that wording into a **drafting instruction** — a heading and a list of what must be visibly present.
4. Note the **evidence** that must accompany it.
5. Note the **scale**: is it 0/1, 1–5, or descriptive bands? Descriptive bands tell you exactly what "excellent" means — write to that band's words.
6. Build a **points map**: every paragraph you will write is tagged with the points it targets. Any paragraph that targets no points is filler — delete it.

> If the tender gives 15 points for methodology, your methodology must *visibly* answer the elements that generate those 15 points — in the evaluator's order and using the evaluator's vocabulary.

### 3.4 Scoring scales and evaluator behaviour

Evaluators score under time pressure, often on a spreadsheet, often as a committee. Design for that:
- **Mirror their headings.** If the criterion is "Understanding of the assignment," your heading is "Understanding of the assignment."
- **Signpost the evidence.** "(See Annexure D — Completion Certificate, Project 3)."
- **One claim, one proof.** Unproved claims score zero in a rigorous panel and irritate a lenient one.
- **Make the count easy.** If they need five projects, number them 1–5 in a table with value, date, client, contact.

### 3.5 Common preference/scoring errors to flag

- Claiming points without submitting the required substantiating evidence.
- Submitting evidence dated outside the required validity window.
- Claiming a level based on a scorecard type the tender does not accept.
- Assuming last year's specific goals apply to this year's tender.
- Assuming 80/20 applies when the estimated value crosses the threshold.
- Treating a pre-qualification criterion as something points can compensate for. It cannot.

---

## 4. Daily plan

| Day | Study (2h) | Dissect (2h) | Produce (1h) | Review (1h) |
|---|---|---|---|---|
| 1 | PPR 2022, regulation by regulation | Tender K evaluation section | Verbatim scoring extract | Quiz on 80/20 vs 90/10 |
| 2 | Implementation guide part 1 | Tender L | Points map | Check my points map |
| 3 | Implementation guide part 2 | Tender M | Price-scoring spreadsheet | Test my arithmetic |
| 4 | Functionality thresholds | Tender N | Drafting brief from criteria | Hostile review |
| 5 | Specific goals & evidence | Tender O | Preference evidence checklist | Scenario drills |
| 6 | Consolidate | Re-score Tender K as an evaluator | 5 finished reverse-engineered briefs | Full exam |

---

## 5. Deliverables

- 5 × "Evaluation Brief" documents — verbatim criteria + points map + drafting instructions + evidence list
- 1 × price/preference scoring calculator spreadsheet
- 1 × preference evidence checklist
- Tender Bible: preference rules section

---

## 6. Self-test (closed book)

1. At what value does the system change between 80/20 and 90/10?
2. Who determines the specific goals in a tender, and where do you find them?
3. What happens to a bid that scores below the functionality threshold?
4. Why are preference and functionality the only parts of the score you control?
5. Give three reasons a legitimately-entitled bidder loses preference points anyway.
6. What is the difference between a pre-qualification criterion and a preference point?

---

## 7. AI drill prompts

> Here is a tender's evaluation section. Do not draft anything. Convert it into a table of: criterion, weight, verbatim full-marks wording, required evidence, and the exact headings I should use in my response. Flag any criterion where the tender is ambiguous and phrase the clarification question I should submit to the buyer.

> Give me four hypothetical bid prices and preference levels under an 80/20 system. Make me calculate the points by hand. Then mark my arithmetic and show the correct workings.

---

## 8. Mastery gate

Given an unseen evaluation section, you produce a complete points map and drafting brief in **under 60 minutes**, and your hand-calculated scores for a set of hypothetical bids match the correct answer three times in a row.
