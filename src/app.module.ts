import { QuestionModule } from './Question/question.module';
import { LogService } from './Logging/log.service';
import { LoggingModule } from './Logging/logging.module';
import { AccountModule } from './Account/account.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    QuestionModule,
    AccountModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
