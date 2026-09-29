import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../admin/admin-auth.guard';
import { CurrentAdmin } from '../admin/admin.decorator';
import type { AdminUser } from '../admin/admin-auth.guard';
import { ImagenesService } from './imagenes.service';
import { UploadImagenDto } from './imagenes.dto';

@UseGuards(AdminGuard)
@Controller('admin/imagenes')
export class ImagenesAdminController {
  constructor(private readonly imagenes: ImagenesService) {}

  @Get()
  list() {
    return this.imagenes.findAll();
  }

  @Post()
  create(@Body() body: UploadImagenDto, @CurrentAdmin() admin: AdminUser) {
    return this.imagenes.upload(body, admin.sub);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.imagenes.remove(id);
  }
}
