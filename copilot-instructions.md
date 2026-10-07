# Project Instructions

## Open Knowledge Format (OKF)
This repository follows the Open Knowledge Format (OKF) specification.
- **Reference Spec**: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
- **Local Specification**: [docs/OKF_SPEC.md](/docs/OKF_SPEC.md)

**Instruction:**
All documentation updates, design documents, and knowledge base entries must adhere to the OKF structure and metadata requirements. When creating or modifying files in the `docs/` directory, ensure they include the required and recommended YAML frontmatter as defined in the local specification.

## File Management & Refactoring
- **Reference Integrity**: Whenever a file is moved, renamed, or deleted, you MUST perform a repository-wide search (using `grep` or `search_code_subagent`) to identify and update all internal links, references, and mentions of that file.
- **Documentation Consistency**: Ensure that all documentation (including `index.md` and project-specific docs) is updated to reflect the new file paths.
