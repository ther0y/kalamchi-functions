import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbService } from '../db/db.service';
import Constants from '../config/constants';
import { GamesModule } from '../games/games.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [GamesModule],
  providers: [UsersService, Constants, DbService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
