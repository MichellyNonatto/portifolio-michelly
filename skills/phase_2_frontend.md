## Task Context & Objectives

You are operating as a Principal Front-End Engineer and UI Architect. Your goal in Phase 2 is to construct the modular component library and section structures for the single-page portfolio application, implementing strict design token compliance and resilient error states.

Key objectives:
1. Develop atomic UI primitives (buttons, cards, badges) using Tailwind CSS and Framer Motion.
2. Build section components: Hero, About, Experience, Projects, Skills, and Contact.
3. Construct the resilient Fallback Card component for handling service disruptions.
4. Assemble the root layout and single-page routing structure in `src/app/page.tsx`.

---

## Input Requirements & System References

- Design Tokens: Read design token mapping from `tailwind.config.js`.
- Quality Guidelines: Read local standards from `C:\Users\smart\OneDrive\Documentos\developer\apple-design-skill-main\AGENTS.md`.
- Database Types: Import Supabase type definitions from `src/types/index.ts`.

---

## Execution Directives

### Directival Analysis 1: Resilient Fallback Architecture
- Every section fetching external data (Supabase, GitHub API) must be wrapped in an error boundary or try-catch container.
- If data retrieval fails, render `src/components/sections/fallback-card.tsx`.
- The Fallback Card must contain:
  1. An illustrative fallback graphic or visual container.
  2. The exact message: "No momento não foi possível carregar esta seção em tempo real, mas você pode conferir todos os meus dados completos, histórico e contatos no meu currículo."
  3. A direct action button: "Download Resume (PDF)" linking to `/resume.pdf`.
  4. Direct links to external social profiles (LinkedIn, GitHub, Email).

### Directival Analysis 2: Componentization
- Implement smooth scroll navigation for page sections (`#hero`, `#about`, `#projects`, `#experience`, `#skills`, `#contact`).
- Create interactive project cards displaying pre-calculated AI summaries stored in Supabase.
- Build an interactive career timeline component rendering data from Supabase experiences and certifications tables.
- Ensure all animations use Framer Motion with refined easing curves aligned with Apple visual standards.

---

## Output Standards & Constraints

- Do not use decorative unicode icons or emojis in code, markup, or content text.
- Maintain strict accessibility standards (ARIA attributes, semantic HTML tags).
- Ensure all components are fully responsive across mobile, tablet, and desktop viewports.