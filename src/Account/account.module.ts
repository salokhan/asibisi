import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../model/account.entity';
import { AccountMiddleware } from './account.middleware';
import { ProfileEntity } from '../model/profile.entity';
import { AddressEntity } from '../model/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, ProfileEntity, AddressEntity])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccountMiddleware)
      .forRoutes(
        { path: 'Account', method: RequestMethod.POST },
        { path: 'Account/:id/Profile', method: RequestMethod.POST },
        { path: 'Account/Profile/:id/Address', method: RequestMethod.POST },
        { path: 'Account/User/:user/Password/:password', method: RequestMethod.GET },
        { path: 'Account/:id/Profile', method: RequestMethod.GET },
        { path: 'Account/Profile/:id/Address', method: RequestMethod.GET });
  }
}
