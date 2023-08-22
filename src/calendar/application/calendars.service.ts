import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';
import { GOOGLE_AUTH_OPTIONS } from '../_constants/googleAuth';
import { CreateCalendarDto } from '../dto';
import { GaxiosResponse } from 'gaxios';

@Injectable()
export class CalendarService {
  private get calendarClient(): calendar_v3.Calendar {
    const auth = new google.auth.GoogleAuth(GOOGLE_AUTH_OPTIONS);
    return google.calendar({ version: 'v3', auth });
  }

  async createCalendar(
    dto: CreateCalendarDto,
  ): Promise<GaxiosResponse<calendar_v3.Schema$AclRule>> {
    let calendarId: string;

    if (dto.summary) {
      const { data } = await this.calendarClient.calendars.insert({
        requestBody: { summary: dto.summary, timeZone: 'Asia/Tokyo' },
      });
      calendarId = data.id;
    }

    const acl = await this.calendarClient.acl.insert({
      calendarId: calendarId ? calendarId : dto.calendarId,
      sendNotifications: false,
      requestBody: {
        role: 'owner',
        scope: { type: 'user', value: dto.email },
      },
    });

    return acl;
  }
}
