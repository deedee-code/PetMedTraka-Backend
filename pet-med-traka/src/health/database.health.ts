import { Injectable, Inject } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection: Connection,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      if (this.connection.readyState === 1) {
        return super.getStatus(key, true, { status: 'up' });
      }
      throw new Error('Database connection is not ready');
    } catch (error) {
      throw new HealthCheckError(
        'DatabaseHealthCheck failed',
        super.getStatus(key, false, { status: 'down', message: error.message }),
      );
    }
  }
}
