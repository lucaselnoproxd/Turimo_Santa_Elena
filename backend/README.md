# Backend · API de Santa Elena

API REST construida con **NestJS**, **TypeORM** y **PostgreSQL** para servir playas, actividades y servicios turísticos de la provincia de Santa Elena (Ecuador), con autenticación JWT y cronogramas por usuario.

El frontend (`frontend/`) consume esta API; si no está disponible, cae a datos locales estáticos en `frontend/src/data`.

## Requisitos

- Node.js 20+
- PostgreSQL

## Puesta en marcha

1. Crea la base de datos:

   ```sql
   CREATE DATABASE playas_santa_elena;
   ```

2. Configura las variables de entorno. Copia `.env.example` a `.env` y ajusta los valores:

   ```bash
   cp .env.example .env
   ```

   | Variable         | Descripción                                  | Default |
   | ---------------- | -------------------------------------------- | ------- |
   | `DB_HOST`        | Host de PostgreSQL                           | `localhost` |
   | `DB_PORT`        | Puerto de PostgreSQL                         | `5432`  |
   | `DB_USERNAME`    | Usuario de la base                           | `postgres` |
   | `DB_PASSWORD`    | Contraseña de la base                        | `postgres` |
   | `DB_NAME`        | Nombre de la base                            | `playas_santa_elena` |
   | `DATABASE_URL`   | Cadena de conexión completa (reemplaza a las `DB_*`) | — |
   | `JWT_SECRET`     | Secreto para firmar tokens JWT               | — |
   | `DB_SYNC`        | Sincroniza el esquema automáticamente (`true` en dev, `false` en prod) | `true` |
   | `PORT`           | Puerto del servidor                          | `3000`  |
   | `CORS_ORIGINS`   | Orígenes permitidos, separados por comas     | `localhost:5173, turismo-santa-elena.vercel.app` |

3. Instala y arranca:

   ```bash
   npm install
   npm run start:dev
   ```

Al iniciar, los módulos seed insertan datos de ejemplo si las tablas están vacías: **6 playas**, **20 actividades** y **21 servicios** (hoteles y guías).

> Nota: por defecto TypeORM usa `synchronize: true` (útil en desarrollo). En producción conviene desactivarlo (`DB_SYNC=false`) y usar migraciones.

## Endpoints

Todos los endpoints llevan el prefijo `api/`. Los marcados con 🔒 requieren `Authorization: Bearer <token>`.

### Públicos

| Método | Ruta                          | Descripción |
| ------ | ----------------------------- | ----------- |
| `GET`  | `/api`                        | Saludo raíz |
| `GET`  | `/api/beaches`                | Lista todas las playas |
| `GET`  | `/api/beaches/:idOrSlug`      | Detalle de una playa (UUID o slug) |
| `GET`  | `/api/activities?featured=&category=` | Lista actividades (filtros opcionales) |
| `GET`  | `/api/activities/:slug`       | Detalle de una actividad |
| `GET`  | `/api/services?type=&beachId=`| Lista hoteles/tours (filtros opcionales) |
| `GET`  | `/api/services/:id`           | Detalle de un servicio |
| `GET`  | `/api/itineraries/shared/:shareId` | Ver un cronograma compartido |

### Autenticación

| Método | Ruta                    | Descripción |
| ------ | ----------------------- | ----------- |
| `POST` | `/api/auth/register`    | Registro (`name`, `email`, `password`) → `{ token, user }` |
| `POST` | `/api/auth/login`       | Login (`email`, `password`) → `{ token, user }` |
| `GET`  | `/api/auth/me` 🔒       | Perfil del usuario autenticado |

La autenticación devuelve `{ token, user }`; envía el token como `Authorization: Bearer <token>`.

### Cronogramas (itinerarios)

| Método | Ruta                            | Descripción |
| ------ | ------------------------------- | ----------- |
| `POST` | `/api/itineraries` 🔒           | Crear cronograma |
| `GET`  | `/api/itineraries` 🔒           | Lista los cronogramas del usuario |
| `GET`  | `/api/itineraries/:id` 🔒       | Detalle |
| `PATCH`| `/api/itineraries/:id` 🔒       | Actualizar título/color |
| `DELETE` | `/api/itineraries/:id` 🔒     | Eliminar |
| `PUT`  | `/api/itineraries/:id/days/:dayId` 🔒 | Reemplazar las actividades de un día |
| `POST` | `/api/itineraries/:id/share` 🔒 | Generar enlace compartible |
| `DELETE` | `/api/itineraries/:id/share` 🔒 | Quitar de la vista pública |

CORS habilitado para `http://localhost:5173` y `https://turismo-santa-elena.vercel.app` con métodos `GET/POST/PUT/PATCH/DELETE/OPTIONS`.

## Scripts

| Comando          | Descripción                     |
| ---------------- | ------------------------------- |
| `npm run start:dev` | Arranque con recarga automática |
| `npm run build`  | Compila a `dist/`               |
| `npm run test`   | Tests unitarios (Jest)          |
| `npm run lint`   | ESLint + Prettier               |

## Despliegue en Vercel (serverless)

- **Producción:** <https://backend-silk-one-43.vercel.app/api> (p. ej. `/api/beaches`).

`main.ts` exporta un handler serverless (`VERCEL=1`) que reutiliza la misma app NestJS y llama explícitamente a `app.init()` (necesario fuera de `app.listen()` para registrar las rutas).

- `api/index.ts` reexporta el handler compilado de `../dist/main` y declara `maxDuration: 30`.
- `vercel.json` usa la **Builds API** (`version: 2`) con `@vercel/node` e `includeFiles: ["dist/**", "package.json"]`, y enruta todo a `api/index.ts`. Así se evita la detección de framework (que exigía un `outputDirectory`) y el empaquetado incluye el driver `pg`.
- `pg` se importa de forma estática (`import 'pg'`) para que el *file tracer* lo incluya en el bundle.
- Variables de entorno en producción: `DATABASE_URL`, `JWT_SECRET`, `DB_SYNC=false`, `CORS_ORIGINS`.
- Conexión con `DATABASE_URL` (Neon pooled; se eliminó `channel_binding` porque `pg` no lo soporta).

## Estructura

```
src/
├── main.ts              Bootstrap + CORS + prefijo /api + handler Vercel
├── app.module.ts        Módulo raíz (ConfigModule, TypeOrmModule, módulos de dominio)
├── config/              Configuración de la base de datos
├── beaches/             Playas (entidad, controlador, servicio, seed)
├── activities/          Actividades (entidad, controlador, servicio, seed)
├── services/            Hoteles y guías (entidad, controlador, servicio, seed)
├── auth/                Autenticación JWT (controlador, servicio, guard)
├── itineraries/         Cronogramas por usuario (controlador, servicio, entidades)
└── users/               Entidad User
```