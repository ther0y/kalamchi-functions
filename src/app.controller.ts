import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import Constants from './config/constants';
import { LocalAuthGuard } from './auth/guards/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from "./auth/guards/jwt-auth-guard";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private constants: Constants,
  ) {}

  @Get()
  getHello(): string {
    return this.constants.myName;
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
}
