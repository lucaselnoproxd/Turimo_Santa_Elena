// ============================================================
// TIPOS API (respuestas del backend) y maperos a datos locales
// ============================================================
import type { Activity, ActivityCategory } from '../data/activities';
import type { Beach } from '../data/beaches';
import type { Hotel, Guide } from '../data/services';

export interface ApiBeach {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  imageUrl: string;
  activities: string[];
  rating: number;
  bestSeason: string;
  knownFor: string | null;
  highlights: string[] | null;
  tips: string[] | null;
  gallery: string[] | null;
}

export interface ApiActivity {
  id: string;
  slug: string;
  title: string;
  cardTitle: string;
  category: ActivityCategory;
  tagline: string;
  description: string[];
  cover: string;
  gallery: string[];
  estacionalidad: string;
  horario: string;
  dificultad: string;
  dificultadLevel: string;
  operadores: Array<{ name: string; contact: Record<string, string> }>;
  lugares: string[];
  transporte: string[];
  featured: boolean;
  beaches: string[];
}

export interface ApiService {
  id: string;
  type: 'hotel' | 'guia';
  beachId: string;
  name: string;
  description: string | null;
  priceRange: string | null;
  rating: number;
  amenities: string[];
  specialty: string | null;
  experience: string | null;
  languages: string[];
  photo: string | null;
  contact: Record<string, string>;
}

export function beachFromApi(b: ApiBeach): Beach {
  return {
    id: b.slug,
    name: b.name,
    shortDescription: b.shortDescription,
    longDescription: b.longDescription,
    location: b.location,
    imageUrl: b.imageUrl,
    activities: b.activities ?? [],
    rating: b.rating,
    bestSeason: b.bestSeason,
    knownFor: b.knownFor ?? '',
    highlights: b.highlights ?? [],
    tips: b.tips ?? [],
    gallery: b.gallery ?? [],
  };
}

export function activityFromApi(a: ApiActivity): Activity {
  return {
    id: a.slug,
    slug: a.slug,
    title: a.title,
    cardTitle: a.cardTitle,
    category: a.category,
    tagline: a.tagline,
    description: a.description,
    cover: a.cover,
    gallery: a.gallery,
    estacionalidad: a.estacionalidad,
    horario: a.horario,
    dificultad: a.dificultad,
    dificultadLevel: (a.dificultadLevel as Activity['dificultadLevel']) ?? 'media',
    operadores: a.operadores ?? [],
    lugares: a.lugares ?? [],
    transporte: a.transporte ?? [],
    featured: a.featured,
    beaches: a.beaches,
  };
}

export function servicesFromApi(all: ApiService[]): {
  hotels: Hotel[];
  guides: Guide[];
} {
  const hotels: Hotel[] = all
    .filter((s) => s.type === 'hotel')
    .map((s) => ({
      id: s.id,
      beachId: s.beachId,
      name: s.name,
      description: s.description ?? '',
      priceRange: s.priceRange ?? '',
      rating: s.rating,
      amenities: s.amenities ?? [],
      photo: s.photo ?? undefined,
      contact: s.contact,
    }));

  const guides: Guide[] = all
    .filter((s) => s.type === 'guia')
    .map((s) => ({
      id: s.id,
      beachId: s.beachId,
      name: s.name,
      specialty: s.specialty ?? '',
      experience: s.experience ?? '',
      languages: s.languages ?? [],
      rating: s.rating,
      photo: s.photo ?? undefined,
      contact: s.contact,
    }));

  return { hotels, guides };
}