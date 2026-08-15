<div align="center">

# ✅ AbleSpace Task Management

### Production-ready full-stack task management system with authentication, role-aware access, analytics, and user-scoped workflows

<p>
  <a href="https://ablespace-task-management.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <a href="https://github.com/Anshweknow/ablespace-task-management">
    <img src="https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Strongly%20Typed-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-Backend-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p><strong>Technical Assessment · Full-Stack Task Management Platform</strong></p>

</div>

---

## 🚀 Overview

**AbleSpace Task Management** is a production-oriented full-stack task management system built as a technical assessment project.

The application combines a modern **Next.js frontend** with a structured **NestJS backend**, **Prisma ORM**, and **PostgreSQL** database to provide authenticated, user-scoped task management with dashboard analytics and a polished responsive interface.

The system is designed around practical product requirements rather than a basic CRUD implementation: authentication, authorization, task ownership, filtering, sorting, optimistic UI behavior, validation, API structure, and production-focused security concerns are all part of the architecture.

---

## 🌐 Live Demo

<div align="center">

### 👉 [Open AbleSpace Task Management](https://ablespace-task-management.vercel.app/)

</div>

---

## ✨ Highlights

| Area | Implementation |
|---|---|
| 🔐 **Authentication** | JWT-based registration, login, guest access, session restoration and logout |
| 👥 **Authorization** | Role-aware access with `USER`, `GUEST`, and `ADMIN` roles |
| ✅ **Task Management** | Create, read, update, delete, duplicate, complete and pending workflows |
| 📊 **Dashboard** | API-backed task metrics and productivity statistics |
| 🔎 **Search & Filters** | Search, status, priority, date sorting, and ordering controls |
| ⚡ **Client State** | TanStack Query caching, invalidation and optimistic delete behavior |
| 🧩 **Architecture** | Next.js App Router + feature-oriented frontend + NestJS modules |
| 🛡️ **Security** | Bcrypt, JWT, validation pipes, exception handling, Helmet and CORS |
| 📘 **API Docs** | Swagger/OpenAPI support for backend endpoints |
| 📱 **Responsive UI** | Dashboard, task list, details, forms, profile and settings adapted for responsive layouts |

---

## 🧭 Core Product Flow

```text
User
  ↓
Register / Login / Guest Access
  ↓
Authenticated Dashboard
  ↓
Task Search + Filters + Sorting
  ↓
Create / View / Edit / Duplicate / Complete / Delete
  ↓
Live Dashboard Statistics
```

The application keeps task operations **scoped to the authenticated user**, while the backend enforces authorization at the API layer.

---

## 🔐 Authentication & Access Control

### Authentication API

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/guest
GET  /api/auth/me
POST /api/auth/logout
```

### Security highlights

- JWT-based authentication
- Bcrypt password hashing
- Protected task endpoints
- User-scoped task ownership
- Guest-user support
- Role-aware architecture
- Global request validation
- Centralized exception handling
- Helmet security headers
- Configurable CORS
- Environment-based configuration

---

## ✅ Task Management

Authenticated users and guests can manage their own tasks end-to-end.

### Supported workflows

- ➕ Create a task
- 👀 View task details
- ✏️ Edit a task
- 🗑️ Delete a task
- 📋 Duplicate a task
- ✅ Mark task complete
- ⏳ Mark task pending
- 🔎 Search tasks
- 🎯 Filter by status
- 🚩 Filter by priority
- 📅 Sort by due date
- 🕒 Sort by created date
- ⬆️⬇️ Change ascending/descending ordering

### Task API

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

---

## 📊 Dashboard & Analytics

The dashboard provides API-backed visibility into task activity, including metrics for:

- Total tasks
- Completed tasks
- Pending tasks
- High-priority tasks
- Upcoming tasks
- Recent tasks

These statistics are integrated into the application rather than being static presentation-only data.

---

## ⚡ Frontend Data & State Management

The frontend uses **TanStack Query** to manage server state and API interactions.

Key behaviors include:

- Query caching
- Query invalidation after mutations
- Consistent API-backed data flow
- Optimistic delete updates
- Centralized Axios client behavior
- JWT injection into API requests
- Normalized API error handling

Provider composition also supports:

- Authentication state
- Theme management
- Query client
- Toast feedback

---

## 🏗️ Architecture

```text
                     ┌──────────────────────┐
                     │      Next.js 15      │
                     │     App Router       │
                     └──────────┬───────────┘
                                │
                       Axios / TanStack Query
                                │
                                ▼
                     ┌──────────────────────┐
                     │      NestJS API      │
                     │  Auth + Task Modules │
                     └──────────┬───────────┘
                                │
                          Prisma ORM
                                │
                                ▼
                     ┌──────────────────────┐
                     │     PostgreSQL       │
                     │ Users + Tasks + Data │
                     └──────────────────────┘
