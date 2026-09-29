import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { Imagen } from './imagen.entity';
import { ImagenesService } from './imagenes.service';
import { ImagenesAdminController } from './imagenes.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen]), AdminModule],
  controllers: [ImagenesAdminController],
  providers: [ImagenesService],
})
export class ImagenesModule {}
