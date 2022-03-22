import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQuestionCategoryDTO, QuestionCategoryDTO } from '../DTOs/question.category.dto';
import { QuestionCategoryEntity } from '../model/question-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService { 
    constructor(@InjectRepository(QuestionCategoryEntity)
    private readonly repoQuestionCategory: Repository<QuestionCategoryEntity>){
        
    }

    public async createQuestionCategory(questionCategoryDTO: createQuestionCategoryDTO): Promise<QuestionCategoryDTO> {
        questionCategoryDTO['createdBy'] = 'System';
        questionCategoryDTO['lastChangedBy'] = 'System';
        return this.repoQuestionCategory.save(questionCategoryDTO).then((e) => {
          return e;
        });
      }
}
