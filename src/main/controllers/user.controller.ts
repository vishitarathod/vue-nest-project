import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CommonService } from '../services/helper/common.service';
// import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
// import { User } from '../models/user.entity';
// import { Pagination } from 'nestjs-typeorm-paginate';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private commonService: CommonService,
  ) {}

  //add new user api
  @UseGuards(JwtAuthGuard)
  @Post('/add-user')
  addUser(@Req() req: Request): Promise<any> {
    // res.send(this.userService.addUser(req,res));
    return this.userService.addUser(req);
  }

  //update user api
  @UseGuards(JwtAuthGuard)
  @Put('/update-user/:id')
  updateUser(@Param('id') id: string, @Req() req: Request) {
    return this.userService.updateUser(id, req);
  }

  //delete user api
  @UseGuards(JwtAuthGuard)
  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  //get one user api
  @UseGuards(JwtAuthGuard)
  @Get('/edit-user/:id')
  getUserForEdit(@Param('id') id: string) {
    return this.userService.getUserForEdit(id);
  }

  //get permission
  @UseGuards(JwtAuthGuard)
  @Get('/get-permission')
  getPermission(@Req() req: Request) {
    return this.userService.getPermission(req);
  }

  //get users which have user role api
  @UseGuards(JwtAuthGuard)
  @Get('/users/items')
  async getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit = 2,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.userService.getUsers({
      page,
      limit,
      // route: 'http://cats.com/cats',
    });
  }
}
