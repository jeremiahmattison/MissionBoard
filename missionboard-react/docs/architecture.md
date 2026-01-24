# MissionBoard – Architecture Overview

## What is MissionBoard?
MissionBoard is a personal dashboard I’m building to organize tasks, notes, planning, and important files (like multiple resume PDFs). The project starts simple, with a landing page and a main app area, and is designed to grow over time as I add features and integrations.

This document explains how the project is structured and how new code should be added as the app evolves.

---

## Current State
Right now, MissionBoard is a front-end React project with:
- Vite + React
- React Router for navigation
- A landing page (`/`)
- A dashboard page (`/app`)

Authentication, data syncing, and file storage are planned but not implemented yet.

---

## How the App Is Structured
MissionBoard is a single-page application. The browser loads one page, and React controls what’s shown based on the URL.

At a high level:
- The URL decides which **page** is shown
- Pages are made up of **features**
- Some UI is shared across pages (like a sidebar)

---

## Routing
Current routes:
- `/` → Landing page
- `/app` → Main dashboard

Future routes may include:
- `/app/tasks`
- `/app/notes`
- `/app/calendar`
- `/app/files`

---

## Folder Structure (and why it exists)

### `src/pages/`
These files represent full screens tied to URLs.

Examples:
- `Landing.jsx`
- `Dashboard.jsx`

Pages should stay fairly simple. They mainly arrange layout and pull in features.

---

### `src/features/`
This is where the main functionality of the app lives.

Each feature represents something the user can do, such as:
- managing tasks
- writing notes
- planning a calendar
- storing resume files

Each feature will live in its own folder so the logic and UI for that feature stay together.

---

### `src/components/`
This folder is for small, reusable UI pieces that aren’t tied to one specific feature.

Examples:
- buttons
- modals
- form inputs
- simple cards

If a component can be reused in more than one place, it belongs here.

---

### `src/layout/`
This folder is for shared page structure, like a sidebar or top navigation, once multiple app pages need the same layout.

Layout files handle positioning and structure, not business logic.

---

### `src/lib/`
This folder is for helper code that supports the app but isn’t UI.

Examples:
- utility functions
- date helpers
- storage or API helpers (Google Drive later)

---

### `docs/`
This folder is for documentation that explains the project to people (including future me).

Examples:
- `architecture.md`
- notes about design decisions
- future plans

---

## Data Storage (Planned)
MissionBoard is planned to use Google Drive as storage so data syncs across devices.

Two types of data are expected:
1. **Small structured data** (tasks, notes, settings) stored as JSON files
2. **Large files** (like resume PDFs) stored directly in Drive, with metadata tracked in the app

PDF files will not be embedded in JSON.

---

## Sync Approach (Planned)
When Drive integration is added:
- Data will load from Drive when the app starts
- Changes will save on meaningful actions (not every keystroke)
- React state will control what’s shown on screen

---

## Guiding Principles
- Keep things simple and understandable
- Avoid over-engineering early
- Group related code together
- Add abstractions only when they’re clearly needed

## Out of Scope (For Now)
- Backend server
- Authentication
- Database
- Advanced state management libraries

These may be added later if the project grows.

---

## Next Steps
- Build out the dashboard UI
- Add the first feature module (Tasks)
- Introduce shared layout once multiple app pages exist
