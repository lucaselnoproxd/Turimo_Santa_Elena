import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeachesModule } from './beaches/beaches.module';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    BeachesModule,
    UsersModule,
    ActivitiesModule,
    ItinerariesModule,
    AuthModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
