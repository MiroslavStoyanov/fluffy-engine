import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  constructor(
    @Inject('ANALYTICS_EVENTS') private readonly kafkaClient: ClientKafka,
  ) {}

  async sendEvent(event: unknown) {
    await lastValueFrom(this.kafkaClient.emit('analytics-events', event));
  }
}
