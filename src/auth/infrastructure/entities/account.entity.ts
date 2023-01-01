import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountRole } from '.';
import { UUIDBaseEntity } from '@config/entity/uuid-base.entity';

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
}
