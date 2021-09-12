import { ConflictException, Injectable, Param, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { Request } from 'express';
import { Response } from 'express';
import { AuthService } from './auth.service';
// import { CommonService } from './helper/common.service';
import { Resource } from '../models/resource.entity';
import { Permission } from '../models/permission.entity';
// import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { GenerateHashPasswordService } from './helper/generate-hash-password.service';
// import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly authService: AuthService,
    private generateHashPasswordService: GenerateHashPasswordService, // private commonService: CommonService,
  ) {}

  //add user function
  async addUser(@Req() req: Request, @Res() res: Response) {
    // return await this.authService.registerUser(req.body, res);
    try {
      const count = await this.userRepository.count({
        where: { email: req.body.email },
      });

      if (count > 0) {
        throw new ConflictException(`${req.body.email} is alreday exits`);
      }

      // const role = await this.authRoleRepository.findOne({
      //   where: { roleName: req.body.roleId },
      // });

      // req.body.roleId = role.id;

      const hashPassword =
        await this.generateHashPasswordService.generatePassword(
          req.body.password,
        );

      req.body.password = hashPassword;
      // console.log('user:', req.body);
      const saveUser = await this.userRepository.save(req.body);
      // console.log('saveduser:', saveUser);
      // res.send(saveUser);
      return saveUser;
      // res.send(saveUser);
    } catch (e) {
      console.log('=========', e);
      res.status(400).send({ message: 'registration error', error: e });
    }
  }

  //update exiting user
  async updateUser(@Param('id') id: string, @Req() req: Request) {
    return await this.userRepository.update(id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  }
  //delete exiting user
  async deleteUser(@Param('id') id: string) {
    return await this.userRepository.delete(id);
  }
  //get perticular user for edit
  async getUserForEdit(@Param('id') id: string, @Res() res: Response) {
    // console.log('++++++++++++', userId);
    // const _id = this.commonService.getId();
    // console.log(_id);
    return await this.userRepository.findOne(res.locals.userID);
  }

  //get permoissions
  async getPermission(@Req() req: Request, @Res() res: Response) {
    console.log('id...........', res.locals.userID);
    const data = await this.userRepository.findOne(res.locals.userID);
    const resID = await this.resourceRepository.findOne({
      where: { resourceName: req.query.resourceName },
    });
    const permission = await this.permissionRepository.findOne({
      where: { roleId: data.roleId, resourceId: resID.id },
    });
    return permission;
  }

  //get all users with pagination
  async getUsers(options: IPaginationOptions): Promise<Pagination<User>> {
    // console.log(options.page);
    const queryBuilder = this.userRepository.createQueryBuilder();
    const data = await queryBuilder.where({
      roleId: '6d3475c5-d88c-4aae-af25-664b0420b071',
    });
    // console.log(data);
    return paginate<User>(data, options);
  }
}
