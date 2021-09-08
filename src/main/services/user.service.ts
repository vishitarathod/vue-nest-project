import { Injectable, Param, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { Request } from 'express';
// import { Response } from 'express';
import { AuthService } from './auth.service';
import { CommonService } from './helper/common.service';
import { Resource } from '../models/resource.entity';
import { Permission } from '../models/permission.entity';
// import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
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
    private commonService: CommonService,
  ) {}

  //add user function
  async addUser(@Req() req: Request) {
    await this.authService.registerUser(req.body);
  }

  //update exiting user
  async updateUser(@Param('id') id: string, @Req() req: Request) {
    await this.userRepository.update(id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  }
  //delete exiting user
  async deleteUser(@Param('id') id: string) {
    await this.userRepository.delete(id);
  }
  //get perticular user for edit
  async getUserForEdit(@Param('id') id: string) {
    // console.log('++++++++++++', userId);
    return await this.userRepository.findOne(id);
  }

  //get permoissions
  async getPermission(@Req() req: Request) {
    const _id = this.commonService.getId();
    console.log(_id);
    const data = await this.userRepository.findOne(_id);
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
    const queryBuilder = this.userRepository.createQueryBuilder();
    const data = await queryBuilder.where({
      roleId: '6d3475c5-d88c-4aae-af25-664b0420b071',
    });
    console.log(data);
    return paginate<User>(data, options);
  }
}
