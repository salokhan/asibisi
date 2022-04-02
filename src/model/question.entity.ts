import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuestionOptionEntity } from './question-option.entity';
import { QuestionPaperEntity } from './question-paper.entity';

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
@Entity('Question')
export class QuestionEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 1000, nullable: false })
  question: string;

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

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;


  @Column({
    type: "enum",
    enum: questionTypeEnum,
    default: questionTypeEnum.MULTIOPTION
  })
  questionType: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  questionCategoryId: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  questionSubCategoryId: string;

  @OneToMany(() => QuestionOptionEntity, (qos: QuestionOptionEntity) => qos.question)
  public questionOption: QuestionOptionEntity[];

  @ManyToMany(() => QuestionPaperEntity, questionPaper => questionPaper.questions)
  questionPaper: QuestionPaperEntity[];



}
