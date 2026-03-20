# Portfolio

This repository is the **home for programme-level issues** for **[Reason Reserve](https://github.com/reasonreserve)** (Aruait): epics, phases, outcomes, and links to detailed work in other repos.

## Org project board

The GitHub org project **[Portfolio](https://github.com/orgs/reasonreserve/projects/1)** is the stakeholder-facing **table / board / roadmap** view across repositories. **Issues live here** (`reasonreserve/portfolio`); the **project** adds status, dates, and filtered views without replacing this repo as the source of truth.

| Surface | Role |
|--------|------|
| **`reasonreserve/portfolio`** (this repo) | Epic issues, descriptions, comments, sub-issues, cross-repo links |
| **[Portfolio](https://github.com/orgs/reasonreserve/projects/1)** (org project) | Planning views, fields, roadmap layout for executives and partners |

## Programme backlog (live)

**Phases** (24-month structure from the innovation ideekavand; adjust **Start / Target** on the board when the official start month is fixed):

| Phase | Issue |
|--------|--------|
| **I — Analysis & prototype (M1–M6)** | [#1](https://github.com/reasonreserve/portfolio/issues/1) |
| **II — Technical framework & build (M7–M16)** | [#2](https://github.com/reasonreserve/portfolio/issues/2) |
| **III — Pilot & validation (M17–M24)** | [#3](https://github.com/reasonreserve/portfolio/issues/3) |

**Outcomes** (deliverables / measures of done):

| Outcome | Issue |
|---------|--------|
| Identity 2.0 — machine delegation | [#4](https://github.com/reasonreserve/portfolio/issues/4) |
| Trust registry — agent registry | [#5](https://github.com/reasonreserve/portfolio/issues/5) |
| Interoperability — MCP / A2A & standards | [#6](https://github.com/reasonreserve/portfolio/issues/6) |
| MaRu pilot — MVP | [#7](https://github.com/reasonreserve/portfolio/issues/7) |

## Repository layout

| Path | Role |
|------|------|
| [`docs/`](docs/) | **Public narrative** for **GitHub Pages** (Jekyll): business, technical, **legal**, **governance**, plus `_config.yml` / `Gemfile`. |
| [`sources/originals/`](sources/originals/) | Source uploads (e.g. ideekavand `.docx`); canonical summaries live in `docs/`. |
| [`docs/assets/`](docs/assets/) | Images and diagrams for the published site (GitHub Pages serves from `docs/`). |

Operational tracking stays in **issues** and the **[org project](https://github.com/orgs/reasonreserve/projects/1)**; the folders above are for **published, reviewable** content the PM and contributors maintain alongside epics.

## What goes here

- Phase- or outcome-level **epics** (e.g. analysis & prototype, build, pilot).
- **Markdown under `docs/`** for strategy, roadmap, architecture, and ADRs — readable on GitHub and on Pages.
- Links to procurement, partners, and programme documents as needed.
- References to execution issues in repos such as [`handbook`](https://github.com/reasonreserve/handbook) and future product repositories.

## GitHub Pages (Jekyll)

Enable **Settings → Pages → Build from `/docs` on `main`**. The site will be served at `https://reasonreserve.github.io/portfolio/`.

Local preview:

```bash
cd docs && bundle install && bundle exec jekyll serve
```

## Conventions

Commit messages in org repos follow **[Conventional Commits](https://github.com/reasonreserve/handbook/blob/main/docs/conventional-commits.md)** (imperative subjects; see also [this cheatsheet](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)).

## Related

- Organisation: [@reasonreserve](https://github.com/reasonreserve)
- Handbook (DX): [`reasonreserve/handbook`](https://github.com/reasonreserve/handbook)
