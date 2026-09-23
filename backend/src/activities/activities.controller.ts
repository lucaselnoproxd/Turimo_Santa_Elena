import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activities: ActivitiesService) {}

  @Get()
  list(@Query() query: { featured?: string; category?: string }) {
    return this.activities.findAll(query);
  }

  @Get(':slug')
  one(@Param('slug') slug: string) {
    return this.activities.findOneBySlug(slug);
  }
}
