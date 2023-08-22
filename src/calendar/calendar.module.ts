import { Module } from '@nestjs/common';
import { CalendarService } from './application/calendars.service';
import { CalendarController } from './presentation/calendar.controller';

@Module({
  imports: [],
  providers: [CalendarService],
  controllers: [CalendarController],
})
export class CalendarModule {}
