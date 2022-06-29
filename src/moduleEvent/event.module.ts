import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from '../model/tags.entity';
import { EventEntity } from '../model/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, TagsEntity]), HttpModule],
  providers: [EventService,
    EventService],
  controllers: [EventController,
    EventController]
})
export class EventModule { }
