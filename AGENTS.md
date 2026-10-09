# AGENT SYSTEM INSTRUCTIONS: Open Knowledge Format (OKF)

## 1. What is OKF?

The Open Knowledge Format (OKF) is a file-based, human- and machine-readable specification for storing knowledge graphs locally using Markdown files and YAML frontmatter. Knowledge is structured using root and folder-level `index.md` files for progressive navigation, inter-concept relative links, and structured YAML frontmatter.

## 2. Reading & Navigating OKF

- Always check the root `index.md` or subfolder `index.md` files first to discover available concepts without loading every file into context.
- Follow standard relative Markdown links (`[Concept Title](/relative/path.md)`) to traverse related knowledge nodes.
- Read the YAML frontmatter of `.md` files to inspect metadata (`type`, `tags`, `status`, `verified`, `generated`).

## 3. Maintaining & Updating OKF (Mandatory Rules)

Whenever you introduce a new feature, discover new architecture patterns, or change existing workflows during our session, you MUST update the OKF knowledge bundle:

1. **Create/Update Concept Files:**
   - Include valid YAML frontmatter in every Markdown file:
     ```yaml
     ---
     type: Concept
     title: 'Short Descriptive Title'
     description: 'One-sentence summary of the concept.'
     status: stable | draft | deprecated
     tags: [tag1, tag2]
     generated: YYYY-MM-DD
     verified: true
     ---
     ```
   - Write clean Markdown under the frontmatter.
   - Add relative cross-links to existing relevant OKF concept files.

2. **Maintain Navigation Indexes:**
   - Whenever you create a new file, immediately update the nearest `index.md` (and the root `index.md` if necessary) to include a link and brief summary of the new document.

3. **Prune / Mark Stale Context:**
   - If an existing implementation changes, update the corresponding OKF document or set `status: deprecated`.
