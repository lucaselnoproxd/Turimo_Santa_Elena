import { Controller, Get, Param } from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { Beach } from './beach.entity';

@Controller('api/beaches')
export class BeachesController {
  constructor(private readonly beachesService: BeachesService) {}

  @Get()
  findAll(): Promise<Beach[]> {
    return this.beachesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Beach> {
    return this.beachesService.findOne(id);
  }
}
