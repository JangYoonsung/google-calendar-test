import { CustomRepository } from '@config/decorator/custom-repository.decorator';
import { Shop } from '../entities';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { IShopRepository } from '@shops/domains/repositories';
import { ShopDomain } from '@shops/domains/entities';
import { CreateShopDto, UpdateShopDto } from '@shops/dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { TResponseShop } from '@shops/domains/entities/shop.domain';

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

  async findById(id: string): Promise<TResponseShop> {
    const shopId = await this.getShopId(id);
    return await this.findOneBy({ id: shopId }).then(
      (shop) => new ShopDomain(shop).responseType,
    );
  }

  async createShop(dto: CreateShopDto, accountId: number): Promise<Shop> {
    const data = this.create({ ...dto, accountId });
    return await this.save(data);
  }

  async updateShop(id: string, dto: UpdateShopDto): Promise<UpdateResult> {
    return await this.update(id, { ...dto });
  }
}
