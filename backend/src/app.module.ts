import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeachesModule } from './beaches/beaches.module';
import { BeachesSeed } from './beaches/beaches.seed';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    BeachesModule,
    UsersModule,
  ],
  providers: [BeachesSeed],
})
export class AppModule {}
