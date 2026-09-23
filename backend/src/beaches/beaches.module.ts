import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeachesController } from './beaches.controller';
import { BeachesService } from './beaches.service';
import { BeachesSeed } from './beaches.seed';
import { Beach } from './beach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beach])],
  controllers: [BeachesController],
  providers: [BeachesService, BeachesSeed],
  exports: [BeachesService],
})
export class BeachesModule {}
