<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this repo -->
# MAVEN-CAFEAPP — Copilot Instructions

Purpose: Give an AI coding agent the minimal project knowledge to be productive quickly.

- **Big picture**: This repo contains a React + Vite frontend (`maven-cafe-frontend`) and an Express + MongoDB backend (`maven-cafe-server`). The frontend calls backend endpoints under `/api` using a small wrapper `src/api/apiService.js`. The backend exposes REST endpoints in `server.js` and persists data via Mongoose models in `models/`.

- **How data flows**: Frontend components call `callApi(url, method, body)` which fetches `${API_BASE_URL}${url}`. Backend endpoints live at `http://localhost:3001/api/*` (default). Authorization on the backend is done via an `authorize` middleware that expects `userId` and `userRole` in the request body (for POST/PUT) or query (for GET) — not via JWTs or headers.

- **Important ports & env**:
  - Frontend dev: Vite (default port used by CORS config is `5173`).
  - Backend default: `3001`. Backend reads `DB_URI` from `.env` and optional `SERVER_PORT`.
  - CORS: Backend accepts origin `http://localhost:5173` (see `server.js`).

- **How to run locally**:
  - Backend: `cd maven-cafe-server` → create `.env` with `DB_URI=mongodb://...` → `npm install` → `npm start`.
  - Frontend: `cd maven-cafe-frontend` → `npm install` → `npm run dev` (Vite).
  - Lint frontend: `npm run lint` in `maven-cafe-frontend`.

- **Key files to inspect / modify**:
  - Frontend app entry: `src/main.jsx` and `src/App.jsx`.
  - API wrapper: `src/api/apiService.js` — all network requests go through `callApi()` and expect `API_BASE_URL` from `src/config/constants.js`.
  - Constants: `src/config/constants.js` — change `API_BASE_URL` when backend host/port changes.
  - Components: `src/components/{admin,kitchen,user,common}` — follow existing folder split.
  - Backend server: `maven-cafe-server/server.js` — all API endpoints and the `authorize` middleware live here.
  - Backend models: `maven-cafe-server/models/` (`User.js`, `Order.js`) — database schemas and indexes live here.

- **Project-specific conventions & patterns** (do not assume defaults):
  - Authorization is handled by passing `userId` and `userRole` in the request (body/query). New code adding protected endpoints should reuse the `authorize(allowedRoles)` middleware pattern in `server.js`.
  - The backend seeds initial users automatically on successful DB connect (see `seedDatabase()` in `server.js`). New seed data should follow the `id` sequencing pattern (IDs start at ~101).
  - Frontend `callApi()` returns parsed JSON or `null` on error; it shows a browser `alert()` on API errors — components rely on this behavior, so be conservative when changing it.
  - Backend uses Winston for logging to `logs/error.log` and console. Keep logging consistent with existing `logger.info`/`logger.error` patterns.
  - Backend is CommonJS (`type: commonjs` in server `package.json`); frontend uses ESM. When launching server, run it from `maven-cafe-server` root so `main.require('./models/User')` resolves correctly.

- **JSON response shape**: Most endpoints return `{ success: boolean, message?: string, ... }`. Follow this convention for new endpoints (include `success` and human-friendly `message`).

- **Examples** (copy/paste-ready):
  - Login: `callApi('/login', 'POST', { username, password })` → expects `{ success: true, user: { id, name, role, username } }`.
  - Place order: `callApi('/orders', 'POST', { userId, userName, slot, items })`.

- **Common pitfalls to watch for**:
  - If you change an API route, update `API_BASE_URL` in `src/config/constants.js` and adjust any front-end calls.
  - The `authorize` middleware checks `req.query` for GET and `req.body` for other methods — ensure test requests include `userId`/`userRole` appropriately.
  - Duplicate key / unique index issues can surface when creating users. `server.js` checks duplicates before insert; follow its pattern when adding user creation logic.

- **Where to run quick checks**:
  - Backend health: hit `POST /api/login` or `GET /api/orders` (with proper `userId`/`userRole`) using Postman or curl.
  - Frontend: run `npm run dev` in `maven-cafe-frontend` then exercise UI routes — Vite refresh helps iterate quickly.

- **If you need to modify project structure**:
  - Keep frontend routes/components organized under `src/components/{user,kitchen,admin,common}`.
  - Keep backend models under `maven-cafe-server/models` and route logic in `server.js` (or clearly split into `routes/` if adding modules — but update `server.js` to import and mount them).

If anything here is unclear or you'd like more examples (tests, common PR templates, or how to add a new API endpoint end-to-end), tell me which area to expand and I will iterate.
