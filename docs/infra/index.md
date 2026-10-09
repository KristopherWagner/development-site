---
type: Index
title: Infrastructure Configuration
description: Overview of AWS infrastructure configuration for the Lightning Fitness Challenge system.
tags: [aws, infrastructure, configuration]
status: stable
---

# Infrastructure Configuration

This directory contains documentation for AWS infrastructure components used by the Lightning Fitness Challenge system.

## Overview

These documents describe the AWS services configured in the production environment, including authentication, API Gateway, DynamoDB tables, S3 buckets, and EventBridge schedulers.

## Resources

- [Amazon Cognito Configuration](cognito.md) — Configuration for the Cognito User Pool and App Client used by authentication.
- [API Gateway Setup](api-gateway-setup.md) — AWS API Gateway HTTP API configuration with Cognito JWT authorizer.
- [DynamoDB Tables](dynamodb.md) — Schema and configuration for the LFC DynamoDB table.
- [S3 Buckets](s3.md) — Actual AWS S3 bucket settings as configured in the AWS Console.
- [EventBridge Scheduler](eventbridge-scheduler-setup.md) — Configuration for EventBridge Scheduler triggering collector Lambda weekly.
