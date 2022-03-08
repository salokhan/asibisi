import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from '../model/log.entity';
import { LogService } from './log.service';

@Module({
    imports:  [TypeOrmModule.forFeature([LogEntity])],
    controllers: [],
    providers: [LogService],
})
export class LoggingModule {}
