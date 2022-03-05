import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { dotEnvOptions } from './config/dotenv-options';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import Constants from './config/constants';
import { DbService } from './db/db.service';
import { GamesModule } from './games/games.module';
import { hasuraLoginMiddleware } from './auth/hasura-login.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: dotEnvOptions.path,
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService, Constants, DbService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(hasuraLoginMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
