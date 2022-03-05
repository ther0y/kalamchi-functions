import { Injectable } from '@nestjs/common';
import { GamesRepository } from '../games/games.repository';
import { UsersRepository } from './users.repository';
import * as crypto from 'crypto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private gamesRepository: GamesRepository,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  validatePassword(password: string, user: User) {
    const hash = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    return user.password === hash;
  }

  async findOne(username: string): Promise<User | undefined> {
    const [user] = await this.usersRepository.findByUsername(username);
    return user;
  }
}
