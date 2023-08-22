import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCalendarDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  calendarId?: string;
}
