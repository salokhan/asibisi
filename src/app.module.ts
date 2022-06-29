import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { AccountModule } from './moduleAccount/account.module';
import { EventModule } from './moduleEvent/event.module';

@Module({
  imports: [EventModule,

    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AccountModule

  ],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
