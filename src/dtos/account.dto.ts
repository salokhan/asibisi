import { Optional } from '@nestjs/common';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, isEmail, IsString, IsUUID } from 'class-validator';
import { AccountEntity } from '../model/account.entity';

@Exclude()
export class AccountDTO {
  @Expose()
  @ApiProperty({ required: false })
  @IsUUID()
  id: string;

  @Expose()
  @ApiProperty({ required: true })
  @IsEmail()
  userName: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  createdBy: string;

  @Expose()
  @ApiProperty({ required: false })  
  createDateTime: Date;

  @ApiProperty({ required: true })
  @IsString()
  lastChangedBy: string;

  
}
export class createAccountDTO extends PickType(AccountDTO, ['userName', 'password'] as const) {};


