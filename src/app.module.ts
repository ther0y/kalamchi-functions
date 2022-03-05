import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import Constants from './config/constants';
import { DbService } from './db/db.service';
import { GamesModule } from './games/games.module';
import { hasuraLoginMiddleware } from './auth/hasura-login.middleware';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, GamesModule],
  controllers: [AppController],
  providers: [AppService, Constants, DbService, ConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(hasuraLoginMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
