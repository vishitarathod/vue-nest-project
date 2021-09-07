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

  //get users which have user role
  // getUsers = async (req, res) => {
  //   const items = await this.userRepository.find({
  //     roleId: '611fdd096066bf93f57ed7f8',
  //   });

  //   // get page from query params or default to first page
  //   const page = parseInt(req.query.page) || 1;

  //   // get pager object for specified page
  //   const pageSize = 5;
  // const pager = paginate(items.length, page, pageSize);

  // // get page of items from items array
  // const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
  //   console.log(pageOfItems);
  //   // return pager object and current page of items
  //   return res.json({ pager, pageOfItems });
  // };
  // };
}
