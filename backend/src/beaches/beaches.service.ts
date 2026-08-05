import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beach } from './beach.entity';

@Injectable()
export class BeachesService {
  constructor(
    @InjectRepository(Beach)
    private beachesRepository: Repository<Beach>,
  ) {}

  findAll(): Promise<Beach[]> {
    return this.beachesRepository.find();
  }

  async findOne(id: string): Promise<Beach> {
    const beach = await this.beachesRepository.findOne({ where: { id } });
    if (!beach) throw new NotFoundException(`Beach with id "${id}" not found`);
    return beach;
  }
}
