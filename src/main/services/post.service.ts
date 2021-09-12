import { Injectable, Param, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../models/post.entity';
import { Request, Response } from 'express';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  //add user function
  async addPost(@Req() req: Request, @Res() res: Response) {
    // const _id = this.commonService.getId();
    // console.log(_id);
    console.log(res.locals.userID);
    return await this.postRepository.save({
      userId: res.locals.userID,
      title: req.body.title,
      discription: req.body.discription,
    });
  }

  //delete exiting user
  async deletePost(@Param('id') id: string) {
    return await this.postRepository.delete(id);
  }

  //get perticular user for edit
  async getPostForEdit(@Param('id') id: string) {
    // console.log('++++++++++++', userId);
    return await this.postRepository.findOne(id);
  }

  //update exiting post
  async updateUser(@Param('id') id: string, @Req() req: Request) {
    return await this.postRepository.update(id, {
      title: req.body.title,
      discription: req.body.discription,
    });
  }

  //get user post which have role user with pagination
  async getUserPost(
    options: IPaginationOptions,
    @Req() req: Request,
  ): Promise<Pagination<Post>> {
    const queryBuilder = this.postRepository.createQueryBuilder();
    const data = await queryBuilder.where({
      userId: req.body.userId,
    });
    // console.log(req.body.userId);
    return paginate<Post>(data, options);
  }

  //get all posts with pagination
  async getPost(options: IPaginationOptions): Promise<Pagination<Post>> {
    const queryBuilder = this.postRepository.createQueryBuilder();
    console.log(queryBuilder);
    return paginate<Post>(queryBuilder, options);
  }
}
