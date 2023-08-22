import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@config/configuration.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [ConfigurationModule, CalendarModule],
})
export class AppModule {}
