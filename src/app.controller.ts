import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import Constants from './config/constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private constants: Constants,
  ) {}

  @Get()
  getHello(): string {
    return this.constants.myName;
  }
}
