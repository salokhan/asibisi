import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('Log')
export class LogEntity extends BaseEntity{
    @Column({ type: 'varchar', length: 50, nullable: false })
    operationPerformed: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    operationStatus: string;

    
}


