import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/main.module';
import { ValidateRegisterMiddleware } from './main/middleware/validation/validateRegisterUser';
import { ValidateLoginMiddleware } from './main/middleware/validation/validateLoginUser';
import { ResourceNameUser } from './main/middleware/setResourceNameUser';
import { ResourceNamePost } from './main/middleware/setResourceNamePost';
import * as Joi from 'joi';
// import { CommonService } from './main/services/helper/common.service';
import { RoleMiddleware } from './main/middleware/roleMiddleware';
import { AuthMiddleware } from './main/middleware/AuthMIddleware';
// import { JwtService } from '@nestjs/jwt';
// import { AuthenticationService } from './main/services/helper/authentication.service';
// import { JwtService } from '@nestjs/jwt';
// import { JwtStrategy } from './main/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateRegisterMiddleware)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
    consumer
      .apply(ValidateLoginMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware, ResourceNameUser)
      .forRoutes({ path: 'user/*', method: RequestMethod.ALL });
    consumer
      .apply(AuthMiddleware, ResourceNamePost)
      .forRoutes({ path: 'post/*', method: RequestMethod.ALL });
    consumer
      .apply(RoleMiddleware)
      .exclude({ path: 'user/get-permission', method: RequestMethod.GET })
      .forRoutes(
        { path: 'user/*', method: RequestMethod.ALL },
        { path: 'post/*', method: RequestMethod.ALL },
      );
  }
}
