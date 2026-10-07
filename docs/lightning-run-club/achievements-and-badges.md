---
type: Reference
title: Achievements & Badges
description: Configuration for the badge engine and historical backfill.
---
## Achievements & Badges (long-term goal — designed now, built in Phase 4)

**Principle:** rules are **data, not code** — a `CONFIG/BADGES` JSON document the Scorer evaluates each recompute. Adding a badge never requires a deploy.

```json
[
  {
    "id": "perfect_season",
    "name": "Flawless",
    "condition": { "type": "season_completion", "gte": 1.0 }
  },
  {
    "id": "streak_25",
    "name": "Quarter Century",
    "condition": { "type": "streak_weeks", "gte": 25 }
  },
  {
    "id": "streak_100",
    "name": "Centurion",
    "condition": { "type": "streak_weeks", "gte": 100 }
  },
  {
    "id": "miles_1000",
    "name": "1K Club",
    "condition": { "type": "lifetime_miles", "gte": 1000 }
  },
  {
    "id": "miles_5000",
    "name": "5K Lifetime",
    "condition": { "type": "lifetime_miles", "gte": 5000 }
  },
  {
    "id": "seasons_5",
    "name": "Old Salt",
    "condition": { "type": "seasons_count", "gte": 5 }
  }
]
```

- **Evaluation:** on each Scorer run, per member, per rule → idempotent `ACHV` items (`awarded_at` immutable; once awarded, always awarded — a broken streak never strips a badge).
- **Backfill:** at migration, evaluate historical data retroactively → long-tenure members (e.g., 115-week streaks, multi-perfect-season runners like Brie/Bobbi McFarland) receive their backlog of badges on day one. This is a great launch moment.
- **Display:** Badge shelf on member profile + leaderboard hover; optional weekly "new badges" digest (Phase 4).
- **New-condition types** (future): per-week mileage peaks, playoff-week qualification, comeback season, early-bird (first to qualify each week). The `condition.type` enum is the only code change needed.

---
