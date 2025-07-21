import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsConsumer } from './events.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANALYTICS_EVENTS',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'],
          },
          consumer: {
            groupId: 'analytics-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [EventsController, EventsConsumer],
  providers: [EventsService],
})
export class EventsModule {}
