import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Permission } from '../models/permission.entity';
import { Resource } from '../models/resource.entity';
import { User } from '../models/user.entity';
import responseCode from '../services/helper/response';

// interface repoInterface {
//   resourceRepository: Repository<Resource>;
// }

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const allow = false;
      const requestMethod = req.method;
      console.log(requestMethod);
      console.log(res.locals.resourceName);

      //get resource id for given resource name
      const resource = await this.resourceRepository.findOne({
        where: { resourceName: res.locals.resourceName },
      });
      console.log(resource);

      //get role id for given user id
      //   const role = await User.findOne({ _id: res.locals.userID }).select(
      //     'roles',
      //   );
      //   console.log('role : ', role);

      //   //get permission from above role id and resource id
      //   const perms = await Permission.findOne({
      //     roleID: role.roles,
      //     resourceID: resource._id,
      //   });
      //   console.log(perms);
      //   if (perms) {
      //     const { permission } = perms;
      //     console.log(permission);
      //     if (req.method == 'POST' && permission.write) allow = true;
      //     else if (req.method == 'GET' && permission.read) allow = true;
      //     else if (req.method == 'PUT' && permission.update) allow = true;
      //     else if (req.method == 'PATCH' && permission.update) allow = true;
      //     else if (req.method == 'DELETE' && permission.delete) allow = true;
      //     console.log(allow);
      //   }
      //   if (allow) {
      //     next();
      //   } else {
      //     throw 'you are not allowed to access this resource';
      //   }
      next();
    } catch (e) {
      console.log(e);
      // res.status(400).send({ message: 'permission error', error: e });
      responseCode.res400(res, e, 'permission error');
    }
  }
}
