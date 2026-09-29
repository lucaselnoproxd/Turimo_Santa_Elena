import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type DeepPartial } from 'typeorm';
import { Activity } from './activity.entity';
import type { OperadorDto } from './activities.admin.dto';
import { CreateActividadDto, UpdateActividadDto } from './activities.admin.dto';

// TypeORM guarda `operadores` como JSON; se normalizan los contactos
// para que siempre sean objetos planos (nunca undefined).
function normalizeOperadores<T extends { operadores?: OperadorDto[] }>(
  dto: T,
): T {
  return {
    ...dto,
    operadores: dto.operadores?.map((op) => ({
      name: op.name,
      contact: op.contact ?? {},
    })),
  };
}

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activities: Repository<Activity>,
  ) {}

  findAll(options?: {
    featured?: string;
    category?: string;
  }): Promise<Activity[]> {
    const where: Record<string, unknown> = {};
    if (options?.featured === 'true') where.featured = true;
    if (options?.category) where.category = options.category;
    return this.activities.find({ where });
  }

  async findOneBySlug(slug: string): Promise<Activity> {
    const activity = await this.activities.findOne({ where: { slug } });
    if (!activity) {
      throw new NotFoundException('Experiencia no encontrada');
    }
    return activity;
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activities.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException('Experiencia no encontrada');
    }
    return activity;
  }

  async create(dto: CreateActividadDto, updatedBy: string): Promise<Activity> {
    const existing = await this.activities.findOne({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException('Ya existe una actividad con ese slug');
    }
    return this.activities.save(
      this.activities.create({
        ...normalizeOperadores(dto),
        updatedBy,
      } as DeepPartial<Activity>),
    );
  }

  async update(
    id: string,
    dto: UpdateActividadDto,
    updatedBy: string,
  ): Promise<Activity> {
    const activity = await this.findOne(id);
    Object.assign(activity, normalizeOperadores(dto), { updatedBy });
    return this.activities.save(activity);
  }

  async remove(id: string): Promise<{ ok: true }> {
    await this.findOne(id);
    await this.activities.delete(id);
    return { ok: true };
  }
}
