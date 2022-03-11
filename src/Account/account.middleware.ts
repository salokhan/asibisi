import { BadRequestException, ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountService } from './account.service';

@Injectable()
export class AccountMiddleware implements NestMiddleware {
  constructor(private accountService: AccountService) { }

  async use(req: Request, res: Response, next: Function) {
    switch (req.route.path) {
      case '/Account/Profile/:id/Address':
        if (await this.isProfileExistById(req.params.id)) {
          if (!await this.isAccountProfileAddressAlreadyExist(req.params.id)) {
            next();
          } else {
            throw new ConflictException('Address already exist');
          }
        } else {
          throw new ConflictException('Profile with the given Id not exist');
        }
        break;
      case '/Account/:id/Profile':
        if (await this.isAccountExistById(req.params.id)) {
          if (!await this.isAccountProfileAlreadyExist(req.params.id)) {
            next();
          } else {
            throw new ConflictException('Profile already exist');
          }
        } else {
          throw new ConflictException('Account with the given Id not exist');
        }
        break;
      case 'Account':
        let result = await this.accountService.findAccount(req.body.userName);
        if (!result) {
          next();
        } else {
          throw new ConflictException('Email address already exist');
        }
        break;
      default:
        // 
        break;
    }
  }

  async isAccountProfileAlreadyExist(id) {
    let result = await this.accountService.findAccountProfile(id);
    if (result && result.profile) {
      return true
    } else {
      return false;
    }
  }

  async isAccountExistById(id) {
    let result = await this.accountService.findAccountById(id);
    if (result) {
      return true
    } else {
      return false;
    }
  }

  async isAccountProfileAddressAlreadyExist(id) {
    let result = await this.accountService.findAccountProfileAddress(id);
    if (result && result.address) {
      return true
    } else {
      return false;
    }
  }

  async isProfileExistById(id) {
    let result = await this.accountService.findAccountProfileById(id);
    if (result) {
      return true
    } else {
      return false;
    }
  }
}
