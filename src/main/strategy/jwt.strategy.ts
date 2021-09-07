import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CommonService } from '../services/helper/common.service';
// import { jwtConstants } from './constants';
// import { Response } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private commonService: CommonService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hjdfcvblshydrvglikswyghfviolsfg',
    });
  }

  async validate(payload: any) {
    console.log(payload.userId);
    // res.locals._id = payload.userId;
    // console.log(res.locals._id);
    // return { userId: payload.userId };
    return this.commonService.setId(payload.userId);
  }
}
