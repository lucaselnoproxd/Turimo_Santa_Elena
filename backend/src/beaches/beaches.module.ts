import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeachesController } from './beaches.controller';
import { BeachesService } from './beaches.service';
import { Beach } from './beach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beach])],
  controllers: [BeachesController],
  providers: [BeachesService],
  exports: [BeachesService],
})
export class BeachesModule {}
