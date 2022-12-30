import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Account } from '.';

@Entity()
export class AccountRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: 'member', type: 'varchar' })
  role: string;

  @OneToOne(() => Account, (account) => account.role)
  account: Account;
}
