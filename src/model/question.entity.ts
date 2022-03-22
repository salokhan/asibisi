import { Column, Entity, OneToMany} from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuestionOptionEntity } from './question-option.entity';

@Entity('Question')
export class QuestionEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 1000 , nullable: false})
  question: string;

  @Column({ type: 'varchar', length: 5, nullable: false })
  difficultyLevel: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  questionType: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  questionCategoryId: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  questionSubCategoryId: string;

  @OneToMany(() => QuestionOptionEntity, (qos: QuestionOptionEntity) => qos.option)
  public questionOption: QuestionOptionEntity[];




}
