export interface Hotel {
  id: string;
  beachId: string;
  name: string;
  description: string;
  priceRange: string;
  rating: number;
  amenities: string[];
}

export interface Guide {
  id: string;
  beachId: string;
  name: string;
  specialty: string;
  experience: string;
  languages: string[];
  rating: number;
}

export const hotels: Hotel[] = [
  {
    id: 'hotel-montanita-1',
    beachId: 'montanita',
    name: 'Hotel La Ola Verde',
    description: 'Habitaciones frente al mar con terraza panorámica y desayuno incluido. A dos pasos del punto principal de surf.',
    priceRange: '$40 - $80',
    rating: 4,
    amenities: ['Wifi gratis', 'Piscina', 'Desayuno incluido', 'Vista al mar'],
  },
  {
    id: 'hotel-montanita-2',
    beachId: 'montanita',
    name: 'The Surf Lodge',
    description: 'Hostal estilo bohío con ambiente bohemio, clases de surf incluidas y zona de yoga al atardecer.',
    priceRange: '$25 - $55',
    rating: 4,
    amenities: ['Clases de surf', 'Zona de yoga', 'Wifi gratis', 'Restaurante'],
  },
  {
    id: 'hotel-salinas-1',
    beachId: 'salinas',
    name: 'Hotel Salinas del Mar',
    description: 'Hotel de playa con piscina infinita, spa y acceso directo al malecón de Salinas.',
    priceRange: '$90 - $160',
    rating: 5,
    amenities: ['Piscina infinita', 'Spa', 'Restaurante gourmet', 'Estacionamiento'],
  },
  {
    id: 'hotel-salinas-2',
    beachId: 'salinas',
    name: 'Hostal Malecón Vista',
    description: 'Hostal económico con habitaciones limpias y vista parcial al mar, a una cuadra de la playa.',
    priceRange: '$20 - $40',
    rating: 3,
    amenities: ['Wifi gratis', 'Cocina compartida', 'Terraza'],
  },
  {
    id: 'hotel-ayangue-1',
    beachId: 'ayangue',
    name: 'Cabañas La Piscina',
    description: 'Cabañas de madera frente a la bahía de Ayangue con hamacas y acceso directo al snorkel.',
    priceRange: '$45 - $90',
    rating: 5,
    amenities: ['Frente al mar', 'Hamacas', 'Wifi gratis', 'Desayuno'],
  },
  {
    id: 'hotel-ayangue-2',
    beachId: 'ayangue',
    name: 'B&B Delfín Azul',
    description: 'Acogedor bed & breakfast familiar con tours de avistamiento de ballenas incluidos en temporada.',
    priceRange: '$35 - $70',
    rating: 4,
    amenities: ['Tours de ballenas', 'Desayuno casero', 'Wifi gratis'],
  },
  {
    id: 'hotel-ballenita-1',
    beachId: 'ballenita',
    name: 'Posada Ballenita',
    description: 'Posada rústica con restaurante de mariscos propio y vista al mar verde esmeralda.',
    priceRange: '$30 - $60',
    rating: 4,
    amenities: ['Restaurante', 'Vista al mar', 'Wifi gratis'],
  },
  {
    id: 'hotel-ballenita-2',
    beachId: 'ballenita',
    name: 'Surf Camp Punta Brava',
    description: 'Campamento de surf cerca de las mejores olas de Ballenita con clases y equipos incluidos.',
    priceRange: '$20 - $50',
    rating: 4,
    amenities: ['Clases de surf', 'Equipo incluido', 'Dormitorios compartidos'],
  },
  {
    id: 'hotel-chuyuipe-1',
    beachId: 'chuyuipe',
    name: 'Eco Lodge Manglaralto',
    description: 'Lodge ecológico a 10 minutos de Chuyuipe, con cabañas sostenibles y tours de naturaleza.',
    priceRange: '$40 - $85',
    rating: 5,
    amenities: ['Ecológico', 'Tours de naturaleza', 'Desayuno', 'Wifi'],
  },
  {
    id: 'hotel-chuyuipe-2',
    beachId: 'chuyuipe',
    name: 'Camping Chuyuipe',
    description: 'Zona de camping equipada frente a la playa virgen con baños y fogatas permitidas.',
    priceRange: '$10 - $20',
    rating: 3,
    amenities: ['Frente a la playa', 'Baños', 'Zona de fogata'],
  },
  {
    id: 'hotel-chipipe-1',
    beachId: 'chipipe',
    name: 'Hotel Bahía Chipipe',
    description: 'Hotel familiar a pasos de la playa de Chipipe con piscina y desayuno americano.',
    priceRange: '$55 - $100',
    rating: 4,
    amenities: ['Piscina', 'Desayuno americano', 'Wifi gratis', 'Estacionamiento'],
  },
  {
    id: 'hotel-chipipe-2',
    beachId: 'chipipe',
    name: 'Departamentos Vista Azul',
    description: 'Alquiler de departamentos con vista al mar, ideales para familias y estadías largas.',
    priceRange: '$60 - $120',
    rating: 4,
    amenities: ['Cocina equipada', 'Vista al mar', 'Wifi gratis'],
  },
];

