import { Pool, PoolClient, QueryResult } from "pg";
import { Injectable } from '@nestjs/common';
import Constants from '../config/constants';

@Injectable()
export class DbService {
  #pool: Pool;

  constructor(private constants: Constants) {
    console.log(constants.pgConnectionString)
    this.#pool = new Pool({
      connectionString: constants.pgConnectionString,
    });
  }

  connect(
    fn: (err: Error, client: PoolClient, done: (release?: any) => void) => void,
  ) {
    return this.#pool.connect(fn);
  }

  async query<T>(query: string): Promise<T[]> {
    const result = await this.#pool.query<T>(query);
    return result.rows;
  }
}
