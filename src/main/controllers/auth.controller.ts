import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //registration api
  @Post('/register')
  registerUser(@Body() user: UserInterface, @Res() res: Response): void {
    res.send(this.authService.registerUser(user));
  }

  //login api
  @Post('/login')
  loginUser(@Body() user: UserInterface) {
    return this.authService.loginUser(user);
  }

  //forgot password api
  @UseGuards(JwtAuthGuard)
  @Post('/forgot')
  forgotPassword(@Req() req: Request) {
    return this.authService.forgotPassword(req);
  }

  //reset password api
  @UseGuards(JwtAuthGuard)
  @Patch('/reset')
  resetPassword(@Req() req: Request) {
    return this.authService.resetPassword(req);
  }
}
