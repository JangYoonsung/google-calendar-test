import { Account } from '@auth/infrastructure/entities';
import { GetUser } from '@decorator';
import { JwtGuard } from '@lib/guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShopService } from '@shops/application/shop.service';
import { CreateShopDto, UpdateShopDto } from '@shops/dto';

@Controller('shops')
@UseGuards(JwtGuard)
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get(':id')
  async getShop(@Param('id', ParseIntPipe) id: string) {
    return await this.shopService.findByShopId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createShop(@Body() dto: CreateShopDto, @GetUser() account: Account) {
    return await this.shopService.createShop(account.id, dto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateShop(@Body() dto: UpdateShopDto, @Param('id') shopId: string) {
    return await this.shopService.updateShop(shopId, dto);
  }
}
