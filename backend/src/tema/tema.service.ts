import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tema, DEFAULT_COLORS } from './tema.entity';
import { UpdateTemaDto } from './tema.dto';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private readonly temas: Repository<Tema>,
  ) {}

  private async ensure(): Promise<Tema> {
    const existing = await this.temas.findOne({ where: { id: 'default' } });
    if (existing) return existing;
    return this.temas.save(
      this.temas.create({ id: 'default', colors: { ...DEFAULT_COLORS } }),
    );
  }

  async findColors() {
    const tema = await this.ensure();
    return { colors: tema.colors };
  }

  async findForAdmin() {
    const tema = await this.ensure();
    return tema;
  }

  async update(dto: UpdateTemaDto, updatedBy: string): Promise<Tema> {
    const tema = await this.ensure();
    Object.assign(tema.colors, dto, { updatedBy });
    return this.temas.save(tema);
  }
}
