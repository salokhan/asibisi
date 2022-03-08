import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StateEntity } from './state.entity';

@Entity('City')
export class CityEntity {
  @PrimaryColumn() id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string | null;

  //   @Column({ type: 'varchar', length: 10, nullable: false })
  //   state_id: string | null;

  @ManyToOne(() => StateEntity, (state: StateEntity) => state.cities)
  public state: StateEntity;

  @Column({ type: 'varchar', length: 10, nullable: false })
  stateCode: string | null;

  @Column({ type: 'varchar', length: 200, nullable: false })
  stateName: string | null;

  @Column({ type: 'varchar', length: 10, nullable: false })
  countryId: string | null;

  @Column({ type: 'varchar', length: 10, nullable: false })
  countryCode: string | null;

  @Column({ type: 'varchar', length: 50, nullable: false })
  countryName: string | null;

  @Column({ type: 'numeric' })
  latitude: number | null;

  @Column({ type: 'numeric' })
  longitude: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  wikiDataId: string | null;

  @Column({ type: 'varchar', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Column({ type: 'varchar', length: 300, default: 'system' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 300, default: 'system' })
  lastChangedBy: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  internalComment: string | null;
}
