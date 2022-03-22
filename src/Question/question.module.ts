import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionCategoryEntity } from '../model/question-category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionCategoryEntity])],
    controllers: [
        QuestionController,],
    providers: [
        QuestionService,],
})
export class QuestionModule { }
