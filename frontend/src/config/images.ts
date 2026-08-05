// ============================================================
// CONFIGURACION DE IMAGENES
// ============================================================
// Todas las imágenes viven en:  frontend/public/images/<seccion>/
//
// Las carpetas de cada experiencia usan NOMBRES FIJOS:
//   cover.jpg      -> imagen principal
//   gallery-1.jpg  -> fotos de galería (gallery-2, gallery-3, ...)
//
// Para cambiar una imagen: reemplaza el archivo manteniendo el
// mismo nombre. No necesitas tocar este código.
//
// Si agregas más fotos de galería, crea gallery-4.jpg, gallery-5.jpg
// ... y agrégalas a la lista `gallery` en data/activities.ts

export function coverImage(slug: string): string {
  return `/images/${slug}/cover.jpg`;
}

export function galleryImage(slug: string, index: number): string {
  return `/images/${slug}/gallery-${index}.jpg`;
}

// Imágenes de secciones generales
export const siteImages = {
  logo: '/images/sitio/logo.png',
  hero: '/images/sitio/hero.jpg',
};

// Fotos de playas (reemplaza los archivos o cambia la ruta aquí)
export function beachImage(name: string): string {
  return `/images/playas/${name}.jpg`;
}

// ============================================================
// CARRUSEL (portada)
// ============================================================
// Las 6 imágenes del carrusel viven SOLAS en:  public/images/carrusel/
// Con nombres fijos:  surf.jpg, ballenas-jorobadas.jpg, snorkel.jpg,
//                     gastronomia.jpg, ecociclismo.jpg, parapente.jpg
// Para cambiar la foto de una diapositiva, reemplaza el archivo en esa
// carpeta manteniendo el MISMO nombre. No necesitas tocar este código.
// ============================================================

// Traduce el slug de la experiencia al archivo de su carpeta en carrusel/
const carouselSlugMap: Record<string, string> = {
  surf: 'surf',
  'ballenas-jorobadas': 'ballenas-jorobadas',
  'snorkel-2': 'snorkel',
  'disfrutar-gastronomia': 'gastronomia',
  ecociclismo: 'ecociclismo',
  parapente: 'parapente',
};

export function carouselImage(slug: string): string {
  return `/images/carrusel/${carouselSlugMap[slug] ?? slug}.jpg`;
}
