import { PaginationDto } from '@lib/common/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class GetShopQueryDto extends PartialType(PaginationDto) {
  @IsString()
  @IsOptional()
  keyword?: string | undefined;
}
