import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Game } from './Game';

@Injectable()
export class GamesRepository {
  constructor(private dbService: DbService) {}

  async findAll() {
    return await this.dbService.query<Game>('SELECT * from games');
  }

  async findById(id: string) {
    return this.dbService.query<Game>('SELECT * FROM games WHERE id = $1', [
      id,
    ]);
  }
}
