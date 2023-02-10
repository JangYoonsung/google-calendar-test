import { CreateShopDto } from '@shops/dto';
import { Shop as ShopEntity } from '@shops/infrastructure/entities';

export type TResponseShop = Pick<
  Shop,
  | 'id'
  | 'name'
  | 'zipCode'
  | 'address'
  | 'owner'
  | 'tel'
  | 'openedAt'
  | 'closedAt'
  | 'scheduledAt'
  | 'description'
  | 'createdAt'
  | 'updatedAt'
>;

export type TShopAttributes = {
  accountId: number;
  name: string;
  zipCode: string;
  prefecture: string;
  city: string;
  town: string;
  address: string;
  address2?: string | null;
  owner?: string | null;
  tel?: string | null;
  openedAt?: string | null;
  closedAt?: string | null;
  scheduleAt?: Shop['scheduledAt'] | null;
  description?: string | null;
};

export class Shop {
  readonly _id: number;
  readonly id: string;
  readonly name: string;
  readonly zipCode: string;
  readonly address: string;
  readonly owner: string | null;
  readonly tel: string | null;
  readonly openedAt: string | null;
  readonly closedAt: string | null;
  readonly scheduledAt: ShopEntity['scheduledAt'] | null;
  readonly description: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly accountId: number;

  constructor(shop: ShopEntity) {
    this._id = shop.id;
    this.id = shop.uuid;
    this.name = shop.name;
    this.zipCode = shop.zipCode;
    this.address = shop.fullAddress;
    this.owner = shop.owner;
    this.tel = shop.tel;
    this.openedAt = shop.openedAt;
    this.closedAt = shop.closedAt;
    this.scheduledAt = shop.scheduledAt;
    this.description = shop.description;
    this.createdAt = shop.createdAt;
    this.updatedAt = shop.updatedAt;
    this.accountId = shop.accountId;
  }

  get response(): TResponseShop {
    return {
      id: this.id,
      name: this.name,
      zipCode: this.zipCode,
      address: this.address,
      owner: this.owner,
      tel: this.tel,
      openedAt: this.openedAt,
      closedAt: this.closedAt,
      scheduledAt: this.scheduledAt,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static setAttributes(dto: CreateShopDto, accountId: number): TShopAttributes {
    return {
      accountId,
      ...dto,
    };
  }
}
