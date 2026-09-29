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
import { ActivitiesService } from './activities.service';
import { CreateActividadDto, UpdateActividadDto } from './activities.admin.dto';

@UseGuards(AdminGuard)
@Controller('admin/activities')
export class ActivitiesAdminController {
  constructor(private readonly activities: ActivitiesService) {}

  @Get()
  list() {
    return this.activities.findAll();
  }

  @Post()
  create(@Body() body: CreateActividadDto, @CurrentAdmin() admin: AdminUser) {
    return this.activities.create(body, admin.sub);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateActividadDto,
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.activities.update(id, body, admin.sub);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.activities.remove(id);
  }
}
