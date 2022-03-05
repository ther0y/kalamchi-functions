import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import Constants from './config/constants';
import { LocalAuthGuard } from './auth/guards/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';
import { GamesRepository } from './games/games.repository';
import { hasher } from './utils/hasher';
import { UsersRepository } from './users/users.repository';
import { AuthPayloadFactory } from './auth/authPayload.factory';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private constants: Constants,
    private gamesRepository: GamesRepository,
    private usersRepository: UsersRepository,
  ) {}

  @Get()
  getHello(): string {
    return 'OK';
  }

  @Post('auth/guest')
  async guest() {
    return this.authService.createGuestTokens();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/register')
  async register(@Request() req) {
    const { username, password, email } = req.body.input;
    const [user] = await this.usersRepository.create(username, password, email);

    return {
      id: user.id,
      accessToken: '',
      refreshToken: '',
    };
  }

  @Post('gameById')
  async gameById(@Request() req) {
    const { id } = req.body.input;
    const [game] = await this.gamesRepository.findById(id);

    return {
      ...game,
      word: hasher.encode(hasher.encode(game)),
      date: game.date,
    };
  }

  @Post('gamesList')
  async gamesList(@Request() req) {
    const games = await this.gamesRepository.findAll();

    return games.map((g) => ({
      ...g,
      word: hasher.encode(hasher.encode(g.word)),
    }));
  }
}
