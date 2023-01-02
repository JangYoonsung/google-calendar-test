import { CustomRepository } from '@config/decorator/custom-repository.decorator';
import { Shop } from '../entities';
import { Repository, UpdateResult } from 'typeorm';
import { IShopRepository } from '@shops/domains/repositories';
import { ShopDomain } from '@shops/domains/entities';
import { CreateShopDto, UpdateShopDto } from '@shops/dto';

@CustomRepository(Shop)
export class ShopRepository
  extends Repository<Shop>
  implements IShopRepository
{
  async findById(id: number): Promise<ShopDomain> {
    return await this.findOneBy({ id }).then((shop) => new ShopDomain(shop));
  }

  async createShop(dto: CreateShopDto, accountId: number): Promise<Shop> {
    const data = this.create({ ...dto, accountId });
    return await this.save(data);
  }

  async updateShop(id: number, dto: UpdateShopDto): Promise<UpdateResult> {
    return await this.update(id, { ...dto });
  }
}
