import { ApiProperty, PickType } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";
import { time } from "console";
import { eventTypeEnum } from "../common/common.enums";


Exclude()
export class EventCreateUpdateBodyDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    eventName: string;

    @Expose()
    @ApiProperty({ required: true, enum: eventTypeEnum })
    @IsString()
    eventType: eventTypeEnum

    @Expose()
    @ApiProperty({ required: true })
    timeZone: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @Expose()
    @ApiProperty({ required: true, default:"12:00" })
    @Type(() => time)
    startTime: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @Expose()
    @ApiProperty({ required: true, default:"12:00" })
    @Type(() => time)
    endTime: string;

    @Expose()
    @ApiProperty({ required: true })
    link: string;

    @Expose()
    @ApiProperty({ required: true })
    location: string;

    @Expose()
    @ApiProperty({ required: false })
    description: string;

    @Expose()
    @ApiProperty({ required: false })
    showContactNumbers: boolean;

    @Expose()
    @ApiProperty({ required: true, isArray: true, type: String, minItems: 1 })
    tags: string[];

}

Exclude()
export class EventTransformObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    eventName: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    eventType: eventTypeEnum

    @Expose()
    @ApiProperty({ required: true })
    timeZone: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @Expose()
    @ApiProperty({ required: true, default:"12:00" })
    @Type(() => time)
    startTime: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @Expose()
    @ApiProperty({ required: true })
    @Type(() => time)
    endTime: string;

    @Expose()
    @ApiProperty({ required: true })
    link: string;

    @Expose()
    @ApiProperty({ required: true })
    location: string;

    @Expose()
    @ApiProperty({ required: false })
    description: string;
   
    @Expose()
    @ApiProperty({ required: false })
    showContactNumbers: boolean;

    @Expose()
    @ApiProperty({ required: true, isArray: true, type: String })
    tags: string[];

    @Exclude()
    @ApiProperty({ required: false })
    isActive: boolean;

    @Exclude()
    @ApiProperty({ required: false })
    isArchived: boolean;
    
    @Exclude()
    @ApiProperty({ required: false })
    createDateTime: Date;
    
    @Exclude()
    @ApiProperty({ required: false })
    lastChangedDateTime: Date;

    @Exclude()
    @ApiProperty({ required: true })
    createdBy: string;

    @Exclude()
    @ApiProperty({ required: true })
    lastChangedBy: string;

    @Exclude()
    @ApiProperty({ required: true })
    internalComment: string;

    

}

Exclude()
export class EventObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    eventName: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    eventType: eventTypeEnum

    @Expose()
    @ApiProperty({ required: true })
    timeZone: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @Expose()
    @ApiProperty({ required: true, default:"12:00" })
    @Type(() => time)
    startTime: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @Expose()
    @ApiProperty({ required: true })
    @Type(() => time)
    endTime: string;

    @Expose()
    @ApiProperty({ required: true })
    link: string;

    @Expose()
    @ApiProperty({ required: true })
    location: string;

}

@Exclude()
export class EventResultDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

    @Expose()
    @ApiProperty({ required: false, type: EventObjectDTO })
    result;

}

@Exclude()
export class EventDeleteResultDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

}

Exclude()
export class EventMultipleTransformObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    eventName: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    eventType: eventTypeEnum

    @Expose()
    @ApiProperty({ required: true })
    timeZone: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @Expose()
    @ApiProperty({ required: true, default:"12:00" })
    @Type(() => time)
    startTime: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @Expose()
    @ApiProperty({ required: true, default:"12:00" })
    @Type(() => time)
    endTime: string;

    @Expose()
    @ApiProperty({ required: true })
    link: string;

    @Expose()
    @ApiProperty({ required: true })
    location: string;

    @Expose()
    @ApiProperty({ required: false })
    description: string;

    @Expose()
    @ApiProperty({ required: false })
    showContactNumbers: boolean;

    @Expose()
    @ApiProperty({ required: true, isArray: true, type: String })
    tags: string[];

    @Exclude()
    @ApiProperty({ required: false })
    isActive: boolean;

    @Exclude()
    @ApiProperty({ required: false })
    isArchived: boolean;
    
    @Exclude()
    @ApiProperty({ required: false })
    createDateTime: Date;
    
    @Exclude()
    @ApiProperty({ required: false })
    lastChangedDateTime: Date;

    @Exclude()
    @ApiProperty({ required: true })
    createdBy: string;

    @Exclude()
    @ApiProperty({ required: true })
    lastChangedBy: string;

    @Exclude()
    @ApiProperty({ required: true })
    internalComment: string;

}

Exclude()
export class EventMultipleObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    eventName: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    eventType: eventTypeEnum

    @Expose()
    @ApiProperty({ required: true })
    timeZone: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @Expose()
    @ApiProperty({ required: true, default:"12:00" })
    @Type(() => time)
    startTime: string;

    @Expose()
    @ApiProperty({ required: true, default: "1000-01-01T00:00:00.0" })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @Expose()
    @ApiProperty({ required: true, default:"12:00" })
    @Type(() => time)
    endTime: string;

    @Expose()
    @ApiProperty({ required: true })
    link: string;

    @Expose()
    @ApiProperty({ required: true })
    location: string;

    @Expose()
    @ApiProperty({ required: false })
    description: string;

    @Expose()
    @ApiProperty({ required: false })
    showContactNumbers: boolean;

    @Expose()
    @ApiProperty({ required: true, isArray: true, type: String })
    tags: string[];

}

@Exclude()
export class EventMultipleResultDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

    @Expose()
    @ApiProperty({ required: false, type: EventMultipleObjectDTO })
    result;

}

export class EventCreateBodyDTO extends PickType(EventCreateUpdateBodyDTO, ['eventName','eventType','link','location', 'timeZone', 'startDate','startTime','endDate',
'endTime','description','showContactNumbers','tags'] as const) { };
export class NonVirtualEventCreateBodyDTO extends PickType(EventCreateUpdateBodyDTO, ['eventName','location', 'timeZone', 'startDate','startTime','endDate',
'endTime','description','showContactNumbers','tags'] as const) { };
export class VirtualEventCreateBodyDTO extends PickType(EventCreateUpdateBodyDTO, ['eventName', 'link', 'timeZone', 'startDate','startTime','endDate',
'endTime','description','showContactNumbers','tags'] as const) { };
export class EventUpdateBodyDTO extends PickType(EventCreateUpdateBodyDTO, ['eventName', 'link', 'location', 'timeZone', 'startDate','startTime','endDate',
'endTime','description','showContactNumbers','tags'] as const) { };

Exclude()
export class EventCreateMultipleBodyDTO {
    @Expose()
    @ApiProperty({ isArray: true, type: EventCreateBodyDTO  })
    children: EventCreateBodyDTO[];
}

Exclude()
export class EventUpdateMultipleBodyDTO {
    @Expose()
    @ApiProperty({ isArray: true, type: EventUpdateBodyDTO  })
    children: EventUpdateBodyDTO[];
  }
