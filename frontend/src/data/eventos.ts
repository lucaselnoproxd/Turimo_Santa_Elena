// ============================================================
// CALENDARIO ANUAL DE EVENTOS
// Un solo archivo con todos los eventos por mes. Edita aquí los
// datos; no los guardes en el JSX.
// Los eventos con fecha móvil (Carnaval, Semana Santa) se marcan
// con `movil: true` y se muestran como "fecha móvil".
// ============================================================

export type TipoEvento = 'feriado' | 'temporada' | 'fiesta';

export interface EventoCalendario {
  /** Mes numérico: 1 = enero ... 12 = diciembre */
  mes: number;
  /** Día del mes (opcional; si falta es un evento de temporada/general) */
  dia?: number;
  titulo: string;
  descripcion: string;
  /** Atractivo turístico de 1 a 5 estrellas */
  estrellas: 1 | 2 | 3 | 4 | 5;
  tipo: TipoEvento;
  /** true si la fecha varía según el año (Carnaval, Semana Santa) */
  movil?: boolean;
}

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

export const TIPO_INFO: Record<TipoEvento, { label: string; color: string }> = {
  feriado: { label: 'Feriado', color: 'var(--clr-primary)' },
  temporada: { label: 'Temporada', color: 'var(--clr-accent)' },
  fiesta: { label: 'Fiesta', color: '#e11d74' },
};

