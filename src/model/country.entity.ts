import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StateEntity } from './state.entity';

@Entity('Country')
export class CountryEntity {
  @PrimaryColumn() id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  iso3: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  iso2: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  numericCode: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phoneCode: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  capital: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  currencyName: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currencySymbol: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  tld: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  native: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  region: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  subRegion: string | null;

  @Column({ type: 'varchar', length: 5000, nullable: true })
  timeZone: string | null;

  @Column({ type: 'numeric' })
  latitude: number | null;

  @Column({ type: 'numeric' })
  longitude: number | null;

  @OneToMany(() => StateEntity, (state: StateEntity) => state.country)
  public states: StateEntity[];

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
