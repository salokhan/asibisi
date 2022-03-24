import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { ExceptionDTO } from '../DTOs/exception.dto';
import { QuestionCategoryCreateBodyDTO, QuestionCategoryListReponseDTO, QuestionCategoryResponseObjectDTO, QuestionCategoryCreateReponseDTO } from '../DTOs/question.category.dto';
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
    /*                                  get class                                 */
    /* -------------------------------------------------------------------------- */

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
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
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
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    @ApiNotFoundResponse({ status: 404, type: ExceptionDTO })
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

    /* -------------------------------------------------------------------------- */
    /*                                delete calls                                */
    /* -------------------------------------------------------------------------- */
    @Delete('/Category/:id')
    @HttpCode(201)
    @ApiCreatedResponse({
        description: 'The record has been successfully deleted.',
        type: QuestionCategoryCreateReponseDTO,
    })
    // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    @ApiNotFoundResponse({ status: 409, type: ExceptionDTO })
    public async deleteQuestionCategory(@Param('id') id: string, @Res() res: Response) {
        let result = await this.questionService.deleteQuestionCategory(id);
        res.status(HttpStatus.CREATED);
        return res.json({
            message: 'The record has been successfully deleted.',
            result: plainToClass(QuestionCategoryResponseObjectDTO, result)
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                                delete calls                                */
    /* -------------------------------------------------------------------------- */
}
