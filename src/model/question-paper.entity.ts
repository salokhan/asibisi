import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuestionEntity } from './question.entity';

export enum difficultyLevelEnum {
    EASY = "easy",
    MEDIUM = "medium",
    DIFFICULT = "difficult"
}

export enum accessTypeEnum {
    PUBLIC = "public",
    PRIVATE = "private"
}

export enum questionTypeEnum {
    MULTIOPTION = "multiOption",
    SINGLEOPTION = "singleOption"
}
@Entity('QuestionPaper')
export class QuestionPaperEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    questionPaper: string;

    @Column({
        type: "enum",
        enum: difficultyLevelEnum,
        default: difficultyLevelEnum.EASY
    })
    difficultyLevel: difficultyLevelEnum;

    @Column({ type: 'varchar', length: 300, nullable: true })
    description: string;

    @Column({
        type: "enum",
        enum: accessTypeEnum,
        default: accessTypeEnum.PUBLIC
    })
    questionAccess: accessTypeEnum;

    @Column({ type: 'varchar', length: 300, nullable: false })
    questionCategoryId: string;

    @Column({ type: 'varchar', length: 300, nullable: false })
    questionSubCategoryId: string;

    @ManyToMany(() => QuestionEntity, question => question.questionPaper)
    @JoinTable()
    question: QuestionEntity[];

}
