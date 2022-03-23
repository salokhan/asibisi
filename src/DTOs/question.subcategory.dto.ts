import { ApiProperty, PickType } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class QuestionSubCategoryResponseObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    subCategory: string;

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
export class QuestionSubCategoryCreateReponseDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

    @Expose()
    @ApiProperty({ required: false,  type: QuestionSubCategoryResponseObjectDTO})
    result;
    
}

@Exclude()
export class QuestionSubCategoryListReponseDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

    @Expose()
    @ApiProperty({ required: false, isArray: true, type: QuestionSubCategoryResponseObjectDTO})
    result;
    
}

export class QuestionSubCategoryCreateBodyDTO extends PickType(QuestionSubCategoryResponseObjectDTO, ['subCategory'] as const) {};



