import { Account } from '@auth/infrastructure/entities';
import { UUIDBaseEntity } from '@config/entity/uuid-base.entity';
import { Shop } from '@shops/infrastructure/entities';
import { STAFF_ROLE } from '@staffs/constants/role';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Staff extends UUIDBaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ comment: '스태프 이름' })
  name: string;

  @Column({ default: 0, comment: '지명료' })
  price: number;

  @Column({ default: STAFF_ROLE.STYLIST, comment: '스태프의 역할' })
  role: typeof STAFF_ROLE[keyof typeof STAFF_ROLE];

  @Column({ default: null, comment: '스태프 사진' })
  image: string;

  @Column({ default: null, comment: '스태프 설명' })
  description: string;

  @Column({ default: null, comment: '경력' })
  career: number;

  @ManyToOne(() => Shop, (shop) => shop.shopStaffs)
  shop: Shop;
  @Column()
  shopId: number;

  @ManyToOne(() => Account, (account) => account.staffs)
  account: Account;
  @Column()
  accountId: number;
}
