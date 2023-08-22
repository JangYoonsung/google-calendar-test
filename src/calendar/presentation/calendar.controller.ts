import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CalendarService } from '../application/calendars.service';
import { CreateCalendarDto } from '../dto';
import { GaxiosResponse } from 'gaxios';
import { calendar_v3 } from 'googleapis';

@Controller('/calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  createCalendar(
    @Body() dto: CreateCalendarDto,
  ): Promise<GaxiosResponse<calendar_v3.Schema$AclRule>> {
    return this.calendarService.createCalendar(dto);
  }
}
