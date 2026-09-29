-- ============================================================
-- FASE 2 · PANEL DE ADMINISTRACIÓN
-- Aplicar a la base de datos de PRODUCCIÓN (Neon) una sola vez,
-- porque ahí DB_SYNC=false y TypeORM no altera el esquema.
-- En desarrollo no hace falta (DB_SYNC=true la aplica TypeORM al iniciar).
-- ============================================================

-- Nuevas columnas de concurrencia en activities (último que guarda gana)
ALTER TABLE "activities"
  ADD COLUMN IF NOT EXISTS "updatedAt" timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS "updatedBy" character varying;

-- Tabla de eventos del calendario
CREATE TABLE IF NOT EXISTS "eventos" (
  "id" character varying PRIMARY KEY,
  "mes" integer NOT NULL,
  "dia" integer,
  "titulo" character varying NOT NULL,
  "descripcion" text NOT NULL,
  "estrellas" integer NOT NULL,
  "tipo" character varying NOT NULL,
  "movil" boolean NOT NULL DEFAULT false,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "updatedBy" character varying
);

-- Tabla de ubicaciones
CREATE TABLE IF NOT EXISTS "ubicaciones" (
  "id" character varying PRIMARY KEY,
  "nombre" character varying NOT NULL UNIQUE,
  "zona" character varying NOT NULL,
  "descripcion" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "updatedBy" character varying
);

-- Tabla de tema (fila única 'default')
CREATE TABLE IF NOT EXISTS "tema" (
  "id" character varying PRIMARY KEY,
  "colors" jsonb NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "updatedBy" character varying
);

INSERT INTO "tema" ("id", "colors")
SELECT 'default', '{"primary":"#2dc653","primaryDark":"#24a843","primaryDeeper":"#0b4e1e","primaryLight":"#a5d6a7","accent":"#00b4d8","accentLight":"#4dd0e1","textLink":"#1b8a36","textHeading":"#0b4e1e","textBody":"#0b4e1e","textMuted":"#1b8a36","star":"#2dc653","glow":"rgba(45,198,83,0.5)","footerHeading":"#81c784","footerText":"rgba(129,199,132,0.6)","footerAccent":"#2dc653","surface":"#e8f5e9"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM "tema" WHERE "id" = 'default');

-- Tabla de imágenes
CREATE TABLE IF NOT EXISTS "imagenes" (
  "id" character varying PRIMARY KEY,
  "nombre" character varying NOT NULL,
  "alt" text,
  "url" text NOT NULL,
  "publicId" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "updatedBy" character varying
);