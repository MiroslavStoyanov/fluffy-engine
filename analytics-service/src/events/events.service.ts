import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  constructor(@Inject('ANALYTICS_EVENTS') private readonly kafkaClient: ClientKafka) {}

  async sendEvent(event: any) {
    await this.kafkaClient.emit('analytics-events', event);
  }
}
