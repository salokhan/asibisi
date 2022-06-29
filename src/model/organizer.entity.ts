import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EventEntity } from './event.entity';

@Entity('Organizer')
export class OrganizerEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    userId: string;

    @ManyToOne(() => EventEntity, (event: EventEntity) => event.organizer)
    public event: EventEntity;
}
