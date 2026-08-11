# Backend · API de Santa Elena

API REST construida con **NestJS**, **TypeORM** y **PostgreSQL** para servir playas y experiencias de la provincia de Santa Elena (Ecuador).

> Estado: **en desarrollo**. El frontend actualmente no consume esta API (usa datos locales en `frontend/src/data`).

## Requisitos

- Node.js 20+
- PostgreSQL

## Puesta en marcha

1. Crea la base de datos (el seed la crea si no existe):

   ```sql
   CREATE DATABASE playas_santa_elena;
   ```

2. Configura las variables de entorno. Copia `.env.example` a `.env` y ajusta los valores:

   ```bash
   cp .env.example .env
   ```

   | Variable       | Descripción            | Default     |
   | -------------- | ---------------------- | ----------- |
   | `DB_HOST`      | Host de PostgreSQL     | `localhost` |
   | `DB_PORT`      | Puerto de PostgreSQL   | `5432`      |
   | `DB_USERNAME`  | Usuario de la base     | `postgres`  |
   | `DB_PASSWORD`  | Contraseña de la base  | `postgres`  |
   | `DB_NAME`      | Nombre de la base      | `playas_santa_elena` |
   | `PORT`         | Puerto del servidor    | `3000`      |

3. Instala y arranca:

   ```bash
   npm install
   npm run start:dev
   ```

Al iniciar, el módulo `BeachesSeed` inserta automáticamente 3 playas de ejemplo si la tabla está vacía.

> Nota: por defecto TypeORM usa `synchronize: true` (útil en desarrollo). En producción conviene desactivarlo y usar migraciones.

## Endpoints

| Método | Ruta            | Descripción                                   |
| ------ | --------------- | --------------------------------------------- |
| `GET`  | `/`             | Saludo raíz (`Hello World!`)                  |
| `GET`  | `/beaches`      | Lista todas las playas                        |
| `GET`  | `/beaches/:id`  | Detalle de una playa por id                   |

CORS habilitado para `http://localhost:5173` y `https://turismo-santa-elena.vercel.app` (solo `GET`).

## Scripts

| Comando             | Descripción                        |
| ------------------- | ---------------------------------- |
| `npm run start:dev` | Arranque con recarga automática    |
| `npm run build`     | Compila a `dist/`                  |
| `npm run test`      | Tests unitarios (Jest)             |
| `npm run lint`      | ESLint + Prettier                  |

## Estructura

```
src/
├── main.ts              Bootstrap + CORS + puerto
├── app.module.ts        Módulo raíz (ConfigModule, TypeOrmModule)
├── config/              Configuración de la base de datos
├── beaches/             Módulo de playas (entidad, controlador, servicio, seed)
└── users/               Entidad User de ejemplo (sin funcionalidad aún)
```
