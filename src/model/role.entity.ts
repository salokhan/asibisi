import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AccountEntity } from './account.entity';
import { BaseEntity } from './base.entity';

@Entity('Role')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  roleName: string;

  @ManyToMany(() => AccountEntity)
  @JoinTable()
  account: AccountEntity[];
}
