import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import responseCode from '../services/helper/response';
import {
  PermissionRepository,
  ResourceRepository,
  UserRepository,
} from '../services/helper/repo';


@Injectable()
export class RoleMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let allow = false;
      const resourceRepository = getCustomRepository(ResourceRepository);
      const permissionRepository = getCustomRepository(PermissionRepository);
      const userRepository = getCustomRepository(UserRepository);
      //get resource id for given resource name
      const resource = await resourceRepository.findOne({
        where: { resourceName: res.locals.resourceName },
      });

      const role = await userRepository.findOne({ id: res.locals.userID });
      // console.log('role : ', role.roleId);
      //  console.log(resource.id);

      //   //get permission from above role id and resource id
      const perms = await permissionRepository.findOne({
        roleId: role.roleId,
        resourceId: resource.id,
      });
      // console.log('perms...', perms);
      if (perms) {
        const permission = perms;
        // console.log('ppppppppppppp', permission);
        if (req.method == 'POST' && permission.write) allow = true;
        else if (req.method == 'GET' && permission.read) allow = true;
        else if (req.method == 'PUT' && permission.update) allow = true;
        else if (req.method == 'PATCH' && permission.update) allow = true;
        else if (req.method == 'DELETE' && permission.delete) allow = true;
        console.log(allow);
      }
      if (allow) {
        next();
      } else {
        throw 'you are not allowed to access this resource';
      }
      // next();
    } catch (e) {
      console.log('oooooooooooo', e);
      res.status(400).send({ message: 'permission error', error: e });
      // responseCode.res400(res, e, 'permission error');
    }
  }
}
