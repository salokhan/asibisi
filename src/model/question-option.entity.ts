import { Column, Entity, ManyToOne} from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuestionEntity } from './question.entity';

@Entity('QuestionOption')
export class QuestionOptionEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 1000 , nullable: false})
  option: string;

  @Column({ type: 'boolean', nullable: false })
  isAnswer: boolean;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;

  @ManyToOne(() => QuestionEntity, (q: QuestionEntity) => q.questionOption)
  public question: QuestionEntity;
}
