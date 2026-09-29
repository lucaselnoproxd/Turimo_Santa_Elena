import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { Ubicacion } from './ubicacion.entity';
import { UbicacionesService } from './ubicaciones.service';
import { UbicacionesController, UbicacionesAdminController } from './ubicaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ubicacion]), AdminModule],
  controllers: [UbicacionesController, UbicacionesAdminController],
  providers: [UbicacionesService],
})
export class UbicacionesModule {}
