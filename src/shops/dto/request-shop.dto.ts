import { PaginationDto } from '@lib/common/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ShopDomain } from '@shops/domains/entities';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetShopQueryDto extends PartialType(PaginationDto) {
  @IsString()
  @IsOptional()
  keyword?: string | undefined;
}

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  prefecture: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  town: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  @IsOptional()
  owner?: string;

  @IsString()
  @IsOptional()
  tel?: string;

  @IsString()
  @IsOptional()
  openedAt?: string;

  @IsString()
  @IsOptional()
  closedAt?: string;

  @IsOptional()
  @IsArray()
  scheduledAt?: ShopDomain['scheduledAt'];

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateShopDto extends PartialType(CreateShopDto) {}
