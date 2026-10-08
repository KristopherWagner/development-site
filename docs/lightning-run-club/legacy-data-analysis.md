---
type: Reference
title: Legacy Data Analysis
description: Analysis of the legacy spreadsheet and migration findings.
resource: 
tags: [migration, legacy-data, spreadsheet]
---

# Legacy Data Analysis (source: `Reddit-TBL-Fitness-Challenge.xlsm`, inspected 2026-09-16)

The workbook contains **9 sheets**: `Overall` + one per season `2018-2019` … `2025-2026`. Findings that drive the migration design:

| # | Finding | Design consequence |
|---|---|---|
| L1 | **Two layout generations.** Modern sheets (≈2023-24 onward): summary block (`Name, This Week, This Season, Weekly Completion %, Streak`) beside a wide matrix (`Runner, Total Distance, Percentage,` then Monday-dated week columns with miles). Oldest sheet (2018-19): minimal layout (`Runner` + date columns only, weeks dated **Sundays**, starting 2019-02-03 — late-starting season tracking). | Importer needs per-season format handlers; normalize all week keys to Monday-of-week (ET). |
| L2 | **Weekly miles matrix is the primary source of truth** — one numeric cell per runner per week (e.g., `Kayla Lehn / week of 2026-03-30 = 28.1`). Summary columns are **derived** (recomputable). | Migrate the matrix as raw facts; recompute completion %, streaks, season totals in the Scorer — never transcribe derived values. |
| L3 | **Streaks are long-lived**: values up to 115 consecutive weeks (Brie McFarland, 2025-26). | Streak logic must be exact; recompute from week matrix + qualification rules, then **validate against recorded streaks** and reconcile discrepancies. |
| L4 | **Game-level requirements are not stored** — only weekly miles and resulting completion %. Qualification historically = 2 mi per game; games-per-week must come from the NHL schedule (regular + playoffs — sheets run into May, incl. playoff weeks). | Scorer recomputes qualification from NHL data for 2018–2026; report mismatches vs recorded completion %. |
| L5 | **Identity is messy**: nicknames (`Young Money`, `Cruel Ruin`, `Jeff Takeover`, `Traci G`), name drift across seasons (marriage/rename), NaN "Perfect seasons" (= 0). | Canonical member registry + alias table + admin UI to confirm fuzzy matches before linking to Strava athlete IDs. |
| L6 | **Gaps are real weeks, not errors**: 2025-26 skips 2026-02-16/02-23 (Olympic break); 2018-19 starts mid-February. | Zero-game weeks are excluded from denominators and **do not break streaks**; partial first/last seasons are valid. |
| L7 | `Overall` aggregates (Seasons, Total Mileage, AVG Completion, Perfect seasons) are derivable. | Recompute at migration as a validation check against the sheet — aggregate agreement = migration correctness proof. |
