import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Profile } from "./Profile";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

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

  async findOne(username: string): Promise<User | undefined> {
    const r = await this.dbService.query<Profile>('select * from profile');
    console.log(r[0].id);
    return this.users.find((user) => user.username === username);
  }
}
