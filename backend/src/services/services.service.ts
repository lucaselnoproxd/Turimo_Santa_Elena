import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly services: Repository<Service>,
  ) {}

  findAll(options?: { type?: string; beachId?: string }): Promise<Service[]> {
    const where: Record<string, unknown> = {};
    if (options?.type === 'hotel' || options?.type === 'guia') {
      where.type = options.type;
    }
    if (options?.beachId) {
      where.beachId = options.beachId;
    }
    return this.services.find({ where, order: { rating: 'DESC' } });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.services.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }
    return service;
  }
}
