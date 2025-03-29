import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '@app/database/database.module';
import { userModelProvider } from '@app/database/user.schema.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, userModelProvider],
  exports: [UsersService],
})
export class UsersModule {}
