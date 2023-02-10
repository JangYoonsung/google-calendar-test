import { CustomRepository } from '@config/decorator/custom-repository.decorator';
import { Shop } from '../entities';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { IShopRepository } from '@shops/domains/repositories';
import { UpdateShopDto } from '@shops/dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { TShopAttributes } from '@shops/domains/entities/shop.domain';

@CustomRepository(Shop)
export class ShopRepository
  extends Repository<Shop>
  implements IShopRepository
{
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(Shop, dataSource.manager);
  }

  async getShopId(uuid: string) {
    return await this.findOneBy({ uuid }).then((shop) => shop.id);
  }

  async findById(id: string): Promise<Shop> {
    const shopId = await this.getShopId(id);
    return await this.findOneBy({ id: shopId });
  }

  async createShop(shopData: TShopAttributes): Promise<Shop> {
    const data = this.create(shopData);
    await this.insert(data);
    return data;
  }

  async updateShop(id: string, dto: UpdateShopDto): Promise<UpdateResult> {
    return await this.update(id, { ...dto });
  }
}
