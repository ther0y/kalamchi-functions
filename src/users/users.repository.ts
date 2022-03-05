import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { User } from './User';
import * as crypto from 'crypto';

@Injectable()
export class UsersRepository {
  constructor(private dbService: DbService) {}

  all() {
    return this.dbService.query('SELECT * FROM users');
  }

  findById(id: string) {
    return this.dbService.query(`SELECT * FROM users where id = $1`, [id]);
  }

  findByUsername(username: string) {
    return this.dbService.query<User>(
      'SELECT * FROM users where username = $1',
      [username],
    );
  }

  async create(username: string, password: string, email: string = null) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    const createUserResult = await this.dbService.query(
      'INSERT INTO users (username, password, salt, email) VALUES ($1, $2, $3, $4)',
      [username, hashedPassword, salt, email],
    );

    if (createUserResult) {
      return this.findByUsername(username);
    }
  }
}
