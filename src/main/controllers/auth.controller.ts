import { Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //registration api
  @Post('/register')
  async register(@Req() req: Request, @Res() res: Response) {
    try {
      res.send(await this.authService.registerUser(req, res));
    } catch (error) {
      res.send(error);
    }
  }

  //login api
  @Post('/login')
  async loginUser(@Req() req: Request, @Res() res: Response) {
    try {
      res.send(await this.authService.loginUser(req, res));
    } catch (error) {
      res.send(error);
    }
  }

  //forgot password api
  // @UseGuards(JwtAuthGuard)
  @Post('/forgot')
  forgotPassword(@Req() req: Request) {
    return this.authService.forgotPassword(req);
  }

  //reset password api
  // @UseGuards(JwtAuthGuard)
  @Patch('/reset')
  resetPassword(@Req() req: Request) {
    return this.authService.resetPassword(req);
  }

  //refresh token api
  // @UseGuards(JwtAuthGuard)
  @Post('/refresh-token')
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.json(this.authService.logout(res));
  }
}
