---
type: Reference
title: Scoring Rules
description: Core scoring rules and eligibility criteria for the Lightning Run Club.
---
## Scoring Rules

| Rule                    | Definition                                                                                                                             | Notes                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| R1 Week boundary        | Mon 00:00 → Sun 23:59:59 **America/New_York**; legacy Sunday-dated weeks normalized to Monday-of-week                                  | Week keys `YYYY-Www`                                                                      |
| R2 Required miles       | 2.0 × (Lightning games that week)                                                                                                      | 0 games (bye/Olympic break) → week excluded from denominators; **does not break streaks** |
| R3 Qualifying types     | `Run`, `VirtualRun`, `TrailRun`, `Walk`, `Hike`                                                                                        | **Excluded: all bike types** (incl. `EBikeRide`, `VirtualRide`)                           |
| R4 Aggregation          | Sum within week; all-at-once or spread out                                                                                             |                                                                                           |
| R5 Qualification        | Binary, all-or-nothing                                                                                                                 | Configurable → partial-credit display later                                               |
| R6 Eligibility          | ACTIVE before the week's Monday                                                                                                        |                                                                                           |
| R7 Late syncs           | Retroactive 14 days (configurable)                                                                                                     | Idempotent recompute covers                                                               |
| R8 Standing             | Weeks qualified; tiebreak = qualifying miles                                                                                           |                                                                                           |
| R9 Units                | Meters internally (2.0 mi = 3,218.69 m); miles, 2 dp, for display                                                                      |                                                                                           |
| R10 Manual entries      | Count                                                                                                                                  | State in club rules                                                                       |
| R11 Season scope        | Regular season + playoffs (sheets run into May) — historical default; configurable per season                                          | `gameType` distinguishes                                                                  |
| **R12 Legacy fidelity** | Historical qualification recomputed with current rules; recorded spreadsheet values retained as comparison fields, not source of truth | Discrepancies surface in migration report                                                 |

---
