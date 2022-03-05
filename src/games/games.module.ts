import { Module } from '@nestjs/common';
import Constants from '../config/constants';
import { DbService } from '../db/db.service';
import { GamesRepository } from './games.repository';

@Module({
  providers: [Constants, DbService, GamesRepository],
  exports: [GamesRepository],
})
export class GamesModule {}
