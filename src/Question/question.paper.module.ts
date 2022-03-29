import { QuestionPaperService } from './question.paper.service';
import { QuestionPaperController } from './question.paper.controller';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionCategoryEntity } from '../model/question-category.entity';
import { QuestionSubCategoryEntity } from '../model/question-sub-category.entity';
import { QuestionPaperMiddleware } from './question.paper.middleware';
import { HttpExceptionFilter } from '../config/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../common/all-exceptions.filter';
import { QuestionEntity } from '../model/question.entity';
import { QuestionOptionEntity } from '../model/question-option.entity';
import { QuestionPaperEntity } from '../model/question-paper.entity';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionPaperEntity, QuestionEntity, QuestionOptionEntity, QuestionSubCategoryEntity, QuestionCategoryEntity])],
    controllers: [
        QuestionPaperController,],
    providers: [
      {
        provide: APP_FILTER,
        useClass: AllExceptionsFilter,
      },
        QuestionPaperService
      ],
        
})
export class QuestionPaperModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(QuestionPaperMiddleware)
        .forRoutes(
          // { path: 'Question/Category', method: RequestMethod.POST },
          // { path: 'Question/Category/:id/Subcategory', method: RequestMethod.POST }
          );
    }
  }
  