import { Module } from '@nestjs/common';
import Constants from '../config/constants';
import { DbService } from '../db/db.service';
import { GamesRepository } from './games.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, Constants, DbService, GamesRepository],
  exports: [GamesRepository],
})
export class GamesModule {}
