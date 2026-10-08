---
type: Reference
title: External Constraints
description: Constraints imposed by the Strava API.
resource: 
tags: [strava, api, constraints]
---

# External Constraints (Strava API — as of September 2026)

1. **Club Activities endpoint removed (Sept 1, 2026)** — no club feed/roster exists → per-athlete OAuth only.
2. **Tiers (since June 2026):** Standard ~10 users, requires developer's paid Strava subscription; **Extended Access required for 65-member club** → apply at P0; approval lead time is the schedule's biggest risk. No scraping/aggregator workarounds — Strava actively bans them.
3. **Rate limits:** Standard ~100 req/15 min, ~1,000/day; Extended higher. Weekly polling of 65 athletes ≈ 65–300 req/week — fine.
4. **Tokens expire every 6 hours**; backend auto-refreshes and persists.
5. **June 1, 2027:** tokens in headers only; base URL → `https://www.api-v3.strava.com` (one-line config change; code with headers now).
6. **Webhooks** available; Phase-4 option. Weekly polling suffices.

**NHL API:** free, no key. `GET /v1/club-schedule-season/TBL/{season}`, `/club-schedule/TBL/week/{date}`, `/scoreboard/{date}`.
