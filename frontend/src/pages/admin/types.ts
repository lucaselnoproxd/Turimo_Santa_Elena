// Formas enviadas por el backend (backend FASE 2) en /api/admin/*

export type TipoEvento = 'feriado' | 'temporada' | 'fiesta';

export interface EventoAdmin {
  id: string;
  mes: number;
  dia: number | null;
  titulo: string;
  descripcion: string;
  estrellas: number;
  tipo: TipoEvento;
  movil: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface UbicacionAdmin {
  id: string;
  nombre: string;
  zona: string;
  descripcion: string | null;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface TemaAdmin {
  id: string;
  colors: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface ImagenAdmin {
  id: string;
  nombre: string;
  alt: string | null;
  url: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface ActividadAdmin {
  id: string;
  slug: string;
  title: string;
  cardTitle: string;
  category: string;
  tagline: string;
  description: string[];
  cover: string;
  gallery: string[];
  estacionalidad: string;
  horario: string;
  dificultad: string;
  dificultadLevel: string;
  operadores: { name: string; contact?: Record<string, string> }[];
  lugares: string[];
  transporte: string[];
  featured: boolean;
  beaches?: string[];
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
}

export const CATEGORIAS = ['Acuaticas', 'Culturales', 'Deportivas', 'Naturales'];
export const DIFICULTADES = ['baja', 'media', 'alta'];

export const TIPOS_EVENTO: TipoEvento[] = ['feriado', 'temporada', 'fiesta'];

export const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function blankActividad(): Omit<ActividadAdmin, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'> {
  return {
    slug: '',
    title: '',
    cardTitle: '',
    category: 'Naturales',
    tagline: '',
    description: [],
    cover: '',
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: '',
    dificultad: '',
    dificultadLevel: 'baja',
    operadores: [],
    lugares: [],
    transporte: [],
    featured: false,
    beaches: [],
  };
}

export function blankEvento(): Omit<EventoAdmin, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'> {
  return {
    mes: 1,
    dia: null,
    titulo: '',
    descripcion: '',
    estrellas: 3,
    tipo: 'feriado',
    movil: false,
  };
}

export function blankUbicacion(): Omit<UbicacionAdmin, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'> {
  return { nombre: '', zona: '', descripcion: '' };
}