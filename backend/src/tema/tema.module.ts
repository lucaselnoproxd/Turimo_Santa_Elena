import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { Tema } from './tema.entity';
import { TemaService } from './tema.service';
import { TemaController, TemaAdminController } from './tema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tema]), AdminModule],
  controllers: [TemaController, TemaAdminController],
  providers: [TemaService],
})
export class TemaModule {}
