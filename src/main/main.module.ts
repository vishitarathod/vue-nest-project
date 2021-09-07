import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PostController } from './controllers/post.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Role } from './models/role.entity';
import { Post } from './models/post.entity';
import { Resource } from './models/resource.entity';
import { Permission } from './models/permission.entity';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MailService } from './services/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Post, Resource, Permission]),
    JwtModule.register({}),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: false,
        auth: {
          user: process.env.username,
          pass: process.env.pass,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  controllers: [UserController, PostController, AuthController],
  providers: [
    AuthService,
    UserService,
    PostService,
    AuthenticationService,
    JwtStrategy,
    MailService,
  ],
})
export class MainModule {}
