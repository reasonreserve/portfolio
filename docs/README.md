# Documentation site (`docs/`)

This folder is the intended **root for [GitHub Pages](https://docs.github.com/pages)** (e.g. *Settings → Pages → Build from branch → `/docs` on `main`*). Everything here should be suitable for a **public, multi-audience** landing: citizens, partners, executives, and engineers.

## Layout

| Path | Audience | Purpose |
|------|----------|---------|
| [`business/`](business/) | PM, leadership, partners, funders | Strategy, roadmaps, programme narrative, procurement *summaries* |
| [`technical/`](technical/) | Architects, integrators, security | Architecture, ADRs, standards, integration notes |
| [`legal/`](legal/) | Legal, compliance, partners | Public-facing legal *summaries* (vetted by RIA legal) |
| [`governance/`](governance/) | Leadership, PM | Steering, reporting, [exec issue spec](governance/exec-issue-spec.md) for dashboard reviews |
| [`assets/`](assets/) | Designers, authors | Images and diagrams for the published site |
| [`index.md`](index.md) | Everyone | Home page (Jekyll) |
| [`_config.yml`](_config.yml) | — | Jekyll / GitHub Pages configuration |

The **[Portfolio org project](https://github.com/orgs/reasonreserve/projects/1)** is the operational **roadmap** (dates, status); **issues** hold **scope**; this tree is the **readable, linkable narrative** — update it when the project or issues change.

## Conventions

- **One topic per folder** — add a short `README.md` as a table of contents where a folder holds several documents.
- **Stable slugs** — use lowercase, hyphens in filenames (`ma-ru-pilot-overview.md`).
- **Cross-link** to portfolio issues (`https://github.com/reasonreserve/portfolio/issues/N`) and to other repos (e.g. `handbook`) instead of duplicating execution detail.
