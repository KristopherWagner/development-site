---
okf_version: 0.2
type: Reference
title: External Constraints
description: Constraints imposed by the Strava API.
resource: 
tags: [strava, api, constraints]
---

# External Constraints (Strava API — as of September 2026)

1. **Club Activities endpoint removed (Sept 1, 2026)** — no club feed/roster exists → per-athlete OAuth only.
2. **Tiers (since June 2026):**
   - **Standard:** Up to ~9,999 athletes; ~100 req/15 min, ~1,000/day; requires developer's paid Strava subscription
   - **Extended Access:** For scaled apps serving >10,000 users; higher rate limits and capacity
   - **Self-upgrade (Standard ≤10 users):** Available via API Settings Dashboard without review

   ⚠️ **Note for LRC:** The 65-member club exceeds Standard's practical limits. Check current thresholds at application time; if denied due to size, document as a constraint and consider legacy import fallbacks for members unable to connect.

3. **How to Apply for Extended Access:**
   - Review [Extended Access Application Process](https://communityhub.strava.com/developers-api-7/extended-access-application-process-for-consumer-fitness-application-13438)
   - Submit via the [request form](https://share.hsforms.com/1VXSwPUYqSH6IxK0y51FjHwcnkd8) (current as of 2026)
   - ⚠️ **"Increased access is not a guarantee"** — approval depends on quality bar, compliance with [API Policy](https://cdn-1a.strava.com/legal/api_policy), and Strava's discretion
   - No specific application fee documented; review timeline undefined per policy
   - **Application images/screenshots:** Will be prepared as part of P4 (after closed beta validation) if requested during review

4. **Compliance Requirements (must meet for any Extended Access request):**
   - No AI/ML training or fine-tuning using Strava data
   - No aggregation/analytics of de-identified Strava data
   - No scraping, bulk exports, or vector store storage
   - Respect user privacy settings; only show authenticated user their own data
   - Delete all user data within 30 days of termination/deauthorization request
   - Max 7-day cache; remove immediately if resource unavailable

5. **Rate limits:** See §2 above per tier. Weekly polling of 65 athletes ≈ 65–300 req/week — fine with Extended Access approval.
6. **Token expiration:** Tokens expire every 6 hours; backend auto-refreshes and persists.
7. **API version transition (June 1, 2027):** Tokens will use headers only; base URL → `https://www.api-v3.strava.com` (one-line config change).
8. **Webhooks:** Available; Phase-4 option. Weekly polling suffices.

**NHL API:** free, no key. `GET /v1/club-schedule-season/TBL/{season}`, `/club-schedule/TBL/week/{date}`, `/scoreboard/{date}`.
