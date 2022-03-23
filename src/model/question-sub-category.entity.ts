import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuestionCategoryEntity } from './question-category.entity';

@Entity('QuestionSubCategory')
@Unique("index_qsc", ["questionCategory", "subCategory"])
export class QuestionSubCategoryEntity extends BaseEntity{
  @PrimaryColumn() id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  subCategory: string | null;

  @ManyToOne(() => QuestionCategoryEntity, (qc: QuestionCategoryEntity) => qc.questionSubCategory)
  public questionCategory: QuestionCategoryEntity;

}
