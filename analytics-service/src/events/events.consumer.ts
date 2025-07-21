import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventsConsumer {
  private readonly logger = new Logger(EventsConsumer.name);

  @MessagePattern('analytics-events')
  handleEvent(@Payload() message: any) {
    this.logger.log(`Received event: ${JSON.stringify(message.value ?? message)}`);
  }
}
