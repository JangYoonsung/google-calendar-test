import { Shop as ShopEntity } from '@shops/infrastructure/entities';

export class Shop {
  readonly _id: number;
  readonly id: string;
  readonly name: string;
  readonly zipCode: string;
  readonly address: string;
  readonly address2: string;
  readonly owner: string;
  readonly tel: string;
  readonly openedAt: string;
  readonly closedAt: string;
  readonly scheduledAt: ShopEntity['scheduledAt'];
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly accountId: number;

  constructor(shop: ShopEntity) {
    this._id = shop.id;
    this.id = shop.uuid;
    this.name = shop.name;
    this.zipCode = shop.zipCode;
    this.address = shop.address;
    this.address2 = shop.address2;
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
}
