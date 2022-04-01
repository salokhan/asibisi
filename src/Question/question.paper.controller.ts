import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { OpenQuestionCreateBodyDTO, QuestionCreateBodyDTO, QuestionCreateReponseDTO, QuestionListReponseDTO, QuestionPaperQuestoinUpdateBodyDTO, QuestionResponseObjectDTO } from '../DTOs/question.dto';
import { ExceptionDTO } from '../DTOs/exception.dto';
import { QuestionCategoryCreateBodyDTO, QuestionCategoryListReponseDTO, QuestionCategoryResponseObjectDTO, QuestionCategoryCreateReponseDTO } from '../DTOs/question.category.dto';
import { QuestionSubCategoryCreateBodyDTO, QuestionSubCategoryListReponseDTO, QuestionSubCategoryResponseObjectDTO, QuestionSubCategoryCreateReponseDTO } from '../DTOs/question.subcategory.dto';
import { QuestionPaperService } from './question.paper.service';
import { QuestionPaperCreateBodyDTO, QuestionPaperResponseObjectDTO } from '../DTOs/question.paper.dto';

// @ApiTags('QuestionPaper')
// @Controller('QuestionPaper')
@Controller('')
export class QuestionPaperController {
    constructor(private questionPaperService: QuestionPaperService) { }
    /* -------------------------------------------------------------------------- */
    /*                                  get class                                 */
    /* -------------------------------------------------------------------------- */
    @ApiTags('Question')
    @Get('/Category')
    @HttpCode(200)
    @ApiOkResponse({
        description: 'The categories are fetched successfully.',
        type: QuestionCategoryListReponseDTO

    })
    public async getAllQuestionCategory(@Res() res: Response) {
        let result = await this.questionPaperService.getAllQuestionCategory();
        //return plainToInstance(QuestionCategoryResponseObjectDTO, res);
        return res.json({
            message: 'The categories are fetched successfully.',
            result: plainToInstance(QuestionCategoryResponseObjectDTO, result)
        });
    }
    

    @ApiTags('Question')
    @Get('/Category/:id/Subcategory')
    @HttpCode(200)
    @ApiOkResponse({
        description: 'The subcategories are fetched successfully.',
        type: QuestionSubCategoryListReponseDTO

    })
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    @ApiNotFoundResponse({ status: 404, type: ExceptionDTO })
    public async getAllQuestionSubCategory(@Param('id') id: string, @Res() res: Response) {
        let result = await this.questionPaperService.getAllQuestionSubCategory(id);
        //return plainToInstance(QuestionSubCategoryResponseObjectDTO, res);
        return res.json({
            message: 'The subcategories are fetched successfully.',
            result: plainToClass(QuestionSubCategoryResponseObjectDTO, result)
        });
    }

    @ApiTags('Paper')
    @Get('Paper/:id')
    @HttpCode(200)
    @ApiOkResponse({
        description: 'The question paper are fetched successfully.',
        type: QuestionPaperResponseObjectDTO

    })
    @ApiNotFoundResponse({ status: 404, type: ExceptionDTO })
    public async getAllQuestion(@Param('id') id:string, @Res() res: Response) {
        let result = await this.questionPaperService.getAllQuestions(id);
        return res.json({
            message: 'The question paper are fetched successfully.',
            result: plainToInstance(QuestionPaperResponseObjectDTO, result)
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                                  get class                                 */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                 post calls                                 */
    /* -------------------------------------------------------------------------- */

    @ApiTags('Question')
    @Post('/Open')
    @HttpCode(201)
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: QuestionCreateReponseDTO,
    })
    // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    public async postQuestion(@Body() questionDto: OpenQuestionCreateBodyDTO, @Res() res: Response) {
        let result = await this.questionPaperService.createQuestion(questionDto);
        res.status(HttpStatus.CREATED);
        return res.json({
            message: 'The record has been successfully created.',
            result: plainToClass(QuestionResponseObjectDTO, result)
        });
    }

    @ApiTags('Paper')
    @Post('/paper')
    @HttpCode(201)
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: QuestionCreateReponseDTO,
    })
    // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    public async postQuestionPaper(@Body() questionPaperDto: QuestionPaperCreateBodyDTO, @Res() res: Response) {
        let result = await this.questionPaperService.createQuestionPaper(questionPaperDto);
        res.status(HttpStatus.CREATED);
        return res.json({
            message: 'The record has been successfully created.',
            result: plainToClass(QuestionPaperResponseObjectDTO, result)
        });
    }


    @ApiTags('Question')
    @Post('/Category')
    @HttpCode(201)
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: QuestionCategoryCreateReponseDTO,
    })
    // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    public async postQuestionCategory(@Body() questionDto: QuestionCategoryCreateBodyDTO, @Res() res: Response) {
        let result = await this.questionPaperService.createQuestionCategory(questionDto);
        res.status(HttpStatus.CREATED);
        return res.json({
            message: 'The record has been successfully created.',
            result: plainToClass(QuestionCategoryResponseObjectDTO, result)
        });
    }


    @ApiTags('Question')
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

        let result = await this.questionPaperService.createQuestionSubCategory(id, questionSubDto);
        return res.json({
            message: 'The record has been successfully created.',
            result: plainToClass(QuestionSubCategoryResponseObjectDTO, result)
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                                 post calls                                 */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  put calls                                 */
    /* -------------------------------------------------------------------------- */
    @ApiTags('Paper')
    @Put('question/:id')
    @HttpCode(201)
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })    
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: QuestionCreateReponseDTO,
    })
    // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
    public async postQuestionPaperQuestion(@Param('id') id:string, @Body() questionPaperQuestionDto: QuestionPaperQuestoinUpdateBodyDTO, @Res() res: Response) {
        let result = await this.questionPaperService.updateQuestionPaperQuestion(id,questionPaperQuestionDto);
        res.status(HttpStatus.CREATED);
        return res.json({
            message: 'The record has been successfully created.',
            result: plainToClass(QuestionResponseObjectDTO, result)
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                                  put calls                                 */
    /* -------------------------------------------------------------------------- */


    /* -------------------------------------------------------------------------- */
    /*                                delete calls                                */
    /* -------------------------------------------------------------------------- */
    @ApiTags('Question')
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
        let result = await this.questionPaperService.deleteQuestionCategory(id);
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
