import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { EventEntity } from '../events/event.entity';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: Repository<EventEntity>,
  ) {}

  async recentCounts() {
    const from = new Date(Date.now() - 5 * 60 * 1000);
    const events = await this.repo.find({
      where: { timestamp: MoreThan(from) },
    });
    const buckets: Record<string, number> = {};
    for (const event of events) {
      const bucket = new Date(
        Math.floor(event.timestamp.getTime() / 60000) * 60000,
      ).toISOString();
      buckets[bucket] = (buckets[bucket] ?? 0) + 1;
    }
    return buckets;
  }
}
