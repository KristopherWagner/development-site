---
type: Migration
title: Migrating Strava Collector Lambda from Python to Go
description: Migration guide for converting the Python collector lambda to Go.
resource: backend/go-collector/
tags: [lambda, strava, migration, go, python]
status: draft
verified: false
generated: 2026-10-12
---

# Migrating Strava Collector Lambda from Python to Go

This document describes the migration path for converting the Strava Collector Lambda from Python to Go.

## Overview

The migration aims to improve performance, reduce cold start times, and leverage Go's better concurrency model for I/O-bound API operations.

## Migration Checklist

- [x] Create Go project structure
- [x] Implement core data structures
- [x] Port token decryption logic
- [x] Port Strava API client
- [x] Port activity fetching logic
- [ ] Implement DynamoDB integration (TODO)
- [ ] Implement AES encryption/decryption (TODO)
- [ ] Add Lambda runtime configuration
- [ ] Update documentation

## Files Created

| File | Purpose |
|------|---------|
| `backend/go-collector/main.go` | Main Lambda handler with core logic |
| `backend/go-collector/go.mod` | Go module definition |
| `backend/go-collector/README.md` | Project documentation |
| `docs/infra/migration-go.md` | This migration guide |

## Migration Steps

### Step 1: Environment Setup

Ensure you have Go installed (version 1.22+):

```bash
# Check Go version
go version

# Install AWS Lambda SDK
go get github.com/aws/aws-lambda-go@latest

# Add crypto dependency
go get golang.org/x/crypto@latest
```

### Step 2: Build and Test

```bash
cd backend/go-collector
go build -tags lambda -o collector_lambda.zip .
```

### Step 3: Deploy

Upload the generated ZIP to AWS Lambda via console or SAM.

## Backwards Compatibility Notes

The Go implementation maintains compatibility with:

- Existing environment variables
- DynamoDB schema (no changes needed)
- Strava API endpoints
- EventBridge trigger patterns

## Related Documentation

- [Strava Collector Lambda](strava-collector-setup.md) - Original Python documentation
- [DynamoDB Tables](dynamodb.md) - Data schema
