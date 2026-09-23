# Santa Elena · Turismo

Web turística de la provincia de **Santa Elena (Ecuador)**: 20 experiencias reales, playas, hoteles y guías de viaje, con estética *Frutiger Aero*.

## Estructura del proyecto

```
├── frontend/   React + TypeScript + Vite + Tailwind CSS v4 (SPA desplegada en Vercel)
├── backend/    API NestJS + TypeORM + PostgreSQL (desplegada en Vercel Functions + Neon)
└── package.json  Scripts para ejecutar ambos desde la raíz
```

## Inicio rápido

Requisitos: **Node.js 20+**, **PostgreSQL** (solo backend).

```bash
# Frontend (http://localhost:5173)
cd frontend
npm install
npm run dev

# Backend (http://localhost:3000)
cd backend
npm install
npm run start:dev
```

Configuración del backend en `backend/.env` (ver `backend/.env.example`).

## Scripts desde la raíz

| Comando              | Acción                        |
| -------------------- | ----------------------------- |
| `npm run dev:frontend`  | Servidor de desarrollo frontend |
| `npm run dev:backend`   | Servidor de desarrollo backend  |
| `npm run build:frontend`| Build de producción frontend    |
| `npm run build:backend` | Build de producción backend     |

## Producción

- **Frontend:** <https://turismo-santa-elena.vercel.app>
- **Backend (API):** <https://backend-silk-one-43.vercel.app/api> — p. ej. <https://backend-silk-one-43.vercel.app/api/beaches>
- **Base de datos:** Neon (PostgreSQL serverless, rama `production`).
- `frontend/vercel.json` con rewrites SPA para `/experiencia/:slug` y `/playa/:id`.
- El frontend consume la API vía `VITE_API_URL` (definida en Vercel), con **fallback a datos locales** (`frontend/src/data`) si la API no responde, así el sitio funciona de forma autónoma.
- CORS del backend habilitado para `http://localhost:5173` y `https://turismo-santa-elena.vercel.app` (`CORS_ORIGINS`).
