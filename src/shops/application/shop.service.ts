import { Injectable } from '@nestjs/common';
import { ShopDomain } from '@shops/domains/entities';
import { CreateShopDto, UpdateShopDto } from '@shops/dto';
import { ShopRepository } from '@shops/infrastructure/repositories';

@Injectable()
export class ShopService {
  constructor(private shopRepository: ShopRepository) {}

  async findByShopId(id: string): Promise<ShopDomain> {
    return await this.shopRepository.findById(id);
  }

  async createShop(accountId: number, dto: CreateShopDto) {
    return await this.shopRepository.createShop(dto, accountId);
  }

  async updateShop(id: string, dto: UpdateShopDto) {
    return await this.shopRepository.updateShop(id, dto);
  }
}
