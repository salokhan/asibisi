import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionCategoryEntity } from '../model/question-category.entity';
import { Repository } from 'typeorm';
import { QuestionSubCategoryEntity } from '../model/question-sub-category.entity';
import { QuestionSubCategoryResponseObjectDTO, QuestionSubCategoryCreateBodyDTO } from '../DTOs/question.subcategory.dto';
import { QuestionCategoryCreateBodyDTO, QuestionCategoryResponseObjectDTO } from '../DTOs/question.category.dto';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionCategoryEntity)
  private readonly repoQuestionCategory: Repository<QuestionCategoryEntity>,
    @InjectRepository(QuestionSubCategoryEntity)
    private readonly repoQuestionSubCategory: Repository<QuestionSubCategoryEntity>) {

  }

  public async getQuestionCategoryByCategory(category: string) {
    let result = await (await this.repoQuestionCategory.findOne({ where: { category } }));
    if (result ) {
      return result;
    } else {
      return undefined;
    }
  }
  public async getQuestionCategoryByCategoryID(id: string) {
    let result = await (await this.repoQuestionCategory.find({ id }));
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }
  public async getQuestionSubCategoryBySubCategory(categoryId: string, subCategory: string) {
    let result = await (await this.repoQuestionSubCategory.find({ where: { questionCategory: categoryId, subCategory: subCategory } }));
    if (result && result.length > 0) {
      return result;
    } else {
      return undefined;
    }
  }

  public async getAllQuestionCategory() {
    let result = await (await this.repoQuestionCategory.find());
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }

  public async getAllQuestionSubCategory(id: string): Promise<QuestionSubCategoryResponseObjectDTO[]> {
    let result = await (await this.repoQuestionCategory.findOne(id, { relations: ["questionSubCategory"] }));
    if (result) {
      return result.questionSubCategory;
    } else {
      return undefined;
    }
  }

  public async createQuestionCategory(QuestionCategoryResponseObjectDTO: QuestionCategoryCreateBodyDTO): Promise<QuestionCategoryResponseObjectDTO> {
    QuestionCategoryResponseObjectDTO['createdBy'] = 'System';
    QuestionCategoryResponseObjectDTO['lastChangedBy'] = 'System';
    return this.repoQuestionCategory.save(QuestionCategoryResponseObjectDTO).then((e) => {
      return e;
    });
  }

  public async createQuestionSubCategory(categoryid: string, QuestionSubCategoryResponseObjectDTO: QuestionSubCategoryCreateBodyDTO): Promise<QuestionSubCategoryResponseObjectDTO> {
    QuestionSubCategoryResponseObjectDTO['createdBy'] = 'System';
    QuestionSubCategoryResponseObjectDTO['lastChangedBy'] = 'System';

    const questionCategory = await this.repoQuestionCategory.findOne(categoryid, { relations: ["questionSubCategory"] });
    const questionSubCategory = new QuestionSubCategoryEntity();
    questionSubCategory.subCategory = QuestionSubCategoryResponseObjectDTO.subCategory;
    questionSubCategory.createdBy = 'System';
    questionSubCategory.lastChangedBy = 'System';

    const newQuestionSubCategory = await this.repoQuestionSubCategory.save(questionSubCategory);
    questionCategory.questionSubCategory.push(newQuestionSubCategory);
    let abc = await (await this.repoQuestionCategory.save(questionCategory));
    return abc.questionSubCategory.pop();



  }
}
