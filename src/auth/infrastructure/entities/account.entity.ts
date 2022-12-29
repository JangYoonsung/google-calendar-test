import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
