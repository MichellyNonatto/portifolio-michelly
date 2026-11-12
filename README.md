<div align="center">

# 🚀 Michelly Coelho — Software Engineer & AI Integrator

<img src="https://img.shields.io/badge/Status-Active%20Development-success?style=for-the-badge&logo=git" alt="Status" />
<img src="https://img.shields.io/badge/Architecture-Clean%20%2F%20Modular-blue?style=for-the-badge&logo=flux&logoColor=white" alt="Architecture" />
<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />

> *Beyond a visual showcase: an engineered platform built to demonstrate advanced technical design, architectural patterns, strict testability, automated AI synchronization, and long-term maintainability.*

</div>

---

## 🎯 Engineering Vision & Purpose

This portfolio was architected from the ground up to reflect my identity and maturity as a **Software Engineer**. Rather than acting as a static showcase of skills, the application itself serves as a **live artifact of my technical expertise**, demonstrating how I approach complex software design:

* 🏗️ **Architectural Rigor:** Built with a modular, decoupled structure that separates concerns, ensuring predictable data flow and seamless scalability.
* 🛡️ **Resilience & Fault Tolerance:** Engineered with robust fallback strategies so that core features (navigation, contacts, resume downloads) remain fully functional even during external service or database interruptions.
* 🤖 **Intelligent AI Integration:** Leverages automated pipelines driven by the **Google Gemini API** and GitHub Actions to dynamically process and summarize technical repositories without manual overhead.
* 🔄 **Future-Proof Maintainability:** Designed with strict typing, clean code principles, clear domain boundaries, and thorough validation pipelines to minimize technical debt and ease future extensions.

---

## 📐 Architectural Highlights & Technical Choices

| Dimension | Strategy & Implementation | Engineering Benefit |
| :--- | :--- | :--- |
| **API Layer & Communication** | Centralized, typed service clients abstracting external calls (Supabase, Gemini, Resend). | Eliminates tight coupling, centralizes error handling, and standardizes payloads across the app. |
| **Automated AI Pipeline** | Weekly GitHub Actions executing automated repository analysis and syncing structured insights. | Keeps portfolio content perpetually up-to-date with zero manual intervention. |
| **Design System & UI** | Neo-brutalist custom tokens, strict component boundaries, and full ARIA accessibility. | Delivers a high-contrast, performant, and inclusive user experience across viewports. |
| **Internationalization (i18n)** | Real-time locale switching (`pt-BR` / `en`) backed by cookie persistence. | Expands professional reach globally without sacrificing performance or SEO structure. |

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, Turbopack)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS v4 & Custom Design Tokens
* **Database & Backend:** Supabase (PostgreSQL, Row Level Security)
* **Artificial Intelligence:** Google Gemini API
* **Automation & CI/CD:** GitHub Actions (Validation pipelines & scheduled data sync)

---

## 🚀 Getting Started Locally

To set up, explore, and run this codebase locally:

### 1. Clone the repository and install dependencies
```bash
git clone https://github.com/MichellyNonatto/seu-repositorio.git
cd seu-repositorio
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file at the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
GEMINI_API_KEY=sua-gemini-key
GITHUB_TOKEN=seu-github-token
```

### 3. Run the Development Server
```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to inspect the application.

---

## ⚡ Useful Scripts

| Command | Action | Technical Context |
| :--- | :--- | :--- |
| `npm run dev` | Starts local development server | Fast bundling via Turbopack. |
| `npm run build` | Production compilation | Enforces strict type-checking and build optimization. |
| `npm run lint` | Static code analysis | Enforces clean code standards and style rules via ESLint. |
| `npm run pipeline:sync` | Triggers local AI sync pipeline | Tests the automated repository analysis and Supabase synchronization locally. |

---

<div align="center">
  <sub>Crafted with engineering precision and architectural intent by <b>Michelly Coelho</b>. Let's build something exceptional together!</sub>
</div>