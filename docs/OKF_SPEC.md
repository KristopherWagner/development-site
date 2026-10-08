---
type: Specification
title: Open Knowledge Format (OKF) Specification
description: The specification for an open, human-and agent-friendly knowledge format.
resource: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
---
# Open Knowledge Format (OKF) Specification

OKF is an open, human- and agent-friendly format for representing knowledge: the metadata, context, and curated insight that surrounds data and systems.

## Core Principles
- **Readable**: By humans without tooling.
- **Parseable**: By agents without bespoke SDKs.
- **Diffable**: In version control.
- **Portable**: Across tools, organizations, and time.

## Structure
A knowledge bundle is a directory of Markdown files.
- `index.md`: Directory listing (optional). May include an `okf_version` key.
- `log.md`: Update history (optional). A flat list of date-grouped entries, organized **newest first** using `YYYY-MM-DD` headings.
- `<concept>.md`: A single unit of knowledge.

## Concept Document Format
Every concept is a UTF-8 markdown file with a YAML frontmatter block and a markdown body.

### Required Frontmatter
- `type`: A short string identifying the kind of concept (e.g., `BigQuery Table`, `API Endpoint`, `Metric`, `Playbook`, `Reference`, `Attested Computation`).

### Recommended Frontmatter
- `title`: Human-readable display name.
- `description`: A single sentence summary.
- `resource`: A URI identifying the underlying asset.
- `tags`: A list of short strings for categorization.

### Optional Families
- **Provenance**: `sources` (list of origins).
- **Trust**: `verified` (unverified, machine-confirmed, human-reviewed).
- **Lifecycle**: `status`, `stale_after` (lifecycle), `generated` or `modified` timestamps and actors.
- **Computation**: For `type: Attested Computation` (see below).

### Attribution
Claims should use markdown footnotes mapped to specific `sources` IDs to provide verifiable provenance.

## Conventional Body Headings
- `# Schema`: Structured description of fields/columns.
- `# Examples`: Concrete usage examples.
- `# Computation`: The sanctioned computation (for Attested Computations).

## Attested Computations
Concepts of `type: Attested Computation` must adhere to the following contract:

### Required Contract Fields
- `runtime`: Defines the execution environment.
- `parameters`: The "typed, named holes" to be filled.

### Interface Fields
- `computation`: A file path or inline block containing the logic.
- `executor`: Defines the runner and the `receipt` to be inspected.
- `attester`: The deterministic check.

### Agent Constraints
- Agents are permitted to provide values for `parameters`.
- Agents **MUST NOT** author or edit the underlying `computation` logic.

## Reference
- Official Spec: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
