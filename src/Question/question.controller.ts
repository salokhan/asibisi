import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { QuestionCategoryCreateBodyDTO, QuestionCategoryListReponseDTO, QuestionCategoryResponseObjectDTO,  QuestionCategoryCreateReponseDTO } from '../DTOs/question.category.dto';
import { QuestionSubCategoryCreateBodyDTO, QuestionSubCategoryListReponseDTO, QuestionSubCategoryResponseObjectDTO, QuestionSubCategoryCreateReponseDTO } from '../DTOs/question.subcategory.dto';
import { QuestionService } from './question.service';

@ApiTags('Question')
@Controller('Question')
export class QuestionController {
    constructor(private questionService: QuestionService) { }
    /* -------------------------------------------------------------------------- */
    /*                                  get class                                 */
    /* -------------------------------------------------------------------------- */
    @Get('/Category')
    @HttpCode(200)
    @ApiOkResponse({
        description: 'The categories are fetched successfully.',
        type: QuestionCategoryListReponseDTO
        
      })
    public async getAllQuestionCategory(@Res() res: Response) {
        let result = await this.questionService.getAllQuestionCategory();
        //return plainToInstance(QuestionCategoryResponseObjectDTO, res);
        return res.json({
            message: 'The categories are fetched successfully.',
            result: plainToInstance(QuestionCategoryResponseObjectDTO, result)
        });
    }

    
    @Get('/Category/:id/Subcategory')
    @HttpCode(200)
    @ApiOkResponse({
        description: 'The subcategories are fetched successfully.',
        type: QuestionSubCategoryListReponseDTO
        
      })
    public async getAllQuestionSubCategory(@Param('id') id: string, @Res() res: Response) {
        let result = await this.questionService.getAllQuestionSubCategory(id);
        //return plainToInstance(QuestionSubCategoryResponseObjectDTO, res);
        return res.json({
            message: 'The subcategories are fetched successfully.',
            result: plainToClass(QuestionSubCategoryResponseObjectDTO, result)
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                                 post calls                                 */
    /* -------------------------------------------------------------------------- */

    @Post('/Category')
    @HttpCode(201)
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: QuestionCategoryCreateReponseDTO,
      })
    // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiConflictResponse({ status: 409, description: 'Category already exist.' })
    public async postQuestionCategory(@Body() questionDto: QuestionCategoryCreateBodyDTO, @Res() res: Response) {
        let result = await this.questionService.createQuestionCategory(questionDto);
        res.status(HttpStatus.CREATED);
        return res.json({
            message: 'The record has been successfully created.',
            result: plainToClass(QuestionCategoryResponseObjectDTO, result)
        });
    }


    @Post('/Category/:id/Subcategory')
    @HttpCode(201)
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: QuestionSubCategoryCreateReponseDTO,
      })
    // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiConflictResponse({ status: 409, description: 'Subcategory category already exist.' })    
    public async postQuestionSubCategory(@Param('id') id: string, @Body() questionSubDto: QuestionSubCategoryCreateBodyDTO, @Res() res: Response) {

        let result = await this.questionService.createQuestionSubCategory(id, questionSubDto);
        return res.json({
            message: 'The record has been successfully created.',
            result: plainToClass(QuestionSubCategoryResponseObjectDTO, result)
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                                 post calls                                 */
    /* -------------------------------------------------------------------------- */
}
