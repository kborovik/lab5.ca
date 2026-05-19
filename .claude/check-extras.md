# check-extras.md — lab5.ca REPO-LOCAL audit extensions

Loaded by `sdd:check` via path probe `.claude/check-extras.md`. Each section ≡ additional audit recipe ∨ scope override applied per CHECK §V / §-cite step (sdd:check skill body, REPO-LOCAL extension recipes).

## §-cite drift recipe — scope override

Per §V.37 (lab5.ca SPEC.md): blog body ≡ documentary prose discussing external SPECs (pilot-skills SPEC.md, MailPilot, etc.) ∴ cites ∈ blog content ≡ cross-repo references, ⊥ live cites into lab5.ca SPEC.md.

**Effect**: exclude `src/content/blog/**/*.md` from REPO-LOCAL scope when running CHECK §-cite step 2 (free-text cite grep `§[VTB]\.[0-9]+`). Matches within these files ⊥ classified against lab5.ca SPEC.md rows; ⊥ emit UNRESOLVED ∨ TYPE-MISMATCH ∀ such hits.

**REPORT header declaration** (auditor surfaces in §-cite drift block): `blog content (src/content/blog/**) excluded from §-cite scope per V37`.
