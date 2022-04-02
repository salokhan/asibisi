import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsEnum, IsString } from "class-validator";
import { QuestionCreateBodyDTO, QuestionResponseObjectDTO } from "./question.dto";

export enum difficultyLevelEnum {
    EASY = "easy",
    MEDIUM = "medium",
    DIFFICULT = "difficult"
}

export enum questionTypeEnum {
    MULTIOPTION = "multiOption",
    SINGLEOPTION = "singleOption"
}

export enum accessTypeEnum {
    PUBLIC = "public",
    PRIVATE = "private"
  }



@Exclude()
export class QuestionPaperResponseObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    questionPaper: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    difficultyLevel: difficultyLevelEnum

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    questionAccess: accessTypeEnum
   
    
    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    description: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsBoolean()
    isVerified: boolean;

    @Expose()
    @ApiProperty({ required: true })
    questionCategoryId: string;

    @Expose()
    @ApiProperty({ required: true })
    questionSubCategoryId: string;


    @Expose()
    @ApiProperty({ required: true,isArray: true, type: QuestionResponseObjectDTO})
    questions: QuestionResponseObjectDTO[];

}

@Exclude()
export class QuestionPaperCreateReponseDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    difficultyLevel: difficultyLevelEnum

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    questionAccess: accessTypeEnum
   
    
    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    description: string;

    @Expose()
    @ApiProperty({ required: false })
    questionPaper: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsBoolean()
    isVerified: boolean;

    @Expose()
    @ApiProperty({ required: false, type: QuestionResponseObjectDTO })
    result;

}

@Exclude()
export class QuestionPaperListReponseDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

    @Expose()
    @ApiProperty({ required: false, isArray: true, type: QuestionPaperCreateReponseDTO })
    result;

}



@Exclude()
export class QuestionPaperCreateBodyDTO {
    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    questionPaper: string;

    @Expose()
    @ApiProperty({ required: true, maxItems: 1, enum: difficultyLevelEnum  })
    @IsEnum(difficultyLevelEnum)
    difficultyLevel: difficultyLevelEnum

    @Expose()
    @ApiProperty({ required: true, maxItems: 1, enum: accessTypeEnum  })
    @IsEnum(accessTypeEnum)
    questionAccess: accessTypeEnum

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    description: string;

    @Expose()
    @ApiProperty({ required: true })
    questionCategoryId: string;

    @Expose()
    @ApiProperty({ required: true })
    questionSubCategoryId: string;

    @ApiProperty({ required: true,isArray: true, type: QuestionCreateBodyDTO})
    questions: QuestionCreateBodyDTO[];

}


