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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PostService } from '../services/post.service';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  //add new post api
  @UseGuards(JwtAuthGuard)
  @Post('/add-post')
  addPost(@Req() req: Request): Promise<any> {
    // res.send(this.userService.addUser(req,res));
    return this.postService.addPost(req);
  }
  //delete post api
  @UseGuards(JwtAuthGuard)
  @Delete('/delete-post/:id')
  deleteUser(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  //get one post api
  @UseGuards(JwtAuthGuard)
  @Get('/edit-post/:id')
  getUserForEdit(@Param('id') id: string) {
    return this.postService.getPostForEdit(id);
  }

  //update post api
  @UseGuards(JwtAuthGuard)
  @Put('/update-user/:id')
  updateUser(@Param('id') id: string, @Req() req: Request) {
    return this.postService.updateUser(id, req);
  }
}
