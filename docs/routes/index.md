---
type: Infrastructure
title: Routes Index
description: Documentation of the file-based routing structure using TanStack Router.
resource: https://kwagner.de/
tags: [routing, tanstack, infrastructure]
generated: { by: human:kristopher, at: 2026-10-07T10:37:00Z }
verified: { by: human:kristopher, at: 2026-10-07T10:37:00Z }
---

# Routes Index

This directory documents the routing structure of the development site.

## Routing Architecture

We use **TanStack Router** for navigation, specifically leveraging its **file-based routing** capabilities. This means the directory structure within `src/routes/` directly maps to the application's URL structure.

- **Core Library**: [TanStack Router](https://tanstack.com/router/latest)
- **Routing Strategy**: [File-based Routing](https://tanstack.com/router/latest/docs/routing/file-based-routing)

## Directory Structure

The following directories represent the primary routes:

- [Articles](/docs/routes/articles.md) - A repository of articles and long-form content.
- [Cookbook](/docs/routes/cookbook.md) - A collection of recipes and culinary content.
- [Lightning Fitness Challenge](/docs/routes/lightning-fitness-challenge.md) - Fitness challenge application with Cognito auth.
- [Wedding](/docs/routes/wedding.md) - Wedding-related content and layout.
