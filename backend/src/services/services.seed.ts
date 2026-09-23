import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesSeed implements OnModuleInit {
  private readonly logger = new Logger(ServicesSeed.name);

  constructor(
    @InjectRepository(Service)
    private readonly services: Repository<Service>,
  ) {}

  async onModuleInit() {
    const count = await this.services.count();
    if (count > 0) {
      this.logger.log('Servicios ya sembrados, omitiendo...');
      return;
    }

    const hotels: Partial<Service>[] = [
      {
        type: 'hotel',
        beachId: 'montanita',
        name: 'Hotel La Ola Verde',
        description:
          'Habitaciones frente al mar con terraza panorámica y desayuno incluido. A dos pasos del punto principal de surf.',
        priceRange: '$40 - $80',
        rating: 4,
        amenities: [
          'Wifi gratis',
          'Piscina',
          'Desayuno incluido',
          'Vista al mar',
        ],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'montanita',
        name: 'The Surf Lodge',
        description:
          'Hostal estilo bohío con ambiente bohemio, clases de surf incluidas y zona de yoga al atardecer.',
        priceRange: '$25 - $55',
        rating: 4,
        amenities: [
          'Clases de surf',
          'Zona de yoga',
          'Wifi gratis',
          'Restaurante',
        ],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'salinas',
        name: 'Hotel Salinas del Mar',
        description:
          'Hotel de playa con piscina infinita, spa y acceso directo al malecón de Salinas.',
        priceRange: '$90 - $160',
        rating: 5,
        amenities: [
          'Piscina infinita',
          'Spa',
          'Restaurante gourmet',
          'Estacionamiento',
        ],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'salinas',
        name: 'Hostal Malecón Vista',
        description:
          'Hostal económico con habitaciones limpias y vista parcial al mar, a una cuadra de la playa.',
        priceRange: '$20 - $40',
        rating: 3,
        amenities: ['Wifi gratis', 'Cocina compartida', 'Terraza'],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'ayangue',
        name: 'Cabañas La Piscina',
        description:
          'Cabañas de madera frente a la bahía de Ayangue con hamacas y acceso directo al snorkel.',
        priceRange: '$45 - $90',
        rating: 5,
        amenities: ['Frente al mar', 'Hamacas', 'Wifi gratis', 'Desayuno'],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'ayangue',
        name: 'B&B Delfín Azul',
        description:
          'Acogedor bed & breakfast familiar con tours de avistamiento de ballenas incluidos en temporada.',
        priceRange: '$35 - $70',
        rating: 4,
        amenities: ['Tours de ballenas', 'Desayuno casero', 'Wifi gratis'],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'ballenita',
        name: 'Posada Ballenita',
        description:
          'Posada rústica con restaurante de mariscos propio y vista al mar verde esmeralda.',
        priceRange: '$30 - $60',
        rating: 4,
        amenities: ['Restaurante', 'Vista al mar', 'Wifi gratis'],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'ballenita',
        name: 'Surf Camp Punta Brava',
        description:
          'Campamento de surf cerca de las mejores olas de Ballenita con clases y equipos incluidos.',
        priceRange: '$20 - $50',
        rating: 4,
        amenities: [
          'Clases de surf',
          'Equipo incluido',
          'Dormitorios compartidos',
        ],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'chuyuipe',
        name: 'Eco Lodge Manglaralto',
        description:
          'Lodge ecológico a 10 minutos de Chuyuipe, con cabañas sostenibles y tours de naturaleza.',
        priceRange: '$40 - $85',
        rating: 5,
        amenities: ['Ecológico', 'Tours de naturaleza', 'Desayuno', 'Wifi'],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'chuyuipe',
        name: 'Camping Chuyuipe',
        description:
          'Zona de camping equipada frente a la playa virgen con baños y fogatas permitidas.',
        priceRange: '$10 - $20',
        rating: 3,
        amenities: ['Frente a la playa', 'Baños', 'Zona de fogata'],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'chipipe',
        name: 'Hotel Bahía Chipipe',
        description:
          'Hotel familiar a pasos de la playa de Chipipe con piscina y desayuno americano.',
        priceRange: '$55 - $100',
        rating: 4,
        amenities: [
          'Piscina',
          'Desayuno americano',
          'Wifi gratis',
          'Estacionamiento',
        ],
        contact: {},
      },
      {
        type: 'hotel',
        beachId: 'chipipe',
        name: 'Departamentos Vista Azul',
        description:
          'Alquiler de departamentos con vista al mar, ideales para familias y estadías largas.',
        priceRange: '$60 - $120',
        rating: 4,
        amenities: ['Cocina equipada', 'Vista al mar', 'Wifi gratis'],
        contact: {},
      },
    ];

    const guias: Partial<Service>[] = [
      {
        type: 'guia',
        beachId: 'montanita',
        name: 'Carlos Mera',
        specialty: 'Surf y tours de olas',
        experience: '10 años de experiencia',
        languages: ['Español', 'Inglés'],
        rating: 5,
        contact: {},
      },
      {
        type: 'guia',
        beachId: 'montanita',
        name: 'Ana López',
        specialty: 'Gastronomía y cultura local',
        experience: '6 años de experiencia',
        languages: ['Español'],
        rating: 4,
        contact: {},
      },
      {
        type: 'guia',
        beachId: 'salinas',
        name: 'Jorge Benítez',
        specialty: 'Deportes acuáticos y pesca',
        experience: '12 años de experiencia',
        languages: ['Español', 'Inglés'],
        rating: 5,
        contact: {},
      },
      {
        type: 'guia',
        beachId: 'salinas',
        name: 'María Torres',
        specialty: 'Historia y arquitectura del malecón',
        experience: '4 años de experiencia',
        languages: ['Español', 'Inglés', 'Francés'],
        rating: 4,
        contact: {},
      },
      {
        type: 'guia',
        beachId: 'ayangue',
        name: 'Fernando Villao',
        specialty: 'Buceo y avistamiento de ballenas',
        experience: '8 años de experiencia',
        languages: ['Español', 'Inglés'],
        rating: 5,
        contact: {},
      },
      {
        type: 'guia',
        beachId: 'ayangue',
        name: 'Lucía Castro',
        specialty: 'Kayak y tours de la caleta',
        experience: '5 años de experiencia',
        languages: ['Español'],
        rating: 4,
        contact: {},
      },
      {
        type: 'guia',
        beachId: 'ballenita',
        name: 'Pedro Suárez',
        specialty: 'Pesca artesanal y gastronomía',
        experience: '15 años de experiencia',
        languages: ['Español'],
        rating: 4,
        contact: {},
      },
      {
        type: 'guia',
        beachId: 'chuyuipe',
        name: 'Diego Ramírez',
        specialty: 'Senderismo y naturaleza',
        experience: '7 años de experiencia',
        languages: ['Español', 'Inglés'],
        rating: 5,
        contact: {},
      },
      {
        type: 'guia',
        beachId: 'chipipe',
        name: 'Sofía Mendoza',
        specialty: 'Fotografía y paseos guiados',
        experience: '3 años de experiencia',
        languages: ['Español', 'Inglés'],
        rating: 4,
        contact: {},
      },
    ];

    await this.services.save([...hotels, ...guias]);
    this.logger.log(
      `Sembrados ${hotels.length} hoteles y ${guias.length} guías`,
    );
  }
}
