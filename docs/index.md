---
okf_version: 0.2
type: Directory Listing
---

# Documentation Index

This directory contains the core documentation and templates for the development site.

## Specifications

- [OKF Specification](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md) - The Open Knowledge Format specification.

## Knowledge Bundles

- [Lightning Run Club](lightning-run-club/index.md) - Design specifications for the LRC automated tracker.

## Routes

- [Articles](/docs/routes/articles.md) - A repository of articles and long-form content.
- [Cookbook](/docs/routes/cookbook.md) - A collection of recipes and culinary content.
- [Lightning Fitness Challenge](/docs/routes/lightning-fitness-challenge.md) - Fitness challenge application with Cognito auth.
- [Wedding](/docs/routes/wedding.md) - Wedding-related content and layout.
- [Routes Index](/docs/routes/index.md) - Documentation of the file-based routing structure.

## Infrastructure

- [API Gateway & HTTP API](infra/api-gateway-setup.md) - Configuration for the AWS API Gateway with Cognito JWT authorizer.
- [Cognito](infra/cognito.md) - Configuration for Cognito used by lightning-fitness-challenge.
- [DynamoDB](infra/dynamodb.md) - Schema and configuration for the LFC DynamoDB table.
- [Environment Variables](environment-variables.md) - Description of how environment variables are stored and referenced.
- [EventBridge Scheduler](infra/eventbridge-scheduler-setup.md) - Configuration for weekly data collection triggers.
- [S3 Storage](infra/s3-storage-setup.md) - Configuration for results and archive buckets.

## Templates

- [Pull Request Template](pull_request_template.md) - Standard template for new PRs.
