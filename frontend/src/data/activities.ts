// ============================================================
// ACTIVIDADES / EXPERIENCIAS TURISTICAS
// Contenido tomado de santaelena.travel
// ============================================================
// Las imágenes viven en frontend/public/images/<slug>/
//   cover.jpg       -> imagen principal
//   gallery-N.jpg   -> fotos de galería
// Para cambiar una imagen: reemplaza el archivo, no este código.
//
// Para cambiar el WhatsApp de una operadora: edita `contact.whatsapp`
// (número con código de país, sin "+"). Ej: "593982798091"

import type { ContactInfo } from '../config/site';
import { coverImage, galleryImage } from '../config/images';

export type ActivityCategory = 'Acuaticas' | 'Culturales' | 'Deportivas' | 'Naturales';

export interface Operator {
  name: string;
  contact: ContactInfo;
}

export interface Activity {
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
  dificultadLevel: 'baja' | 'media' | 'alta';
  operadores: Operator[];
  lugares: string[];
  transporte: string[];
  featured: boolean;
  beaches?: string[];
}

export interface Category {
  id: ActivityCategory;
  name: string;
  short: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'Acuaticas',
    name: 'Experiencias Acuáticas',
    short: 'Acuáticas',
    description: 'Ballenas, surf, buceo, paseos náuticos y playas paradisíacas.',
  },
  {
    id: 'Culturales',
    name: 'Experiencias Culturales',
    short: 'Culturales',
    description: 'Museos, iglesias, gastronomía, artesanías y tradiciones.',
  },
  {
    id: 'Deportivas',
    name: 'Experiencias Deportivas',
    short: 'Deportivas',
    description: 'Ecociclismo, senderismo y deportes acuáticos de adrenalina.',
  },
  {
    id: 'Naturales',
    name: 'Experiencias Naturales',
    short: 'Naturales',
    description: 'Aves, cacao, miel, fauna, paja toquilla y parapente.',
  },
];

