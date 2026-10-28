# AI Agent Instructions and Guidelines (AGENTS.md)

This document provides system instructions for any AI agent tasked with building, maintaining, or auditing the portfolio application for Michelly Coelho.

## Fundamental Rules and Principles

1. Architecture and Requirements Alignment: Never alter architecture decisions, user interface requirements, or stack selections without prior explicit confirmation from the user.

2. Technology Stack Mandate: Next.js (App Router), Tailwind CSS, Framer Motion, Supabase, GitHub Actions, Google Gemini API / Groq API.

3. Front-End Architecture Standards (Next.js Feature-Based Architecture):
   - Group files and code by feature domain within the application structure to maximize cohesion and modularity (e.g., `src/features/projects`, `src/features/experience`, `src/features/analytics`).
   - Follow Clean Code principles: Keep functions small, single-purpose, and self-documenting. Maintain strict separation of concerns between presentation, business logic, and data fetching layers.

4. Coding & Naming Conventions:
   - Adhere strictly to the Airbnb JavaScript Style Guide and TypeScript ESLint recommended rules.
   - Use `camelCase` for variables, function names, class methods, and property keys.
   - Use `PascalCase` for React components, TypeScript interfaces, types, classes, and enum names.
   - Use `UPPER_SNAKE_CASE` for global immutable constants and environment keys.
   - Use explicit, descriptive variable names; avoid single-letter variables except in index loops or mathematical notation.

5. Resilient Fallback Requirement: Any component or section fetching data from external APIs or backend services must implement a fallback UI container. In case of service failure, display a fallback card containing an explanatory message, direct download link for the PDF resume, social links, and contact options.

6. Formatting Constraints: Do not use decorative emojis or icons in system documents or agent prompt outputs. Maintain clear, structured, and formal prompt engineering formats.

## Workflow Phase Breakdown

### Phase 1: Setup, Figma MCP & Reference Audit

* Instruction Document: `skills/phase_1_setup.md`

* Required Reference Checks:

  1. Design system tokens via Figma MCP integration.

  2. Local system guidelines at: `C:\Users\smart\OneDrive\Documentos\developer\apple-design-skill-main\AGENTS.md`

* Core Deliverables: `.env.local` template, Supabase SQL migrations, `tailwind.config.js` design tokens.

### Phase 2: Componentization & Front-End

* Instruction Document: `skills/phase_2_frontend.md`

### Phase 3: AI Pipeline & Automation Workflows

* Instruction Document: `skills/phase_3_pipeline.md`

### Phase 4: Testing, Analytics & Deployment

* Instruction Document: `skills/phase_4_deploy.md`

## Final Review Phase (Audit & QA Guidelines)

During the final review phase, the agent must perform a full project audit against:

1. System guidelines in `C:\Users\smart\OneDrive\Documentos\developer\apple-design-skill-main\AGENTS.md` to ensure high-grade UX/UI quality and interaction standards.

2. Code Quality & Standards Compliance: Verify that code follows Feature-Based Architecture, Clean Code patterns, and strict Airbnb/TypeScript ESLint naming conventions across all files.

3. Resilience Validation: Verify that every external integration gracefully renders fallback states with PDF resume links during network or container timeouts.