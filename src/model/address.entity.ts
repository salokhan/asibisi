import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('Address')
export class AddressEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 10, nullable: true })
  countryId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  countryName: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  stateId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  stateName: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cityId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cityName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  address: string;
}