export const activities: Activity[] = [
  // ==================== ACUÁTICAS ====================
  {
    id: 'surf',
    slug: 'surf',
    title: 'Conquista las olas y eleva tu adrenalina',
    cardTitle: 'Surf',
    category: 'Acuaticas',
    tagline: 'Olas perfectas todo el año en Montañita y Olón',
    description: [
      'Descubre la magia que trae el mar en una nueva forma: la libertad, y libera una explosión de adrenalina sobre cada ola.',
      'Desafía a grandes olas en un entorno ideal que fusiona la belleza natural de nuestras playas y el ambiente acogedor de sus habitantes. Puedes aprender a surfear o demostrar tu destreza en la tabla.',
    ],
    cover: coverImage('surf'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: '06:00 - 18:00',
    dificultad: 'Dificultad Alta',
    dificultadLevel: 'alta',
    operadores: [
      { name: 'Escuela Surf Paradise', contact: { whatsapp: '593987243126' } },
      { name: 'Balsa Surf Camp Guest House', contact: { whatsapp: '593989714685' } },
      { name: 'Olón New Wave Surf School', contact: { whatsapp: '593969460868' } },
    ],
    lugares: ['Montañita', 'Olón', 'Ayangue', 'San Pedro', 'La Lobería'],
    transporte: [
      'Cooperativa Transcisa-SA',
      'Cooperativa Costa Azul CICA',
      'Cooperativa Manglaralto',
      'Cooperativa CITUP',
      'Cooperativa Libertad Peninsular',
      'Cooperativa del Pacífico (Terminal Terrestre Ballenita)',
      'Cooperativa Horizonte Peninsular',
      'Taxis desde el cruce de Ayangue hasta el malecón',
    ],
    featured: true,
    beaches: ['montanita', 'salinas', 'ayangue'],
  },
  {
    id: 'ballenas-jorobadas',
    slug: 'ballenas-jorobadas',
    title: 'Contempla la majestuosidad de las Ballenas Jorobadas',
    cardTitle: 'Ballenas Jorobadas',
    category: 'Acuaticas',
    tagline: 'Junio a septiembre en Salinas y Ayangue',
    description: [
      'Conviértete en un invitado especial de la danza de las ballenas jorobadas, un espectáculo inolvidable cuyo escenario privilegiado es nuestra provincia, lugar que estos majestuosos mamíferos marinos eligen como su refugio perfecto.',
      'Entre junio y septiembre de cada año las costas de Santa Elena se convierten en el escenario de uno de los espectáculos más impresionantes de la naturaleza: la llegada de las majestuosas ballenas jorobadas.',
      'Estas gigantes del océano recorren miles de kilómetros desde la Antártida hasta las cálidas aguas ecuatorianas para reproducirse y parir sus crías, brindando la oportunidad única para observarlas de cerca. Guiados por expertos y con todas las medidas de seguridad, los paseos en bote te permitirán vivir este encuentro inolvidable con uno de los mamíferos más asombrosos del planeta.',
    ],
    cover: coverImage('ballenas-jorobadas'),
    gallery: [],
    estacionalidad: 'Junio - Septiembre',
    horario: 'Salinas: 09:30 - 17:00 | Ayangue: 08:00 - 16:00',
    dificultad: 'Dificultad Alta',
    dificultadLevel: 'alta',
    operadores: [
      { name: 'Satumar S.A.', contact: { whatsapp: '593978581217' } },
      { name: 'Caroltour S.A.', contact: { whatsapp: '593992141875' } },
      { name: 'Vielimar S.A.', contact: { whatsapp: '593988640556' } },
      { name: 'Olcris S.A.', contact: { whatsapp: '593993848371' } },
      { name: 'Náutica Travel', contact: { whatsapp: '593993848371' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
      { name: 'Tour Operator Padi Resort', contact: { whatsapp: '593968694822' } },
      { name: 'Viajeros del Mar', contact: { whatsapp: '593994628921' } },
      { name: 'Go Ayangue', contact: { whatsapp: '593985503275' } },
      { name: 'Aroninti S.A.', contact: { whatsapp: '593989578099' } },
      { name: 'Aventuras Marinas', contact: { whatsapp: '593997539308' } },
      { name: 'Go Montañita', contact: { whatsapp: '593979874072' } },
    ],
    lugares: ['Salinas', 'Ayangue'],
    transporte: [],
    featured: true,
    beaches: ['salinas', 'ayangue'],
  },
  {
    id: 'snorkel-2',
    slug: 'snorkel-2',
    title: 'Sumérgete en las maravillas submarinas',
    cardTitle: 'Buceo y Snorkel',
    category: 'Acuaticas',
    tagline: 'Bucea en el Islote El Pelado',
    description: [
      'Disfruta de una experiencia única explorando un mundo submarino biodiverso en una de las reservas marinas del Ecuador. Bucea en compañía de un instructor especializado del programa Discover Scuba Diving.',
      'Sumérgete en el azul, descubre la diversidad y el colorido que habita en el universo submarino. ¡Nada, observa, disfruta!',
    ],
    cover: coverImage('snorkel'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: '09:00 - 18:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Buceo Ecuador Diving School', contact: { whatsapp: '593999452058' } },
      { name: 'Padi Resort', contact: { whatsapp: '593968694822' } },
      { name: 'Viajeros del Mar', contact: { whatsapp: '593994628921' } },
      { name: 'Go Ayangue', contact: { whatsapp: '593985503275' } },
    ],
    lugares: ['Islote El Pelado — Ayangue'],
    transporte: [],
    featured: true,
    beaches: ['ayangue'],
  },
  {
    id: 'pasear-en-bote',
    slug: 'pasear-en-bote',
    title: 'Disfruta de paseos náuticos inolvidables',
    cardTitle: 'Paseos Náuticos',
    category: 'Acuaticas',
    tagline: 'Navega las bahías de Salinas y Ayangue',
    description: [
      'Deja que el viento y el sol guíen tu navegación por nuestras bahías, una experiencia que podrás compartir con tu familia o amigos.',
      'En Salinas y Ayangue encontrarás operadoras turísticas que ofertan paseos en embarcaciones debidamente registradas que cumplen con los parámetros de seguridad.',
      '¡Relájate, disfrútalo y vívelo!',
    ],
    cover: coverImage('paseos-nauticos'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: 'Salinas: 09:30 - 17:00 | Ayangue: 08:00 - 16:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Satumar S.A.', contact: { whatsapp: '593978581217' } },
      { name: 'Caroltour S.A.', contact: { whatsapp: '593992141875' } },
      { name: 'Vielimar S.A.', contact: { whatsapp: '593988640556' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
      { name: 'Viajeros del Mar', contact: { whatsapp: '593994628921' } },
      { name: 'Go Ayangue', contact: { whatsapp: '593985503275' } },
      { name: 'Aventuras Marinas', contact: { whatsapp: '593997539308' } },
    ],
    lugares: ['Salinas', 'Ayangue'],
    transporte: [],
    featured: false,
    beaches: ['salinas', 'ayangue'],
  },
  {
    id: 'sol-mar-y-playas',
    slug: 'sol-mar-y-playas',
    title: 'Disfruta del sol y del mar en paradisíacas playas',
    cardTitle: 'Sol, Mar y Playas',
    category: 'Acuaticas',
    tagline: 'Arena dorada y aguas cristalinas',
    description: [
      'Fusiona la belleza natural, actividades recreativas y por supuesto, el sol y mar, visitando playas espectaculares de arena dorada y aguas cristalinas, aliadas estratégicas para escapar del bullicio y la vida cotidiana.',
      'Santa Elena es un destino que enamora con sus playas. Su entorno natural, relajantes arenas, exquisita gastronomía y la calidez de su gente la convierten en un destino para recorrer. Ofrece además gran cantidad de actividades y muchas opciones de diversión.',
    ],
    cover: coverImage('sol-mar-playas'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: 'Todo el día',
    dificultad: 'Dificultad Baja',
    dificultadLevel: 'baja',
    operadores: [],
    lugares: [
      'Ballenita — Santa Elena',
      'Chanduy',
      'Comuna Valdivia',
      'La Entrada',
      'Libertador Bolívar',
      'Manglaralto',
      'Montañita',
      'Playa Acapulco de Ancón',
      'Playa Ayangue',
      'Playa Cadeate',
      'Playa Cautivo',
      'Playa Chipipe',
      'Playa Curia',
      'Playa de Capaes',
      'Playa de Olón',
      'Playa de San Lorenzo',
      'Playa La Carolina, Salinas',
      'Playa La Rinconada',
      'Playa Las Nuñez',
      'Playa Milina',
      'Playa Palmar',
      'Playa Punta Carnero',
      'Playa Rosada',
      'Playa San Antonio',
      'Playa San José',
      'Playa San Pablo',
    ],
    transporte: [
      'Cooperativa Costa Azul CICA',
      'Libertad Peninsular (CLP)',
      'Cooperativa Transcisa-SA',
      'Cooperativa del Pacífico',
      'Cooperativa Horizonte Peninsular',
      'Taxis desde Salinas',
    ],
    featured: false,
    beaches: ['montanita', 'salinas', 'ayangue', 'ballenita', 'chuyuipe', 'chipipe'],
  },

  // ==================== CULTURALES ====================
  {
    id: 'compras-de-artesanias',
    slug: 'compras-de-artesanias',
    title: 'Lleva contigo nuestra esencia artesanal',
    cardTitle: 'Artesanías',
    category: 'Culturales',
    tagline: 'Paja toquilla, cerámica y talento local',
    description: [
      'Maravíllate con los productos de los mercados artesanales de las diferentes localidades de Santa Elena y descubre todo lo que las hábiles manos de sus artesanos pueden lograr transformando los materiales que esta tierra les da.',
      'Lleva un recuerdo a casa que pone de manifiesto el arte y la habilidad de los peninsulares mediante una rica variedad de productos que expresan la identidad y el patrimonio local. Desde artesanías elaboradas con paja toquilla hasta hermosas piezas de cerámica que cuentan historias de generaciones de tradición y destreza.',
    ],
    cover: coverImage('artesanias'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: 'Todo el día',
    dificultad: 'Dificultad Baja',
    dificultadLevel: 'baja',
    operadores: [],
    lugares: [],
    transporte: [
      'Cooperativa Costa Azul CICA',
      'Libertad Peninsular (CLP)',
      'Cooperativa Transcisa-SA',
      'Cooperativa del Pacífico',
      'Cooperativa Horizonte Peninsular',
      'Taxis desde Salinas',
    ],
    featured: false,
  },
  {
    id: 'culturas-milenarias',
    slug: 'culturas-milenarias',
    title: 'Descubre la historia de culturas milenarias',
    cardTitle: 'Culturas Milenarias',
    category: 'Culturales',
    tagline: 'Museos que guardan 5.000 años de historia',
    description: [
      'La provincia de Santa Elena es un territorio rico en historia y legado prehispánico, con importantes centros culturales que preservan y exhiben los vestigios de antiguas civilizaciones.',
      'Visita a los guardianes de la historia y la identidad cultural de la provincia de Santa Elena: nuestros museos, y observa las exhibiciones que van desde la vida marina hasta muestras de arte religioso y tradiciones locales.',
    ],
    cover: coverImage('culturas-milenarias'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: 'Todo el día',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Museo Amantes de Sumpa', contact: { whatsapp: '593991716124' } },
      { name: 'Museo Real Alto', contact: { whatsapp: '593988627357' } },
      { name: 'Museo Valdivia', contact: { whatsapp: '593990683456' } },
      { name: 'Centro de Interpretación Los Ceibitos', contact: { whatsapp: '593967698353' } },
      { name: 'Centro de Interpretación Sacachún', contact: { whatsapp: '593997357099' } },
      { name: 'Museo Megaterio', contact: { whatsapp: '593997864780' } },
      { name: 'Casa de los 100 años', contact: { whatsapp: '593983390859' } },
    ],
    lugares: [],
    transporte: [
      'Cooperativa Costa Azul CICA',
      'Libertad Peninsular (CLP)',
      'Cooperativa Transcisa-SA',
      'Cooperativa del Pacífico',
      'Cooperativa Horizonte Peninsular',
      'Taxis desde Salinas',
    ],
    featured: false,
  },
  {
    id: 'disfrutar-gastronomia',
    slug: 'disfrutar-gastronomia',
    title: 'Deléitate con la gastronomía local',
    cardTitle: 'Gastronomía',
    category: 'Culturales',
    tagline: 'Ceviches, bollos de pescado y mariscos frescos',
    description: [
      'La provincia de Santa Elena ofrece una rica y variada gastronomía, fusionando sabores autóctonos y marinos. Sus platos destacan por el uso de productos frescos del mar, como ceviches y mariscos, así como deliciosas preparaciones tradicionales como el bollo de pescado.',
      'La diversidad cultural de la región también se refleja en sus recetas, brindando una experiencia culinaria única para todos los gustos.',
    ],
    cover: coverImage('gastronomia'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: 'Todo el día',
    dificultad: 'Dificultad Baja',
    dificultadLevel: 'baja',
    operadores: [],
    lugares: [],
    transporte: [],
    featured: true,
    beaches: ['montanita', 'salinas', 'ballenita'],
  },
  {
    id: 'iglesias',
    slug: 'iglesias',
    title: 'Visita Iglesias emblemáticas',
    cardTitle: 'Iglesias',
    category: 'Culturales',
    tagline: 'Espiritualidad, historia y tradición',
    description: [
      'Conoce nuestra riqueza histórica y cultural reflejada en iglesias emblemáticas, joyas del patrimonio que enlazan la espiritualidad, historia y tradición local, haciendo de nuestra provincia un destino inigualable para los amantes del turismo religioso.',
      '¡Conecta con la tradición, reflexiona y renueva tu espíritu!',
    ],
    cover: coverImage('iglesias'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: '06:00 - 20:00',
    dificultad: 'Dificultad Baja',
    dificultadLevel: 'baja',
    operadores: [
      { name: 'Operadora JCCV', contact: { whatsapp: '593980033052' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
    ],
    lugares: [],
    transporte: [],
    featured: false,
  },
  {
    id: 'tradiciones-culturales',
    slug: 'tradiciones-culturales',
    title: 'Participa de las tradiciones locales',
    cardTitle: 'Tradiciones',
    category: 'Culturales',
    tagline: 'Fiestas, fe y mar en cada pueblo',
    description: [
      'Las tradiciones locales en Santa Elena están muy ligadas a su fe y su relación con el mar, logrando una combinación muy especial, que representa una verdadera experiencia cultural para los visitantes.',
    ],
    cover: coverImage('tradiciones'),
    gallery: [],
    estacionalidad: 'Acorde a lugar',
    horario: 'Todo el día',
    dificultad: 'Dificultad Baja - Media',
    dificultadLevel: 'baja',
    operadores: [],
    lugares: [],
    transporte: [],
    featured: false,
  },

  // ==================== DEPORTIVAS ====================
  {
    id: 'ecociclismo',
    slug: 'ecociclismo',
    title: 'Recorre pedaleando los encantos naturales de Santa Elena',
    cardTitle: 'Ecociclismo',
    category: 'Deportivas',
    tagline: 'Montañas y costa en dos ruedas',
    description: [
      'Pedalea hacia la aventura en Santa Elena, Ecuador. Recorre pintorescos poblados, hermosas playas e impresionantes paisajes de montaña.',
      'Arriésgate y realiza un recorrido en bicicleta a través de una variada topografía y paisajes costeros en los que podrás internarte en las montañas y viajar a lo largo de la costa, lo que se convierte en una experiencia dinámica y enriquecedora.',
      '¡Desafía tus límites y vive la emoción del ciclismo deportivo!',
    ],
    cover: coverImage('ecociclismo'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: 'Todo el día',
    dificultad: 'Dificultad Baja',
    dificultadLevel: 'baja',
    operadores: [
      { name: 'Comuna Dos Mangas', contact: { whatsapp: '593982798091' } },
      { name: 'BikeSpondytus', contact: { whatsapp: '593980744511' } },
      { name: 'Operadora JCCV', contact: { whatsapp: '593980033052' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
    ],
    lugares: ['Comuna Dos Mangas', 'Manglaralto', 'Olón', 'Montañita'],
    transporte: [
      'Cooperativa Costa Azul CICA',
      'Libertad Peninsular (CLP)',
      'Cooperativa Transcisa-SA',
      'Cooperativa del Pacífico',
      'Cooperativa Horizonte Peninsular',
      'Taxis desde Salinas',
    ],
    featured: true,
    beaches: ['montanita', 'chuyuipe', 'ballenita'],
  },
  {
    id: 'deportes-acuaticos',
    slug: 'deportes-acuaticos',
    title: 'Practica Deportes Acuáticos',
    cardTitle: 'Deportes Acuáticos',
    category: 'Deportivas',
    tagline: 'Kayak, parasailing, paddle surf y más',
    description: [
      'Atrévete a practicar deportes y actividades acuáticas extremas en nuestras amplias y paradisiacas playas. Natación, kayak, parasailing, paddle surf, esquí acuático, entre otras opciones, están dentro de nuestra oferta turística.',
      'Es momento de vivir una experiencia inigualable.',
    ],
    cover: coverImage('deportes-acuaticos'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: '10:00 - 17:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Anna Paula', contact: { whatsapp: '593993848371' } },
      { name: 'Ray Aguila Tour Operator', contact: { whatsapp: '593968694822' } },
      { name: 'Padi Resort', contact: { whatsapp: '593987243126' } },
      { name: 'Comuna Dos Mangas', contact: { whatsapp: '593982798091' } },
      { name: 'Operadora JCCV', contact: { whatsapp: '593980033052' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
    ],
    lugares: ['Salinas', 'La Libertad', 'Chuyuipe', 'San Pablo', 'Palmar', 'Ayangue', 'Montañita'],
    transporte: [],
    featured: false,
    beaches: ['salinas', 'montanita', 'ayangue'],
  },
  {
    id: 'senderismo',
    slug: 'senderismo',
    title: 'Aventúrate a explorar bosques y senderos',
    cardTitle: 'Senderismo',
    category: 'Deportivas',
    tagline: 'La Cordillera Chongón Colonche te espera',
    description: [
      'Descubre los secretos de la Cordillera Chongón Colonche con rutas llenas de aventura, naturaleza, aves y vegetación única. Además, podrás visitar las reservas ecológicas, lugares excepcionales, con bosques nublados y paisajes verdes, sitio rico en cultura con comunidades que mantienen vivas sus tradiciones ancestrales.',
      'Conecta con la naturaleza en Santa Elena y desafía tus límites.',
    ],
    cover: coverImage('senderismo'),
    gallery: [],
    estacionalidad: 'Todo el año',
    horario: 'Todo el día',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Comuna Dos Mangas', contact: { whatsapp: '593982798091' } },
      { name: 'Operadora JCCV', contact: { whatsapp: '593980033052' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
    ],
    lugares: ['Comuna Dos Mangas', 'Comuna Loma Alta', 'San Vicente de Loja'],
    transporte: [
      'Cooperativa Costa Azul CICA',
      'Libertad Peninsular (CLP)',
      'Cooperativa Transcisa-SA',
      'Cooperativa del Pacífico',
      'Cooperativa Horizonte Peninsular',
      'Taxis desde Salinas',
    ],
    featured: false,
    beaches: ['chuyuipe'],
  },

  // ==================== NATURALES ====================
  {
    id: 'avistamiento-aves',
    slug: 'avistamiento-aves',
    title: 'Observa gran variedad de aves silvestres y marinas',
    cardTitle: 'Avistamiento de Aves',
    category: 'Naturales',
    tagline: 'Un paraíso para ornitólogos y aficionados',
    description: [
      'Somos un verdadero paraíso de avistamiento de aves que atrae a ornitólogos, y a observadores aficionados y profesionales.',
      'Esta actividad se la puede realizar todo el año en sitios marinos que sirven de "paradero" de aves, donde es fácil observar diferentes especies alimentándose, mudando el plumaje o simplemente descansando antes de retomar su vuelo. Además, en varias áreas de conservación de la Cordillera Chongón Colonche, es posible ver cientos de especies de aves maravillosas y únicas.',
    ],
    cover: coverImage('aves'),
    gallery: [
      galleryImage('aves', 1),
      galleryImage('aves', 2),
      galleryImage('aves', 3),
      galleryImage('aves', 4),
    ],
    estacionalidad: 'Todo el año',
    horario: '10:00 - 17:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Comuna Dos Mangas', contact: { whatsapp: '593982798091' } },
      { name: 'Operadora JCCV', contact: { whatsapp: '593980033052' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
    ],
    lugares: [
      'Ecuasal',
      'Playa Pacoa',
      'Islote El Pelado',
      'Comuna Las Balsas',
      'Comuna Salanguillo',
      'Comuna Loma Alta',
      'Comuna Dos Mangas',
      'San Vicente de Loja — Olón',
    ],
    transporte: [],
    featured: false,
  },
  {
    id: 'sumergete-en-la-belleza-natural-de-santa-elena',
    slug: 'sumergete-en-la-belleza-natural-de-santa-elena',
    title: 'Admira la belleza natural de Santa Elena',
    cardTitle: 'Belleza Natural',
    category: 'Naturales',
    tagline: 'Cabalgatas por paisajes impresionantes',
    description: [
      'Sumérgete en la belleza natural de Santa Elena a través de una experiencia única y enriquecedora: una cabalgata que te llevará a explorar paisajes impresionantes y rincones ocultos de esta maravillosa región.',
      'Monta a caballo y déjate guiar por senderos rodeados de exuberante vegetación, mientras disfrutas de la tranquilidad y el esplendor de la naturaleza.',
    ],
    cover: coverImage('belleza-natural'),
    gallery: [
      galleryImage('belleza-natural', 1),
      galleryImage('belleza-natural', 2),
      galleryImage('belleza-natural', 3),
      galleryImage('belleza-natural', 4),
    ],
    estacionalidad: 'Todo el año',
    horario: '10:00 - 17:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Comuna Dos Mangas', contact: { whatsapp: '593982798091' } },
      { name: 'Operadora JCCV', contact: { whatsapp: '593980033052' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
    ],
    lugares: ['Comuna Dos Mangas', 'Olón'],
    transporte: [],
    featured: false,
  },
  {
    id: 'cacao',
    slug: 'cacao',
    title: 'Encántate con la experiencia del cacao',
    cardTitle: 'Cacao',
    category: 'Naturales',
    tagline: 'Del fruto tropical al chocolate',
    description: [
      'Conoce las plantaciones de cacao y disfruta los aromas y sabores de esta fruta de origen tropical, materia prima para la producción del chocolate.',
      'Las fincas ofrecen un tour de medio día, que incluye almuerzo; conjuntamente, podrás deleitarte con la variedad de frutas tropicales cultivadas en el lugar, y productos elaborados a base de cacao algarrobo, entre otros.',
    ],
    cover: coverImage('cacao'),
    gallery: [
      galleryImage('cacao', 1),
      galleryImage('cacao', 2),
      galleryImage('cacao', 3),
      galleryImage('cacao', 4),
      galleryImage('cacao', 5),
    ],
    estacionalidad: 'Todo el año',
    horario: '10:00 - 17:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Comuna Dos Mangas', contact: { whatsapp: '593982798091' } },
      { name: 'Operadora JCCV', contact: { whatsapp: '593980033052' } },
      { name: 'Ecuador Expedition', contact: { whatsapp: '593968831287' } },
    ],
    lugares: ['Comuna Febres Cordero', 'Comuna Dos Mangas', 'Olón'],
    transporte: [],
    featured: false,
  },
  {
    id: 'cosechar-miel',
    slug: 'cosechar-miel',
    title: 'Explora el mundo de la Apicultura',
    cardTitle: 'Apicultura',
    category: 'Naturales',
    tagline: 'Miel de sabor único en Colonche',
    description: [
      'Vive de cerca el fascinante mundo de la apicultura y cosecha de miel, proceso artesanal que refleja el compromiso con el cuidado del medio ambiente y la preservación de las prácticas agrícolas ancestrales, cuyo resultado es una miel de sabor único y de alta calidad.',
      'La apicultura es un arte que conecta a las personas con la naturaleza de una manera única. Al cuidar de las abejas, no solo estamos cultivando miel, sino también preservando la vida y el equilibrio ecológico del planeta.',
    ],
    cover: coverImage('apicultura'),
    gallery: [galleryImage('apicultura', 1), galleryImage('apicultura', 2)],
    estacionalidad: 'Todo el año',
    horario: '09:00 - 15:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Alexis Constante', contact: { whatsapp: '593993707895' } },
      { name: 'Aide Tomalá', contact: { whatsapp: '593988657342' } },
      { name: 'Jonathan Guale', contact: { whatsapp: '593990319949' } },
    ],
    lugares: ['Colonche'],
    transporte: [],
    featured: false,
  },
  {
    id: 'diversidad-faunistica',
    slug: 'diversidad-faunistica',
    title: 'Sorpréndete de la diversidad faunística',
    cardTitle: 'Fauna',
    category: 'Naturales',
    tagline: 'Aves rapaces y biodiversidad marina',
    description: [
      'Nuestra fauna y naturaleza te harán sentir una experiencia incomparable llena de una biodiversidad local y global.',
      'En el zoológico Rapaz Lana observarás la conservación, rescate y rehabilitación de aves rapaces; si eres un amante de los animales este es el lugar indicado. Puedes contemplar varios ejemplares de aves que nunca verás en tu vida de una forma educativa.',
    ],
    cover: coverImage('fauna'),
    gallery: [
      galleryImage('fauna', 1),
      galleryImage('fauna', 2),
      galleryImage('fauna', 3),
      galleryImage('fauna', 4),
      galleryImage('fauna', 5),
    ],
    estacionalidad: 'Todo el año',
    horario: '09:00 - 15:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [{ name: 'Erick Díaz', contact: { whatsapp: '593996252379' } }],
    lugares: ['Colonche', 'Parque Marino Valdivia'],
    transporte: [],
    featured: false,
  },
  {
    id: 'paja-toquilla',
    slug: 'paja-toquilla',
    title: 'Conoce el proceso de la Paja Toquilla',
    cardTitle: 'Paja Toquilla',
    category: 'Naturales',
    tagline: 'El arte ancestral del sombrero',
    description: [
      'Esta forma de arte se ha transmitido a lo largo de generaciones y está profundamente arraigada en la cultura de los pobladores de la provincia de Santa Elena.',
      'Conoce el proceso para la obtención de la paja toquilla, fibra natural emblemática de la región costera, utilizada en la fabricación de sombreros y otros productos; arte ancestral que combina técnicas tradicionales y que refleja la habilidad de sus habitantes como testimonio de la riqueza cultural.',
    ],
    cover: coverImage('paja-toquilla'),
    gallery: [
      galleryImage('paja-toquilla', 1),
      galleryImage('paja-toquilla', 2),
      galleryImage('paja-toquilla', 3),
    ],
    estacionalidad: 'Todo el año',
    horario: 'Todo el día',
    dificultad: 'Dificultad Baja',
    dificultadLevel: 'baja',
    operadores: [
      { name: 'Centro Artesanal de Procesamiento de Paja Toquilla', contact: { whatsapp: '593980362647' } },
      { name: 'Comuna Dos Mangas', contact: { whatsapp: '593982798091' } },
      { name: 'Sr. Sandro Tomalá', contact: { whatsapp: '593997813530' } },
      { name: 'Sra. Piedad Tomalá', contact: { whatsapp: '593997787835' } },
    ],
    lugares: ['Comuna Febres Cordero', 'Comuna Barcelona', 'Comuna Loma Alta', 'Comuna Dos Mangas'],
    transporte: [
      'Cooperativa Costa Azul CICA',
      'Libertad Peninsular (CLP)',
      'Cooperativa Transcisa-SA',
      'Cooperativa del Pacífico',
      'Cooperativa Horizonte Peninsular',
      'Taxis desde Salinas',
    ],
    featured: false,
  },
  {
    id: 'parapente',
    slug: 'parapente',
    title: 'Vive la libertad de volar',
    cardTitle: 'Parapente',
    category: 'Naturales',
    tagline: 'Vuelos tándem sobre acantilados',
    description: [
      'Desafía tus límites y descubre la emoción de volar como un ave.',
      'Tu adrenalina fluirá al máximo observando hermosos paisajes marinos marcados por la geografía costera y acantilados imponentes.',
      '¡Arriésgate! y lánzate en un vuelo tipo tándem con guías turísticos especializados.',
    ],
    cover: coverImage('parapente'),
    gallery: [
      galleryImage('parapente', 1),
      galleryImage('parapente', 2),
      galleryImage('parapente', 3),
      galleryImage('parapente', 4),
    ],
    estacionalidad: 'Todo el año',
    horario: '09:00 - 18:00',
    dificultad: 'Dificultad Media',
    dificultadLevel: 'media',
    operadores: [
      { name: 'Centro Turístico Comunitario San Pedro', contact: { whatsapp: '593980595124' } },
      { name: 'Parapente Playa Bruja', contact: { whatsapp: '593969277289' } },
      { name: 'Ecuador Expeditions', contact: { whatsapp: '593968831287' } },
    ],
    lugares: ['Playa La Bruja — Simón Bolívar', 'Parapente San Pedro'],
    transporte: [],
    featured: true,
    beaches: ['ballenita'],
  },
];

// ==================== HELPERS ====================

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

export function getActivitiesByCategory(category: ActivityCategory): Activity[] {
  return activities.filter((a) => a.category === category);
}

export function getFeaturedActivities(): Activity[] {
  return activities.filter((a) => a.featured);
}

export function getCategoryById(id: ActivityCategory): Category | undefined {
  return categories.find((c) => c.id === id);
}

// Color representativo de cada categoría (para badges y acentos)
export function categoryColor(category: ActivityCategory): string {
  switch (category) {
    case 'Acuaticas':
      return 'var(--clr-primary)';
    case 'Culturales':
      return '#f59e0b';
    case 'Deportivas':
      return '#e63946';
    case 'Naturales':
      return 'var(--clr-accent)';
  }
}

// Color según el nivel de dificultad de la experiencia
export function difficultyColor(level: Activity['dificultadLevel']): string {
  switch (level) {
    case 'baja':
      return 'var(--clr-accent)';
    case 'media':
      return '#f59e0b';
    case 'alta':
      return '#e63946';
  }
}
