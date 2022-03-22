import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuestionCategoryEntity } from './question-category.entity';
import { StateEntity } from './state.entity';

@Entity('QuestionSubCategory')
export class QuestionSubCategoryEntity extends BaseEntity{
  @PrimaryColumn() id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  subCategory: string | null;

  @ManyToOne(() => QuestionCategoryEntity, (qc: QuestionCategoryEntity) => qc.questionSubCategory)
  public questionCategory: QuestionCategoryEntity;

}
