import { Body, Controller, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async ingest(@Body() data: any) {
    await this.eventsService.sendEvent(data);
    return { status: 'queued' };
  }
}
