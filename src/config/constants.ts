import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class Constants {
  constructor(private configs: ConfigService) {}

  jwtSecret = this.configs.get('JWT_SECRET_KEY');
  pgConnectionString = this.configs.get('PG_CONNECTION_STRING');
}
