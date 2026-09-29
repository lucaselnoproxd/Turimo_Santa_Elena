import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { Evento } from './evento.entity';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { EventosAdminController } from './eventos.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Evento]), AdminModule],
  controllers: [EventosController, EventosAdminController],
  providers: [EventosService],
})
export class EventosModule {}
