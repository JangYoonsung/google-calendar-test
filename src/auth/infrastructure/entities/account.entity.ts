import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountRole } from '.';
import { UUIDBaseEntity } from '@config/entity/uuid-base.entity';
import { Shop } from '@shops/infrastructure/entities';
import { Staff } from '@staffs/infrastructure/entities';

@Entity()
export class Account extends UUIDBaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToOne(() => AccountRole, (accountRole) => accountRole.account)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: AccountRole;

  @OneToMany(() => Shop, (shop) => shop.account)
  shops: Shop[];

  @OneToMany(() => Staff, (staff) => staff.account)
  staffs: Staff[];
}
