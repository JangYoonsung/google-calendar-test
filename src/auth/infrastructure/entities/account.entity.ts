import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  googleApiToken: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
