import { Injectable } from '@nestjs/common';
import { ShopDomain } from '@shops/domains/entities';
import { CreateShopDto, ResponseShopDto, UpdateShopDto } from '@shops/dto';
import { ShopRepository } from '@shops/infrastructure/repositories';

@Injectable()
export class ShopService {
  constructor(private shopRepository: ShopRepository) {}

  async findByShopId(id: string): Promise<ResponseShopDto> {
    return await this.shopRepository
      .findById(id)
      .then((shop) => new ShopDomain(shop).response);
  }

  async createShop(
    accountId: number,
    dto: CreateShopDto,
  ): Promise<ResponseShopDto> {
    const initialData = ShopDomain.setAttributes(dto, accountId);
    return await this.shopRepository
      .createShop(initialData)
      .then((shop) => new ShopDomain(shop).response);
  }

  async updateShop(id: string, dto: UpdateShopDto) {
    return await this.shopRepository.updateShop(id, dto);
  }
}
