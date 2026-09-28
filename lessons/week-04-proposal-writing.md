# Week 4 — Technical Proposal Writing

> **Assignment volume:** draft **3 methodologies** from real tenders.
> **Running total target:** 18 tenders (3 drafted in full).

---

## 1. Why this week matters

Everything before this week was analysis. This week you convert analysis into scoreable prose. Writing quality is the one place a small firm can beat a large one.

---

## 2. Learning objectives

By Friday you can:
- Write a response section that maps visibly to its evaluation criterion.
- Eliminate corporate filler from your own drafts on sight.
- Structure the standard response sections of a professional-services proposal.
- Write a team/experience section that an evaluator can verify in 30 seconds.

---

## 3. Core concepts

### 3.1 The sections you will repeatedly write

A typical professional-services response may require some combination of:

understanding of the assignment · methodology · implementation approach · work plan · project programme · risk management · quality management · team composition · roles and responsibilities · experience · references · project governance · reporting · handover · training · business continuity

Build a **template shell** for each in `templates/`, with the section's purpose, its typical evaluation criterion, and the questions it must answer.

### 3.2 The quality standard

**Bad AI tender writing:**
> "Our highly experienced team is committed to excellence and customer satisfaction."

That communicates nothing. It is unverifiable, unscoreable and indistinguishable from every competitor's text.

**Good tender writing follows this chain, every time:**

> **what you will do → how you will do it → who will do it → when they will do it → what evidence/deliverable results → how the requirement is satisfied**

Rewrite of the above:
> "Site establishment will be completed within 5 working days of site handover (Programme activity 1.2). The Site Agent, T. Mokoena (CV, Annexure F — 11 years, NDip Civil), will erect the site office, ablutions, materials store and signage in accordance with the OHS Specification clause 12. Deliverable: signed Site Establishment Certificate and photographic record submitted to the Engineer, satisfying Scope of Work clause 4.1."

Note what makes it work: named activity, duration, named person with evidence location, cited specification, named deliverable, cited requirement.

### 3.3 The paragraph rule

Every paragraph must carry at least one of:
- a **number** (duration, quantity, frequency, value)
- a **name** (person, method, standard, system, document)
- a **reference** (clause, annexure, drawing, criterion)

A paragraph with none of the three is filler. Delete it.

### 3.4 Structure that evaluators reward

1. **Mirror the criterion heading exactly.**
2. **Lead with a one-sentence direct answer** to the criterion, then elaborate.
3. **Use tables** for anything countable: team, projects, risks, deliverables, milestones.
4. **Cross-reference evidence** at the point of the claim, not in a separate annexure list.
5. **Close each section** with a short "How this satisfies criterion X" statement listing the criterion's own sub-elements.

### 3.5 Section-by-section briefs

**Understanding of the assignment** — prove you read *this* scope, not a generic one. Reference the client's actual site, asset, population, constraints, existing systems. Name three specific challenges of this project and how they shape your approach. Never restate the scope back verbatim; that scores zero.

**Methodology** — the ordered sequence of *how*. Phase → activities → inputs → responsible person → outputs → quality checkpoint. One subsection per phase.

**Work plan / programme** — activities, durations, dependencies, resources, milestones, critical path. A Gantt plus a narrative explaining logic, float and how weather/access/approvals were accommodated.

**Risk management** — a risk register: risk, cause, consequence, likelihood, impact, mitigation, owner, residual rating. Include the risks the client actually fears (delays, access, community, utilities, payment, supply).

**Quality management** — inspection and test plan logic: what is checked, against what standard, by whom, at what hold point, recorded how.

**Team composition & roles** — table: name, role, qualification, registration number, years, % time allocated, previous comparable project. CVs formatted identically, evidence attached.

**Experience & references** — table: project, client, contact person + phone/email, value, dates, scope relevance to *this* tender, completion certificate reference. Relevance column is the one evaluators read.

**Governance, reporting, handover, training, business continuity** — usually low weight but easy points. Short, concrete, with frequencies and named artefacts (e.g. "monthly progress report by the 5th, format per Annexure G").

### 3.6 Your writing process

1. Paste the verbatim criterion at the top of the draft.
2. Convert the criterion into a checklist of elements.
3. Interview the client/contractor for facts. **Never invent.**
4. Draft against the checklist.
5. Mark every unknown as `MISSING — CLIENT TO PROVIDE`.
6. Self-score as an evaluator using the tender's own scale.
7. Strip filler using the paragraph rule.
8. Verify every claim has evidence in the pack.

---

## 4. Daily plan

| Day | Study (2h) | Dissect (2h) | Produce (1h) | Review (1h) |
|---|---|---|---|---|
| 1 | Section purposes; good vs bad examples | Tender P criteria | Understanding-of-assignment draft | Score it against the criterion |
| 2 | Methodology structure | Tender P scope in depth | Methodology draft 1 | Hostile evaluator review |
| 3 | Programmes & work plans | Tender Q | Work plan + narrative | Challenge my logic |
| 4 | Risk & quality sections | Tender Q | Risk register + QC plan | Add risks I missed |
| 5 | Team, CVs, experience | Tender R | Team + experience tables | Verifiability audit |
| 6 | Consolidate | Re-draft Tender P methodology | 3 finished methodologies | Blind scoring vs my self-score |

---

## 5. Deliverables

- 3 × complete methodology responses with points maps
- 1 × risk register, 1 × quality plan, 1 × team table, 1 × experience table
- Reusable template shells in `templates/`
- Tender Bible: "filler phrases I have banned" list

---

## 6. Self-test (closed book)

1. State the six-step chain that every good tender paragraph follows.
2. What three things can make a paragraph non-filler?
3. What is the fastest way to score zero on "understanding of the assignment"?
4. Why do identically formatted CVs matter?
5. What do you write when the client has not given you a fact?

---

## 7. AI drill prompts

> Here is a methodology I drafted and here is the verbatim evaluation criterion. Score it using the tender's own scale. For every point you deduct, quote the sentence responsible and explain what evidence or specificity was missing. Do not rewrite it for me.

> Read my draft and list every sentence that contains no number, no name and no reference. Output them as a delete list.

---

## 8. Mastery gate

An unseen tender's methodology criterion, drafted from a 45-minute client interview, self-scored and independently scored within 10% of each other — twice.
