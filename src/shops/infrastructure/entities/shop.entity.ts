import { Account } from '@auth/infrastructure/entities';
import { UUIDBaseEntity } from '@config/entity/uuid-base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SCHEDULE_DAYS } from '../../constants/scheduleDays';
import { Staff } from '@staffs/infrastructure/entities';

@Entity()
export class Shop extends UUIDBaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column()
  name: string;

  @Column()
  zipCode: string;

  @Column()
  prefecture: string;

  @Column()
  city: string;

  @Column()
  town: string;

  @Column()
  address: string;

  @Column({ default: null })
  address2: string;

  @Column({ default: null })
  owner: string;

  @Column({ default: null })
  tel: string;

  @Column({ default: null })
  openedAt: string;

  @Column({ default: null })
  closedAt: string;

  @Column({ default: null, array: true, type: 'varchar' })
  scheduledAt: typeof SCHEDULE_DAYS[];

  @Column({ default: null })
  description: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;

  @OneToMany(() => Staff, (staff) => staff.shop)
  shopStaffs: Staff[];

  @ManyToOne(() => Account, (account) => account.shops)
  account: Account;
  @Column()
  accountId: number;

  get fullAddress(): string {
    return `${this.prefecture}${this.city}${this.town}${this.address}${
      this?.address2 ?? ''
    }`;
  }
}
