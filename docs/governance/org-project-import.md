---
title: Portfolio org project — add work packages & dates
permalink: /governance/org-project-import/
---

This page supports adding **[#8](https://github.com/reasonreserve/portfolio/issues/8)–[#28](https://github.com/reasonreserve/portfolio/issues/28)** to the org project **[Portfolio](https://github.com/orgs/reasonreserve/projects/1)** and filling **Start** / **Target** (or your project’s date fields).

## API status

Issues **#8–#28** were added to the Portfolio project with **Start date** / **Target date** set (same values as the table below), using a PAT with **`read:project`** / **`project`** scope.

If **`git credential`** still stores an older token without Projects scope, local scripts may fail until you refresh the saved credential or set **`GITHUB_TOKEN`** to a PAT that includes Projects access.

GraphQL: `addProjectV2ItemById` returns the new row on **`item { id }`** (not `projectV2Item`). Use **`updateProjectV2ItemFieldValue`** with `value: { date: "YYYY-MM-DD" }` for **Start date** / **Target date** fields.

## Option A — UI (fastest)

1. Open **[Portfolio](https://github.com/orgs/reasonreserve/projects/1)**.
2. **Add item** → **From repository** → `reasonreserve/portfolio` → search or paste issue numbers **8–28** → add each (or add in batches if the UI allows multi-select).
3. For each row, set **Start date** and **Target date** using the table below (adjust to your project’s actual field names).

## Option B — GitHub CLI (`gh`)

Install [GitHub CLI](https://cli.github.com/) and authenticate with Projects scope, e.g. `gh auth login -s project` (or add the `project` scope in token settings).

Then add items (syntax may vary slightly by `gh` version):

```bash
ORG=reasonreserve
PNUM=1   # project number in the org
REPO=reasonreserve/portfolio

for N in $(seq 8 28); do
  gh project item-add "$PNUM" --owner "$ORG" --url "https://github.com/$REPO/issues/$N"
done
```

Set dates in the UI, or use `gh project field-set` where your `gh` version supports it (see `gh project --help`).

## Start / Target suggestions

Dates align with the [programme calendar](exec-issue-spec.md) (start **2026-04-01**, end **2028-03-31**). **Outcome** rows are indicative — refine with PM as dependencies become clear.

| Issue | Suggested Start | Suggested Target | Note |
|-------|-----------------|------------------|------|
| [#8](https://github.com/reasonreserve/portfolio/issues/8) | 2026-04-01 | 2026-09-30 | Phase I |
| [#9](https://github.com/reasonreserve/portfolio/issues/9) | 2026-04-01 | 2026-09-30 | Phase I |
| [#10](https://github.com/reasonreserve/portfolio/issues/10) | 2026-04-01 | 2026-09-30 | Phase I |
| [#11](https://github.com/reasonreserve/portfolio/issues/11) | 2026-10-01 | 2027-07-31 | Phase II |
| [#12](https://github.com/reasonreserve/portfolio/issues/12) | 2026-10-01 | 2027-07-31 | Phase II |
| [#13](https://github.com/reasonreserve/portfolio/issues/13) | 2026-10-01 | 2027-07-31 | Phase II |
| [#14](https://github.com/reasonreserve/portfolio/issues/14) | 2027-08-01 | 2028-03-31 | Phase III |
| [#15](https://github.com/reasonreserve/portfolio/issues/15) | 2027-08-01 | 2028-03-31 | Phase III |
| [#16](https://github.com/reasonreserve/portfolio/issues/16) | 2027-08-01 | 2028-03-31 | Phase III |
| [#17](https://github.com/reasonreserve/portfolio/issues/17) | 2026-04-01 | 2026-09-30 | Identity — legal (Phase I) |
| [#18](https://github.com/reasonreserve/portfolio/issues/18) | 2026-10-01 | 2027-07-31 | Identity — prototype (Phase II) |
| [#19](https://github.com/reasonreserve/portfolio/issues/19) | 2027-05-01 | 2028-03-31 | Identity — integration (II→III) |
| [#20](https://github.com/reasonreserve/portfolio/issues/20) | 2026-04-01 | 2026-12-31 | Registry — governance |
| [#21](https://github.com/reasonreserve/portfolio/issues/21) | 2026-10-01 | 2027-07-31 | Registry — MVP |
| [#22](https://github.com/reasonreserve/portfolio/issues/22) | 2027-06-01 | 2028-03-31 | Registry — ops |
| [#23](https://github.com/reasonreserve/portfolio/issues/23) | 2026-04-01 | 2026-09-30 | Interop — standards (Phase I) |
| [#24](https://github.com/reasonreserve/portfolio/issues/24) | 2026-10-01 | 2027-07-31 | Interop — implementation |
| [#25](https://github.com/reasonreserve/portfolio/issues/25) | 2027-01-01 | 2028-03-31 | Interop — multi-party demo |
| [#26](https://github.com/reasonreserve/portfolio/issues/26) | 2026-10-01 | 2027-09-30 | MaRu outcome — charter / prep |
| [#27](https://github.com/reasonreserve/portfolio/issues/27) | 2027-04-01 | 2028-02-29 | MaRu outcome — automation design |
| [#28](https://github.com/reasonreserve/portfolio/issues/28) | 2027-08-01 | 2028-03-31 | MaRu outcome — measurement (Phase III) |

## Token scopes for API/scripting later

To use the GraphQL **Projects** API (automation, CI), create a PAT or GitHub App with at least:

- **`read:project`**, **`project`** (classic PAT), or  
- Fine-grained: **Organization permissions → Projects → Read and write**.

Then you can query `organization(login: "reasonreserve") { projectV2(number: 1) { id fields { nodes { ... } } } }` and run `addProjectV2ItemById` / `updateProjectV2ItemFieldValue` mutations.
