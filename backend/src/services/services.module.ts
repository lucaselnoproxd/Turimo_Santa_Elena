import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServicesSeed } from './services.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesSeed],
  exports: [ServicesSeed],
})
export class ServicesModule {}
