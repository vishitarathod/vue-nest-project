import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendMail(token: string): void {
    this.mailerService.sendMail({
      to: 'rathodvishita@gmail.com', // list of receivers
      from: 'rathodvishita2308@gmail.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      // text: token, // plaintext body
      html: token, // HTML body content
    });
  }
}
