import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  @Get()
  list(@Query() query: { type?: string; beachId?: string }) {
    return this.services.findAll(query);
  }

  @Get(':id')
  one(@Param('id') id: string) {
    return this.services.findOne(id);
  }
}
