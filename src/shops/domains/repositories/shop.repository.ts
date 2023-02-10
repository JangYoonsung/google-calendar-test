import { CreateShopDto, UpdateShopDto } from '@shops/dto';
import { Shop } from '@shops/infrastructure/entities';
import { UpdateResult } from 'typeorm';
import { TResponseShop } from '../entities/shop.domain';

export abstract class IShopRepository {
  abstract getShopId(uuid: string): Promise<number>;
  abstract findById(id: string): Promise<TResponseShop>;
  abstract createShop(dto: CreateShopDto, accountId: number): Promise<Shop>;
  abstract updateShop(id: string, dto: UpdateShopDto): Promise<UpdateResult>;
}