export const eventosCalendario: EventoCalendario[] = [
  // ==================== ENERO ====================
  {
    mes: 1,
    dia: 1,
    titulo: 'Año Nuevo',
    descripcion: 'Ocupación hotelera alta en Montañita, Olón y Salinas.',
    estrellas: 5,
    tipo: 'feriado',
  },
  {
    mes: 1,
    titulo: 'Temporada de playa, sol y mar cálido',
    descripcion: 'Verano ecuatoriano a pleno: sol intenso y mar cálido en toda la costa.',
    estrellas: 4,
    tipo: 'temporada',
  },

  // ==================== FEBRERO ====================
  {
    mes: 2,
    titulo: 'Carnaval',
    descripcion: 'Lunes y martes de Carnaval (fecha móvil, feb/mar). La fiesta más grande del año en la costa.',
    estrellas: 5,
    tipo: 'fiesta',
    movil: true,
  },
  {
    mes: 2,
    titulo: 'Playa y surf en Montañita y Olón',
    descripcion: 'Condiciones ideales para surf y playa en las dos playas favoritas.',
    estrellas: 4,
    tipo: 'temporada',
  },

  // ==================== MARZO ====================
  {
    mes: 3,
    titulo: 'Carnaval (algunos años)',
    descripcion: 'Cuando el Carnaval cae en marzo, la costa se llena de visitantes.',
    estrellas: 5,
    tipo: 'fiesta',
    movil: true,
  },
  {
    mes: 3,
    titulo: 'Fin de temporada de calor y buen surf',
    descripcion: 'Últimas semanas de calor intenso; el surf sigue en su punto.',
    estrellas: 3,
    tipo: 'temporada',
  },

  // ==================== ABRIL ====================
  {
    mes: 4,
    titulo: 'Semana Santa / Viernes Santo',
    descripcion: 'Fecha móvil. Recogimiento religioso y feriado largo en toda la provincia.',
    estrellas: 4,
    tipo: 'feriado',
    movil: true,
  },
  {
    mes: 4,
    dia: 14,
    titulo: 'Cantonización de La Libertad',
    descripcion: 'Aniversario del cantón con actos cívicos y culturales.',
    estrellas: 2,
    tipo: 'fiesta',
  },

  // ==================== MAYO ====================
  {
    mes: 5,
    dia: 1,
    titulo: 'Día del Trabajo',
    descripcion: 'Feriado nacional.',
    estrellas: 3,
    tipo: 'feriado',
  },
  {
    mes: 5,
    dia: 24,
    titulo: 'Batalla de Pichincha',
    descripcion: 'Feriado nacional, buen momento para escapar a la playa.',
    estrellas: 3,
    tipo: 'feriado',
  },
  {
    mes: 5,
    titulo: 'Temporada baja, clima más fresco',
    descripcion: 'Menos visitantes y temperaturas templadas: playas más tranquilas.',
    estrellas: 2,
    tipo: 'temporada',
  },

  // ==================== JUNIO ====================
  {
    mes: 6,
    titulo: 'Inicio de temporada de ballenas jorobadas',
    descripcion: 'Salinas inaugura la temporada hacia fines de junio.',
    estrellas: 4,
    tipo: 'temporada',
  },
  {
    mes: 6,
    dia: 29,
    titulo: 'San Pedro y San Pablo',
    descripcion: 'Fiestas de los pescadores en los puertos de la provincia.',
    estrellas: 2,
    tipo: 'fiesta',
  },

  // ==================== JULIO ====================
  {
    mes: 7,
    titulo: 'Avistamiento de ballenas en su punto alto',
    descripcion: 'Tours desde Salinas y La Libertad, $20-$35 aprox.',
    estrellas: 5,
    tipo: 'temporada',
  },
  {
    mes: 7,
    dia: 16,
    titulo: 'Virgen del Carmen',
    descripcion: 'Procesiones marítimas en Salinas y Anconcito.',
    estrellas: 3,
    tipo: 'fiesta',
  },

  // ==================== AGOSTO ====================
  {
    mes: 8,
    dia: 10,
    titulo: 'Primer Grito de Independencia',
    descripcion: 'Feriado nacional con movimiento en la costa.',
    estrellas: 3,
    tipo: 'feriado',
  },
  {
    mes: 8,
    titulo: 'Avistamiento de ballenas',
    descripcion: 'La temporada de ballenas está en su punto más alto.',
    estrellas: 5,
    tipo: 'temporada',
  },

  // ==================== SEPTIEMBRE ====================
  {
    mes: 9,
    titulo: 'Últimas semanas fuertes de ballenas',
    descripcion: 'Aún se avistan ballenas con buena frecuencia.',
    estrellas: 4,
    tipo: 'temporada',
  },
  {
    mes: 9,
    titulo: 'Temporada baja',
    descripcion: 'Playas despejadas y tarifas más calmadas.',
    estrellas: 2,
    tipo: 'temporada',
  },

  // ==================== OCTUBRE ====================
  {
    mes: 10,
    dia: 9,
    titulo: 'Independencia de Guayaquil',
    descripcion: 'Feriado que trae muchos visitantes desde Guayaquil.',
    estrellas: 4,
    tipo: 'feriado',
  },
  {
    mes: 10,
    titulo: 'Ballenas, cierre de temporada',
    descripcion: 'Últimas salidas de avistamiento de la temporada.',
    estrellas: 3,
    tipo: 'temporada',
  },

  // ==================== NOVIEMBRE ====================
  {
    mes: 11,
    dia: 2,
    titulo: 'Difuntos e Independencia de Cuenca',
    descripcion: 'Feriado largo (2 y 3) con ferias, gastronomía y parapente en San Pedro.',
    estrellas: 5,
    tipo: 'feriado',
  },
  {
    mes: 11,
    dia: 7,
    titulo: 'Provincialización de Santa Elena',
    descripcion: 'Desfile "Arte & Color" en la provincia.',
    estrellas: 3,
    tipo: 'fiesta',
  },

  // ==================== DICIEMBRE ====================
  {
    mes: 12,
    dia: 11,
    titulo: 'Fiestas de La Libertad',
    descripcion: 'Celebraciones por la fundación del cantón.',
    estrellas: 2,
    tipo: 'fiesta',
  },
  {
    mes: 12,
    dia: 22,
    titulo: 'Cantonización de Salinas',
    descripcion: 'Aniversario del cantón Salinas.',
    estrellas: 3,
    tipo: 'fiesta',
  },
  {
    mes: 12,
    dia: 25,
    titulo: 'Navidad',
    descripcion: 'Fiesta familiar en la playa.',
    estrellas: 4,
    tipo: 'feriado',
  },
  {
    mes: 12,
    dia: 31,
    titulo: 'Fin de Año',
    descripcion: 'Salinas llena sus reservas. Aviso: oleaje fuerte, respetar banderas rojas.',
    estrellas: 5,
    tipo: 'fiesta',
  },
];

export function eventosDeMes(mes: number): EventoCalendario[] {
  return eventosCalendario.filter((e) => e.mes === mes);
}