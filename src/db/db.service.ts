import { Pool, PoolClient, QueryResult, types } from 'pg';
types.setTypeParser(1114, function (stringValue) {
  return stringValue; //1114 for time without timezone type
});

import { Injectable } from '@nestjs/common';
import Constants from '../config/constants';

@Injectable()
export class DbService {
  #pool: Pool;

  constructor(private constants: Constants) {
    this.#pool = new Pool({
      connectionString: constants.pgConnectionString,
    });
  }

  connect(
    fn: (err: Error, client: PoolClient, done: (release?: any) => void) => void,
  ) {
    return this.#pool.connect(fn);
  }

  async query<T>(query: string, values = []): Promise<T[]> {
    const result = await this.#pool.query<T>(query, values);
    return result.rows;
  }
}