```

### Backend architecture

The backend follows a modular NestJS structure with:

- Controllers
- Modules
- DTOs
- Validation
- Guards
- Interceptors
- Filters
- Decorators
- Prisma service/module
- Environment configuration

The backend also includes Swagger, Helmet, CORS, request logging, and global validation/error handling.

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **Next.js 15** | App Router and frontend application framework |
| **React 19** | UI component model |
| **TypeScript** | Type-safe frontend development |
| **Tailwind CSS** | Responsive styling |
| **shadcn/ui-style primitives** | Reusable UI building blocks |
| **Lucide Icons** | Interface icons |
| **React Hook Form** | Form state and validation integration |
| **Zod** | Runtime/schema validation |
| **Axios** | API client |
| **TanStack Query** | Server-state management and caching |
| **next-themes** | Theme support |

### Backend

| Technology | Purpose |
|---|---|
| **NestJS** | Structured backend/API framework |
| **TypeScript** | Type-safe backend development |
| **Prisma ORM** | Database access and data modeling |
| **PostgreSQL** | Relational database |
| **JWT** | Authentication |
| **Bcrypt** | Password hashing |
| **class-validator** | DTO/input validation |
| **class-transformer** | DTO transformation |
| **Swagger** | API documentation |
| **Helmet** | HTTP security headers |
| **CORS** | Cross-origin configuration |

---

## 📁 Project Structure

```text
ablespace-task-management/
├── frontend/
│   ├── app/                 # Next.js App Router routes and layouts
│   ├── components/          # App shell and reusable UI primitives
│   ├── features/            # Feature-oriented frontend modules
│   ├── lib/                 # Environment, utilities and token helpers
│   ├── providers/           # Auth, theme, query and toast providers
│   ├── services/            # Axios client and API service layer
│   ├── styles/              # Global Tailwind styling
│   └── types/               # Shared frontend TypeScript types
│
├── backend/
│   ├── prisma/              # Prisma schema and migrations
│   └── src/
│       ├── common/          # Filters, guards, interceptors and decorators
│       ├── config/          # Environment validation
│       ├── modules/         # Auth and task modules
│       └── prisma/          # Prisma module and service
│
└── README.md
```

---

## 🗄️ Data Model

The Prisma layer models the core domain around users and tasks.

Supported concepts include:

- User roles: `USER`, `GUEST`, `ADMIN`
- Task statuses: `PENDING`, `COMPLETED`
- Task priorities: `LOW`, `MEDIUM`, `HIGH`
- User-owned task relationships
- Cascade-delete behavior
- Database indexes supporting common task filtering/sorting operations

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Anshweknow/ablespace-task-management.git
cd ablespace-task-management
```

### 2. Frontend dependencies

```bash
cd frontend
npm install
```

### 3. Backend dependencies

```bash
cd ../backend
npm install
npx prisma generate
```

---

## 🔐 Environment Variables

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

For production, set `NEXT_PUBLIC_API_URL` to the deployed backend API URL including the `/api` prefix.

Production builds intentionally require this value so the deployed frontend cannot silently fall back to a localhost API URL.

### Backend — `backend/.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ablespace_task_management?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1d"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

For production, configure:

- a secure PostgreSQL connection string
- a strong JWT secret
- the production frontend origin in `FRONTEND_URL`
- any required environment-specific CORS origins

> Never commit real credentials, database connection strings, or JWT secrets to GitHub.

---

## 🗄️ Database Setup

After configuring the backend database connection:

```bash
cd backend
npx prisma migrate deploy
```

For a disposable local development database, `npx prisma migrate dev` can be used when appropriate.

---

## ▶️ Run the Application

### Backend

```bash
cd backend
npm run start:dev
```

Backend API:

```text
http://localhost:4000
```

Swagger documentation:

```text
http://localhost:4000/api/docs
```

### Frontend

In a second terminal:

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## ✅ Verification Commands

### Backend

```bash
cd backend
npm run typecheck
npm run build
npm run lint
npx prisma validate
npx prisma generate
npx prisma migrate status
```

### Frontend

```bash
cd frontend
npm run typecheck
npm run build
npm run lint
```

---

## 📱 Responsive Experience

The application includes responsive versions of the main task-management experiences, including:

- Dashboard
- Task list
- Task detail
- Create/edit task forms
- Profile
- Settings

The goal is to keep navigation, task actions, filtering, and data presentation usable across common desktop and mobile viewport sizes.

---

## 🔒 Production-minded Engineering

This project goes beyond a visual frontend by implementing several concerns expected in a real application:

- Authentication and authorization
- User-scoped data access
- DTO validation
- Global exception handling
- Request logging
- Secure HTTP headers
- Configurable CORS
- Database migrations
- API documentation
- Client-side server-state caching
- Optimistic UI updates
- Production environment validation

---

## 🚧 Future Improvements

Potential extensions include:

- Advanced task analytics
- Recurring tasks
- Due-date reminders
- Team/shared task workspaces
- Rich notification system
- More granular role/permission management
- Activity history/audit logs
- Calendar integration

---

## 💡 Learning Outcomes

Building AbleSpace strengthened practical experience in:

- Full-stack TypeScript architecture
- Next.js App Router
- NestJS modular backend design
- Prisma + PostgreSQL
- JWT authentication
- Password hashing
- API validation and error handling
- Client/server state management
- CRUD workflows
- Query caching and invalidation
- Responsive product design
- Production-oriented deployment configuration

---

## 👤 Author

**Ansh Kulshreshtha**

Full-Stack / Frontend Engineering Project

- GitHub: [Anshweknow](https://github.com/Anshweknow)
- LinkedIn: [Ansh Kulshreshtha](https://www.linkedin.com/in/ansh-kulshreshtha/)

---

## ⭐ Support

If you find the project useful or interesting:

- ⭐ Star the repository
- 🍴 Fork it
- 💬 Share feedback

---

<div align="center">

### 🚀 AbleSpace Task Management

**A production-minded task management system built with modern full-stack TypeScript architecture.**

[**View Live Demo →**](https://ablespace-task-management.vercel.app/)

</div>
