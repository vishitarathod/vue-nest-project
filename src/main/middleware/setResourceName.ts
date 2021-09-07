import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResourceName implements NestMiddleware {
  //set resource name
  setResourceNameUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.locals.resourceName = 'Users';
    console.log(res.locals.resourceName);
    next();
  };
  setResourceNamePost = async (
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
    this.setResourceNameUser(req, res, next);
  }
}
