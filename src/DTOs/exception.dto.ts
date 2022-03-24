import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, isEmail, IsString, IsUUID } from 'class-validator';

@Exclude()
export class ExceptionDTO {
  @Expose()
  @ApiProperty({ required: false })
  statusCode: number;

  @Expose()
  @ApiProperty({ required: true })
  @IsEmail()
  timestamp: string;
  
  @Expose()
  @ApiProperty({ required: true })
  @IsString()
  path: string;

  @Expose()
  @ApiProperty({ required: true })
  @IsString()
  detail: string;

  
}