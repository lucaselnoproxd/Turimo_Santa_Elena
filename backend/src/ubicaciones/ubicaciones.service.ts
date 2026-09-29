import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicacion } from './ubicacion.entity';
import { CreateUbicacionDto, UpdateUbicacionDto } from './ubicaciones.dto';

@Injectable()
export class UbicacionesService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly ubicaciones: Repository<Ubicacion>,
  ) {}

  findAll(): Promise<Ubicacion[]> {
    return this.ubicaciones.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: string): Promise<Ubicacion> {
    const ubicacion = await this.ubicaciones.findOne({ where: { id } });
    if (!ubicacion) throw new NotFoundException('Ubicación no encontrada');
    return ubicacion;
  }

  async create(dto: CreateUbicacionDto, updatedBy: string): Promise<Ubicacion> {
    return this.ubicaciones.save(
      this.ubicaciones.create({ ...dto, updatedBy }),
    );
  }

  async update(
    id: string,
    dto: UpdateUbicacionDto,
    updatedBy: string,
  ): Promise<Ubicacion> {
    const ubicacion = await this.findOne(id);
    Object.assign(ubicacion, dto, { updatedBy });
    return this.ubicaciones.save(ubicacion);
  }

  async remove(id: string): Promise<{ ok: true }> {
    await this.findOne(id);
    await this.ubicaciones.delete(id);
    return { ok: true };
  }
}
