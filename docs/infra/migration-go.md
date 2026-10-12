---
type: MigrationGuide
title: Migrate to Go for DynamoDB Operations
description: Guide for migrating from Python Lambda functions to Go implementations for better performance and reliability.
resource: docs/infra/migration-go.md
tags: [migration, dynamodb, go, lambda]
status: draft
verified: false
---

# Migration to Go for DynamoDB Operations

This document describes the planned migration path for DynamoDB operations from Python to Go, specifically for the Strava collector Lambda function.

## Current State

The current Strava Collector Lambda is implemented in Python 3.12 with:

- **Runtime**: `python3.12`
- **Memory**: 512 MB
- **Timeout**: 900 seconds (15 min)
- **Handler**: `bootstrap/bootstrap`

## Migration Benefits

| Benefit | Description |
|---------|-------------|
| **Performance** | Go has lower memory footprint and faster startup time |
| **Type Safety** | Compile-time type checking reduces runtime errors |
| **Concurrency** | Go's goroutines handle concurrent API calls efficiently |
| **Static Analysis** | Better tooling support with `go vet`, `staticcheck` |

## Migration Steps

1. **Port Python code to Go**: Use AWS SDK for Go (`github.com/aws/aws-sdk-go-v2`) instead of `boto3`
2. **Handle dependencies**: Move cryptographic operations to Go-compatible libraries
3. **Test locally**: Run against local DynamoDB before deploying to production
4. **Gradual rollout**: Deploy alongside existing Python Lambda, monitor both

## Related Documentation

- [Strava Collector Lambda](strava-collector-setup.md) — Current Python implementation
- [DynamoDB Tables](dynamodb.md) — Schema reference for Go porting

---

*Draft guide for future migration effort*
