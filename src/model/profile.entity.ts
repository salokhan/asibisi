import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AddressEntity } from './address.entity';
import { BaseEntity } from './base.entity';

@Entity('Profile')
export class ProfileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  profileName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string;


  @Column({ type: 'varchar', length: 100, nullable: true })
  contactNumber: string;

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  address: AddressEntity;
}
