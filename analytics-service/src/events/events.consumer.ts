import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventStoreService } from './event-store.service';

@Controller()
export class EventsConsumer {
  private readonly logger = new Logger(EventsConsumer.name);

  constructor(private readonly store: EventStoreService) {}

  @MessagePattern('analytics-events')
  async handleEvent(@Payload() message: { value?: unknown }) {
    const value = message.value ?? message;
    this.logger.log(`Received event: ${JSON.stringify(value)}`);
    const event = value as Record<string, unknown>;
    const tsRaw = event['timestamp'];
    const timestamp =
      typeof tsRaw === 'string' || typeof tsRaw === 'number'
        ? new Date(tsRaw)
        : new Date();
    const typeRaw = event['type'];
    const type = typeof typeRaw === 'string' ? typeRaw : 'unknown';
    await this.store.save({
      timestamp,
      type,
      payload: event,
    });
  }
}
