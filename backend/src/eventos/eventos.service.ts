import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';
import { CreateEventoDto, UpdateEventoDto } from './eventos.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventos: Repository<Evento>,
  ) {}

  findAllPublic(): Promise<
    Pick<
      Evento,
      | 'id'
      | 'mes'
      | 'dia'
      | 'titulo'
      | 'descripcion'
      | 'estrellas'
      | 'tipo'
      | 'movil'
    >[]
  > {
    return this.eventos.find({
      select: {
        id: true,
        mes: true,
        dia: true,
        titulo: true,
        descripcion: true,
        estrellas: true,
        tipo: true,
        movil: true,
      },
      order: { mes: 'ASC', dia: 'ASC', titulo: 'ASC' },
    });
  }

  findAllAdmin(): Promise<Evento[]> {
    return this.eventos.find({
      order: { mes: 'ASC', dia: 'ASC', titulo: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Evento> {
    const evento = await this.eventos.findOne({ where: { id } });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }

  async create(dto: CreateEventoDto, updatedBy: string): Promise<Evento> {
    return this.eventos.save(this.eventos.create({ ...dto, updatedBy }));
  }

  async update(
    id: string,
    dto: UpdateEventoDto,
    updatedBy: string,
  ): Promise<Evento> {
    const evento = await this.findOne(id);
    Object.assign(evento, dto, { updatedBy });
    return this.eventos.save(evento);
  }

  async remove(id: string): Promise<{ ok: true }> {
    await this.findOne(id);
    await this.eventos.delete(id);
    return { ok: true };
  }
}
