import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { dotEnvOptions } from './config/dotenv-options';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import Constants from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: dotEnvOptions.path,
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, Constants],
})
export class AppModule {}
