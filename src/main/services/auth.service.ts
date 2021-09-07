import {
  ConflictException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';
import { Role } from '../models/role.entity';
import { User } from '../models/user.entity';
import { AuthenticationService } from './helper/authentication.service';
import { MailService } from './helper/mail.service';
import { Request } from 'express';
import { GenerateHashPasswordService } from './helper/generate-hash-password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authUserRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly authRoleRepository: Repository<Role>,
    private authenticationService: AuthenticationService,
    private mailService: MailService,
    private generateHashPasswordService: GenerateHashPasswordService,
  ) {}

  //registration function
  async registerUser(user: UserInterface): Promise<User> {
    const count = await this.authUserRepository.count({
      where: { email: user.email },
    });
    if (count > 0) {
      throw new ConflictException(`${user.email} is alreday exits`);
    }
    const role = await this.authRoleRepository.findOne({
      where: { roleName: user.roleId },
    });
    user.roleId = role.id;
    const hashPassword =
      await this.generateHashPasswordService.generatePassword(user.password);
    user.password = hashPassword;

    return this.authUserRepository.save(user);
  }

  //login function
  async loginUser(user: UserInterface) {
    const count = await this.authUserRepository.count({
      where: { email: user.email },
    });
    if (count <= 0) {
      throw new NotFoundException(`${user.email} is not register`);
    }
    const userOne = await this.authUserRepository.findOne({
      where: { email: user.email },
    });
    const accessToken = await this.authenticationService.getJwtAccessToken(
      userOne.id,
    );
    const refreshToken = await this.authenticationService.getJwtRefreshToken(
      userOne.id,
    );
    return { accessToken, refreshToken };
  }

  //forgot password function
  async forgotPassword(@Req() req: Request) {
    const count = await this.authUserRepository.count({
      where: { email: req.body.email },
    });
    if (count <= 0) {
      throw new NotFoundException(`${req.body.email} is not register`);
    }
    const userOne = await this.authUserRepository.findOne({
      where: { email: req.body.email },
    });
    const accessToken = await this.authenticationService.getJwtAccessToken(
      userOne.id,
    );
    await this.mailService.sendMail(accessToken);
  }

  //reset password function
  async resetPassword(@Req() req: Request) {
    const user = await this.authenticationService.verifyToken(req.body.token);
    const userOne = await this.authUserRepository.findOne({
      where: { id: user },
    });
    console.log(req.body.password);
    console.log(userOne.id);
    const data = await this.authUserRepository.update(userOne.id, {
      password: req.body.password,
    });
    return data;
  }

  async refreshToken(@Req() req: Request) {
    const refreshToken = req.body.token;
    if (!refreshToken) throw Error();
    //verify refresh token
    const userId = await this.authenticationService.verifyRefToken(
      refreshToken,
    );
    //generate new access token
    const accToken = await this.authenticationService.getJwtAccessToken(userId);
    //generate new refresh token
    const refToken = await this.authenticationService.getJwtRefreshToken(
      userId,
    );
    // res.json({ accToken, refToken });
    return { accToken, refToken };
  }
}
