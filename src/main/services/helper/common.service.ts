// import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  userId: any;
  public setId(userId: any) {
    this.userId = userId;
    return this.userId;
  }
  public getId(): string {
    return `${this.userId}`;
  }
}
