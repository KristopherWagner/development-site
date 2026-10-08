---
type: Reference
title: Data Model
description: DynamoDB schema for the Lightning Run Club automation.
resource: 
tags: [database, dynamoDB, schema]
---

# Schema

The system uses a single table `lrc` with a composite primary key (Partition Key, Sort Key) to store all entities.

```
PK                        SK                       Attributes
──────────────────────── ──────────────────────── ─────────────────────────────────────
MEMBER#{athlete_id}       PROFILE                  name, avatar_url, status, club_email,
                                                   joined_at, lifetime_miles (denorm cache)
MEMBER#{athlete_id}       TOKEN                    access_token (enc), refresh_token (enc), expires_at
MEMBER#{athlete_id}       ALIAS#{legacy_name}      → canonical member pointer (identity map)
MEMBER#{athlete_id}       ACT#{activity_id}        date_local, type, distance_m, moving_time_s
MEMBER#{athlete_id}       WEEKMILE#{season}#{week} miles, source(LIVE|LEGACY), recorded_streak?  ← legacy import
MEMBER#{athlete_id}       STREAK                   current_streak, best_streak, best_streak_at
MEMBER#{athlete_id}       ACHV#{badge_id}          awarded_at, season?, value (e.g., miles at award)
GAME#{game_id}            INFO                     game_date_et, week_key, opponent, gameType
WEEK#{week_key}           GAMES                    game_ids[], game_count, required_miles
SEASON#{yyyyyyyy}         SUMMARY                  per-member aggregates blob (denormalized read model)
RESULTS                   LATEST                   s3_key, computed_at, season
CONFIG                    RULES                    R1–R12 parameters
CONFIG                    BADGES                   achievement definitions (JSON, see §9)
MIGRATION                 REPORT#{run_id}          validation results, discrepancy counts
```

### Indices & Relationships
- **GSI1** on ACT items (`week_key`) and WEEKMILE items (`week_key`) → Scorer pulls weekly aggregates directly.
- Cognito user ↔ member link: `club_email` on PROFILE; first Connect-with-Strava binds athlete_id.
- Legacy members who never connect remain visible in History under display name (F9 satisfied without requiring 100% connect-through).
- TTL: 2-year on ACT items.
