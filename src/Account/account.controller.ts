import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AccountProfileAddressDTO, AccountProfileDTO, createAccountProfileAddressDTO, createAccountProfileDTO } from '../DTOs/account.profile.dto';
import { AccountDTO, createAccountDTO } from '../DTOs/account.dto';
import { AccountService } from './account.service';

@Controller('Account')
export class AccountController {
  constructor(private accountService: AccountService) { }
  
  @Post()
  public async post(@Body() accountDto: createAccountDTO) {
    let res = await this.accountService.createAccount(accountDto);
    return plainToClass(AccountDTO, res);
  }

  @Get()
  public async getAll() {
    let res = await this.accountService.getAll();
    return plainToClass(AccountDTO, res);
  }

  @Post(':id/Profile')
  public async postProfile(@Param('id') id: string, @Body() accountProfile: createAccountProfileDTO) {
    let res = await this.accountService.createAccountProfile(id,accountProfile);
    return plainToClass(AccountProfileDTO, res);
  }

  @Post('/Profile/:id/Address')
  public async postProfileAddress(@Param('id') id: string, @Body() accountProfileAddress: createAccountProfileAddressDTO) {
    let res = await this.accountService.createAccountProfileAddress(id,accountProfileAddress);
    return plainToClass(AccountProfileAddressDTO, res);
  }


}
