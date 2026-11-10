# Pathfolio — Full-Stack Career & Portfolio Platform

**Pathfolio** is a modern, scalable, full-stack career-development platform designed for students and early-career software developers. It brings together profile management, career roadmaps, actionable learning plans, project recommendations, resume and portfolio builders, and an AI career assistant into a single connected career ecosystem.

---

## 🛠️ Technology Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose (includes automatic memory-store fallback during local development if MongoDB service is offline)
- **AI Service Abstraction**: Multi-provider support for Google Gemini API, OpenAI API, and an intelligent rule-based Mock fallback provider
- **Authentication**: JWT (JSON Web Tokens), bcrypt password hashing, input validation, and protected routes

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create or update `.env`:
```env
PORT=5000

# MongoDB Atlas Cloud Database (Recommended):
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/pathfolio?retryWrites=true&w=majority

# Local MongoDB (Alternative for offline local development):
# MONGODB_URI=mongodb://127.0.0.1:27017/pathfolio

JWT_SECRET=pathfolio_super_secret_jwt_key_2026

# AI Provider Options: gemini | openai | mock
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```

### 3. Verify Database Connection
```bash
npm test
```
(Or run `npm run seed` to populate initial roadmaps and project recommendations).

### 4. Start Application
```bash
npm start
```
Open **`http://localhost:5000`** in your browser.


---

## 🌟 Key Application Features

1. **Public Landing Page**:
   - Hero section ("Build Your Career. Build Your Path.")
   - Feature highlights, step-by-step workflow, expandable FAQ accordion, responsive navigation.
2. **Secure Authentication**:
   - Registration and Login with bcrypt password hashing and JWT sessions.
3. **Authenticated Dashboard**:
   - Career progress metrics, quick action buttons, personalized recommended next steps.
4. **Comprehensive User Profile**:
   - Basic Info, Education, Skills chips, Work Experience, Projects, Certifications, and Social Links.
5. **Career Roadmaps & Filtering**:
   - Multi-level stages for Full Stack, Backend, Data, Cloud/DevOps, Cybersecurity, and Embedded Systems.
   - Filter by current skills, target skills, or educational branch.
6. **Actionable Learning Planner**:
   - Converts active roadmaps into week-by-week todo tasks with completion tracking and interview prep.
7. **Project Recommendations Engine**:
   - Skill-matched projects. Completing projects automatically syncs them to the user's profile to power Resumes and Portfolios.
8. **Resume Builder**:
   - 5 modular templates (Classic, Modern, Developer, Minimal, Professional), profile auto-sync, AI style prompt customization, PDF export.
9. **Portfolio Builder**:
   - 5 templates, custom AI design prompt with safe structured JSON configuration, responsive device preview toggle (Desktop/Tablet/Mobile), HTML package export.
10. **Floating AI Career Assistant**:
    - Floating bottom-right chatbot providing context-aware advice based on user profile and roadmap progress.
11. **🎉 Signature 3D Paper Crunch Ball Transition**:
    - Realistic paper-crumpling animation between all pages and theme switches (see below).

---

## 🎉 Signature Paper Crunch Ball Animation

Pathfolio's most distinctive feature: a fully 3D, physically-modeled paper-crumpling transition system built with **Three.js WebGL** — no pre-rendered videos, no sprite sheets, no fake CSS tricks.

### How It Works

Every page navigation and theme switch triggers a 5-stage animation:

1. **Page Crunch** — The current page visually compresses inward via a procedural vertex-deformation mesh (52×52 subdivisions, 6 pinch anchors, 4 overlapping fold vectors).
2. **Paper Ball** — Vertices are radially projected onto an irregular sphere (`BALL_RADIUS: 0.95`) with faceted displacement, creating a tactile crumpled-paper ball at screen center.
3. **Apex** — The view/theme change fires here (guaranteed frame-safe trigger at 44% progress). The ball rotates with a soft ambient + directional light rig (`roughness: 0.94, metalness: 0.0`).
4. **Unfold** — The ball progressively flattens back via inverse deformation, expanding to fill the viewport.
5. **Settle** — A subtle CSS `paper-unfold-settle` keyframe completes the reveal; the transition overlay is removed and interaction is restored.

### Architecture

| File | Purpose |
|---|---|
| `client/public/js/paper/paperCrunch.js` | Core `PaperCrunchEngine` singleton — WebGL init, vertex deformation, animation loop |
| `client/public/js/paper/paperTransitions.js` | Coordinator — page transitions, theme transforms, modal physics |
| `client/public/css/paper/paper-crunch.css` | Overlay styles, `paper-unfold-settle` keyframe, reduced-motion guard |
| `client/public/js/utils/themeManager.js` | `setThemeStyle()` — triggers paper crunch on theme change |
| `client/public/js/app.js` | `navigate()` — calls transitions with debounce guard |

### Features

- ✅ **All 8 app pages** use the same transition engine
- ✅ **Professional ↔ Paper World** theme switch with contextual badge
- ✅ **Localized modal physics** (`openComponent` / `closeComponent`) for roadmap, project, and profile panels
- ✅ **Browser back/forward** history triggers transitions
- ✅ **Rapid-navigation debounce** guard prevents overlapping animations
- ✅ **Reduced-motion accessibility** — skips deformation, fires callback instantly
- ✅ **CSS 3D fallback** for environments without WebGL

### Running the Animation Test Suite

```bash
npm run test:paper-crunch
```

Runs 18 Playwright E2E tests covering engine init, theme transforms, all 8 page routes, modal physics, browser history, rapid-nav guard, reduced-motion mode, and the CSS fallback.

Expected output:
```
TOTAL TESTS: 18 | PASSED: 18 | FAILED: 0 | Console Errors: 0
```
