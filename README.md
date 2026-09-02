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
MONGODB_URI=mongodb://127.0.0.1:27017/pathfolio
JWT_SECRET=pathfolio_super_secret_jwt_key_2026

# AI Provider Options: gemini | openai | mock
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```

### 3. Start Application
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
