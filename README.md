# fluffy-engine
This repository hosts an analytics service prototype built with NestJS. The service is intended to ingest millions of user-generated events (clicks, pageviews, transactions) per minute, process and aggregate them, and expose analytics via APIs and dashboards.

The initial setup lives inside the `analytics-service` directory. To get started:

```bash
cd analytics-service
yarn install
yarn start:dev
```

## Kafka

The service now queues incoming events to a Kafka topic named `analytics-events`. The broker address defaults to `localhost:9092` and can be overridden via the `KAFKA_BROKER` environment variable.

Send events using the `/events` endpoint:

```bash
curl -X POST http://localhost:3000/events -H 'Content-Type: application/json' -d '{"type":"signup","user":"abc"}'
```

## Persistence and Metrics

Consumed events are stored in a database. Set `DATABASE_URL` to a PostgreSQL
connection string; otherwise an in-memory SQLite database is used. The basic
schema records the event `timestamp`, `type`, and raw `payload`.

Recent activity can be retrieved from the `/metrics` endpoint, which returns
event counts grouped by minute for the last five minutes.
