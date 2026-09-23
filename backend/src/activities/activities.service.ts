import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';

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
}
