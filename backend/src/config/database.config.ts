import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Beach } from '../beaches/beach.entity';
import { Activity } from '../activities/activity.entity';
import { Service } from '../services/service.entity';
import { User } from '../users/user.entity';
import { Itinerary } from '../itineraries/itinerary.entity';
import { ItineraryDay } from '../itineraries/itinerary-day.entity';
import { ItineraryItem } from '../itineraries/itinerary-item.entity';

const entities = [
  Beach,
  Activity,
  Service,
  User,
  Itinerary,
  ItineraryDay,
  ItineraryItem,
];

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const url = this.config.get<string>('DATABASE_URL');
    const synchronize = this.config.get('DB_SYNC', 'true') === 'true';

    if (url) {
      return {
        type: 'postgres',
        url,
        entities,
        synchronize,
        ssl: { rejectUnauthorized: false },
        extra: {
          max: 2,
          connectionTimeoutMillis: 15000,
        },
      };
    }

    return {
      type: 'postgres',
      host: this.config.get('DB_HOST', 'localhost'),
      port: Number(this.config.get('DB_PORT', '5432')),
      username: this.config.get('DB_USERNAME', 'postgres'),
      password: this.config.get('DB_PASSWORD', 'postgres'),
      database: this.config.get('DB_NAME', 'playas_santa_elena'),
      entities,
      synchronize,
    };
  }
}
