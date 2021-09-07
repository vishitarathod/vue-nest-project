import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CommonService } from '../services/helper/common.service';
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
  @UseGuards(JwtAuthGuard)
  @Get('/get-permission')
  getPermission(@Req() req: Request) {
    return this.userService.getPermission(req);
  }
}
