import { eventTypeEnum } from '../common/common.enums';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrganizerEntity } from './organizer.entity';
import { TagsEntity } from './tags.entity';




@Entity('Event')
export class EventEntity extends BaseEntity {

    @Column({
        type: "enum",
        enum: eventTypeEnum,
        default: eventTypeEnum.VIRTUAL
    })
    eventType: eventTypeEnum;

    @Column({ type: 'varchar', nullable: false })
    eventName: string;

    @Column({ type: 'varchar', nullable: true })
    link: string;

    @Column({ type: 'varchar', nullable: true })
    location: string;

    @Column({ type: 'varchar', nullable: false })
    timeZone: string;

    @Column({ type: 'date', nullable: false })
    startDate: Date;

    @Column({ type: 'time', nullable: false })
    startTime: string;

    @Column({ type: 'date', nullable: false })
    endDate: Date;

    @Column({ type: 'time', nullable: false })
    endTime: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @OneToMany(() => OrganizerEntity, (organizer: OrganizerEntity) => organizer.event)
    public organizer: OrganizerEntity[];

    @Column({ type: 'boolean', default: false })
    showContactNumbers: boolean;

    @ManyToMany(() => TagsEntity)
    @JoinTable()
    tags: TagsEntity[];

     

}
