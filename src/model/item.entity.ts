import { Column, Entity} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('Item')
export class ItemEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
