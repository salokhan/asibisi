import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CityEntity } from './city.entity';
import { CountryEntity } from './country.entity';

@Entity('State')
export class StateEntity {
  @PrimaryColumn() id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string | null;

  //   @Column({ type: 'varchar', length: 10, nullable: false })
  //   countryId: string | null;

  @ManyToOne(() => CountryEntity, (country: CountryEntity) => country.states)
  public country: CountryEntity;

  @Column({ type: 'varchar', length: 10, nullable: false })
  countryCode: string | null;

  @Column({ type: 'varchar', length: 50, nullable: false })
  countryName: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  stateCode: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  type: string | null;

  @Column({ type: 'numeric', nullable: true })
  latitude: number | null;

  @Column({ type: 'numeric', nullable: true })
  longitude: number | null;

  @Column({ type: 'varchar', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @OneToMany(() => CityEntity, (city: CityEntity) => city.state)
  public cities: CityEntity[];

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
