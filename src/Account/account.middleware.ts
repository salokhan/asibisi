import { BadRequestException, ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountService } from './account.service';

@Injectable()
export class AccountMiddleware implements NestMiddleware {
  constructor(private accountService: AccountService){}

  async use(req: Request, res: Response, next: Function) {
    let result = await this.accountService.getOne(req.body.userName);
    if(!result){
      next();
    } else {
      throw new ConflictException('Email address already exist');
    }
  }
}
