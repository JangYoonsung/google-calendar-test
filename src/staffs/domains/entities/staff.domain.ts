import { ShopDomain } from '@shops/domains/entities';
import { Staff as StaffEntity } from '../../infrastructure/entities';
import { ResponseShopDto } from '@shops/dto';

export class Staff {
  readonly _id: number;
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly role: StaffEntity['role'];
  readonly image: string | null;
  readonly description: string | null;
  readonly career: number | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
  readonly accountId: number;
  readonly shop: ResponseShopDto;

  constructor(staff: StaffEntity) {
    this._id = staff.id;
    this.id = staff.uuid;
    this.name = staff.name;
    this.price = staff.price;
    this.role = staff.role;
    this.image = staff.image;
    this.description = staff.description;
    this.career = staff.career;
    this.createdAt = staff.createdAt;
    this.updatedAt = staff.updatedAt;
    this.accountId = staff.accountId;
    this.shop = new ShopDomain(staff.shop).response;
  }
}
