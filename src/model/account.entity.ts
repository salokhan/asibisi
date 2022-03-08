import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProfileEntity } from './profile.entity';
// import { BaseEntity } from '../model/base.entity';
// import { ProfileEntity } from '../model/profile.entity';

@Entity('Account')
export class AccountEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  userName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  password: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;
}
