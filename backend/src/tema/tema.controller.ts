import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../admin/admin-auth.guard';
import { CurrentAdmin } from '../admin/admin.decorator';
import type { AdminUser } from '../admin/admin-auth.guard';
import { TemaService } from './tema.service';
import { UpdateTemaDto } from './tema.dto';

@Controller('theme')
export class TemaController {
  constructor(private readonly temas: TemaService) {}

  @Get()
  findColors() {
    return this.temas.findColors();
  }
}

@UseGuards(AdminGuard)
@Controller('admin/tema')
export class TemaAdminController {
  constructor(private readonly temas: TemaService) {}

  @Get()
  findForAdmin() {
    return this.temas.findForAdmin();
  }

  @Patch()
  update(@Body() body: UpdateTemaDto, @CurrentAdmin() admin: AdminUser) {
    return this.temas.update(body, admin.sub);
  }
}
