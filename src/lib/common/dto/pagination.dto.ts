import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ORDER } from '../constants/order';

export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsOptional()
  order: typeof ORDER[keyof typeof ORDER];
}
