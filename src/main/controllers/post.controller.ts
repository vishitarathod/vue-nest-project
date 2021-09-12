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
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PostService } from '../services/post.service';
import { Request } from 'express';
import { Response } from 'express';
// import { Pagination } from 'nestjs-typeorm-paginate';
// import { Post } from '../models/post.entity';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  //add new post api
  // @UseGuards(JwtAuthGuard)
  @Post('/addpost')
  addPost(@Req() req: Request, @Res() res: Response): Promise<any> {
    // res.send(this.userService.addUser(req,res));
    return this.postService.addPost(req, res);
  }
  //delete post api
  // @UseGuards(JwtAuthGuard)
  @Delete('/delete-post/:id')
  deleteUser(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  //get one post api
  // @UseGuards(JwtAuthGuard)
  @Get('/edit-post/:id')
  async getUserForEdit(@Param('id') id: string, @Res() res: Response) {
    // return this.postService.getPostForEdit(id);
    try {
      res.send(await this.postService.getPostForEdit(id));
    } catch (error) {
      res.send(error);
    }
  }

  //update post api
  // @UseGuards(JwtAuthGuard)
  @Put('/update-post/:id')
  updateUser(@Param('id') id: string, @Req() req: Request) {
    return this.postService.updateUser(id, req);
  }

  //get user post api
  // @UseGuards(JwtAuthGuard)
  @Post('/getuserpost/items')
  async getUserPost(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit = 2,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      limit = limit > 100 ? 100 : limit;
      console.log(',,,,,,,', res.locals.userID);
      console.log(
        await this.postService.getUserPost(
          {
            page,
            limit,
          },
          req,
        ),
      );
      res.send(
        await this.postService.getUserPost(
          {
            page,
            limit,
          },
          req,
        ),
      );
    } catch (error) {
      res.end(error);
    }
  }

  //get all post api
  // @UseGuards(JwtAuthGuard)
  @Get('/post/items')
  async getPost(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit = 2,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.postService.getPost({
      page,
      limit,
    });
  }
}
