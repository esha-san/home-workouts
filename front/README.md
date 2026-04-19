# Home Workout Frontend

This is the frontend application for the Home Workout project. It uses React, TypeScript, Vite, and React Router to provide a browser-based interface for login, registration, workout planning, and workout session tracking.

## Features

- User authentication flow with login and registration
- Profile management and preference updates
- Workout plan creation and editing
- Workout session navigation and logging
- Exercise fetching from the backend API
- Drag-and-drop planning support with `@dnd-kit`

## Requirements

- Node.js 18+ (recommended)
- npm

## Environment Variables

The frontend supports a base API URL via environment variables.

Create a `.env` file in the `front/` directory if you want to override the default API endpoint:

```env
VITE_API_URL=http://localhost:5000
```

If not set, the app defaults to `http://localhost:5000`.

## Installation

From the `front/` folder:

```bash
npm install
```

## Development

Start the frontend in development mode:

```bash
npm run dev
```

Then open the local URL shown in the terminal (typically `http://localhost:5173`).

## Build & Preview

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Linting

Run ESLint across the frontend source code:

```bash
npm run lint
```

## App Structure

- `index.html` — application shell
- `src/main.tsx` — React entry point
- `src/App.tsx` — route configuration and protected route handling
- `src/Api/Api.ts` — backend API helpers
- `src/Context/AuthContext.tsx` — authentication state and session handling
- `src/Context/WorkoutContext.tsx` — workout plan and session state
- `src/Pages/Index/Index.tsx` — login page
- `src/Pages/Register/Register.tsx` — registration page
- `src/Pages/WorkoutPlan/WorkoutPlan.tsx` — workout planner UI
- `src/Pages/WorkoutSession/WorkoutSession.tsx` — workout session tracking UI
- `src/Components/ExerciseCard/ExerciseCard.tsx` — exercise display card
- `src/Logic/DecisionEngine.ts` — workout decision logic
- `src/Logic/PlanGenerator.ts` — workout plan generation logic
- `src/Logic/Workouts.ts` — workout data helpers

## Backend Integration

The frontend communicates with the backend using cookie-based authentication. The main API endpoint is configured in `src/Api/Api.ts`.

Relevant backend routes:

- `POST /users/login`
- `POST /users/register`
- `POST /users/logout`
- `GET /users/me`
- `PUT /users/me`
- `GET /workouts/exercises`
- `GET /workouts/plan`
- `POST /workouts/plan`
- `PUT /workouts/plan`
- `POST /workouts/log`
- `GET /workouts/logs`

## Notes

- The frontend expects the backend to allow `credentials: include` for cookie authentication.
- Default CORS origin for the backend is `http://localhost:5173`.
- If the backend runs on a different host or port, set `VITE_API_URL` accordingly.

## License
MIT