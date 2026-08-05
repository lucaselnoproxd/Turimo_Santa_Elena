
export interface Beach {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  location: string;
  imageUrl: string;
  activities: string[];
  rating: number;
  bestSeason: string;
  knownFor: string;
  highlights: string[];
  tips: string[];
  gallery: string[];
}

export const beaches: Beach[] = [
  {
    id: 'montanita',
    name: 'Montañita',
    shortDescription: 'El paraíso del surf en Ecuador',
    longDescription:
      'Montañita es uno de los destinos playeros más famosos de Ecuador, conocido internacionalmente por sus olas perfectas para el surf. Este pequeño pueblo pesquero se ha convertido en un punto de encuentro para viajeros de todo el mundo, ofreciendo una vibrante vida nocturna, una deliciosa gastronomía costera y un ambiente bohemio único. Sus extensas playas de arena dorada y su clima cálido durante todo el año la convierten en el destino ideal tanto para surfistas experimentados como para principiantes que quieren aprender.',
    location: 'Santa Elena, Ecuador',
    imageUrl: '/images/playas/montanita.jpg',
    activities: ['Surf', 'Fiestas', 'Gastronomía', 'Avistamiento de aves'],
    rating: 5,
    bestSeason: 'Diciembre - Mayo',
    knownFor: 'Surf de clase mundial y vida nocturna',
    highlights: [
      'Olas para todos los niveles de surf',
      'Ambiente bohemio y multicultural',
      'Mejor marisquería de la costa',
      'Fiestas frente al mar todos los fines de semana',
    ],
    tips: [
      'Alquila una tabla de surf en la playa por $5/hora',
      'Prueba el encocado de camarón en el mercado central',
      'Los martes hay música en vivo en la calle principal',
      'Reserva hospedaje con anticipación en temporada alta',
    ],
    gallery: ['/images/playas/montanita.jpg', '/images/playas/salinas.jpg'],
  },
  {
    id: 'salinas',
    name: 'Salinas',
    shortDescription: 'Elegancia y mar en la península',
    longDescription:
      'Salinas es la capital turística de la provincia de Santa Elena, famosa por sus lujosos balnearios, su malecón moderno y sus playas de aguas tranquilas. Es el destino preferido por familias y jóvenes que buscan disfrutar del sol, el mar y una amplia variedad de deportes acuáticos. Su famoso "Malecón de Salinas" ofrece una vista espectacular del océano, con restaurantes, bares y tiendas que lo convierten en el lugar perfecto para pasear tanto de día como de noche.',
    location: 'Santa Elena, Ecuador',
    imageUrl: '/images/playas/salinas.jpg',
    activities: ['Jet Ski', 'Pesca deportiva', 'Gastronomía', 'Ciclismo'],
    rating: 4,
    bestSeason: 'Todo el año',
    knownFor: 'Malecón moderno y deportes acuáticos',
    highlights: [
      'Malecón de Salinas con restaurantes y miradores',
      'Puerto de pesca deportiva con torneos internacionales',
      'Playas tranquilas ideales para familias',
      'Vida nocturna en el sector de la Puntilla',
    ],
    tips: [
      'Camina el malecón al atardecer para ver el mejor atardecer',
      'Visita el mirador de La Chocolatera en Punta Carnero',
      'Alquila una bicicleta para recorrer la bahía',
      'Los mariscos frescos son el plato estrella',
    ],
    gallery: ['/images/playas/salinas.jpg', '/images/playas/chipipe.jpg'],
  },
  {
    id: 'ayangue',
    name: 'Ayangue',
    shortDescription: 'La piscina del Pacífico',
    longDescription:
      'Conocida cariñosamente como "La Piscina del Pacífico", Ayangue es una tranquila caleta de pescadores que enamora a sus visitantes con sus aguas cristalinas y su ambiente sereno. Sus playas están protegidas por formaciones rocosas naturales que crean una bahía de aguas calmadas, perfecta para nadar, hacer snorkel y buceo. Es el lugar ideal para quienes buscan escapar del ruido y conectarse con la naturaleza en un entorno paradisíaco.',
    location: 'Santa Elena, Ecuador',
    imageUrl: '/images/playas/ayangue.jpg',
    activities: ['Snorkel', 'Buceo', 'Kayak', 'Avistamiento de ballenas'],
    rating: 5,
    bestSeason: 'Junio - Noviembre',
    knownFor: 'Aguas cristalinas y snorkel',
    highlights: [
      'Bahía protegida de aguas calmadas',
      'Arrecifes con vida marina diversa',
      'Avistamiento de ballenas jorobadas de junio a septiembre',
      'Paseos en kayak por la caleta de pescadores',
    ],
    tips: [
      'Lleva tu equipo de snorkel o alquila uno en la playa',
      'La mejor hora para bucear es en la mañana temprano',
      'Pregunta en el muelle por los paseos en lancha',
      'En temporada de ballenas reserva tu tour con días de anticipación',
    ],
    gallery: ['/images/playas/ayangue.jpg', '/images/playas/montanita.jpg'],
  },
  {
    id: 'ballenita',
    name: 'Ballenita',
    shortDescription: 'Tranquilidad junto al mar verde',
    longDescription:
      'Ballenita es un pequeño y encantador pueblo pesquero ubicado a pocos minutos de Salinas. Su playa destaca por las aguas verde esmeralda y su ambiente relajado, muy diferente al bullicio turístico de la península. Es famosa por su "La Chocolatera" y por ser un excelente punto para degustar mariscos frescos en las mesas rústicas frente al mar. Perfecta para quienes buscan un día de playa sin multitudes, caminatas por la orilla y la experiencia auténtica de la vida costera ecuatoriana.',
    location: 'Santa Elena, Ecuador',
    imageUrl: '/images/playas/ballenita.jpg',
    activities: ['Caminatas', 'Gastronomía', 'Pesca artesanal', 'Fotografía'],
    rating: 4,
    bestSeason: 'Todo el año',
    knownFor: 'Aguas verdes y mariscos frescos',
    highlights: [
      'Playa tranquila con aguas verde esmeralda',
      'Restaurantes de mariscos sobre la arena',
      'Cerca del famoso punto de surf Punta Brava',
      'Atardeceres espectaculares sin aglomeraciones',
    ],
    tips: [
      'Pide el "arroz marinero" en las fondas de la playa',
      'A diferencia de Salinas, aquí el ambiente es mucho más calmado',
      'Ideal para una escapada de medio día',
      'Combínalo con una visita al faro de La Chocolatera',
    ],
    gallery: ['/images/playas/ballenita.jpg', '/images/playas/ayangue.jpg'],
  },
  {
    id: 'chuyuipe',
    name: 'Chuyuipe',
    shortDescription: 'La joya escondida de la costa',
    longDescription:
      'Chuyuipe es una playa virgen y poco conocida, ubicada entre Montañita y Olón, que conserva la esencia pura de la costa ecuatoriana. Sus aguas cristalinas y su arena dorada se extienden rodeadas de acantilados y vegetación nativa, ofreciendo un refugio perfecto para quienes buscan privacidad y contacto directo con la naturaleza. Al no tener desarrollo turístico, es el lugar ideal para desconectarse, hacer snorkel en aguas limpias y disfrutar de la playa prácticamente solo.',
    location: 'Santa Elena, Ecuador',
    imageUrl: '/images/playas/chuyuipe.jpg',
    activities: ['Snorkel', 'Caminatas', 'Camping', 'Observación de aves'],
    rating: 5,
    bestSeason: 'Diciembre - Mayo',
    knownFor: 'Playa virgen y poca afluencia',
    highlights: [
      'Playas prácticamente desiertas entre semana',
      'Agua cristalina ideal para snorkel',
      'Acantilados con miradores naturales',
      'Perfecta para camping en contacto con la naturaleza',
    ],
    tips: [
      'Lleva todo lo necesario: no hay tiendas cercanas',
      'Acceso por camino de tierra, ten precaución en invierno',
      'Lleva protector solar biodegradable para cuidar el arrecife',
      'Visita temprano para tener la playa para ti solo',
    ],
    gallery: ['/images/playas/chuyuipe.jpg', '/images/playas/montanita.jpg'],
  },
  {
    id: 'chipipe',
    name: 'Chipipe',
    shortDescription: 'Mar turquesa frente a la punta',
    longDescription:
      'Chipipe es una hermosa playa ubicada entre Salinas y La Libertad, famosa por sus aguas turquesas y su tranquila bahía protegida por la Punta Chipipe. Menos concurrida que San Lorenzo, ofrece arena fina, mar calmado y un paisaje espectacular con el faro como telón de fondo. Es ideal para familias, nadar con seguridad y disfrutar de una tarde de sol en uno de los balnearios más limpios de la península de Santa Elena.',
    location: 'Santa Elena, Ecuador',
    imageUrl: '/images/playas/chipipe.jpg',
    activities: ['Natación', 'Volleyball de playa', 'Fotografía', 'Caminatas'],
    rating: 4,
    bestSeason: 'Todo el año',
    knownFor: 'Aguas turquesas y ambiente familiar',
    highlights: [
      'Bahía protegida con mar calmado',
      'Arena blanca y fina',
      'Vista del faro de Chipipe desde la orilla',
      'Menos concurrida que las playas del centro de Salinas',
    ],
    tips: [
      'Ideal para ir con niños por sus aguas tranquilas',
      'Los fines de semana se llena de locales, llega temprano',
      'La Punta Chipipe es perfecta para fotos al atardecer',
      'Está a solo 5 minutos del malecón de Salinas',
    ],
    gallery: ['/images/playas/chipipe.jpg', '/images/playas/salinas.jpg'],
  },
];
