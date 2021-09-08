import { Injectable, Param, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../models/post.entity';
import { Request } from 'express';
import { CommonService } from './helper/common.service';
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
    private commonService: CommonService,
  ) {}

  //add user function
  async addPost(@Req() req: Request) {
    const _id = this.commonService.getId();
    console.log(_id);
    return await this.postRepository.save({
      userId: _id,
      title: req.body.title,
      discription: req.body.discription,
    });
  }

  //delete exiting user
  async deletePost(@Param('id') id: string) {
    await this.postRepository.delete(id);
  }

  //get perticular user for edit
  async getPostForEdit(@Param('id') id: string) {
    // console.log('++++++++++++', userId);
    return await this.postRepository.findOne(id);
  }

  //update exiting post
  async updateUser(@Param('id') id: string, @Req() req: Request) {
    await this.postRepository.update(id, {
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
    console.log(req.body.userId);
    return paginate<Post>(data, options);
  }

  //get all posts with pagination
  async getPost(options: IPaginationOptions): Promise<Pagination<Post>> {
    const queryBuilder = this.postRepository.createQueryBuilder();
    console.log(queryBuilder);
    return paginate<Post>(queryBuilder, options);
  }
}
