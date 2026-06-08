# check-extras.md — lab5.ca REPO-LOCAL audit extensions

Loaded by `sdd:check` via path probe `.claude/check-extras.md`. Each section ≡ additional audit recipe ∨ scope override applied per CHECK §V / §-cite step (sdd:check skill body, REPO-LOCAL extension recipes).

## §-cite drift recipe — scope override

Per V91 (lab5.ca SPEC.md): documentary cite forms ≡ ⊥ live cites; live cites stay ∈ typed `§T.cites` ∧ `§B.fix` columns. Two exclusions apply when running CHECK §-cite step 2 (free-text grep `§[VTB]\.[0-9]+`):

### (1) blog content

blog body ≡ documentary prose discussing external SPECs (pilot-skills SPEC.md, MailPilot, etc.) ∴ cites ∈ blog content ≡ cross-repo references, ⊥ live cites into lab5.ca SPEC.md.

**Effect**: exclude `src/content/blog/**/*.md` from REPO-LOCAL scope. Matches within these files ⊥ classified against lab5.ca SPEC.md rows; ⊥ emit UNRESOLVED ∨ TYPE-MISMATCH ∀ such hits.

### (2) SPEC.md §B/§T narrative columns

§B `cause` column ∧ §T `task` column ∈ SPEC.md often quote historical cite forms (e.g. `/sdd:check` tool output records, prior-state snapshots, references to rows that may have been renumbered ∨ that lived ∈ external SPECs). These ≡ documentary by convention, ⊥ live cites — live cites for §B/§T rows live ∈ their respective typed columns (§T.cites col 4, §B.fix col 4), parsed via step 1 of the §-cite recipe.

**Effect**: when scanning SPEC.md for free-text `§[VTB]\.[0-9]+` matches, exclude matches within §B `cause` column (col 3 of `id|date|cause|fix` table) ∧ §T `task` column (col 3 of `id|status|task|cites` table). Typed cite columns (§T.cites, §B.fix) remain ∈ scope per step 1. Implementation ≡ pipe-split each row of §B/§T pipe-tables on `|`, scope free-text grep to cols {1,2,4+} only ∀ those tables; rest of SPEC.md (§G, §C, §I, §V bodies) stays ∈ scope unchanged.

**REPORT header declaration** (auditor surfaces in §-cite drift block): `blog content (src/content/blog/**) ∧ SPEC.md §B/§T narrative columns excluded from free-text §-cite scope per V91`.

## surface-completeness audit — V92 recipe extension

Per V92 (lab5.ca SPEC.md): ∀ URL-accessible surface ! enumerated ∈ §I `asset:` list ∨ `route:` list.

**Recipe** (`/sdd:check §I` list-shape sub-recipe):

1. Extract §I declared surface set: parse §I `asset:` + `route:` bullet lines.
2. Extract code surface set: `rg public/* tracked files ∪ rg integrations: ∈ astro.config.mjs ∪ ls src/pages/*.{ts,js}`.
3. Diff:
   - §I − code → MISSING (declared but unbuilt).
   - code − §I → EXTRA (built but undeclared → V92 violation, recurrence class of B15/B16/B19).
4. Carrier-pairing check: closed §T touching `public/` ∨ `astro.config.mjs integrations[]` ∨ `src/pages/*.{ts,js}` ! pair w/ §I admission ∈ same commit ∨ §B record ∀ intentional deferral.
5. Internal config refs ∈ {`public/_headers` cache-rule blocks, `src/layouts/Layout.astro` route-label maps} ! reference only §I-enumerated live surfaces — dead-route ∨ dead-build-output refs ≡ V92 violation (same surface-completeness class as B15/B16/B19).

## parity audit — V72(d) recipe extension

Per V72(d)(∆): narrative wording ∈ `src/pages/llms-full.txt.ts` ≡ §V drift target — /sdd:check audits llms-full.txt narrative blocks against corresponding human-facing primary-page source.

**Authoring discipline**: hand-tuned voice retained — author rewrites llms-full.txt narrative TS strings to match human-page intent ∧ register; ⊥ word-for-word HTML strip ∴ mechanical, ⊥ model-generated mirroring.

Per-page mirror pairs → see V72(d)(∆) SPEC.md body (normative source for which page ↔ which blocks).

## bold-self-sufficiency audit — V93 recipe extension

Per V93: ∀ bold-rendered phrase ! ≡ complete self-sufficient claim.

**Banned forms** (with examples):
- (a) leading-pronoun bold — `This is...`, `It's...`, `That's...`, `They are...`, `Here's...`, `Here is...` — anaphor requires antecedent ∴ ⊥ standalone
- (b) single-token emphasis on conjunction ∨ preposition — e.g. bolded `and`, `but`, `or`, `for` — emphasis-without-claim, ⊥ standalone meaning
- (c) label-only bold without labeled value — e.g. `Built on:` w/o tech-stack list bolded — label phrase ⊥ standalone; must extend bold to full clause ∨ drop bold on label

**Admitted forms** (with examples):
- (i) declarative claim w/ explicit subject + verb — e.g. `MailPilot grounds every answer in a source document.`
- (ii) brand-noun ∨ proper-noun standalone reference — e.g. `MailPilot`
- (iii) imperative action-rule short phrase — e.g. `Measure cost per outcome`, `Cap usage`, `Scale to zero when idle` (imperative verb + object)
- (iv) self-descriptive credentials phrase — e.g. `20+ years shipping production software` (implicit-`I` admitted ∀ self-descriptive credentials ∵ first-person voice context site-wide)

**Orthogonal** to V11 (vocabulary register ≡ separate concern) ∧ V60 (blog heading spine ≡ separate reader pass).
