import { CreateShopDto, UpdateShopDto } from '@shops/dto';
import { ShopDomain } from '../entities';
import { Shop } from '@shops/infrastructure/entities';
import { UpdateResult } from 'typeorm';

export abstract class IShopRepository {
  abstract findById(id: string): Promise<ShopDomain>;
  abstract createShop(dto: CreateShopDto, accountId: number): Promise<Shop>;
  abstract updateShop(id: string, dto: UpdateShopDto): Promise<UpdateResult>;
}
