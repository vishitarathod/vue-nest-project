import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //get Access token using jwt
  public getJwtAccessToken(userId: string) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}m`,
    });
    return token;
  }
  //get refresh token using jwt
  public getJwtRefreshToken(userId: string) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}d`,
    });
    return token;
  }
  //verify Access token using jwt
  async verifyToken(token: string): Promise<string> {
    const user = await this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });

    return user.userId;
  }
  //verify refresh token using jwt
  async verifyRefToken(token: string): Promise<string> {
    const user = await this.jwtService.verify(token, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    return user.userId;
  }

  async verifyAccessToken(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction,
  ) {
    if (!req.headers['authorization']) return next(Error());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    //verify token
    const user = await this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    // console.log(user);
    // if (!user) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    // req.payload = payload;
    const userId = user.userId;
    res.locals.userID = userId;
    console.log('++++++++++', res.locals.userID);
    next();

    return user.userId;
  }
}
