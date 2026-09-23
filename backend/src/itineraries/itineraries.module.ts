import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from './itinerary.entity';
import { ItineraryDay } from './itinerary-day.entity';
import { ItineraryItem } from './itinerary-item.entity';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerary, ItineraryDay, ItineraryItem]),
    AuthModule,
  ],
  controllers: [ItinerariesController],
  providers: [ItinerariesService],
})
export class ItinerariesModule {}
