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
import { AuthenticationService } from './services/helper/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from './services/helper/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { GenerateHashPasswordService } from './services/helper/generate-hash-password.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Post, Resource, Permission]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({}),
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: false,
        auth: {
          user: 'rathodvishita2308@gmail.com',
          pass: '',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'services/helper/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [UserController, PostController, AuthController],
  providers: [
    AuthService,
    UserService,
    PostService,
    AuthenticationService,
    MailService,
    GenerateHashPasswordService,
  ],
  exports: [AuthenticationService],
})
export class MainModule {}
