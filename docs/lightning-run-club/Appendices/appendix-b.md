---
type: Reference
title: Appendix B — OAuth Connect Flow
description: Detailed design of the Cognito and Strava authentication binding.
---
## Appendix B — OAuth Connect Flow: Cognito ↔ Strava (P1 build spec)

### B.1 The two auth systems and how they bind

| System                                     | Proves                                                    | Produces                                                           |
| ------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------ |
| **Cognito** (Amplify Auth)                 | "This human is an authorized club member"                 | JWT (ID + access token), identifies user by `sub` + `email`        |
| **Strava OAuth** (authorization code flow) | "This member authorized our app to read their activities" | Strava `access_token` (6-hr expiry), `refresh_token`, `athlete_id` |

**The binding:** a DynamoDB item links `cognito_sub` ↔ `athlete_id`. A member's Strava data is only ever visible to the Cognito user with the matching `sub`.

**Why the `state` nonce exists:** Strava's callback arrives as a browser redirect from Strava's servers — it cannot carry the member's Cognito JWT. The nonce is the trusted bridge: the backend writes `{state → cognito_sub}` _before_ redirecting to Strava, and reads it back in the callback, proving the Strava authorization belongs to the logged-in member.

### B.2 Sequence

```
Member (logged in via Cognito/Amplify Auth, holds JWT)
  │
  │ ① GET /connect-url        (API Gateway, Cognito JWT authorizer)
  ▼
Lambda "ConnectUrl" ── creates state = uuid4(), TTL 10 min
  │                    writes  STATE#{state} → {cognito_sub, exp}  (DynamoDB)
  │ ② returns Strava authorize URL
  ▼
Browser → GET https://www.strava.com/oauth/authorize
              ?client_id=XXX
              &redirect_uri=https://api.yoursite.com/strava/callback
              &response_type=code
              &scope=activity:read            (or activity:read_all, see B.4)
              &state={state}
  │
  │ ③ Member approves on Strava
  ▼
Strava → Browser redirect:
  GET https://api.yoursite.com/strava/callback?code={code}&state={state}
  │   (API Gateway, NO authorizer — caller is Strava's redirect, not the member;
  │    protected by the state nonce instead)
  ▼
Lambda "OAuthCallback"
  │ ④ validate: STATE#{state} exists, not expired, not used → delete (one-time)
  │ ⑤ POST https://www.strava.com/oauth/token
  │      {client_id, client_secret, code, grant_type=authorization_code}
  │   ← {access_token, refresh_token, expires_at, athlete:{id, firstname, lastname, ...}}
  │ ⑥ lookup existing MEMBER#{athlete_id}
  │      - exists & bound to a different cognito_sub → reject (data conflict; alert)
  │      - else: write PROFILE {name, avatar, club_email, cognito_sub, status=ACTIVE,
  │                 joined_at (preserve original if re-connect)}
  │        write TOKEN  {access_token, refresh_token, expires_at}   (KMS-encrypted)
  │ ⑦ 302 redirect → https://yoursite.com/run-club/connected?ok=1
  ▼
Member sees "Connected ✓" on the members-only page
```

### B.3 Endpoints to build

| Endpoint               | Auth                                                                 | Purpose                                                                                              |
| ---------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET /connect-url`     | Cognito JWT                                                          | Mint `state`, return Strava authorize URL                                                            |
| `GET /strava/callback` | **None (public)** — secured by state nonce, 10-min TTL, one-time use | Exchange code → tokens → DynamoDB                                                                    |
| `POST /disconnect`     | Cognito JWT                                                          | Call Strava `oauth/revoke`, delete TOKEN, status=REVOKED (PROFILE + history retained per club rules) |
| `GET /me`              | Cognito JWT                                                          | Return connection status + display name (drives Connect vs. Connected UI)                            |

### B.4 Design details that bite if missed

1. **Refresh-token rotation:** every Strava refresh returns a _new_ refresh token and invalidates the old one. The Collector must persist the rotated token on every call, or the member silently de-authorizes after one cycle.
2. **Scope choice:** `activity:read` (public activities only) vs `activity:read_all` (includes private). Recommend defaulting to `activity:read_all` — club runners often log privately, and the club already sees their miles via the old leaderboard. Make it a visible choice on the connect page; either way the app stores only type/date/distance/time.
3. **Re-connection:** a returning member clicking Connect again must update TOKEN on the existing PROFILE (preserving `joined_at` and history) — never create a second member row. Detect via `athlete.id`.
4. **State security:** cryptographically random, 10-minute TTL, single use, deleted on read. This is the only thing standing between an attacker and binding _their_ Strava account to _someone's_ Cognito identity.
5. **Redirect URI discipline:** must exactly match the value registered in the Strava app settings (incl. scheme — decide `https://api.yoursite.com/strava/callback` early; changing later is a config update, not a code change, but the custom domain needs to exist first).
6. **Cognito is the gate for everything except the callback.** The callback Lambda validates nothing about club membership — it doesn't need to. The `state` was minted by an authenticated caller, so only logged-in members can initiate a bind. Revoked Cognito access cuts off `/connect-url`, `/me`, results — everything.
7. **Admin pre-provisioning:** Cognito users are created from the 65 club emails (admin console or a small invite script). No self-sign-up — otherwise anyone could register and reach the members-only API.

### B.5 Testing checklist

- [ ] Happy path: connect → tokens in DynamoDB → `/me` shows Connected
- [ ] Reconnect same member: TOKEN updated, PROFILE unchanged, no duplicate
- [ ] Two Cognito users attempt to bind the same Strava athlete: second one rejected + alerted
- [ ] Expired/replayed `state`: rejected, no token exchange
- [ ] Disconnect → revoke confirmed at Strava, TOKEN gone, results API excludes member
- [ ] Token refresh rotation: two consecutive Collector runs don't break auth
