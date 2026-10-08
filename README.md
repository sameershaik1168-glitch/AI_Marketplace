# AI CreatorHub

AI CreatorHub connects brands with independent AI creators. Brands can publish creative briefs, explore creator profiles, send collaboration requests, and track projects. Creators can build a profile, show work and services, browse open briefs, and update project status. Signed-in users can also draft marketing content through the server-side OmniRoute integration.

## What you need

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB Atlas connection string
- An OmniRoute API key for AI generation (optional for the rest of the marketplace)

## Run locally

1. Open a terminal in `backend/`.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` and a long, private `JWT_SECRET`. Add an OmniRoute key to enable AI generation.
4. Start MongoDB, then run `npm run dev` (or `npm start`).
5. Open `http://localhost:5000`.

The app can serve its pages even if MongoDB is offline, but registration, profile, brief, and project APIs need a working database. The AI generator needs `OMNIROUTE_API_KEY`. The key stays in the backend environment and is never sent to browser code.

## OmniRoute configuration

The backend service in `backend/services/omniRouteService.js` uses an OpenAI-compatible chat-completions request. Configure `OMNIROUTE_BASE_URL`, `OMNIROUTE_API_KEY`, and `OMNIROUTE_MODEL` in `backend/.env`. Changing the provider later is isolated to this service; frontend pages call only `/api/ai/generate`.

## Main API routes

- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/creators`, `GET /api/creators/:id`, `GET /api/creators/me`, `PUT /api/creators/me`
- `GET /api/briefs`, `POST /api/briefs`
- `GET /api/projects`, `POST /api/projects`, `PATCH /api/projects/:id`
- `POST /api/ai/generate`
- `GET /api/health`

Protected routes accept `Authorization: Bearer <token>`. Passwords are hashed with bcrypt, and project/brief updates are restricted by account role and ownership.

## Creator profiles

Create an account and choose **AI creator**. In the dashboard, add a bio, skills, AI tools, services, starting price, and portfolio projects. Portfolio images are added by URL; this starter does not include binary file uploads.

The starter includes local SVG portraits and campaign artwork in `frontend/assets/`. Featured creators, example portfolios, and the landing/auth artwork use these files, so they render without third-party image hosting. If a creator-provided image URL cannot load, the page shows a local fallback.

## Project structure

- `frontend/` contains the HTML pages, shared responsive styles, and vanilla JavaScript.
- `backend/` contains the Express API, Mongoose models, controllers, routes, auth middleware, and OmniRoute service.
