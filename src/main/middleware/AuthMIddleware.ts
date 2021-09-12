import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../services/helper/authentication.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // this.registerValidation(req, res, next);
    return await this.authenticationService.verifyAccessToken(req, res, next);
  }
}
