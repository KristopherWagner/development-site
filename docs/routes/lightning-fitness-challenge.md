---
type: Route
title: Lightning Fitness Challenge
description: A fitness challenge application featuring user authentication and progress tracking.
resource: https://kwagner.dev/lightning-fitness-challenge
tags: [fitness, challenge, lightning-fitness]
generated: { by: claude-code, at: 2026-10-08T15:20:00Z }
verified: { by: human:kristopher, at: 2026-10-08T15:25:00Z }
---

# Lightning Fitness Challenge Route

This route hosts the lightning-fitness-challenge application.

## Features

- User authentication via [Amazon Cognito](/docs/cognito.md).
- Interactive fitness challenge UI.
- Progress tracking and analytics.

## Login Workflow

```text
       +-----------------------+
       |    React SPA          |
       +-----------+-----------+
                   |
      (1) User Logs In / App Mounts
                   |
                   v
       +-----------------------+
       |   Go Backend (Lambda) |
       |                       |
       |  (2) Query DynamoDB:  |
       |      PK = USER#<sub>  |
       |                       |
       +-----------+-----------+
                   |
                   v
       +-----------------------+
       |   DynamoDB Table      |
       |   (UserAuthLinks)     |
       +-----------+-----------+
                   |
      (3) Response: "Connected" OR "Not Connected"
                   |
                   v
       +-----------------------+
       |    React SPA          |
       +-----------+-----------+
                   |
    IF "Not Connected" (Show Button)
                   |
                   v
      (4) User clicks "Connect Strava"
                   |
                   v
       +-----------------------+
       |   Strava Auth Page    | (External Provider)
       +-----------+-----------+
                   |
      (5) Redirect back to Backend with 'code'
                   |
                   v
       +-------------------------------------------+
       |           Go Backend (Lambda)            |
       |                                           |
       |  (6) Exchange 'code' for Tokens         |
       |  (7) Collision Check (via GSI)          |
       |  (8) Save to DynamoDB                    |
       +-----------+-------------------------------+
                   |
                   v
       +-----------------------+
       |    React SPA          |
       |  (Show Success State) |
       +-----------------------+

```
