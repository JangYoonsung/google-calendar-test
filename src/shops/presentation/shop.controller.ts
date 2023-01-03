import { Account } from '@auth/infrastructure/entities';
import { JwtGuard } from '@lib/guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShopService } from '@shops/application/shop.service';
import { CreateShopDto } from '@shops/dto';
import { Request } from 'express';

@Controller('shops')
@UseGuards(JwtGuard)
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get(':id')
  async getShop(@Param('id', ParseIntPipe) id: number) {
    return await this.shopService.findByShopId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createShop(@Body() dto: CreateShopDto, @Req() request: Request) {
    const account = request.user as Account;
    return await this.shopService.createShop(account.id, dto);
  }
}
