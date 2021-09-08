import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResourceName implements NestMiddleware {
  //set resource name
  public setResourceNameUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.locals.resourceName = 'Users';
    // console.log(res.locals.resourceName);
    next();
  };
  public setResourceNamePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.locals.resourceName = 'Posts';
    console.log(res.locals.resourceName);
    next();
  };
  use(req: Request, res: Response, next: NextFunction) {
    // this.setResourceNamePost(req, res, next);
    // console.log(req);
    this.setResourceNameUser(req, res, next);
  }
}
