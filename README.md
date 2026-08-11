# AbleSpace Task Management

Production-ready Task Management System technical assessment monorepo with a Next.js frontend and NestJS backend. The application includes authentication, protected routes, dashboard statistics, and user-scoped task management with create, read, update, delete, duplicate, complete, pending, search, filtering, and sorting workflows.

## Tech Stack

### Frontend

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS, shadcn/ui-style primitives, Lucide Icons
- React Hook Form, Zod
- Axios, TanStack Query
- next-themes
- ESLint, Prettier

### Backend

- NestJS, TypeScript
- Prisma ORM, PostgreSQL
- JWT authentication, bcrypt
- class-validator, class-transformer
- Swagger, Helmet, CORS, ConfigModule

## Folder Structure

```text
ablespace-task-management/
├── frontend/
│   ├── app/                 # Next.js App Router routes and layouts
│   ├── components/          # App shell and reusable UI primitives
│   ├── features/            # Feature-oriented frontend modules
│   ├── lib/                 # Environment, utilities, token helpers
│   ├── providers/           # Auth, theme, query, toast providers
│   ├── services/            # Axios client and API service layer
│   ├── styles/              # Global Tailwind CSS
│   └── types/               # Shared frontend TypeScript types
├── backend/
│   ├── prisma/              # Prisma schema and migrations
│   └── src/
│       ├── common/          # Filters, guards, interceptors, decorators
│       ├── config/          # Environment validation
│       ├── modules/         # Auth and task modules
│       └── prisma/          # Prisma module and service
└── README.md
```

## Architecture

- Frontend and backend are independent applications in a monorepo.
- Frontend uses feature-based organization and provider composition for theme, auth, TanStack Query, and toasts.
- Axios centralizes API base URL, JWT injection, and error normalization.
- Backend uses NestJS modules, DTO validation, a global validation pipe, global exception filter, request logging interceptor, Helmet, CORS, and Swagger.
- Prisma models users and tasks with `USER`, `GUEST`, and `ADMIN` roles; `PENDING` and `COMPLETED` task statuses; `LOW`, `MEDIUM`, and `HIGH` priorities; user-owned task relations; cascade delete; and task indexes for common filters and sorts.

## Environment Variables

### Frontend (`frontend/.env.local`)

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

For production, set `NEXT_PUBLIC_API_URL` to the deployed backend API URL including the `/api` prefix.

### Backend (`backend/.env`)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ablespace_task_management?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1d"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

For production, set `FRONTEND_URL` to the deployed frontend origin, for example `https://ablespace-task-management.vercel.app`, and use a strong secret for `JWT_SECRET`.

## Installation

```bash
cd frontend
npm install

cd ../backend
npm install
npx prisma generate
```

## Database Setup

Create a PostgreSQL database, configure `backend/.env`, then run the committed migration:

```bash
cd backend
npx prisma migrate deploy
```

For local development against a disposable database, `npx prisma migrate dev` can be used after confirming the database is safe for development changes.

## How to Run

### Backend

```bash
cd backend
npm run start:dev
```

Swagger is available at `http://localhost:4000/api/docs`.

For production after building:

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run dev
```

The frontend is available at `http://localhost:3000`.

## Authentication API

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/guest
GET  /api/auth/me
POST /api/auth/logout
```

## Task Management Features

Authenticated users and guests can manage only their own tasks end-to-end:

- Dashboard metrics for total, completed, pending, high-priority, upcoming, and recent tasks.
- Task list with API-backed search, status filter, priority filter, due-date sorting, created-date sorting, and ascending/descending ordering.
- Create, edit, delete, view details, duplicate, mark complete, and mark pending actions.
- Responsive dashboard, task list, task detail, create/edit, profile, and settings pages.
- Frontend state management uses TanStack Query with cache invalidation and optimistic delete updates.
- Backend task APIs are protected by JWT auth and scoped per user.

## Task API

All endpoints require a bearer token:

```text
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/stats
GET    /api/tasks/:id
PATCH  /api/tasks/:id
PATCH  /api/tasks/:id/complete
PATCH  /api/tasks/:id/pending
POST   /api/tasks/:id/duplicate
DELETE /api/tasks/:id
```

## Verification Commands

```bash
cd backend
npm run typecheck
npm run build
npm run lint
npx prisma validate
npx prisma generate
npx prisma migrate status

cd ../frontend
npm run typecheck
npm run build
npm run lint
```
