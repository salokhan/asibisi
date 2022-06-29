import { Entity, PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity('Timezone')
export class TimezoneEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({ type: 'varchar', nullable: false })
    abbreviation: string;

    @Column({ type: 'varchar', nullable: false })
    timeZone: string;

    @Column({ type: 'varchar', nullable: false })
    UTCoffset: string;

    @Column({ type: 'varchar', nullable: false })
    GMToffset: string;
}
