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

## tech-token era-floor audit — V53 recipe extension

Per V53 (lab5.ca SPEC.md): engagement bullet ∈ `/resume` ∧ `kb-resume.md` ! satisfy tech-token era-floor per §I `tech-token era-floor` table.

**Recipe**: ∀ engagement row ∈ {`src/pages/resume.astro`, `public/kb-resume.md`}:

1. Extract engagement-start-year from date range column.
2. Parse tech-token mentions ∈ bullet text body (free-text grep against §I era-floor token set).
3. Lookup floor year ∀ matched token ∈ §I `tech-token era-floor` table.
4. Flag token-year-floor > engagement-start-year as VIOLATE.

**Violation examples** (anti-pattern set):

- `DevOps` role-naming ∈ Systems Engineer position pre-2009 (DevOps-as-discipline ≥2009 floor).
- Kubernetes claim pre-2015 (K8s ≥2015 floor).
- Docker claim pre-2013 (Docker ≥2013 floor).
- LLM-agent ∨ Pydantic AI claim pre-2023 (LLM agents production-ish ≥2023, Pydantic AI ≥2024).

**Vocab maintenance**: era-token vocab ! be appended to §I `tech-token era-floor` table on first use ∈ /resume bullets (table append-only per §I).

## surface-completeness audit — V55 recipe extension

Per V55 (lab5.ca SPEC.md): ∀ URL-accessible surface ! enumerated ∈ §I `asset:` list ∨ `route:` list.

**Recipe** (`/sdd:check §I` list-shape sub-recipe):

1. Extract §I declared surface set: parse §I `asset:` + `route:` bullet lines.
2. Extract code surface set: `rg public/* tracked files ∪ rg integrations: ∈ astro.config.mjs ∪ ls src/pages/*.{ts,js}`.
3. Diff:
   - §I − code → MISSING (declared but unbuilt).
   - code − §I → EXTRA (built but undeclared → V55 violation, recurrence class of B15/B16/B19).
4. Carrier-pairing check: closed §T touching `public/` ∨ `astro.config.mjs integrations[]` ∨ `src/pages/*.{ts,js}` ! pair w/ §I admission ∈ same commit ∨ §B record ∀ intentional deferral.
5. Internal config refs ∈ {`public/_headers` cache-rule blocks, `src/layouts/Layout.astro` route-label maps} ! reference only §I-enumerated live surfaces — dead-route ∨ dead-build-output refs ≡ V55 violation (same surface-completeness class as B15/B16/B19).