export const guides: Guide[] = [
  {
    id: 'guia-montanita-1',
    beachId: 'montanita',
    name: 'Carlos Mera',
    specialty: 'Surf y tours de olas',
    experience: '10 años de experiencia',
    languages: ['Español', 'Inglés'],
    rating: 5,
  },
  {
    id: 'guia-montanita-2',
    beachId: 'montanita',
    name: 'Ana López',
    specialty: 'Gastronomía y cultura local',
    experience: '6 años de experiencia',
    languages: ['Español'],
    rating: 4,
  },
  {
    id: 'guia-salinas-1',
    beachId: 'salinas',
    name: 'Jorge Benítez',
    specialty: 'Deportes acuáticos y pesca',
    experience: '12 años de experiencia',
    languages: ['Español', 'Inglés'],
    rating: 5,
  },
  {
    id: 'guia-salinas-2',
    beachId: 'salinas',
    name: 'María Torres',
    specialty: 'Historia y arquitectura del malecón',
    experience: '4 años de experiencia',
    languages: ['Español', 'Inglés', 'Francés'],
    rating: 4,
  },
  {
    id: 'guia-ayangue-1',
    beachId: 'ayangue',
    name: 'Fernando Villao',
    specialty: 'Buceo y avistamiento de ballenas',
    experience: '8 años de experiencia',
    languages: ['Español', 'Inglés'],
    rating: 5,
  },
  {
    id: 'guia-ayangue-2',
    beachId: 'ayangue',
    name: 'Lucía Castro',
    specialty: 'Kayak y tours de la caleta',
    experience: '5 años de experiencia',
    languages: ['Español'],
    rating: 4,
  },
  {
    id: 'guia-ballenita-1',
    beachId: 'ballenita',
    name: 'Pedro Suárez',
    specialty: 'Pesca artesanal y gastronomía',
    experience: '15 años de experiencia',
    languages: ['Español'],
    rating: 4,
  },
  {
    id: 'guia-chuyuipe-1',
    beachId: 'chuyuipe',
    name: 'Diego Ramírez',
    specialty: 'Senderismo y naturaleza',
    experience: '7 años de experiencia',
    languages: ['Español', 'Inglés'],
    rating: 5,
  },
  {
    id: 'guia-chipipe-1',
    beachId: 'chipipe',
    name: 'Sofía Mendoza',
    specialty: 'Fotografía y paseos guiados',
    experience: '3 años de experiencia',
    languages: ['Español', 'Inglés'],
    rating: 4,
  },
];

export function getHotelsByBeach(beachId: string): Hotel[] {
  return hotels.filter((h) => h.beachId === beachId);
}

export function getGuidesByBeach(beachId: string): Guide[] {
  return guides.filter((g) => g.beachId === beachId);
}
