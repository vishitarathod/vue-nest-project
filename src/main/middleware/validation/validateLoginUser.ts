import * as Joi from 'joi';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import responseCode from '../../services/helper/response';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  validateLoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const pattern =
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{3,10})';
      const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().regex(RegExp(pattern)).required(),
        // .error(errors => {
        //   errors.forEach(err => {
        //       console.log(")))))",err.code)
        //       if(err.code="object.regex"){
        //           err.message = 'Password must contain one capital letter, one small letter and one special character and atleast 3 characters long '
        //       }else{
        //           err.message='password is required'
        //       }
        //   })
        //   return errors
        //  }),
      });
      await schema.validateAsync(req.body);
      next();
    } catch (e) {
      res
        .status(400)
        .send({ message: 'login error', error: e.details[0].message });
      // responseCode.res400(res, e, 'login error');
    }
  };
  use(req: Request, res: Response, next: NextFunction) {
    // this.registerValidation(req, res, next);
    this.validateLoginUser(req, res, next);
  }
}
