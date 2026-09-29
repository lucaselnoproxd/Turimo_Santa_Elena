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
import { UbicacionesService } from './ubicaciones.service';
import { CreateUbicacionDto, UpdateUbicacionDto } from './ubicaciones.dto';

@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicaciones: UbicacionesService) {}

  @Get()
  list() {
    return this.ubicaciones.findAll();
  }
}

@UseGuards(AdminGuard)
@Controller('admin/ubicaciones')
export class UbicacionesAdminController {
  constructor(private readonly ubicaciones: UbicacionesService) {}

  @Get()
  list() {
    return this.ubicaciones.findAll();
  }

  @Post()
  create(@Body() body: CreateUbicacionDto, @CurrentAdmin() admin: AdminUser) {
    return this.ubicaciones.create(body, admin.sub);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUbicacionDto,
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.ubicaciones.update(id, body, admin.sub);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ubicaciones.remove(id);
  }
}
