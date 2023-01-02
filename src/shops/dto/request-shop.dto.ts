import { PaginationDto } from '@lib/common/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';
import { SCHEDULE_DAYS } from '@shops/constants/scheduleDays';
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
  scheduledAt?: typeof SCHEDULE_DAYS[];

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateShopDto extends PartialType(CreateShopDto) {}
