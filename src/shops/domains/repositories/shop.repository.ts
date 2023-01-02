import { CreateShopDto, UpdateShopDto } from '@shops/dto/request-shop.dto';
import { ShopDomain } from '../entities';

export abstract class IShopRepository {
  abstract findOne(id: number): Promise<ShopDomain>;
  abstract createShop(dto: CreateShopDto): Promise<ShopDomain>;
  abstract updateShop(dto: UpdateShopDto): Promise<void>;
}
