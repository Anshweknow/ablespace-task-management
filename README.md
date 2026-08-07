# AbleSpace Task Management

A production-ready monorepo foundation for a Task Management System technical assessment. Prompt 1 intentionally includes authentication, theming, application shell, shared UI primitives, API infrastructure, and database user modeling only. Task CRUD, dashboards, statistics, search, filtering, sorting, pagination, categories, task APIs, and task database models are reserved for Prompt 2.

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
│   ├── hooks/               # Shared React hooks
│   ├── lib/                 # Environment, utilities, token helpers
│   ├── providers/           # Auth, theme, query, toast providers
│   ├── services/            # Axios client and API service layer
│   ├── store/               # Future client state modules
│   ├── styles/              # Global Tailwind CSS
│   ├── types/               # Shared frontend TypeScript types
│   └── utils/               # Future reusable helpers
├── backend/
│   ├── prisma/              # Prisma schema and migrations
│   └── src/
│       ├── common/          # Filters, guards, interceptors, decorators
│       ├── config/          # Environment validation
│       ├── modules/         # Feature modules, starting with auth
│       └── prisma/          # Prisma module and service
└── README.md
```

## Architecture

- Frontend and backend are independent applications in a monorepo.
- Frontend uses feature-based organization and provider composition for theme, auth, TanStack Query, and toasts.
- Axios centralizes API base URL, JWT injection, and error normalization.
- Backend uses NestJS modules, DTO validation, a global validation pipe, global exception filter, request logging interceptor, Helmet, CORS, and Swagger.
- Prisma currently models only users, including `USER`, `GUEST`, and `ADMIN` roles, leaving task models for Prompt 2.

## Environment Variables

### Frontend (`frontend/.env.local`)

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Backend (`backend/.env`)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ablespace_task_management?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1d"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

## Installation

```bash
cd frontend
npm install

cd ../backend
npm install
npx prisma generate
```

## Database Setup

Create a PostgreSQL database, configure `backend/.env`, then run:

```bash
cd backend
npx prisma migrate dev --name init_users
```

## How to Run

### Backend

```bash
cd backend
npm run start:dev
```

Swagger is available at `http://localhost:4000/api/docs`.

### Frontend

```bash
cd frontend
npm run dev
```

The frontend is available at `http://localhost:3000`.

## Task Management Features

Authenticated users and guests can now manage their own tasks end-to-end:

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
=======

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
│   ├── hooks/               # Shared React hooks
│   ├── lib/                 # Environment, utilities, token helpers
│   ├── providers/           # Auth, theme, query, toast providers
│   ├── services/            # Axios client and API service layer
│   ├── store/               # Future client state modules
│   ├── styles/              # Global Tailwind CSS
│   ├── types/               # Shared frontend TypeScript types
│   └── utils/               # Future reusable helpers
├── backend/
│   ├── prisma/              # Prisma schema and migrations
│   └── src/
│       ├── common/          # Filters, guards, interceptors, decorators
│       ├── config/          # Environment validation
│       ├── modules/         # Feature modules, starting with auth
│       └── prisma/          # Prisma module and service
└── README.md
```

## Architecture

- Frontend and backend are independent applications in a monorepo.
- Frontend uses feature-based organization and provider composition for theme, auth, TanStack Query, and toasts.
- Axios centralizes API base URL, JWT injection, and error normalization.
- Backend uses NestJS modules, DTO validation, a global validation pipe, global exception filter, request logging interceptor, Helmet, CORS, and Swagger.
- Prisma currently models only users, including `USER`, `GUEST`, and `ADMIN` roles, leaving task models for Prompt 2.

## Environment Variables

### Frontend (`frontend/.env.local`)

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Backend (`backend/.env`)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ablespace_task_management?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1d"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

## Installation

```bash
cd frontend
npm install

cd ../backend
npm install
npx prisma generate
```

## Database Setup

Create a PostgreSQL database, configure `backend/.env`, then run:

```bash
cd backend
npx prisma migrate dev --name init_users
```

## How to Run

### Backend

```bash
cd backend
npm run start:dev
```

Swagger is available at `http://localhost:4000/api/docs`.

### Frontend

```bash
cd frontend
npm run dev
```

The frontend is available at `http://localhost:3000`.
## Task Management Features


Authenticated users and guests can now manage their own tasks end-to-end:

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

