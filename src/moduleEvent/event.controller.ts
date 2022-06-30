import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { EventCreateBodyDTO, EventMultipleObjectDTO, EventMultipleTransformObjectDTO, EventResultDTO, EventTransformObjectDTO, NonVirtualEventCreateBodyDTO, VirtualEventCreateBodyDTO } from '../dtos/event.dto';
import { EventService } from './event.service';
import { Response, Request } from 'express';
import { ExceptionDTO } from '../dtos/exception.dto';
@Controller()
export class EventController {

  constructor(private eventService: EventService) { }

  /* -------------------------------------------------------------------------- */
  /*                                  get class                                 */
  /* -------------------------------------------------------------------------- */
  @ApiTags('Event')
  @Get('/Event')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The events are fetched successfully.',
    type: EventMultipleObjectDTO

  })
  public async getShajraPublished(@Req() req: Request, @Res() res: Response) {
    let result = await this.eventService.getEvents();
    // return res.json({
    //   message: 'The events are fetched successfully.',
    //   result: req.ip
    // });
    return res.json({
      message: 'The events are fetched successfully.',
      result: plainToInstance(EventMultipleTransformObjectDTO, result)
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                                  get class                                 */
  /* -------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------- */
  /*                                 post calls                                 */
  /* -------------------------------------------------------------------------- */
  @ApiTags('Event')
  @Post('/Virtual')
  @HttpCode(201)
  @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: EventResultDTO,
  })
  // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
  public async createVirtualEvent(@Body() eventParentDto: VirtualEventCreateBodyDTO, @Res() res: Response) {
    let result = await this.eventService.createVirtualEvent(eventParentDto);
    res.status(HttpStatus.CREATED);
    return res.json({
      message: 'The record has been successfully created.',
      result: plainToClass(EventTransformObjectDTO, result)
    });
  }

  @ApiTags('Event')
  @Post('/NonVirtual')
  @HttpCode(201)
  @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: EventResultDTO,
  })
  // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiInternalServerErrorResponse({ status: 500, type: ExceptionDTO })
  public async createNonVirtualEvent(@Body() eventParentDto: NonVirtualEventCreateBodyDTO, @Res() res: Response) {
    let result = await this.eventService.createNonVirtualEvent(eventParentDto);
    res.status(HttpStatus.CREATED);
    return res.json({
      message: 'The record has been successfully created.',
      result: plainToClass(EventTransformObjectDTO, result)
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                 post calls                                 */
  /* -------------------------------------------------------------------------- */

}
