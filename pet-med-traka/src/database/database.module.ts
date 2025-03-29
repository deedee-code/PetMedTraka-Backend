import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from './database.providers';
import databaseConfig from '../config/database.config';
import { userModelProvider } from '@app/database/user.schema.providers';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [...DatabaseProviders, userModelProvider],
  exports: [...DatabaseProviders, userModelProvider],
})
export class DatabaseModule {}
