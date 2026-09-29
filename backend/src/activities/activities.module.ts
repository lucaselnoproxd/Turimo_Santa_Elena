import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { Activity } from './activity.entity';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { ActivitiesAdminController } from './activities.admin.controller';
import { ActivitiesSeed } from './activities.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), AdminModule],
  controllers: [ActivitiesController, ActivitiesAdminController],
  providers: [ActivitiesService, ActivitiesSeed],
})
export class ActivitiesModule {}
