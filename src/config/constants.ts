import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class Constants {
  constructor(private configs: ConfigService) {}

  myName = this.configs.get('MY_NAME');
}
