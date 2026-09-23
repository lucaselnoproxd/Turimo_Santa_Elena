import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { Beach } from './beach.entity';

@Controller('beaches')
export class BeachesController {
  constructor(private readonly beachesService: BeachesService) {}

  @Get()
  findAll(): Promise<Beach[]> {
    return this.beachesService.findAll();
  }

  @Get(':idOrSlug')
  async findOne(@Param('idOrSlug') idOrSlug: string): Promise<Beach> {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );
    const beach = isUuid
      ? await this.beachesService.findOne(idOrSlug)
      : await this.beachesService.findBySlug(idOrSlug);
    if (!beach) {
      throw new NotFoundException('Playa no encontrada');
    }
    return beach;
  }
}
