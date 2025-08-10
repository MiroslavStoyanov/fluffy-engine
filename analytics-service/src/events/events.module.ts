import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsConsumer } from './events.consumer';
import { EventEntity } from './event.entity';
import { EventStoreService } from './event-store.service';

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
    TypeOrmModule.forFeature([EventEntity]),
  ],
  controllers: [EventsController, EventsConsumer],
  providers: [EventsService, EventStoreService],
  exports: [EventStoreService],
})
export class EventsModule {}
