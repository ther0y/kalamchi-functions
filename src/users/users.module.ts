import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbService } from '../db/db.service';
import Constants from '../config/constants';
import { GamesModule } from '../games/games.module';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [GamesModule],
  providers: [
    ConfigService,
    UsersService,
    Constants,
    DbService,
    UsersRepository,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
