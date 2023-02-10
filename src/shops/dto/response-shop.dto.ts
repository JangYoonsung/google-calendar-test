import { ShopDomain } from '@shops/domains/entities';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ResponseShopDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

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

  @IsArray()
  @IsOptional()
  scheduledAt?: ShopDomain['scheduledAt'];

  @IsString()
  @IsOptional()
  description?: string;
}
