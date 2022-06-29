import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('Tags')
export class TagsEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    tag: string;
}
