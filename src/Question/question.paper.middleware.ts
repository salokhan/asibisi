import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { QuestionPaperService } from './question.paper.service';

@Injectable()
export class QuestionPaperMiddleware  implements NestMiddleware {
  constructor(private questionPaperService: QuestionPaperService) { }

  async use(req: Request, res: Response, next: Function) {
    switch (req.route.path + req.method) {
      case '/Question/Category' + 'POST':
        if (!await this.getQuestionCategoryByCategory(req.body.category)) {
            next();
        } else {
          throw new ConflictException('Category already exist');
        }
        break;
      case '/Question/Category/:id/Subcategory' + 'POST':
        if (await this.getQuestionCategoryByCategoryID(req.params.id)) {
          if (!await this.getQuestionSubCategoryBySubCategory(req.params.id, req.body.subCategory)) {
            next();
          } else {
            throw new ConflictException('Subcategory already exist');
          }
        } else {
          throw new ConflictException('Category with the given Id not exist');
        }
        break;
      default:
        // 
        break;
    }
  }


  async getQuestionCategoryByCategory(category) {
    let result = await this.questionPaperService.getQuestionCategoryByCategory(category);
    if (result) {
      return true
    } else {

      return false;
    }
  }

  async getQuestionCategoryByCategoryID(categoryID) {
    let result = await this.questionPaperService.getQuestionCategoryByCategoryID(categoryID);
    if (result) {
      return true
    } else {

      return false;
    }
  }

  async getQuestionSubCategoryBySubCategory(categoryId, subCategory) {
    let result = await this.questionPaperService.getQuestionSubCategoryBySubCategory(categoryId, subCategory);
    if (result) {
      return true
    } else {

      return false;
    }
  }

  
}
