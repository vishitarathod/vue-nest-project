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
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request } from 'express';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { CommonService } from '../services/helper/common.service';
import { Response } from 'express';
// import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
// import { User } from '../models/user.entity';
// import { Pagination } from 'nestjs-typeorm-paginate';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService, // private commonService: CommonService,
  ) {}

  //add new user api
  // @UseGuards(JwtAuthGuard)
  @Post('/add-user')
  async addUser(@Req() req: Request, @Res() res: Response) {
    // res.send(this.userService.addUser(req,res));
    // return await this.userService.addUser(req, res);
    try {
      res.send(await this.userService.addUser(req, res));
    } catch (error) {
      res.send(error);
    }
  }

  //update user api
  // @UseGuards(JwtAuthGuard)
  @Put('/update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // return this.userService.updateUser(id, req);
    try {
      res.send(await this.userService.updateUser(id, req));
    } catch (error) {
      res.send(error);
    }
  }

  //delete user api
  // @UseGuards(JwtAuthGuard)
  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  //get one user api
  // @UseGuards(JwtAuthGuard)
  @Get('/edit-user/:id')
  async getUserForEdit(@Param('id') id: string, @Res() res: Response) {
    // return this.userService.getUserForEdit(id);
    try {
      res.send(await this.userService.getUserForEdit(id, res));
    } catch (error) {
      res.send(error);
    }
  }

  //get permission
  // @UseGuards(JwtAuthGuard)
  @Get('/get-permission')
  async getPermission(@Req() req: Request, @Res() res: Response) {
    // return this.userService.getPermission(req, res);
    // return this.userService.getUserForEdit(id);
    try {
      res.send(await this.userService.getPermission(req, res));
    } catch (error) {
      res.send(error);
    }
  }

  //get users which have user role api
  // @UseGuards(JwtAuthGuard)
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
