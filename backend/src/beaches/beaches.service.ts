import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beach } from './beach.entity';

@Injectable()
export class BeachesService {
  constructor(
    @InjectRepository(Beach)
    private readonly beaches: Repository<Beach>,
  ) {}

  findAll(): Promise<Beach[]> {
    return this.beaches.find();
  }

  async findOne(id: string): Promise<Beach> {
    const beach = await this.beaches.findOne({ where: { id } });
    if (!beach)
      throw new NotFoundException(`Playa con id "${id}" no encontrada`);
    return beach;
  }

  async findBySlug(slug: string): Promise<Beach> {
    const beach = await this.beaches.findOne({ where: { slug } });
    if (!beach) {
      throw new NotFoundException(`Playa "${slug}" no encontrada`);
    }
    return beach;
  }
}
