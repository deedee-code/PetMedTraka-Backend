import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from './database.providers';
import databaseConfig from '../config/database.config';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}
