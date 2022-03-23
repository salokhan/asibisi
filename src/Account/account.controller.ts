import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AccountProfileAddressDTO, AccountProfileDTO, createAccountProfileAddressDTO, createAccountProfileDTO } from '../DTOs/account.profile.dto';
import { AccountDTO, createAccountDTO } from '../DTOs/account.dto';
import { AccountService } from './account.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('Account')
export class AccountController {
  constructor(private accountService: AccountService) { }
  /* -------------------------------------------------------------------------- */
  /*                                  get calls                                 */
  /* -------------------------------------------------------------------------- */
  @Get('/User/:user/Password/:password')
  public async getAccount(@Param('user') user: string, @Param('password') password: string) {
    let res = await this.accountService.getAccountByCredential(user, password);
    return plainToClass(AccountDTO, res);
  }

  @Get()
  public async getAllAccounts() {
    let res = await this.accountService.getAllAccounts();
    return plainToClass(AccountDTO, res);
  }

  @Get('/:id/Profile')
  public async getAccountProfile(@Param('id') id: string) {
    let res = await this.accountService.getAccountProfileByAccountId(id);
    return plainToClass(AccountProfileDTO, res);
  }

  @Get('/Profile/:id/Address')
  public async getAccountProfileAddress(@Param('id') id: string) {
    let res = await this.accountService.getAccountProfileAddressByProfileId(id);
    return plainToClass(AccountProfileAddressDTO, res);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  get calls                                 */
  /* -------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------- */
  /*                                 post calls                                 */
  /* -------------------------------------------------------------------------- */
  @Post()
  public async post(@Body() accountDto: createAccountDTO) {
    let res = await this.accountService.createAccount(accountDto);
    return plainToClass(AccountDTO, res);
  }

  @Post(':id/Profile')
  public async postProfile(@Param('id') id: string, @Body() accountProfile: createAccountProfileDTO) {
    let res = await this.accountService.createAccountProfile(id, accountProfile);
    return plainToClass(AccountProfileDTO, res);
  }

  @Post('/Profile/:id/Address')
  public async postProfileAddress(@Param('id') id: string, @Body() accountProfileAddress: createAccountProfileAddressDTO) {
    let res = await this.accountService.createAccountProfileAddress(id, accountProfileAddress);
    return plainToClass(AccountProfileAddressDTO, res);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 post calls                                 */
  /* -------------------------------------------------------------------------- */


}
