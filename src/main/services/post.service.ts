import { Injectable, Param, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../models/post.entity';
import { Request } from 'express';
import { CommonService } from './helper/common.service';
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
}
