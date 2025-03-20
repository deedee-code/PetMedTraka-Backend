import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger} from './logger/logger.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.development'],
    load: [],
  }),],
  controllers: [AppController],
  providers: [AppService,  { provide: 'Logger', useClass: CustomLogger }],
})
export class AppModule {}
