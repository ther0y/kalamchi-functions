import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbService } from '../db/db.service';
import Constants from '../config/constants';

@Module({
  providers: [UsersService, Constants, DbService],
  exports: [UsersService],
})
export class UsersModule {}
