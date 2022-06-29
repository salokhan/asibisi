import { BadRequestException, ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountService } from './account.service';

@Injectable()
export class AccountMiddleware implements NestMiddleware {
  constructor(private accountService: AccountService) { }

  async use(req: Request, res: Response, next: Function) {
    switch (req.route.path + req.method) {
      case '/Account/Profile/:id/Address' + 'POST':
        if (await this.isProfileExistById(req.params.id)) {
          if (!await this.getAccountProfileAddressByProfileId(req.params.id)) {
            next();
          } else {
            throw new ConflictException('Address already exist');
          }
        } else {
          throw new ConflictException('Profile with the given Id not exist');
        }
        break;
      case '/Account/:id/Profile' + 'POST':
        if (await this.isAccountExistById(req.params.id)) {
          if (!await this.getAccountProfileByAccountId(req.params.id)) {
            next();
          } else {
            throw new ConflictException('Profile already exist');
          }
        } else {
          throw new ConflictException('Account with the given Id not exist');
        }
        break;
      case '/Account' + 'POST':
        if (!await this.getAccountByUserName(req.body.userName)) {
          next();
        } else {
          throw new ConflictException('Email address already exist');
        }
        break;
      case '/Account/User/:user/Password/:password' + 'GET':
        if (!await this.getAccountByCredential(req.params.user, req.params.password)) {
          throw new ConflictException('Invalid username or passowrd');
        } else {
          next();
        }
        break;
      case '/Account/:id/Profile' + 'GET':
        if (!await this.getAccountProfileByAccountId(req.params.id)) {
          throw new ConflictException('No profile found with the given Id');
        } else {
          next();
        }
        break;
      case '/Account/Profile/:id/Address' + 'GET':
        if (!await this.getAccountProfileAddressByProfileId(req.params.id)) {
          throw new ConflictException('No address found with the given Id');
        } else {
          next();
        }
        break;
      default:
        // 
        break;
    }
  }

  async getAccountByCredential(user, password) {
    let result = await this.accountService.getAccountByCredential(user, password);
    if (result) {
      return true
    } else {

      return false;
    }
  }

  async getAccountByUserName(userName) {
    let result = await this.accountService.getAccountByUserName(userName);
    if (result) {
      return true
    } else {

      return false;
    }
  }

  async getAccountProfileByAccountId(id) {
    let result = await this.accountService.getAccountProfileByAccountId(id);
    if (result) {
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

  async getAccountProfileAddressByProfileId(id) {
    let result = await this.accountService.getAccountProfileAddressByProfileId(id);
    if (result) {
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
