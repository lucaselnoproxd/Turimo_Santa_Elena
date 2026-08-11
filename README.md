# Santa Elena · Turismo

Web turística de la provincia de **Santa Elena (Ecuador)**: 20 experiencias reales, playas, hoteles y guías de viaje, con estética *Frutiger Aero*.

## Estructura del proyecto

```
├── frontend/   React + TypeScript + Vite + Tailwind CSS v4 (SPA desplegada en Vercel)
├── backend/    API NestJS + TypeORM + PostgreSQL (en desarrollo)
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

- **Frontend** desplegado en Vercel: <https://turismo-santa-elena.vercel.app>
- `frontend/vercel.json` con rewrites SPA para `/experiencia/:slug` y `/playa/:id`.
- El frontend funciona de forma autónoma (los datos viven en `frontend/src/data`). El backend es opcional y aún no está conectado a la web en producción.
