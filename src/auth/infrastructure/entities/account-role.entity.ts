import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Account } from '.';
import { ROLE } from '@auth/constants/auth-const';

@Entity()
export class AccountRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: 'member', type: 'varchar' })
  role: typeof ROLE[keyof typeof ROLE];

  @OneToOne(() => Account, (account) => account.role)
  account: Account;
}
