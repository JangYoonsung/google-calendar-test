import { UpdateShopDto } from '@shops/dto';
import { Shop } from '@shops/infrastructure/entities';
import { UpdateResult } from 'typeorm';
import { TShopAttributes } from '../entities/shop.domain';

export abstract class IShopRepository {
  abstract getShopId(uuid: string): Promise<number>;
  abstract findById(id: string): Promise<Shop>;
  abstract createShop(shopData: TShopAttributes): Promise<Shop>;
  abstract updateShop(id: string, dto: UpdateShopDto): Promise<UpdateResult>;
}
