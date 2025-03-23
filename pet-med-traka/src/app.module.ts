import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import databaseConfig from './config/database.config';
import { CustomLogger } from './logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    DatabaseModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'Logger', useClass: CustomLogger }],
})
export class AppModule {}
