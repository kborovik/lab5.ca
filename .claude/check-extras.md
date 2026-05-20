# check-extras.md — lab5.ca REPO-LOCAL audit extensions

Loaded by `sdd:check` via path probe `.claude/check-extras.md`. Each section ≡ additional audit recipe ∨ scope override applied per CHECK §V / §-cite step (sdd:check skill body, REPO-LOCAL extension recipes).

## §-cite drift recipe — scope override

Per V37 (lab5.ca SPEC.md): documentary cite forms ≡ ⊥ live cites; live cites stay ∈ typed `§T.cites` ∧ `§B.fix` columns. Two exclusions apply when running CHECK §-cite step 2 (free-text grep `§[VTB]\.[0-9]+`):

### (1) blog content

blog body ≡ documentary prose discussing external SPECs (pilot-skills SPEC.md, MailPilot, etc.) ∴ cites ∈ blog content ≡ cross-repo references, ⊥ live cites into lab5.ca SPEC.md.

**Effect**: exclude `src/content/blog/**/*.md` from REPO-LOCAL scope. Matches within these files ⊥ classified against lab5.ca SPEC.md rows; ⊥ emit UNRESOLVED ∨ TYPE-MISMATCH ∀ such hits.

### (2) SPEC.md §B/§T narrative columns

§B `cause` column ∧ §T `task` column ∈ SPEC.md often quote historical cite forms (e.g. `/sdd:check` tool output records, prior-state snapshots, references to rows that may have been renumbered ∨ that lived ∈ external SPECs). These ≡ documentary by convention, ⊥ live cites — live cites for §B/§T rows live ∈ their respective typed columns (§T.cites col 4, §B.fix col 4), parsed via step 1 of the §-cite recipe.

**Effect**: when scanning SPEC.md for free-text `§[VTB]\.[0-9]+` matches, exclude matches within §B `cause` column (col 3 of `id|date|cause|fix` table) ∧ §T `task` column (col 3 of `id|status|task|cites` table). Typed cite columns (§T.cites, §B.fix) remain ∈ scope per step 1. Implementation ≡ pipe-split each row of §B/§T pipe-tables on `|`, scope free-text grep to cols {1,2,4+} only ∀ those tables; rest of SPEC.md (§G, §C, §I, §V bodies) stays ∈ scope unchanged.

**REPORT header declaration** (auditor surfaces in §-cite drift block): `blog content (src/content/blog/**) ∧ SPEC.md §B/§T narrative columns excluded from free-text §-cite scope per V37`.
