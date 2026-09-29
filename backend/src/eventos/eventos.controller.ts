import { Controller, Get } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventos: EventosService) {}

  @Get()
  list() {
    return this.eventos.findAllPublic();
  }
}
