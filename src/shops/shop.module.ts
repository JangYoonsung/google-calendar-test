import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './infrastructure/entities';
import { CustomTypeOrmModule } from '@config/custom-typerom.module';
import { ShopRepository } from './infrastructure/repositories';
import { ShopService } from './application/shop.service';
import { ShopController } from './presentation/shop.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    CustomTypeOrmModule.forRepository([ShopRepository]),
  ],
  providers: [ShopService],
  controllers: [ShopController],
})
export class shopModule {}
