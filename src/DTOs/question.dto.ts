import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsArray, isArray, IsEnum, IsString, Validate } from "class-validator";

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

Exclude()
export class QuestionOptionResponseObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    option: string

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    isAnswer: boolean

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    description: string
}
export class QuestionCreateOptionBodyDTO extends PickType(QuestionOptionResponseObjectDTO, ['option','isAnswer','description'] as const) { };
export class QuestionUpdateOptionBodyDTO extends PickType(QuestionOptionResponseObjectDTO, ['id','option','isAnswer','description'] as const) { };
@Exclude()
export class QuestionResponseObjectDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    question: string;

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
    @ApiProperty({ required: true })
    questionCategoryId: string;

    @Expose()
    @ApiProperty({ required: true })
    questionSubCategoryId: string;

    @Expose()
    @ApiProperty({ required: true,isArray: true, type: QuestionOptionResponseObjectDTO})
    questionOption: QuestionOptionResponseObjectDTO[];

}

@Exclude()
export class QuestionCreateReponseDTO {
    @Expose()
    @ApiProperty({ required: false })
    question: string;

    @Expose()
    @ApiProperty({ required: false, type: QuestionResponseObjectDTO })
    result;

}

@Exclude()
export class QuestionListReponseDTO {
    @Expose()
    @ApiProperty({ required: false })
    message: string;

    @Expose()
    @ApiProperty({ required: false, isArray: true, type: QuestionCreateReponseDTO })
    result;

}



// export class QuestionCreateBodyDTO extends PickType(QuestionResponseObjectDTO, ['question','difficultyLevel','description','questionCategoryId','questionSubCategoryId','questionOptions'] as const) { };
@Exclude()
export class QuestionCreateBodyDTO {
    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    question: string;

    // @Expose()
    // // @ApiProperty({ required: true, maxItems: 1, enum: difficultyLevelEnum, example:[difficultyLevelEnum.EASY,difficultyLevelEnum.MEDIUM,difficultyLevelEnum.DIFFICULT ] })
    // @ApiProperty({ required: true, maxItems: 1, enum: difficultyLevelEnum  })
    // @IsEnum(difficultyLevelEnum)
    // difficultyLevel: difficultyLevelEnum

    // @Expose()
    // @ApiProperty({ required: true, maxItems: 1, enum: accessTypeEnum  })
    // @IsEnum(accessTypeEnum)
    // questionAccess: accessTypeEnum

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    description: string;

    // @Expose()
    // @ApiProperty({ required: true })
    // questionCategoryId: string;

    // @Expose()
    // @ApiProperty({ required: true })
    // questionSubCategoryId: string;

    @ApiProperty({ required: true,isArray: true, type: QuestionCreateOptionBodyDTO})
    questionOptions: QuestionCreateOptionBodyDTO[];

}

@Exclude()
export class QuestionPaperQuestoinUpdateBodyDTO {
    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    question: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    description: string;

    @ApiProperty({ required: true,isArray: true, type: QuestionUpdateOptionBodyDTO})
    questionOptions: QuestionUpdateOptionBodyDTO[];

}

@Exclude()
export class OpenQuestionCreateBodyDTO {
    @Expose()
    @ApiProperty({ required: true })
    @IsString()
    question: string;

    @Expose()
    // @ApiProperty({ required: true, maxItems: 1, enum: difficultyLevelEnum, example:[difficultyLevelEnum.EASY,difficultyLevelEnum.MEDIUM,difficultyLevelEnum.DIFFICULT ] })
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

    @ApiProperty({ required: true,isArray: true, type: QuestionCreateOptionBodyDTO})
    questionOptions: QuestionCreateOptionBodyDTO[];

}


