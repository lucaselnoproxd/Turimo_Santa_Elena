# Frontend · Santa Elena Turismo

SPA de **React + TypeScript + Vite + Tailwind CSS v4** con estética *Frutiger Aero*: fondos con ondas animadas, gradientes brillantes y transiciones suaves. Desplegada en Vercel.

## Inicio rápido

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Comando            | Descripción                                   |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo (HMR)                  |
| `npm run build`    | Build de producción en `dist/`                |
| `npm run preview`  | Sirve el build localmente                     |
| `npm run lint`     | Oxlint (React + TypeScript)                   |
| `tsc -b`           | Verificación de tipos (TypeScript)            |

## Estructura

```
src/
├── config/
│   ├── site.ts      →  CONTACTO Y REDES (whatsapp, email, teléfono, facebook…)
│   └── images.ts    →  Rutas de imágenes y mapas del carrusel
├── data/
│   ├── activities.ts  →  Las 20 experiencias (texto + galería + tema)
│   ├── beaches.ts     →  Playas destacadas
│   ├── services.ts    →  Hoteles, guías y operadoras
│   └── themes.ts      →  Paletas de color y TEMA ACTIVO
├── components/        →  Navbar, Footer, ThemeProvider, CoverImage, WhatsAppButton…
├── pages/             →  Home, ExperienciaDetalle, PlayaDetalle…
├── images.ts          →  Helpers coverImage(), galleryImage(), beachImage()
└── index.css          →  Base de estilos y utilidades
```

## Configuración rápida

### Datos de contacto (importante)

Edita `src/config/site.ts` — ahí viven el **WhatsApp, email y teléfono** que usa todo el sitio. Los hoteles, guías y operadoras también tienen su propio contacto en `src/data/services.ts`.

### Imágenes

Todo vive en `public/images/` con **nombres fijos** (solo reemplaza el archivo, no toques el código):

| Carpeta            | Contenido                          |
| ------------------ | ---------------------------------- |
| `images/<slug>/`   | `cover.jpg` y `gallery-1.jpg…N` de cada experiencia |
| `images/playas/`   | Fotos de playas (`montanita.jpg`, `salinas.jpg`…) |
| `images/carrusel/` | 6 fotos del carrusel de la portada |
| `images/sitio/`    | `logo.png` y `hero.jpg`            |

### Tema de color

`src/data/themes.ts` define 4 paletas (`frutiger-aero`, `ocean`, `sunset`, `tropical`). Para cambiar el tema del sitio cambia el valor de `activeTheme` (por defecto `'tropical'`).

## Despliegue en Vercel

- Build command: `npm run build`
- Output directory: `dist`
- `vercel.json` con rewrites SPA para `/experiencia/:slug` y `/playa/:id`.
- Producción: <https://turismo-santa-elena.vercel.app>
