import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class QuestionCategoryResponseObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    category: string;

    
    // @ApiProperty({ required: true })
    // @IsString()
    // createdBy: string;
  
    // @Expose()
    // @ApiProperty({ required: false })  
    // createDateTime: Date;
  
    // @ApiProperty({ required: true })
    // @IsString()
    // lastChangedBy: string;
}

@Exclude()
export class QuestionCategoryCreateReponseDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

    @Expose()
    @ApiProperty({ required: false,  type: QuestionCategoryResponseObjectDTO})
    result;
    
}

@Exclude()
export class QuestionCategoryListReponseDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

    @Expose()
    @ApiProperty({ required: false, isArray: true, type: QuestionCategoryResponseObjectDTO})
    result;
    
}



export class QuestionCategoryCreateBodyDTO extends PickType(QuestionCategoryResponseObjectDTO, ['category'] as const) {};



