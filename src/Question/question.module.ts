import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionCategoryEntity } from '../model/question-category.entity';
import { QuestionSubCategoryEntity } from '../model/question-sub-category.entity';
import { QuestionMiddleware } from './question.middleware';
import { HttpExceptionFilter } from '../config/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../common/all-exceptions.filter';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionSubCategoryEntity, QuestionCategoryEntity])],
    controllers: [
        QuestionController,],
    providers: [
      {
        provide: APP_FILTER,
        useClass: AllExceptionsFilter,
      },
        QuestionService
      ],
        
})
export class QuestionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(QuestionMiddleware)
        .forRoutes(
          // { path: 'Question/Category', method: RequestMethod.POST },
          // { path: 'Question/Category/:id/Subcategory', method: RequestMethod.POST }
          );
    }
  }
  