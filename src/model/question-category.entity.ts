import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuestionSubCategoryEntity } from './question-sub-category.entity';

@Entity('QuestionCategory')
export class QuestionCategoryEntity extends BaseEntity {
  @PrimaryColumn() id: string;

  @Column({ type: 'varchar', length: 300, nullable: true, unique: true })
  category: string | null;


  @OneToMany(() => QuestionSubCategoryEntity, (qsc: QuestionSubCategoryEntity) => qsc.questionCategory, { cascade: true })
  public questionSubCategory: QuestionSubCategoryEntity[];

}
