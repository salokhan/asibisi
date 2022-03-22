import { Body, Controller, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { createQuestionCategoryDTO, QuestionCategoryDTO } from '../DTOs/question.category.dto';
import { QuestionService } from './question.service';

@Controller('Question')
export class QuestionController {
    constructor(private questionService: QuestionService) { }

    /* -------------------------------------------------------------------------- */
    /*                                 post calls                                 */
    /* -------------------------------------------------------------------------- */
    @Post('/category')
    public async post(@Body() questionDto: createQuestionCategoryDTO) {
        let res = await this.questionService.createQuestionCategory(questionDto);
        return plainToClass(QuestionCategoryDTO, res);
    }
}
