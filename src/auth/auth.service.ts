import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadFactory } from './authPayload.factory';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && this.usersService.validatePassword(pass, user)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  createGuestTokens() {
    return {
      accessToken: this.jwtService.sign(AuthPayloadFactory.create('guest')),
    };
  }

  async login({ username }) {
    const user = await this.usersService.findOne(username);

    const payload = AuthPayloadFactory.create(
      user.role,
      user.id,
      user.username,
    );

    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload),
    };
  }
}
