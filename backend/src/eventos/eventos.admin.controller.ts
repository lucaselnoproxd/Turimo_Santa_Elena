import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../admin/admin-auth.guard';
import { CurrentAdmin } from '../admin/admin.decorator';
import type { AdminUser } from '../admin/admin-auth.guard';
import { EventosService } from './eventos.service';
import { CreateEventoDto, UpdateEventoDto } from './eventos.dto';

@UseGuards(AdminGuard)
@Controller('admin/eventos')
export class EventosAdminController {
  constructor(private readonly eventos: EventosService) {}

  @Get()
  list() {
    return this.eventos.findAllAdmin();
  }

  @Post()
  create(@Body() body: CreateEventoDto, @CurrentAdmin() admin: AdminUser) {
    return this.eventos.create(body, admin.sub);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateEventoDto,
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.eventos.update(id, body, admin.sub);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventos.remove(id);
  }
}
