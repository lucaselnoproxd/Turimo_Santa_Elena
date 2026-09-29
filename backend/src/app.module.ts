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
import { AdminModule } from './admin/admin.module';
import { EventosModule } from './eventos/eventos.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { TemaModule } from './tema/tema.module';
import { ImagenesModule } from './imagenes/imagenes.module';
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
    AdminModule,
    EventosModule,
    UbicacionesModule,
    TemaModule,
    ImagenesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
